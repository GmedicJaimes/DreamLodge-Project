// validations.js

export const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]{1,20}$/;
    return nameRegex.test(name);
  };
  
  export const isCountrySelected = (country) => {
    return !!country;
  };
  
  export const hasAtLeastOneLanguage = (languages) => {
    return languages.length > 0;
  };
  
  export const hasImageSelected = (imageFile) => {
    return !!imageFile;
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  