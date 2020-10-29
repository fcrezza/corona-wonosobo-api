import {getDetail} from "../util";

export default async (_, res) => {
  try {
    const odr = await getDetail({
      containerSelector: ".info-box-icon.bg-yellow",
      totalSelector: ".small-box.bg-yellow .inner h2",
      keys: ["suspect", "probable"]
    });
    res.json(odr);
  } catch (error) {
    res.json(error);
  }
};
