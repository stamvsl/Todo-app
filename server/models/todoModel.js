import mongoose from 'mongoose';

const schema = new mongoose.Schema(
        {
                todo: "String",
                isComplete : Boolean
            });
export default mongoose.model("Todo", schema)