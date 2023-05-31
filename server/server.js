import express from "express"
const app = express();
import router from "./routes/routes.js";
import connection from "./connection.js";
import cors from "cors"
app.use(express.json());
app.use(cors());

app.use('/todos', router)
app.use('/todo/create', router)
app.use('/todo/update/:id', router)
app.use('/todo/delete/:id', router)

app.listen(3001, () => {
    console.log('Server is running on port 3001')
  })