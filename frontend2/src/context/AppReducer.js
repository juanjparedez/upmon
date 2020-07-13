export default (state, action) => {
	switch (action.type) {
		case "REMOVE_HOST":
			return {
				...state,
				hosts: state.hosts.filter((host) => host.id !== action.payload),
			}
		case "ADD_HOSTS":
			return {
				...state,
				hosts: [...state.hosts, action.payload],
			}
		case "EDIT_HOST":
			const updatedHost = action.payload

			const updatedHosts = state.hosts.map((host) => {
				if (host.id === updatedHost.id) {
					return updatedHost
				}
				return host
			})

			return {
				...state,
				hosts: updatedHosts,
			}
		default:
			return state
	}
}
