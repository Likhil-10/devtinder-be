const adminAuth = (req, res, next) => {
  console.log("Validating Admin details.....");
  const token = "messi";
  const isAdminAuthorised = token === "messi";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Validating User details.....");
  const token = "penaldo";
  const isUserAuthorised = token === "penaldo";
  if (!isUserAuthorised) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
