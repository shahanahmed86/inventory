//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Firebase
import * as firebase from 'firebase';
import './config';

//Custom Component
import PositionedSnackbar from '../containers/snackbar';

//Material-UI Component
import {
    withStyles, Paper,
    Typography, Button, TextField, FormControl, InputLabel, Select, OutlinedInput,
    CircularProgress

} from '@material-ui/core'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            father: '',
            first: '',
            last: '',
            dob: '',
            position: '',
            gender: '',
            isLoading: false,
            isSignIn: true,
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid;
                localStorage.setItem('uid', JSON.stringify(uid));
                this.props.history.replace('/dashboard');
            }
            else {
                this.setState({ isLoading: false })
            }
        });
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    }

    onLoginChange = () => {
        this.setState(state => ({
            isSignIn: !state.isSignIn,
        }));
    }

    onError = (isLoading, open, message) => {
        this.setState({ isLoading, open, message });
    }

    onLoginHandler = () => {
        this.setState({ isLoading: true })
        let {
            isSignIn,
            email, password, confirmPassword,
            father, first, last, dob, position, gender
        } = this.state;
        let uid = '';
        if (email.indexOf('@') !== -1 && email.indexOf('.com') !== -1) {
            if (password.length >= 6) {
                if (isSignIn) {
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(resp => {
                            uid = resp.user.uid;
                            this.setState({ isLoading: true })
                            localStorage.setItem('uid', JSON.stringify(uid));
                            this.props.history.replace('/dashboard');
                        })
                        .catch(error => {
                            this.onError(false, true, error.message);
                        })
                }
                else {
                    if (password === confirmPassword) {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(resp => {
                                uid = resp.user.uid;
                                firebase.database().ref().child('profile').child(uid).set({
                                    father, first, last, dob, position, gender, uid
                                })
                                email = password = confirmPassword = father = first = last = dob = position = gender = '';
                                this.setState({
                                    isSignIn: true,
                                    email, password,
                                    confirmPassword, father, first, last, dob, position, gender,
                                    open: true,
                                    message: 'Email ID made successfully...',
                                });
                            })
                            .catch(error => {
                                this.onError(false, true, error.message);
                            })
                    }
                    else {
                        this.onError(false, true, 'Confirm password must be equivalent to the password.');
                    }
                }
            }
            else {
                this.onError(false, true, 'Password length must atleast be six (06) character long.');
            }
        }
        else {
            this.onError(false, true, 'The Address must contain "@" & ".com" in email.');
        }
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const {
            isSignIn, isLoading,
            email, password,
            confirmPassword, father, first, last, dob, position, gender,
            open, message
        } = this.state;
        const { classes } = this.props;
        if (isLoading) {
            return (
                <div
                    className={classes.flexBox}
                    style={{ height: '100vh' }}
                >
                    <CircularProgress />
                </div>
            );
        }
        else {
            return (
                <div className={classes.container}>
                    <div className={classes.widthParam}>
                        <Paper className={classes.doPadding}>
                            <Typography
                                children='Inventory System'
                                align='center'
                                color='primary'
                                variant='h4'
                            />
                            <Typography
                                children='Login Portal'
                                align='center'
                                color='secondary'
                                variant='h6'
                                gutterBottom={true}
                            />
                            <TextField
                                autoFocus
                                margin='normal'
                                fullWidth={true}
                                placeholder='Please Enter'
                                variant='outlined'
                                label='Email'
                                type='email'
                                name='email' value={email}
                                onChange={this.handleChange} />
                            <TextField
                                margin='normal'
                                fullWidth={true}
                                placeholder='Please Enter'
                                variant='outlined'
                                label='Password'
                                type='password'
                                name='password' value={password}
                                onChange={this.handleChange} />
                            {isSignIn ? '' : (
                                <div>
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label='Confirm Password'
                                        type='password'
                                        name='confirmPassword' value={confirmPassword}
                                        onChange={this.handleChange} />
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label="First Name"
                                        type='text'
                                        name='first' value={first}
                                        onChange={this.handleChange} />
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label="Last Name"
                                        type='text'
                                        name='last' value={last}
                                        onChange={this.handleChange} />
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label="Father's Name"
                                        type='text'
                                        name='father' value={father}
                                        onChange={this.handleChange} />
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label="Position"
                                        type='text'
                                        name='position' value={position}
                                        onChange={this.handleChange} />
                                    <TextField
                                        margin='normal'
                                        fullWidth={true}
                                        placeholder='Please Enter'
                                        variant='outlined'
                                        label="Date of Birth"
                                        InputLabelProps={{ shrink: true }}
                                        type='date'
                                        name='dob' value={dob}
                                        onChange={this.handleChange} />
                                    <FormControl
                                        variant='outlined'
                                        fullWidth={true}
                                        margin='normal'
                                    >
                                        <InputLabel
                                            htmlFor="filled-gender-native-simple"
                                        >
                                            Gender
                                    </InputLabel>
                                        <Select
                                            native
                                            value={gender}
                                            onChange={this.handleChange}
                                            input={
                                                <OutlinedInput
                                                    labelWidth={55}
                                                    name="gender"
                                                    id="filled-gender-native-simple"
                                                />}
                                        >
                                            <option value="" />
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            <Button
                                style={{ marginTop: 10, minHeight: 50 }}
                                variant='contained'
                                fullWidth={true}
                                color="primary"
                                onClick={this.onLoginHandler}
                            >
                                {isSignIn ? 'Sign In' : 'Sign Up & Login'}
                            </Button>
                            <div className={classes.flexBox}>
                                <Typography
                                    children={isSignIn ? 'Does not have an ID ? ' : 'Already have an ID ? '}
                                    color='textPrimary'
                                    variant='inherit'
                                />
                                <Button
                                    style={{ marginLeft: 15 }}
                                    variant='text'
                                    color="secondary"
                                    onClick={this.onLoginChange}
                                >
                                    {isSignIn ? 'Sign Up' : 'Sign In'}
                                </Button>
                            </div>
                        </Paper>
                    </div>
                    <PositionedSnackbar
                        open={open}
                        message={message}
                        close={this.handleCloseMessage}
                    />
                </div>
            );
        }
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '95vh',
        margin: theme.spacing.unit,
    },
    doPadding: {
        padding: theme.spacing.unit * 2,
    },
    widthParam: {
        width: 400,
    },
    flexBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);