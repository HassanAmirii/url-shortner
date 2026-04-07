export const generateStrings = function (length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = characters.length;
  let randomStr = "";
  for (let i = 0; i < length; i++) {
    randomStr += characters[Math.floor(Math.random() * charLength)];
  }
  return randomStr;
};
