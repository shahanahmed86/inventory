//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Redux
import { connect } from "react-redux";
import allMethods from '../store/actions/actions'

//React-Router-Dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
import Home from "./books/home";
import Profile from "./books/profile";
import Product from "./books/product";
import PurchaseBook from "./books/purchase";
import SaleBook from './books/sale';
import Location from './books/location';
import Inventory from './books/inventory';

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

const routes = [
    {
        path: '/dashboard',
        exact: true,
        main: () => <Home/>
    },
    {
        path: '/dashboard/profile',
        exact: true,
        main: () => <Profile/>
    },
    {
        path: '/dashboard/product',
        exact: true,
        main: () => <Product/>
    },
    {
        path: '/dashboard/purchase',
        exact: true,
        main: () => <PurchaseBook/>
    },
    {
        path: '/dashboard/sale',
        exact: true,
        main: () => <SaleBook/>
    },
    {
        path: '/dashboard/location',
        exact: true,
        main: () => <Location/>
    },
    {
        path: '/dashboard/inventory',
        exact: true,
        main: () => <Inventory/>
    }
]

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            uid: '',
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        const uid = JSON.parse(localStorage.getItem('uid'));
        if (uid) {
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
                localStorage.removeItem('uid');
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

    render() {
        const { classes, reducer } = this.props;
        const { isLoading, open, message } = this.state;
        return isLoading ?
            (
                <div className={classes.flexBox}>
                    <CircularProgress />
                </div>
            ) : (
                <Router>
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
                                {routes.map((val, ind) => {
                                    return (
                                        <Route
                                            key={ind}
                                            path={val.path}
                                            exact={val.exact}
                                            component={val.main}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <PositionedSnackbar
                            open={open}
                            message={message}
                            close={this.handleCloseMessage}
                        />
                    </div>
                </Router>
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
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginTop: theme.spacing.unit,
    },
    flexBox1: {
        flex: 1,
        minWidth: 250,
        maxWidth: 250,
        margin: theme.spacing.unit,
        minHeight: '100%',
    },
    flexBox2: {
        flex: 4,
        minWidth: 'fit-content',
        margin: theme.spacing.unit,
        minHeight: '100%',
    },
    doPadding: {
        padding: theme.spacing.unit,
    },
})

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));