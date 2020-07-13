import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const History = () => {
	let { id } = useParams()
	const [history, setHistory] = useState(null)
	const getHistory = async () => {
		try {
			let response = await (await axios.get(`/hosts/history/${id}`)).data

			setHistory(response[0].history)
		} catch (errorGettingHistory) {
			console.log({ errorGettingHistory })
		}
	}
	useEffect(() => {
		getHistory()
		return () => {}
	}, [])
	return (
		<div>
			{history &&
				history.map((histEntri) => {
					return (
						<div>
							<h1>{histEntri.state.toString()}</h1>
						</div>
					)
				})}
		</div>
	)
}

export default History
