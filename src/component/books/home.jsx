//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper, Typography,
} from '@material-ui/core';

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.widthParam}>
                        <Paper className={classes.doPadding}>
                            <div>
                                <Typography
                                    color='primary'
                                    variant='h6'
                                    gutterBottom={true}
                                    align='center'
                                    children="Welcome to the Inventory System"
                                />
                                <img
                                    src={require('../../images/inventory.jpg')}
                                    alt='Inventory System'
                                    height='300' width='300'
                                />
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    widthParam: {
        width: 350,
    },
    doPadding: {
        padding: theme.spacing.unit * 2,
    },
});

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);