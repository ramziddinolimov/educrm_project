module.exports = async function PermissionModel(sequelize, Sequelize){
    return await sequelize.define( "user_permissions",{} )
}