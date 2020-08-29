import { getHtml, getLastUpdate, getMainData } from "../util";

export default async (_, res) => {
	const html = await getHtml();
	const lastUpdate = getLastUpdate(html);
	const mainData = getMainData(html);

	res.json({
		...mainData,
		lastUpdate,
	});
};
