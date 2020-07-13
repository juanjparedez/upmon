const { connectDB, disconnectDB } = require("./helpers/db")
var ping = require("ping")
const Host = require("./models/Host")
const History = require("./models/History")

const alive = async (host) => {
	console.log({ host })
	let historyId = host.history
	// console.log({ historyId })
	if (!host.isUp) {
		try {
			await connectDB()
			await Host.updateOne({ name: host.name }, { $set: { isUp: true } })
			await History.update(
				{ _id: historyId },
				{ $push: { history: { state: true } } }
			)

			await disconnectDB()
		} catch (errorUpdateingAlive) {
			console.log(errorUpdateingAlive)
		}
	}
}

const dead = async (host) => {
	console.log({ host })
	let historyId = host.history
	// console.log({ historyId })
	if (host.isUp) {
		try {
			await connectDB()
			await Host.updateOne({ name: host.name }, { $set: { isUp: false } })
			await History.update(
				{ _id: historyId },
				{ $push: { history: { state: false } } }
			)

			await disconnectDB()
		} catch (errorUpdateingAlive) {
			console.log(errorUpdateingAlive)
		}
	}
}

const getData = async () => {
	try {
		await connectDB()
		let hosts = await Host.find()
		await disconnectDB()
		if (hosts) {
			hosts.forEach((host) => {
				ping.sys.probe(host.ip, async (isAlive) => {
					isAlive ? await alive(host) : await dead(host)
					// console.log(msg)
				})
			})
		}
	} catch (errorGettingData) {}
}

getData()
