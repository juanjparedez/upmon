import React, { Fragment } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PeopleIcon from "@material-ui/icons/People"
import BarChartIcon from "@material-ui/icons/BarChart"
import LayersIcon from "@material-ui/icons/Layers"
import { useHistory } from "react-router-dom"

const Navigations = () => {
	let history = useHistory()
	return (
		<Fragment>
			<List>
				<ListItem
					button
					onClick={(e) => {
						history.push("/prueba")
					}}
				>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='Dashboard' />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary='Orders' />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary='Customers' />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<BarChartIcon />
					</ListItemIcon>
					<ListItemText primary='Reports' />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<LayersIcon />
					</ListItemIcon>
					<ListItemText primary='Integrations' />
				</ListItem>
			</List>
		</Fragment>
	)
}

export default Navigations
