const projects = (sequelize, DataTypes) => {
    return sequelize.define("projects", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "description"
        },

        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "url"
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "language"
        },
        img_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "img_url"
        },
        deletef: {
            type: DataTypes.INTEGER(1),
            defaultValue: DataTypes.UUIDV1
        }
    });
};

module.exports = projects;