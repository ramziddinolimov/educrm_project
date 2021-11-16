module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("courses", {
        course_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true,
        },
        course_name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        
    })
}