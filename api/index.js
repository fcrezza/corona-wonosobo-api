import {getMainData} from "../util";

export default async (_, res) => {
  try {
    const mainData = await getMainData();
    res.json(mainData);
  } catch (error) {
    res.json(error);
  }
};
