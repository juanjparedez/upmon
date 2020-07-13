var mongoose = require("mongoose")

var Schema = mongoose.Schema

var HistorySchema = new Schema({
	host: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Host",
	},
	history: [
		{
			state: { type: Boolean },
			timeStamp: { type: Date, default: Date.now() },
		},
	],
})

//Export model
module.exports = mongoose.model("History", HistorySchema)
