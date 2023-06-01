import express from "express"
const app = express();
import router from "./routes/routes.js";
import connection from "./connection.js";
import cors from "cors"
// import bodyParser from "body-parser";
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', router)
app.use('/todo/create', router)
app.use('/todo/update/:id', router)
app.use('/todo/delete/:id', router)

app.use('/api', router)

// app.get("/api", (req, res) => {
//   console.log("**/api endpoint was hit**");
//   res.send({ msg: "Hello world" });
// });


app.listen(3001, () => {
    console.log('Server is running on port 3001')
  })

