const express = require("express")
const urlRoute = require("./router/url")
const userRoute = require("./router/user")
const {connectToMongoDB} = require("./connect")
const app = express();
const PORT = 8001;
const cors = require("cors");
const cookieParser = require("cookie-parser")
const Comment = require("./models/comments")
connectToMongoDB("mongodb+srv://parvashah2121_db_user:sQfIKosrd8Zn52Sk@cluster0.lxijh3e.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDb Connected!"))

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('URL:', req.url);
  next();
});

app.use("/url",urlRoute);
app.use("/user",userRoute);




app.listen(PORT,() => console.log(`Server Started on port ${PORT}`))