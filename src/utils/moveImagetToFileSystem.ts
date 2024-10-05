import RNFS from 'react-native-fs';

// Função para mover a imagem para o sistema de arquivos com um nome único
export const moveImageToFileSystem = async () => {
  try {
    const uniqueName = 'logo_paratodos.png'; // Nome do arquivo
    const destinationPath = `${RNFS.DocumentDirectoryPath}/${uniqueName}`;

    // Verificar se o arquivo já existe no caminho de destino
    const fileExists = await RNFS.exists(destinationPath);
    if (fileExists) {
      return destinationPath; // Se a imagem já existir, retorna o caminho
    }

    // Copiar a imagem da pasta de 'assets' nativa para o sistema de arquivos
    await RNFS.copyFileAssets(uniqueName, destinationPath);

    console.log('Imagem movida com sucesso para:', destinationPath);
    return destinationPath; // Retorna o caminho da imagem no sistema de arquivos
  } catch (error) {
    console.error('Erro ao mover a imagem:', error);
    throw error;
  }
};
