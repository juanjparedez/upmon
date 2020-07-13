import React, { Fragment } from "react"

import { HostList } from "../components/HostList"

export const Home = () => {
	return (
		<Fragment>
			<div className='App'>
				<div>
					<h3>CRUD with React Context API and Hooks</h3>

					<HostList />
				</div>
			</div>
		</Fragment>
	)
}
