const classifications = (sequelize,DataTypes)=>{
    return sequelize.define("classifications",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        created_time:{
            type:DataTypes.DATE
        },
       
        deletef:{
            type: DataTypes.INTEGER(1),
            defaultValue: DataTypes.UUIDV1,
        },
        parentId:{
            type:DataTypes.INTEGER,
            defaultValue: DataTypes.UUIDV1,
        }
    })
}

module.exports = classifications