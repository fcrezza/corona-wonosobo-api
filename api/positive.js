import { getHtml, getLastUpdate, getPositive } from "../util";

export default async (_, res) => {
	const html = await getHtml();
	const lastUpdate = getLastUpdate(html);
	const positive = getPositive(html);
	res.json({
		...positive,
		lastUpdate,
	});
};
