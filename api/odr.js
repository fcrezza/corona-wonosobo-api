import { getHtml, getLastUpdate, getOdr } from "../util";

export default async (_, res) => {
	const html = await getHtml();
	const lastUpdate = getLastUpdate(html);
	const odr = getOdr(html);
	res.json({
		...odr,
		lastUpdate,
	});
};
