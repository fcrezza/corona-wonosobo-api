import {getRegion} from "../../util";

export default async (req, res) => {
  try {
    const region = await getRegion(req.query.name);
    res.json(region);
  } catch (error) {
    res.json(error);
  }
};
