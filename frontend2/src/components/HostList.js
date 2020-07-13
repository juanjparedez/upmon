import React, { Fragment, useContext, useEffect } from "react"
import { GlobalContext } from "../context/GlobalState"
import { Link } from "react-router-dom"
import axios from "axios"

export const HostList = () => {
	const { hosts, removeHost, addHost, editHost } = useContext(GlobalContext)

	const getHosts = async () => {
		try {
			let response = await (await axios.get("/hosts")).data
			// console.log(response)
			if (response.length > 0) {
				response.forEach((hostToAdd) => {
					addHost(hostToAdd)
				})
			}
		} catch (errorConnectingToBackend) {
			console.log({ errorConnectingToBackend })
		}
	}

	useEffect(() => {
		getHosts()
	}, [])

	return (
		<Fragment>
			{hosts.length > 0 ? (
				<Fragment>
					{hosts.map((host) => (
						<div key={host.id}>
							<div>
								<p>{host.name}</p>
								<p>{host.designation}</p>
								<span>{host.location}</span>
							</div>
							<div>
								<Link to={`/edit/${host.id}`}>
									<button onClick={() => editHost(host.id)}>Edit</button>
								</Link>
								<button
									onClick={() => removeHost(host.id)}
									className='block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center'
								>
									Add
								</button>
							</div>
						</div>
					))}
				</Fragment>
			) : (
				<p>No data</p>
			)}
		</Fragment>
	)
}
