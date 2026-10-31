const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Enter all the required fields twin");
  }
  if (firstName.length < 3 || firstName.length > 15) {
    throw new Error("First name should be between 3 and 15 characters");
  }
  if (lastName.length < 3 || lastName.length > 15) {
    throw new Error("Last name should be between 3 and 15 characters");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateUserEditData = (req) => {
  const editableFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "pfp",
    "about",
  ];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    editableFields.includes(key),
  );

  return isEditAllowed;
};

module.exports = { validateSignUp, validateUserEditData };
