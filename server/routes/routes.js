import express from "express"
const router = express.Router();
import Task from "../models/todoModel.js"

router.get("/todos", async (req, res) => {
    try {
      const todos = await todoModel.find();
      res.json(todos);
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/todo/create", async (req, res) => {
    const { todo } = req.body;
    try {
      const newTodo = await todoModel.create({
        todo,
      });
      res.json(newTodo);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.put("/todo/update/:id", async (req, res) => {
    const { update } = req.body;
    try {
      const Put = await todoModel.findOneAndUpdate({
        todo,
        update,
      });
      res.json(Put);
    } catch (e) {
      console.log(e);
    }
  });
  
  router.delete("/todo/delete/:id", async (req, res) => {
    try {
      const del = await todoModel.findOneAndDelete();
      res.json(del);
    } catch (e) {
      console.log(e);
    }
  });





// router.get('/', (req, res) =>{
//    Task.find((err, docs)=>{
//     if(err) console.log(err)
//     res.json(docs)
//    })
// })


// router.post('/', (req, res) =>{
//     const task = new Task(req.body)
//     task.save((err, doc) =>{
//         if(err) console.log(err)
//         res.json(doc)
//     })
// })

// router.put('/:id', (req, res) =>{
//     Task.findByIdAndUpdate({
//         _id : req.params.id
//     },req.body,{
//         new : true
//     },(err,doc) =>{
//         if(err) console.log(err)
//         res.json(doc)
//     })
// })

// router.delete('/:id', (req, res) =>{
//     Task.findByIdAndDelete(req.params.id,(err,doc) =>{
//         if(err) console.log(err)
//         res.json(doc)
//     })
// })

export default router