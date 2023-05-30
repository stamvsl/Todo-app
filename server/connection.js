import mongoose from "mongoose";
main().then(()=>console.log ("database has connected successfully") ).catch(err => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://stamvsl:mongopass@cluster0.qq6blos.mongodb.net/?retryWrites=true&w=majority`);
}
export default main()