const express = require("express")
const Host = require("../models/Host")
const History = require("../models/History")
const { connectDB, disconnectDB } = require("../helpers/db")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		connectDB()
		let hosts = await Host.find({}).sort({ isUp: 1 })
		res.send(hosts)
		disconnectDB()
	} catch (errorGettingHosts) {
		console.log({ errorGettingHosts })
	}
})

router.get("/down", async (req, res) => {
	try {
		connectDB()
		let hosts = await Host.find({ isUp: false })
		res.send(hosts)
		disconnectDB()
	} catch (errorGettingHosts) {
		console.log({ errorGettingHosts })
	}
})

router.get("/:id", async (req, res) => {
	let id = req.params.id
	try {
		connectDB()
		let host = await Host.find({ _id: id })
		res.send(host)
		disconnectDB()
	} catch (errorGettingHost) {
		console.log({ errorGettingHost })
	}
})

router.get("/history/:id", async (req, res) => {
	let id = req.params.id
	try {
		connectDB()
		let hostHistory = await History.find({ _id: id })
		res.send(hostHistory)
		disconnectDB()
	} catch (errorGettingHost) {
		console.log({ errorGettingHost })
	}
})

router.post("/add", async (req, res) => {
	try {
		await connectDB()
		let ipToAdd = await Host.find({ ip: req.body.ip })
		// console.log(req.body)

		if (ipToAdd.length === 0) {
			let newHistory = new History({
				host: Host.id,
				history: {
					state: false,
				},
			})
			await newHistory.save()
			const host = new Host({
				ip: req.body.ip,
				name: req.body.name,
				isUp: false,
				history: newHistory.id,
			})
			try {
				await host.save()
				console.log("Informacion de host guardada en la DB")
				await disconnectDB()
				res.send(host)
			} catch (errorSaving) {
				await disconnectDB()
				console.log({ errorSaving })
			}
		} else {
			await disconnectDB()
			res.send("El host existe en la DB")
		}
	} catch (errorConectingDB) {
		console.log(errorConectingDB)
	}
})

module.exports = router
