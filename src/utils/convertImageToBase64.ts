import fs from "fs";

export const convertImageToBase64 = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // Converter para base64
        const base64Image = data.toString("base64");
        resolve(base64Image);
      }
    });
  });
};