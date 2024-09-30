export function generateToken(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  while (token.length < length) {
    token += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return token;
}
