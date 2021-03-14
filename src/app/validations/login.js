
const {body} =require("express-validator");

module.exports=[
    body("email").isEmail().withMessage("must be a valid email").trim(),
    body('password').notEmpty().withMessage('password can not be empty').trim()
  ];