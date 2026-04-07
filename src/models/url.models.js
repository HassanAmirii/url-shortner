import mongoose from "mongoose";
import "mongoose-type-url";
import { generateStrings } from "../utils/generator.utils";
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
      minlength: 4,
      maxlength: 4,
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
  if (!this.shortCode) {
    this.shortCode = generateStrings(4);
  }
});

export default mongoose.model("Url", urlSchema);
