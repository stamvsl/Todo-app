import express from "express"
const router = express.Router();

router.get('/:id', (req, res) =>{
    res.send(req.params.id)
})

export default router