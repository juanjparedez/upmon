import React, { createContext, useReducer } from "react"
import AppReducer from "./AppReducer"

const initialState = {
	hosts: [],
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState)

	function removeHost(id) {
		dispatch({
			type: "REMOVE_HOST",
			payload: id,
		})
	}

	function addHost(hosts) {
		dispatch({
			type: "ADD_HOSTS",
			payload: hosts,
		})
	}

	function editHost(hosts) {
		dispatch({
			type: "EDIT_HOST",
			payload: hosts,
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				hosts: state.hosts,
				removeHost,
				addHost,
				editHost,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
