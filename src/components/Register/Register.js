import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux";
import { createUser } from '../../actions/auth';
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
    typo:{

        fontSize:"x-large",
        textAlign:"center"
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ Username: '', Email: '', Password: '', errors:{
            name: '',
            em: '',
            pass: '' }});

    const history = useHistory();
    const validEmailRegex = RegExp(
        // eslint-disable-next-line
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    const clear = () => {

        setUserData({ Username: '', Email: '', Password: '',errors:{
                name: '',
                em: '',
                pass: '' }});
    };

    const handleChange =  (event) => {



        setUserData({ ...userData, [event.target.name] : event.target.value})



        const { name, value } = event.target;

        switch (name) {
            case 'Username':
                userData.errors.name =
                    value.length < 5
                        ? 'Full Name must be at least 5 characters long!'
                        : '';
                break;
            case 'Email':
                userData.errors.em =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Accepted format example@mail.com ';
                break;
            case 'Password':
                userData.errors.pass =
                    value.length < 8
                        ? 'Password must be at least 8 characters long!'
                        : '';
                break;
            default:
                break;
        }
        if(userData.Username===undefined)
        setUserData({ ...userData, [event.target.name] : event.target.value})

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validateForm(userData.errors)&& e.target.Username.value!==''&& e.target.Email.value!==''&& e.target.Password.value!=='') {
            const valid = await dispatch(createUser(userData));
           if (valid ==='email already exists'){
               alert('Email already exists')
               setUserData({...userData, Email: '', errors:{
                       name: '',
                       em: 'Email Already Exists',
                       pass: '' }})
           }else{
            clear();
               alert("Success")

            history.push({pathname: '/', state:{message:"Success"}});

        }
        }else{
           alert('Complete all fields')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <form autoComplete={"on"} noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography className={classes.typo}> Account Register</Typography>

                    <TextField
                        name={"Username"}
                        type={"text"}
                        variant={"outlined"}
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        autoFocus
                        required
                        autoComplete="off"
                        value={userData.Username}
                        onChange={handleChange}/>

                    <span style={{color: "red"}}>{userData.errors.name}</span>
                    <TextField
                        name={"Email"}
                        type={"email"}
                        variant={"outlined"}
                        label={"Email"}
                        fullWidth
                        margin="normal"
                        autoFocus
                        autoComplete="off"
                        value={userData.Email}
                        onChange={handleChange}/>

                    <span style={{color: "red"}}>{userData.errors.em}</span>
                    <TextField
                        name={"Password"}
                        type={"password"}
                        variant={"outlined"}
                        label={"Password"}
                        fullWidth
                        margin="normal"
                        autoFocus
                        autoComplete="off"
                        value={userData.Password}
                        onChange={handleChange}/>

                    <span style={{color: "red"}}>{userData.errors.pass}</span>
                    <div>
                        <Button className={classes.submit} variant={"contained"} color={"primary"} size={"large"} type={"submit"} fullWidth>Submit</Button>
                        <Button variant={"contained"} color={"secondary"} size={"small"} onClick={clear} fullWidth>Clear</Button>
                    </div>
                </form>
            </div>


        </Container>
    );
}
