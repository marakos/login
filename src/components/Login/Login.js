import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {loginUser} from "../../actions/auth";





const useStyles = makeStyles((theme) => ({
    typo:{
        fontSize:"x-large",

        textAlign:"center"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history=useHistory();
    const [errors,setErrors]= useState({email: '',password:''})
    const [notification]= useState( history.location.state!==undefined ? {message:'Success now log in to proceed!'} : {message:'Welcome, log in or register to proceed!'})
    const [loginData,setLoginData]= useState({email:'', password:''})

    const clear = () => {
        setLoginData( {email:'', password:'' })

    };

    const handleOnChange = async (e) => {
        setLoginData({ ...loginData, [e.target.name] : e.target.value})

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const valid = await dispatch(loginUser(loginData));

        if (valid ==='Email not found'){
            clear();
            setErrors({...errors,email:'Email not found',password: ''})
        }else if (valid ==='Incorrect Password'){
            setLoginData({...loginData,password: ''})
            setErrors({...errors,email:'',password:'Incorrect Password'})
        }
        else
        {
            clear();
            setErrors({...errors,email:'', password:''})

        }
    }

    return (
        <Container  component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.typo} >

                        {notification.message}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={loginData.email}
                        onChange={handleOnChange}
                        autoComplete="email"
                        autoFocus
                    />
                    <span style={{color: "red"}}>  { errors.email}</span>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={loginData.password}
                        onChange={handleOnChange}
                    />
                    <span style={{color: "red"}}>  { errors.password}</span>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}