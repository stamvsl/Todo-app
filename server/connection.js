import mongoose from "mongoose";

async function main() {
  await mongoose.connect(
    'mongodb+srv://stamvsl:mongopass@cluster0.qq6blos.mongodb.net/?retryWrites=true&w=majority'

  );
  console.log("Database has connected successfully");
}

export default main;