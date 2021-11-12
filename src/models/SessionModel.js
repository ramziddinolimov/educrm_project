module.exports = async function SessionModel(sequelize, Sequelize){
    return await sequelize.define(
        "sessions",
        {
            session_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                allowNull: false,
                primaryKey: true
            },
            session_useragent: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    )
}