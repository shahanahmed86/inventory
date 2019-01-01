//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Redux
import { connect } from "react-redux";
import allMethods from '../../store/actions/actions'

//Firebase
import * as firebase from 'firebase';

//Custom Component
import PositionedSnackbar from '../../containers/snackbar';

//Material-UI Component
import {
    withStyles, Paper,
    Typography, Button, TextField, FormControl, InputLabel, Select, OutlinedInput,
} from '@material-ui/core'

function mapStateToProps(store) {
    return {
        reducer: store,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfile: data => dispatch(allMethods.getProfile(data)),
    }
}

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            father: '',
            first: '',
            last: '',
            dob: '',
            position: '',
            gender: '',
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        const { father, first, last, dob, position, gender } = this.props.reducer.profile;
        this.setState({
            father, first, last, dob, position, gender
        });
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    onUpdateHandler = () => {
        const { father, first, last, dob, position, gender } = this.state;
        firebase.database().ref().child('profile').child(JSON.parse(localStorage.getItem('uid'))).set({
            father, first, last, dob, position, gender
        });
        this.setState({
            open: true,
            message: "Updated Successfully",
        });
    }

    render() {
        const {
            father, first, last, dob, gender,
            open, message
        } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.widthParam}>
                    <Paper className={classes.doPadding}>
                        <Typography
                            children='PROFILE'
                            align='center'
                            color='primary'
                            variant='h4'
                            gutterBottom={true}
                        />
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
                        <Button
                            style={{ marginTop: 10, minHeight: 50 }}
                            variant='contained'
                            fullWidth={true}
                            color="primary"
                            onClick={this.onUpdateHandler}
                        >
                            Update
                        </Button>
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

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    doPadding: {
        padding: theme.spacing.unit * 2,
    },
    widthParam: {
        width: 300,
    },
});

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));