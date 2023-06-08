import mongoose from 'mongoose';

async function testConnection() {
  try {
    await mongoose.connect(
      'mongodb+srv://stamvsl:mongopass@cluster0.qq6blos.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    mongoose.disconnect();
  }
}

testConnection();