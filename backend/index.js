const express = require ("express")
const app = express();
const path = require("path")


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


  
app.use("/images", express.static(path.join(__dirname,"images")))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

  // Routes

  const userRoutes = require("./routes/user.routes")
  app.use("/api/user", userRoutes)

  const commentRoutes = require ('./routes/comment.routes')
  app.use("/api/comment", commentRoutes)

  const publiRoutes = require("./routes/publi.routes")
  app.use("/api/post", publiRoutes)
  

  app.listen(4200, () => {
    console.log("Backend running on port 4200");
  });

module.exports = app