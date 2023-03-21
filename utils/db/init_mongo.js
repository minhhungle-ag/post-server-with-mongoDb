const { default: mongoose } = require("mongoose");

async function connectMongo() {
  await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("mongo connected"))
    .catch((error) => console.log(error));
}

module.exports = connectMongo;
