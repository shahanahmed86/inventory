//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography,
} from '@material-ui/core';

//Redux
import { connect } from "react-redux";

//Custom Component
import PositionedSnackbar from '../../containers/snackbar';

function mapStateToProps(store) {
    return {
        reducer: store,
    }
}

class Inventory extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            message: '',
        }
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const { classes } = this.props;
        const { open, message } = this.state;
        const { location, product } = this.props.reducer;
        return (
            <div className={classes.container}>
                <div className={classes.widthParam}>
                    <Typography
                        color='primary'
                        variant='h5'
                        gutterBottom={true}
                        align='center'
                        children="Inventory Reports"
                    />
                    <div >
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className={classes.tablePadding}
                                            style={{ textAlign: 'center' }}
                                        >
                                            Product
                                        </TableCell>
                                        <TableCell
                                            className={classes.tablePadding}
                                            style={{ textAlign: 'center' }}
                                        >
                                            Location
                                        </TableCell>
                                        <TableCell
                                            className={classes.tablePadding}
                                            style={{ textAlign: 'center' }}
                                        >
                                            Closing
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.map(product => {
                                        return (
                                            location.map((location, ind) => {
                                                return (
                                                    <TableRow key={ind}>
                                                        <TableCell
                                                            className={classes.tablePadding}
                                                        >
                                                            {product.name}
                                                        </TableCell>
                                                        <TableCell
                                                            className={classes.tablePadding}
                                                        >
                                                            {location.name}
                                                        </TableCell>
                                                        <TableCell
                                                            className={classes.tablePadding}
                                                        >
                                                            {product[location.name]}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    widthParam: {
        width: 400,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        maxWidth: 400,
    },
    tablePadding: {
        padding: 10,
    },
});

Inventory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(withStyles(styles)(Inventory));