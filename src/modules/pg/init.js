const { generateCrypt } = require("../bcrypt");

async function init(db){
    const count = await db.users.count();

    if(count === 0){
        try {
            const initial_admin = await db.users.create({
                user_username: "admin",
                user_name: "admin",
                user_password: await generateCrypt("admin"),
                user_gender: "male"
            })

            const admin_permission = await db.permissions.create({
                permission_name: "admin"
            })

            const set_permission = await db.user_permissions.create({
                user_id: initial_admin.dataValues.user_id,
                permission_id: admin_permission.dataValues.permission_id
            })
    
        } catch (error) {
            console.log("INIT_ERROR", error);
        }
    } 
}

module.exports = init