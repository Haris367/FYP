const router = require("express").Router();

// controller
const { userDetails, signup, login } = require("../controllers/users");

// middlewares
const { validateToken } = require("../middlewares/validate-token");
const { validateRequest } = require("../middlewares/validate-request");

// validation
const { userSchema } = require("../utils/validation/users-schema");

// routes
router.get("/me", validateToken, userDetails);
router.post("/login", validateRequest(userSchema), login);
router.post("/signup", validateRequest(userSchema), signup);

module.exports = router;
