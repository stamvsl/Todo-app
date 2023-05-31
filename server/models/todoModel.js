import mongoose from 'mongoose';

const schema = new mongoose.Schema(
        {
                todo: "String",
            },
            {
                timestamps: true
            });
export default mongoose.model("Todo", schema)