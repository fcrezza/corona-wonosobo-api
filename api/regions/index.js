import {getRegions} from "../../util";

export default async (_, res) => {
  try {
    const regions = await getRegions();
    res.json(regions);
  } catch (error) {
    res.json(error);
  }
};
