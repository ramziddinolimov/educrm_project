const bcrypt = require("bcrypt")

module.exports.generateCrypt = function (password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}

module.exports.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
}