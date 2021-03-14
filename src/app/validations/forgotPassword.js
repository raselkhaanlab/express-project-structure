const {body} = require('express-validator');
const User = loadModel('user');

module.exports=[
    body('email').notEmpty().withMessage('email can not be empty')
    .isEmail().withMessage('email must be a valid email')
    .custom(value => {
        return User.findByEmail(value).then(user => {
            if (!user.length) {
              return Promise.reject('email is not registred');
            }
          })
    }).trim()
]