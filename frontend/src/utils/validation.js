
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 5;
};
  
export const validateEmptyFields = (...fields) => {
    return fields.every((field) => field.trim() !== '');
};
  