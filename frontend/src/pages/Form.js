import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import { red, orange } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	modificar: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: orange[500],
	},
	eliminar: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: red[500],
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
}))

export default function Form() {
	const classes = useStyles()
	const history = useHistory()
	let { id } = useParams()
	const [host, setHost] = useState(null)
	const [values, setValues] = useState({
		ip: "",
		name: "",
	})
	const [errors, setErrors] = useState({
		ip: "",
		name: "",
	})

	const getHost = async () => {
		try {
			let response = await (await axios.get(`/hosts/${id}`)).data
			console.log({ response })
			setHost(response[0])
		} catch (errorGettingHosts) {
			console.log(errorGettingHosts)
		}
	}
	useEffect(() => {
		getHost()
		return () => {}
	}, [])

	useEffect(() => {
		if (host) {
			setValues({
				ip: host.ip,
				name: host.name,
			})
		}
		return () => {}
		// eslint-disable-next-line
	}, [host])

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		})
	}
	const handleSubmit = (event) => {
		event.preventDefault()

		history.push("/")
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Editar Host
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								disabled
								name='ip'
								error={errors.ip ? true : false}
								variant='outlined'
								required
								id='ip'
								label='IP'
								value={values.ip}
								onChange={handleChange}
								helperText={errors.ip}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								error={errors.name ? true : false}
								id='name'
								label='Name'
								name='name'
								value={values.name}
								onChange={handleChange}
								helperText={errors.name}
							/>
						</Grid>
					</Grid>
					<Grid container className={classes.container} spacing={2}>
						<Grid item xs={12} sm={6}>
							<Button
								type='submit'
								disabled={
									errors.ip === "Ip no válida" ||
									errors.ip === "Ip utilizada" ||
									values.ip === "" ||
									values.name === "" ||
									errors.name === "Name no válido"
										? true
										: false
								}
								fullWidth
								variant='contained'
								className={classes.modificar}
								onClick={handleSubmit}
							>
								Modificar
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								type='submit'
								disabled={
									errors.ip === "Ip no válida" ||
									errors.ip === "Ip utilizada" ||
									values.ip === "" ||
									values.name === "" ||
									errors.name === "Name no válido"
										? true
										: false
								}
								fullWidth
								variant='contained'
								className={classes.eliminar}
								onClick={handleSubmit}
							>
								Eliminar
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}
