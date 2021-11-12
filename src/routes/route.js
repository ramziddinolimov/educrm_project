const errorHandler = require("../helpers/errorHandler")
const UserRouter = require("./users/UserRoute")

module.exports = async function (app) {
    try{
        app.use("/users", UserRouter)
    }finally{
        app.use(errorHandler);
    }
}