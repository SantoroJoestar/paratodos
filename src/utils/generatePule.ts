export const  generatePule = () => {
    const timestamp = Date.now(); // ou new Date().getTime()

    // Gera um número aleatório baseado no timestamp e limita a 10 dígitos
    const numeroAleatorio = Math.floor((timestamp * Math.random()) % 10000000000);
  
    // Converte para string e preenche com zeros à esquerda se necessário
    return numeroAleatorio.toString().padStart(10, '0');
  }
  