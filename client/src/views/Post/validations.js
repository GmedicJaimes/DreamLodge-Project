// validations.js

export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    return nameRegex.test(name);
  };
  
  export const validateType = (type) => {
    return type.length > 0;
  };
  
  export const validateLocation = (location) => {
    const { city, state, adress } = location;
    return city.length > 0 && state.length > 0 && adress.length > 0;
  };
  
  export const validateAddress = (address) => {
    const addressRegex = /^(?=.*[0-9])[A-Za-z0-9\s]{1,100}$/;
    return addressRegex.test(address);
  };
  

  export const validateStances = (stances) => {
    const { guest, rooms, bathrooms, beds } = stances;
    return guest > 0 && rooms > 0 && bathrooms > 0 && beds > 0;
};

  
  export const validateServices = (services) => {
    return services.length > 0;
  };
  
  export const validateDescription = (description) => {
    const descriptionRegex = /^.{30,200}$/;
    return descriptionRegex.test(description);
  };
  
  
  export const validateImageFiles = (imageFiles) => {
    if (!Array.isArray(imageFiles)) return false;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
  
    if (imageFiles.length < 1 || imageFiles.length > 3) {
      return false;
    }
  
    for (const file of imageFiles) {
      if (!allowedTypes.includes(file.type) || file.size > maxSizeInBytes) {
        return false;
      }
    }
  
    return true;
  };
  
  
export const validatePrice = (price) => {
  return price >= 10;
};

  