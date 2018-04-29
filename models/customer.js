'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1]
      }
    }
  })
  Customer.associate = function (models) {
    // associations can be defined here
    Customer.belongsToMany(models.burger, {through: "customerBurg"})
}
// Project.belongsToMany(User, {through: 'UserProject'});

  return Customer;
};
