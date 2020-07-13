import React from "react"
import { Route, Switch } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalState"
import { Home } from "./pages/Home"

function App() {
	return (
		<GlobalProvider>
			<Switch>
				<Route path='/' component={Home} exact />
			</Switch>
		</GlobalProvider>
	)
}

export default App
