var mongoose = require("mongoose")

var Schema = mongoose.Schema

var HostSchema = new Schema({
	ip: { type: String, required: true, maxlength: 15, unique: true },
	name: { type: String },
	contacto: { type: String },
	provincia: { type: String },
	localidad: { type: String },
	isUp: { type: Boolean, default: false },
	lastChange: { type: Date, default: Date.now() },
	history: { type: String },
})

//Export model
module.exports = mongoose.model("Host", HostSchema)
