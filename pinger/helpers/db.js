const mongoose = require("mongoose")
const Host = require("../models/Host")
require("dotenv/config")

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		console.log("Connected to ", process.env.MONGO_DB)
	} catch (errorConnectingMongo) {
		console.log({ errorConnectingMongo })
	}
}

const disconnectDB = async () => {
	try {
		await mongoose.connection.close()
		console.log("Disconnected to ", process.env.MONGO_DB)
	} catch (errorDisconnectingDB) {
		console.log({ errorDisconnectingDB })
	}
}

module.exports = { connectDB, disconnectDB }
