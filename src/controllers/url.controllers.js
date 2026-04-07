import Url from "../models/url.models";
import { generateStrings } from "../../utils/generator.utils";

//create new shortcode url
export const createUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;
    const newUrl = await new Url.create({
      longUrl,
    });
    return res.status(201).json({ success: true, newUrl });
  } catch (err) {
    next(err);
  }
};

//update pre-existing url shortcode
export const updateShortUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const newCode = generateStrings(4);
    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode: shortCode },
      { shortCode: newCode },
      { new: true, runValidators: true },
    );
    if (!updatedUrl) {
      return res
        .status(404)
        .json({ success: false, message: "short code does not exist" });
    }
    return res.status(200).json({ success: true, updatedUrl });
  } catch (err) {
    next(err);
  }
};

//delete an existing
export const deleteUrl = async (req, res, next) => {
  const { shortCode } = req.params;
  try {
    const deletedUrl = await Url.findOneAndDelete({ shortCode });
    if (!deletedUrl) {
      return res.status(404).json({
        success: false,
        message: "provided short code doesnt exist",
      });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

//retrieve url
export const getUrl = async (req, res, next) => {
  const { shortCode } = req.params;
  try {
    const getMatchingUrl = await Url.findOne({ shortCode });
    if (!getMatchingUrl) {
      return res.status(404).json({
        success: false,
        message: "provided short code doesnt exist",
      });
    }
    return res.status(200).json({ success: true, getMatchingUrl });
  } catch (err) {
    next(err);
  }
};
