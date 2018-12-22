//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Redux
import { connect } from "react-redux";
import allMethods from '../store/actions/actions'

//Material-UI Component
import {
    withStyles, CircularProgress, Paper, Typography,
} from '@material-ui/core';

//Firebase
import * as firebase from 'firebase';

//Custom Component
import PositionedSnackbar from '../containers/snackbar';
import ButtonAppBar from '../containers/appbar'
import NestedList from './leftbar';

//Books
import Profile from "./books/profile";
import Product from "./books/product";
import PurchaseBook from "./books/purchase";
import SaleBook from './books/sale';
import Location from './books/location';

function mapStateToProps(store) {
    return {
        reducer: store,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUID: val => dispatch(allMethods.getUID(val)),
        getProfile: data => dispatch(allMethods.getProfile(data)),
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            uid: props.location.state ? props.location.state : '',
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        const { uid } = this.state;
        if (uid) {
            this.props.getUID(uid);
            firebase.database().ref().child('profile').on('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    this.props.getProfile(data[uid]);
                    this.setState({ isLoading: false })
                }
            });
        }
        else {
            this.props.history.replace('/');
        }
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    onSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    uid: '',
                })
                this.props.getProfile({});
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({
                    open: true,
                    message: error.message,
                })
            })
    }

    flexBox2Render = () => {
        const {
            isProfile,
            isProduct,
            isPurchase,
            isSale,
            isLocation,
            isInventory,
        } = this.props.reducer;
        if (isProfile) {
            return (<Profile />);
        }
        else if (isProduct) {
            return (
                <div>
                    <Product />
                </div>
            );
        }
        else if (isPurchase) {
            return (
                <div>
                    <PurchaseBook />
                </div>
            );
        }
        else if (isSale) {
            return (
                <div>
                    <SaleBook />
                </div>
            );
        }
        else if (isLocation) {
            return (
                <div>
                    <Location />
                </div>
            );
        }
        else if (isInventory) {
            return ('Inventory Report');
        }
        else {
            return (
                <div>
                    <Typography
                        color='primary'
                        variant='h5'
                        gutterBottom={true}
                        align='center'
                        children="Welcome to the Inventory System"
                    />
                    <img
                        src={require('../images/inventory.jpg')}
                        alt='Inventory System'
                        height='350' width='350'
                    />
                </div>
            );
        }
    }

    render() {
        const { classes, reducer } = this.props;
        const { isLoading, open, message } = this.state;
        return isLoading ?
            (
                <div className={classes.flexBox}>
                    <CircularProgress />
                </div>
            ) : (
                <div className={classes.container}>
                    <ButtonAppBar
                        onSignOut={this.onSignOut}
                    />
                    <div className={classes.mainBox}>
                        <div className={classes.flexBox1}>
                            <Paper className={classes.doPadding}>
                                <Typography
                                    align='center'
                                    variant='h5'
                                    color='primary'
                                    children='User'
                                />
                                <Typography
                                    align='center'
                                    variant='h6'
                                    color='secondary'
                                    children={`${reducer.profile.first} ${reducer.profile.last}`}
                                />
                                <NestedList />
                            </Paper>
                        </div>
                        <div className={classes.flexBox2}>
                            {this.flexBox2Render()}
                        </div>
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
        width: '90vw',
        margin: 'auto',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    flexBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '95vh'
    },
    mainBox: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: '83vh',
        textAlign: 'center',
        marginTop: theme.spacing.unit,
    },
    flexBox1: {
        flex: 1,
        minWidth: 250,
        maxWidth: 300,
        margin: theme.spacing.unit,
    },
    flexBox2: {
        flex: 3,
        minHeight: 'inherit',
        minWidth: 350,
        margin: theme.spacing.unit,
    },
    doPadding: {
        padding: theme.spacing.unit,
    },
})

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));