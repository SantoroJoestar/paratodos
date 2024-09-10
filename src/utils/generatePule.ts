const generateRandom = (length: number): string => {
    const min = length;
    const max = length;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
  
  function insertAtRandomPosition(baseNumber: string, insertNumber: string): string {
    const position = Math.floor(Math.random() * (baseNumber.length + 1));
    return baseNumber.slice(0, position) + insertNumber + baseNumber.slice(position);
  }

export const  generatePule = () => {
    const baseNumber = generateRandom(5);
    const insertNumber = generateRandom(4);
    return insertAtRandomPosition(baseNumber, insertNumber);
  }
  