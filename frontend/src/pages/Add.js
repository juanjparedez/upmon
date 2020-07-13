import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import axios from "axios"
import isIp from "is-ip"
import { useHistory } from "react-router-dom"

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
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function Add() {
	const classes = useStyles()
	const history = useHistory()
	const [hosts, setHosts] = useState(null)
	const [values, setValues] = useState({
		ip: "",
		name: "",
	})
	const [errors, setErrors] = useState({
		ip: "",
		name: "",
	})

	const getHosts = async () => {
		try {
			let response = await (await axios.get("/hosts")).data
			setHosts(response)
		} catch (errorGettingHosts) {
			console.log(errorGettingHosts)
		}
	}

	const addHosts = async () => {
		try {
			let response = await axios.post("/hosts/add", values)
			console.log({ response })
		} catch (errorPostingHost) {
			console.log(errorPostingHost)
		}
	}

	useEffect(() => {
		getHosts()
	}, [])

	useEffect(() => {
		if (values.ip !== "") {
			if (!isIp(values.ip)) {
				setErrors({
					...errors,
					ip: "Ip no válida",
				})
			} else {
				let isUsed = false
				if (hosts) {
					hosts.forEach((host) => {
						if (values.ip === host.ip) {
							isUsed = true
						}
					})
				}
				if (isUsed) {
					setErrors({
						...errors,
						ip: "Ip utilizada",
					})
				} else {
					setErrors({
						...errors,
						ip: "",
					})
				}
			}
		}
		return () => {}
		// eslint-disable-next-line
	}, [values.ip])

	useEffect(() => {
		if (values.name !== "") {
			if (values.name.length > 3 && values.name.length < 10) {
				setErrors({
					...errors,
					name: "",
				})
			} else {
				setErrors({
					...errors,
					name: "Name no válido",
				})
			}
		}
		return () => {}
		// eslint-disable-next-line
	}, [values.name])

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		})
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		addHosts()
		history.push("/")
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Agregar nuevo Host
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='ip'
								error={errors.ip ? true : false}
								variant='outlined'
								required
								fullWidth
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
								fullWidth
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
						color='primary'
						className={classes.submit}
						onClick={handleSubmit}
					>
						Agregar
					</Button>
				</form>
			</div>
		</Container>
	)
}
