const express = require ("express")
const app = express();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("groupomania", "root", "Marcrobert1988", {
  dialect: "mysql",
  host: "localhost"
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!!!!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}
  

app.use(express.json());
app.use(express.urlencoded({extended: true}));

  // Routes

  const userRoutes = require("./routes/user.routes")
  app.use("/api/user", userRoutes)
  app.listen(4200, () => {
    console.log("Backend running on port 4200");
  });



