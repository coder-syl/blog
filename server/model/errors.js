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
            allowNull: true,
            field: 'content'
        },
        // 出错列
        errorColumNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorColumNo'
        },
        // 出错行
        errorLineNo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorLineNo'
        },
        // 出错文件
        errorFilename: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorFilename'
        },
        errorSource: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorSource'
        },

        // 用户客户端
        userAgent: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'userAgent'
        },
        // 当前用户所在路径
        path: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'path'
        },
        // 错误类型
        errorType: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorType'
        },
        // 捕获的事件
        errorOrigin: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'errorOrigin'
        },
        // 错误stack
        errorStack: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'errorStack'
        },
        // 异常级别
        errorLevel: {
            type: DataTypes.STRING,
            allowNull: true,
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
        freezeTableName: true
    })
}
module.exports = errors