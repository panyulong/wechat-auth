/**
 * 用户类
 */
export default function(sequelize, DataTypes) {
    return sequelize.define("inviteeInfo", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        name: {
            field:'name',
            type: DataTypes.STRING(250),
            allowNull: false
        },
        tel:{
            field:'tel',
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bless:{
            field:'bless',
            type: DataTypes.STRING(250),
            allowNull: true 
        },
    },  
    {
        timestamps: false, 
        freezeTableName: true,
    }
    );
}