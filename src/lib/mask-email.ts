export function maskEmail(email: string) {
  const [usermail, domain] = email.split("@");
  if (!usermail || usermail.length <= 2) return email;

  const firstChar = usermail[0];
  const lastChar = usermail[usermail.length - 1];
  const stars = "*".repeat(usermail.length - 2);
  return `${firstChar}${stars}${lastChar}@${domain}`;
}
