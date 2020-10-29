import {getDetail} from "../util";

export default async (_, res) => {
  try {
    const probable = await getDetail({
      containerSelector: ".info-box-icon.bg-green",
      totalSelector: ".small-box.bg-green .inner h2",
      keys: ["probable"]
    });
    res.json(probable);
  } catch (error) {
    res.json(error);
  }
};
