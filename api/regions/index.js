import {getHtml, getRegions, getLastUpdate} from "../../util"

export default async (_, res) => {
	const html = await getHtml()
	const lastUpdate = getLastUpdate(html)
	const regions = getRegions(html)
	res.json({
		values: regions,
		lastUpdate
	})
}
