const express = require("express")
const Host = require("../models/Host")
const { connectDB, disconnectDB } = require("../helpers/db")

const router = express.Router()

router.get("/", async (req, res) => {
	try {
		connectDB()
		let hosts = await Host.find({})
		res.send(hosts)
		disconnectDB()
	} catch (errorGettingHosts) {
		console.log({ errorGettingHosts })
	}
})

router.post("/add", async (req, res) => {
	await connectDB()
	let ipToAdd = await Host.find({ ip: req.body.ip })
	console.log(req.body)

	if (ipToAdd.length === 0) {
		const host = new Host({
			ip: req.body.ip,
			name: req.body.name ? req.body.name : "",
			contacto: req.body.contacto ? req.body.contacto : "",
			provincia: req.body.provincia ? req.body.provincia : "",
			localidad: req.body.localidad ? req.body.localidad : "",
			isUp: false,
			history: "history",
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
})

module.exports = router
