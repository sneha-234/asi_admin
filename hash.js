import crypto from "crypto";

const password = "asi@admin123";

const hash = crypto
  .createHash("sha256")
  .update(password)
  .digest("hex");

console.log(hash);