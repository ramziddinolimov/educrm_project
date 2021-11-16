module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("applicants", {
        applicant_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4(),
        },
        applicant_name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        
    })
}