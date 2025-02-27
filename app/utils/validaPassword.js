export function validatePassword(password) {
    const hasEightCharacters = password.length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password);
    return hasEightCharacters && hasCapitalLetter;
}