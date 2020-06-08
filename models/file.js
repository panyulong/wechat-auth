/**
 * 用户类
 */
export default function(sequelize, DataTypes) {
    return sequelize.define("file", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        fileUrl: {
            field:'file_url',
            type: DataTypes.STRING,
            allowNull: false
        },
        fileSize:{
            field:'file_size',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fileName:{
            field:'file_name',
            type: DataTypes.STRING,
            allowNull: false 
        },
        current:{
          field:'current',
          type: DataTypes.STRING,
          allowNull: false
        },
        userId:{
            field:'user_id',
            type: DataTypes.STRING(100),
            allowNull: false
        },
    },  
    {
        timestamps: false, 
        freezeTableName: true,
    }
    );
}