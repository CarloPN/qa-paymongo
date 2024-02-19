/*
    This serves as a script to encrypt or decrypt string values using crypto.ts

    To encrypt/decrypt a string, add a value to the provided 'encrypt', 'decrypt' and 'key' variables that can both be found below.
*/

import crypto from "./crypto";

const encrypt = ["carlopnarido@gmail.com", "CarloNarido123!"];
const decrypt = [""];
const key = "uat";

console.log(`Encryption:`);
for (let i = 0; i < encrypt.length; i++) {
  const encryptedText = crypto.encryptTxt(encrypt[i], key);
  console.log(
    `${i + 1}. Encrypted Text for: ${encrypt[i]} === ${encryptedText}`
  );
}

console.log(`Decryption:`);
for (let i = 0; i < decrypt.length; i++) {
  const decryptedText = crypto.decryptTxt(decrypt[i], key);
  console.log(
    `${i + 1}. Decrypted Text for: ${decrypt[i]} === ${decryptedText}`
  );
}
