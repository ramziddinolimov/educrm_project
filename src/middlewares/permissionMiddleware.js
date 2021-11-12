const { verifyToken } = require("../modules/jwt")

module.exports = async function authMiddleware(req, res, next){
    try{
        
        const permission = await req.db.user_permissions.findAll({
            where: {
                user_id: req.session.user_id
            },
            incude: req.db.permissions
        })

        console.log(permission);

        next()

    }catch(error){

        next(error)
    }
}