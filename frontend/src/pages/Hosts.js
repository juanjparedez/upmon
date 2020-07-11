import React, { Fragment, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
// import GridList from "@material-ui/core/GridList"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 80,
		width: 150,
	},
}))

const Hosts = () => {
	const classes = useStyles()
	const [hosts, setHosts] = useState(null)
	const getHosts = async () => {
		try {
			let response = await (await axios.get("/hosts")).data
			setHosts(response)
		} catch (errorGettingHosts) {
			console.log(errorGettingHosts)
		}
	}

	useEffect(() => {
		getHosts()
	}, [])
	return (
		<Fragment>
			<Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
      <Grid container justify="center">
      {hosts &&
					hosts.map((host, key) => {
						return (
							<Grid key={key} item>
								<Paper className={classes.paper}>
									<h1>{host.name}</h1>
								</Paper>
							</Grid>
						)
					})}
      </Grid>
      
      </Grid>
				
			</Grid>
		</Fragment>
	)
}

export default Hosts
