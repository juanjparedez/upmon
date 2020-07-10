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

const NotFound = () => {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<h1>Pagina no encontrada</h1>
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default NotFound
