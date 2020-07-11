import React, { Fragment } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
import AddIcon from "@material-ui/icons/Add"

import { useHistory } from "react-router-dom"

const Navigations = () => {
	let history = useHistory()
	return (
		<Fragment>
			<List>
				<ListItem
					button
					onClick={(e) => {
						history.push("/")
					}}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='Hosts' />
				</ListItem>
				<ListItem
					button
					onClick={(e) => {
						history.push("/add")
					}}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary='Agregar' />
				</ListItem>
			</List>
		</Fragment>
	)
}

export default Navigations
