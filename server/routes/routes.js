import express from "express";
import todoModel from "../models/todoModel.js";

const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post('/todos/create', async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = await todoModel.create({
      todo,
    });
    res.json(newTodo);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});


  // router.get("/", (req, res) => {
  //   console.log("**/api endpoint was hit**");
  //   res.send({ msg: "Hello world" });
  // });




export default router