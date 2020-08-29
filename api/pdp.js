import { getHtml, getLastUpdate, getPdp } from "../util";

export default async (_, res) => {
	const html = await getHtml();
	const lastUpdate = getLastUpdate(html);
	const pdp = getPdp(html);
	res.json({
		...pdp,
		lastUpdate,
	});
};
