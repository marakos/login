import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";
import {useDispatch} from "react-redux";

import { createUser } from '../../actions/auth';
import { useHistory } from "react-router-dom";
import user from "../../reducers/user";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
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

        setUserData({ ...userData, [event.target.name] : event.target.value})

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validateForm(userData.errors)) {
            console.info('Valid Form')
            dispatch(createUser(userData));
            clear();
            history.push({
                pathname: '/',

            });
        }else{
            console.error('Invalid Form')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
            <form autoComplete={"off"} noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant={"h6"}> Account Register</Typography>

                <TextField name={"Username"} type={"text"} variant={"outlined"} label={"Username"} fullWidth value={userData.Username} onChange={handleChange}/>
                <span style={{color: "red"}}>{userData.errors.name}</span>
                <TextField name={"Email"} type={"email"} variant={"outlined"} label={"Email"} fullWidth value={userData.Email}  onChange={handleChange}/>
                <span style={{color: "red"}}>{userData.errors.em}</span>
                <TextField name={"Password"} type={"password"} variant={"outlined"} label={"Password"} fullWidth value={userData.Password}  onChange={handleChange}/>
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
