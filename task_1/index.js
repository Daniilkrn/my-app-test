import { encoded, translations } from "./data.js";

function decodingLabels(encoded, translations) {
  let keysTs = [];
  let valuesTs = [];
  let uniqueIds = [];

  const tsEncode = Object.entries(translations);
  tsEncode.forEach((entry) => {
    let [key, value] = entry;
    keysTs.push(key);
    valuesTs.push(value);
  });

  encoded.forEach((obj) => {
    for (let [key, value] of Object.entries(obj)) {
      const index = keysTs.indexOf(value);
      if (index !== -1 && key.includes("Id")) {
        obj[key] = valuesTs[index];
      }
    }
  });

  const getUnique = () => {
    const keys = Object.keys(translations);
    uniqueIds = uniqueIds.filter((el, ind) => ind === uniqueIds.indexOf(el));
    return uniqueIds.filter((el) => !keys.includes(el));
  };

  getUnique();
  return encoded;
}

console.log(decodingLabels(encoded, translations));