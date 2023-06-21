//check name format (name not empty)
const checkNameFormat = (txt: string) => {
  if (txt.trim() === "") return false;
  return true;
};

// check email format (include @)
const checkEmail = (email: string) => {
  if (email.includes("@")) return true;
  return false;
};

//check password (lenght > 6)
const checkPassword = (password: string) => {
  if (password.trim().length >= 6) return true;
  return false;
};

export { checkEmail, checkNameFormat, checkPassword };
