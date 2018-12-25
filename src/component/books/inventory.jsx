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
            inventory: [],
        }
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    componentDidMount() {
        const { location, product } = this.props.reducer;
        const inventory = [];
        for (var i = 0; i < product.length; i++) {
            for (var j = 0; j < location.length; j++) {
                if (product[i][location[j].name] > 0) {
                    inventory.push({
                        productName: product[i].name,
                        locationName: location[j].name,
                        quantity: product[i][location[j].name],
                    });
                }
            }
        }
        this.setState({ inventory });
    }

    render() {
        const { classes } = this.props;
        const { open, message, inventory } = this.state;
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
                                    {inventory.map((val, ind) => {
                                        return (
                                            <TableRow key={ind}>
                                                <TableCell
                                                    className={classes.tablePadding}
                                                >
                                                    {val.productName}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.tablePadding}
                                                >
                                                    {val.locationName}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.tablePadding}
                                                >
                                                    {val.quantity}
                                                </TableCell>
                                            </TableRow>
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