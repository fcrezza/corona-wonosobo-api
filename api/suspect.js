import {getDetail} from "../util";

export default async (_, res) => {
  try {
    const suspect = await getDetail({
      containerSelector: ".info-box-icon.bg-blue",
      totalSelector: ".small-box.bg-blue .inner h2",
      keys: ["treated", "selfIsolation", "discarded"]
    });
    res.json(suspect);
  } catch (error) {
    res.json(error);
  }
};
