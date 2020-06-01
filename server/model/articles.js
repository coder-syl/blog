const articles = (sequelize, DataTypes) => {
    return sequelize.define('articles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        htmlContent: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'htmlContent'
        },
        created_time: {
            type: DataTypes.DATE
        },
        updated_time: {
            type: DataTypes.DATE
        },
        visit_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reply_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        deletef: {
            type: DataTypes.INTEGER(1),
            defaultValue: DataTypes.UUIDV1,
        }
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: false
    })
}
module.exports = articles