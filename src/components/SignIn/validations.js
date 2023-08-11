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
  




/* 






  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    try {
      if (!isValidName(register.name)) 
        newErrors.name = "Only letters allowed and up to 20 characters.";
      if (!isValidName(register.lastName)) 
        newErrors.lastName = "Only letters allowed and up to 20 characters.";
      if (!isCountrySelected(register.country)) 
        newErrors.country = "Country selection is mandatory.";
      if (!hasAtLeastOneLanguage(register.languages)) 
        newErrors.languages = "Selecting at least one language.";
      if (!hasImageSelected(register.imageFile)) 
        newErrors.imageFile = "Selecting an image is mandatory.";
      if (!isValidEmail(register.email)) 
        newErrors.email = "Invalid email. No special characters allowed.";
      if (!isValidPassword(register.password)) 
        newErrors.password = "Minimum 8 characters and only letters and numbers.";

      const emailExists = await doesEmailExistInFirestore(register.email);
      if (emailExists) {
        newErrors.email = "This email is already in use.";
        console.log(errors.email);
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTimeout(() => {
          setErrors({});
        }, 3000);
        return;
      }

      const userCredential = await signIn(auth, register.email, register.password);

      if (userCredential?.user?.uid) {
        const { uid, email } = userCredential.user;

        let imageURL = "";
        if (register.imageFile) {
          const imageRef = ref(storage, `users/${uid}`);
          await uploadBytes(imageRef, register.imageFile);
          imageURL = await getDownloadURL(imageRef);
        }

        const userToSave = {
          uid,
          email,
          name: register.name,
          lastName: register.lastName,
          country: register.country,
          image: imageURL,
          languages: register.languages,
          createdAt: new Date().toLocaleDateString(),
        };
        console.log(userToSave);

        await registerUserInFirestore(uid, userToSave);

        sendSignInLinkToEmail(auth, email, {
          url: "http://localhost:5173/",
          handleCodeInApp: true
        })
        .then(() => {
          localStorage.setItem("email", email);
          console.log(sendSignInLinkToEmail())
          setLoginLoading(false);
          setLoginError("");
          setInfoMsg("hola como estas");
          alert(`email de verificacion enviado`)
        })
        .catch((err) => {
          setLoginLoading(false);
          setLoginError(err.message);
        });

        navigate(`/home`);
      }

      setRegister({
        email: "",
        password: "",
        name: "",
        lastName: "",
        country: "",
        languages: [],
        imageFile: "", 
      });
    } catch (error) {
      console.log(error);
    }
  }; */