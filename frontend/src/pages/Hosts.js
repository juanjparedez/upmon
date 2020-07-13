import React, { Fragment, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
// import GridList from "@material-ui/core/GridList"
// import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { red, yellow, green } from "@material-ui/core/colors"
import { useHistory, useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	base: {
		width: 200,
		backgroundColor: yellow[100],
		alignContent: "center",
	},
	paper: {
		height: 80,
		width: 150,
	},
	media: {
		height: 25,
	},
}))

const Hosts = () => {
	const classes = useStyles()
	const history = useHistory()
	const location = useLocation()
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
	}, [location.pathname])
	return (
		<Fragment>
			<Grid container className={classes.root} spacing={4}>
				<Grid item xs={12}>
					<Grid container justify='center' spacing={4}>
						{hosts &&
							hosts.map((host, key) => {
								return (
									<Grid item>
										<Card className={classes.base}>
											<CardActionArea>
												<CardMedia
													className={classes.media}
													style={{
														backgroundColor: host.isUp ? green[500] : red[500],
													}}
												/>
												<CardContent
													onClick={(e) => {
														e.preventDefault()
														history.push(`history/${host.history}`)
													}}
												>
													<Typography gutterBottom variant='h5' component='h2'>
														{host.name}
													</Typography>
													<Typography
														variant='body2'
														color='textSecondary'
														component='p'
													>
														{host.ip}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button
													size='small'
													color='primary'
													onClick={(e) => {
														e.preventDefault()
														history.push(`/editar/${host._id}`)
													}}
												>
													editar
												</Button>
											</CardActions>
										</Card>
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
