// model Citizen.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/q_phela');

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

module.exports = Citizen;
