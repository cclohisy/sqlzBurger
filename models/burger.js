module.exports = function (sequelize, DataType) {
    var Burger = sequelize.define("burger", {
        burger_name: {
            type: DataType.STRING,
            allowNull: false
        },
        devoured: {
            type: DataType.BOOLEAN,
            defaultValue: false
        }
    })
    
    Burger.associate = function (models) {
        // associations can be defined here
        Burger.hasMany(models.Customer, {})
    }
 
    return Burger
}


// CREATE TABLE burgers(
//     id INT NOT NULL AUTO_INCREMENT,
//     burger_name VARCHAR(255) NOT NULL,
//     devoured BOOLEAN DEFAULT false,
//     PRIMARY KEY (id)
// )