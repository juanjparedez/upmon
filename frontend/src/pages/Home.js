import React, { Fragment } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}))

const Home = () => {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<h1>CHART</h1>
				</Paper>
			</Grid>

			<Grid item xs={12} md={4} lg={3}>
				<Paper className={fixedHeightPaper}>
					<h1>Depositos</h1>
				</Paper>
			</Grid>

			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<h1>Ordenes</h1>
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default Home
