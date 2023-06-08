import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import connection from "./connection.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/todos', router)
app.use('/todo/create', router)
app.use('/todo/update/:id', router)
app.use('/todo/delete/:id', router)

app.use('/api', router)

app.get("/api", (req, res) => {
  console.log("**/api endpoint was hit**");
  res.send({ msg: "Hello world" });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001')
  })

