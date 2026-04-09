import mongoose from "mongoose";
import "mongoose-type-url";
import { generateStrings } from "../utils/generator.utils.js";
const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: mongoose.SchemaTypes.Url,
      required: true,
      lowercase: true,
      trim: true,
    },
    shortCode: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 7,
      maxlength: 7,
    },
    accessCount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true },
);

urlSchema.pre("save", async function () {
  const length = 7;
  if (!this.shortCode) {
    this.shortCode = generateStrings(length);
  }
});

export default mongoose.model("Url", urlSchema);
