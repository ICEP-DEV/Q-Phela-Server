// model Citizen.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/user.js');

const Citizen = sequelize.define('Citizen', {
  citizen_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  Citizen_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});
// Associations
citizen.associate = (models) => {
  citizen.hasMany(models.report, {
    foreignKey: 'citizen_id',
    as: 'reports',
  });
  
};

module.exports = citizen;
