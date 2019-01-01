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

    getData() {
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

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps() {
        this.getData();
    }

    render() {
        const { classes } = this.props;
        const { open, message, inventory } = this.state;
        if (inventory.length > 0) {
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
                                                        style={{ textAlign: 'center' }}
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
        else {
            return (
                <div className={classes.container} style={{ height: '75vh' }}>
                    <Typography
                        color='secondary'
                        variant='h5'
                        align='center'
                        children='Inventory has null quantity in items'
                    />
                </div>
            )
        }
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    widthParam: {
        width: 400,
    },
    root: {
        width: 'fit-content',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 400,
    },
    tablePadding: {
        padding: 10,
    },
});

Inventory.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(withStyles(styles)(Inventory));