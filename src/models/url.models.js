import mongoose from "mongoose";
import "mongoose-type-url";
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
    },
  },
  { timestamps: true },
);

urlSchema.pre("save", async function () {
  function generateStrings(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charLength = characters.length;
    let randomStr = "";
    for (let i = 0; i < length; i++) {
      randomStr += characters[Math.floor(Math.random() * charLength)];
    }
    return randomStr;
  }
  if (!this.shortCode) {
    this.shortCode = generateStrings(4);
  }
});

export default mongoose.model("Url", urlSchema);
