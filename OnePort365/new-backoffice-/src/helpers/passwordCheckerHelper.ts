export const checkPasswordHasCapital = (password: string): boolean => {
  for (let x = 0; x < password.length; x++)
    if (password.charAt(x) >= "A" && password.charAt(x) <= "Z") return true;
  return false;
};

export const checkPasswordHasMin = (
  password: string,
  length: number
): boolean => {
  return password.length > length - 1;
};

export const checkPasswordHasSpecialCharacter = (password: string): boolean => {
  return /[!@£$%^&()]+/.test(password);
};

export const checkPasswordHasSpecialDigit = (password: string): boolean => {
  return /\d/.test(password);
};
