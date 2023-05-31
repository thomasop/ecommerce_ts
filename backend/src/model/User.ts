import { DataTypes } from "sequelize";
import connect from "../database/connect.js";

const User = connect.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

export default User
