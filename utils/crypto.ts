/**
 * Crypto module is used to decrypt or encrypt data, using AES encryption.
 *
 * @param {data, key} arg the text or object to encrypt/decypt, key encryption key.
 */
import * as CryptoJS from "crypto-js";

class Crypto {
  // Text encryption/decryption
  encryptTxt(txt: string, key: string) {
    return CryptoJS.AES.encrypt(txt, key).toString();
  }

  decryptTxt(encTxt: string, key: string) {
    const bytes = CryptoJS.AES.decrypt(encTxt, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export default new Crypto();
