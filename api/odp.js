import { getHtml, getLastUpdate, getOdp } from "../util";

export default async (_, res) => {
	const html = await getHtml();
	const lastUpdate = getLastUpdate(html);
	const odp = getOdp(html);
	res.json({
		...odp,
		lastUpdate,
	});
};
