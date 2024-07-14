// Importe os pacotes necessários
import jwt from 'jsonwebtoken';

// Chave secreta para assinar os tokens (guarde de forma segura)
const jwtSecret = process.env.JWT_SECRET;

// Função para criar um token JWT
export function createJwtToken(user) {
  // Cria um token com o payload fornecido e a chave secreta
  const token = jwt.sign({user}, jwtSecret, { expiresIn: '0min' }); // Expira em 1 hora

  return token;
}

// Função para verificar e decodificar um token JWT
export function verifyJwtToken(token) {
  try {
    // Verifica o token usando a chave secreta
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
    
  } catch (error) {
    // Se houver um erro (por exemplo, token expirado ou inválido), retorna null ou lida com o erro conforme necessário
    console.error('Erro ao verificar token:', error);
    return null;
  }
}
