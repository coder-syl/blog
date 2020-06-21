const errors = (sequelize, DataTypes) => {
    return sequelize.define('errors', {
        // 自增主键
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //  错误内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 出错行
        errorLineNo:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'errorLineNo'
        },
        // 出错文件
        errorFilename:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'errorFilename'
        },
        // 用户客户端
        userAgent:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'userAgent'
        },
        // 当前用户所在路径
        path:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'path'
        },
        // 错误类型
        errorType:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'errorType'
        },
        // 异常级别
        errorLevel:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'errorLevel'
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
module.exports = errors