import { Sequelize } from "sequelize";

let connect = new Sequelize("ecommercejs", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    dialectOptions: {
      socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
  });

  try {
    connect.authenticate()
    console.log('Connect to database')
  } catch (error) {
    console.log(error)
  }

  export default connect