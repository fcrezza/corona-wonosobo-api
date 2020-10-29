import {getDetail} from "../util";

export default async (_, res) => {
  try {
    const positive = await getDetail({
      containerSelector: ".info-box-icon.bg-red",
      totalSelector: ".small-box.bg-red .inner h2",
      keys: ["recovered", "death", "treated"]
    });
    res.json(positive);
  } catch (error) {
    res.json(error);
  }
};
