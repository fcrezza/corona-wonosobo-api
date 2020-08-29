const fetch = require("node-fetch")
const $ = require("cheerio")

export async function getHtml() {
	const data = await fetch("https://corona.wonosobokab.go.id/")
	const dataHtml = await data.text()
	return dataHtml
}

export function getLastUpdate(html) {
	const date = $("h2 .label.label-primary", html)
		.slice(1, 2)
		.text()
		.split(" ")[1]
	const parseDate = new Date(date.split("-").reverse().join("/"))
	return parseDate
}

export function getMainData(html) {
	const result = {}
	const container = $(".inner center", html)
	const data = $("h2", container)
		.map((_, e) => $(e).text())
		.toArray()

	Array.of("odr", "odp", "pdp", "positive").forEach((name, i) => {
		result[name] = {
			value: parseInt(data[i].replace(",", "")),
			detail: `/${name}`
		}
	})

	return result
}

export function getOdr(html) {
	const container = $(".info-box-icon.bg-yellow", html).next()
	const data = $("b", container)
		.map((_, e) => $(e).text())
		.toArray()
	const total = $(".small-box.bg-yellow .inner h2", html).text()
	return {
		odp: parseInt(data[0].replace(",", ""), 10),
		pdp: parseInt(data[1].replace(",", ""), 10),
		total: parseInt(total.replace(",", ""), 10)
	}
}

export function getPdp(html) {
	const container = $(".info-box-icon.bg-green", html).next()
	const data = $("b", container)
		.map((_, e) => $(e).text())
		.toArray()
	const result = {}

	Array.of("recovered", "death", "treated", "selfIsolation").forEach(
		(name, i) => {
			result[name] = parseInt(data[i].replace(",", ""), 10)
		}
	)

	return {
		...result,
		total: data.reduce(
			(acc, curr) => (acc += parseInt(curr.replace(",", ""), 10)),
			0
		)
	}
}

export function getOdp(html) {
	const container = $(".info-box-icon.bg-blue", html).next()
	const data = $("b", container)
		.map((_, e) => $(e).text())
		.toArray()

	return {
		done: parseInt(data[0].replace(",", ""), 10),
		ongoing: parseInt(data[1].replace(",", ""), 10),
		total: data.reduce(
			(acc, curr) => (acc += parseInt(curr.replace(",", ""), 10)),
			0
		)
	}
}

export function getPositive(html) {
	const container = $(".info-box-icon.bg-red", html).next()
	const data = $("b", container)
		.map((_, e) => $(e).text())
		.toArray()
	const result = {}

	Array.of("recovered", "death", "treated").forEach((name, i) => {
		result[name] = parseInt(data[i].replace(",", ""), 10)
	})

	return {
		...result,
		total: data.reduce(
			(acc, curr) => (acc += parseInt(curr.replace(",", ""), 10)),
			0
		)
	}
}

export function getRegions(html) {
	const result = []
	const properties = Array.of("name", "odp", "pdp", "positive")
	const table = $("#container > #tableMain tr", html).toArray().slice(1)
	const data = table.map((t) => $("td", t).slice(1).toArray())

	data.forEach((d) => {
		const obj = {}
		d.forEach((td, i) => {
			if (i) {
				obj[properties[i]] = parseInt($(td).text().replace(",", ""), 10)
				return
			}

			obj[properties[i]] = $(td).text()
		})
		obj.detail = `/regions/${obj.name.toLowerCase().replace(" ", "")}`
		result.push(obj)
	})

	return result
}

export function getRegion(html, name) {
	const result = []
	let idx = 0
	const properties = Array.of("name", "odp", "pdp", "positive")
	const tables = $("#container > #tableMain", html)

	tables.each((i, t) => {
		const regionName = $("td", t)
			.slice(1, 2)
			.text()
			.toLowerCase()
			.replace(" ", "")
		if (regionName === name) {
			idx = i
			return
		}
	})

	if (!idx) {
		return null
	}

	if (!$(tables.toArray()[idx]).next().hasClass("collapse") && idx === 16) {
		const td = $("td", tables.toArray()[idx]).toArray().slice(1)
		const obj = {}
		td.forEach((d, i) => {
			if (i) {
				obj[properties[i]] = parseInt($(d).text().replace(",", ""), 10)
				return
			}

			obj[properties[i]] = $(d).text()
		})
		result.push(obj)
		return result
	}

	const container = $(tables.toArray()[idx]).next(".collapse")
	const tr = $("tr", container).filter((_, el) => $(el).children().length && el)
	const data = tr.toArray().map((el) => $(el).children().slice(1).toArray())
	data.forEach((d) => {
		const obj = {}
		d.forEach((td, i) => {
			if (i) {
				obj[properties[i]] = parseInt($(td).text().replace(",", ""), 10)
				return
			}

			obj[properties[i]] = $(td).text()
		})
		result.push(obj)
	})

	return result
}
