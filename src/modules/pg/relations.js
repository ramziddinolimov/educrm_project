const {Sequelize, DataTypes} = require("sequelize");

module.exports = async (db) => {

    //Users && sessions
    await db.users.hasMany(db.sessions, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })

    await db.sessions.belongsTo(db.users, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })

    // Users permissions && users
    await db.users.hasMany(db.user_permissions, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })

    await db.user_permissions.belongsTo(db.users, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })
    
    // Users permissions && permissions
    await db.permissions.hasMany(db.user_permissions, {
        foreignKey: {
            name: "permission_id",
            allowNull: false
        }
    })

    await db.user_permissions.belongsTo(db.permissions, {
        foreignKey: {
            name: "permission_id",
            allowNull: false
        }
    })
}