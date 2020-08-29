import {getHtml, getRegion, getLastUpdate} from "../../util"

export default async (req, res) => {
	const html = await getHtml()
	const lastUpdate = getLastUpdate(html)
	const region = getRegion(html, req.query.name)
	res.json({
		values: region,
		lastUpdate
	})
}
