'use strict'

module.exports = (sequelize, Datatypes) => {
  const Survey = sequelize.define('mheath_survey', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: Datatypes.STRING,
      allowNull: true
    },
    inturn: {
      type: Datatypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: Datatypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return Survey;
}