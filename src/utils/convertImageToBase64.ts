import RNFS from 'react-native-fs';

export const convertImageToBase64 = async (filePath: string): Promise<string> => {
  try {
    const base64Image = await RNFS.readFile(filePath, 'base64');
    return base64Image;
  } catch (err) {
    console.error("Erro ao converter imagem:", err);
    throw err;
  }
};