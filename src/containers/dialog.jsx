import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-ui
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle,
    withStyles,
    Paper, Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';

const mapStateToProps = store => {
    return {
        reducer: store,
    }
}

class ScrollDialog extends Component {

    getButtonText() {
        const { book } = this.props
        switch (book) {
            case 'product': {
                return 'Product List';
            }
            case 'location': {
                return 'Location List';
            }
            case 'purchase': {
                return 'Purchase Summary';
            }
            case 'sale': {
                return 'Sale Summary';
            }
            default: {
                return null;
            }
        }
    }

    getRow = ind => {
        const { getRow, close } = this.props;
        getRow(ind);
        close();
    }

    onDelete = ind => {
        const { onDelete } = this.props;
        onDelete(ind);
    }

    renderProduct = () => {
        const { product } = this.props.reducer;
        if (product.length > 0) {
            const { classes } = this.props;
            return (
                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Product's Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Manufacturer</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Description</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {product.map((val, ind) => {
                                    return (
                                        <TableRow key={ind}>
                                            <TableCell className={classes.tablePadding} component="th" scope="row">
                                                {val.name}
                                            </TableCell>
                                            <TableCell className={classes.tablePadding}>{val.manufacturer}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.description}</TableCell>
                                            <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => this.getRow(ind)}
                                                >
                                                    Edit
                                            </Button>
                                                <Button
                                                    style={{ marginLeft: 5 }}
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                    onClick={() => this.onDelete(ind)}
                                                >
                                                    Delete
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    }

    renderLocation = () => {
        const { location } = this.props.reducer;
        if (location.length > 0) {
            const { classes } = this.props;
            return (
                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>SITE Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Address</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {location.map((val, ind) => {
                                    return (
                                        <TableRow key={ind}>
                                            <TableCell className={classes.tablePadding} component="th" scope="row">
                                                {val.name}
                                            </TableCell>
                                            <TableCell className={classes.tablePadding}>{val.address}</TableCell>
                                            <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => this.getRow(ind)}
                                                >
                                                    Edit
                                            </Button>
                                                <Button
                                                    style={{ marginLeft: 5 }}
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                    onClick={() => this.onDelete(ind)}
                                                >
                                                    Delete
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    }

    renderPurchase = () => {
        const { purchase } = this.props.reducer;
        if (purchase.length > 0) {
            const { classes } = this.props;
            return (
                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Date</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Bill No.</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Vendor's Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Quantity</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Product Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Location Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {purchase.map((val, ind) => {
                                    return (
                                        <TableRow key={ind}>
                                            <TableCell className={classes.tablePadding} component="th" scope="row">
                                                {val.date}
                                            </TableCell>
                                            <TableCell className={classes.tablePadding}>{val.bill}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.vendor}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.quantity}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.productName}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.locationName}</TableCell>
                                            <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => this.getRow(ind)}
                                                >
                                                    Edit
                                            </Button>
                                                <Button
                                                    style={{ marginLeft: 5 }}
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                    onClick={() => this.onDelete(ind)}
                                                >
                                                    Delete
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    }

    renderSale = () => {
        const { sale } = this.props.reducer;
        if (sale.length > 0) {
            const { classes } = this.props;
            return (
                <div className={classes.container}>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Date</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Bill No.</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Vendee's Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Quantity</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Product Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Location Name</TableCell>
                                    <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sale.map((val, ind) => {
                                    return (
                                        <TableRow key={ind}>
                                            <TableCell className={classes.tablePadding} component="th" scope="row">
                                                {val.date}
                                            </TableCell>
                                            <TableCell className={classes.tablePadding}>{val.bill}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.vendee}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.quantity}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.productName}</TableCell>
                                            <TableCell className={classes.tablePadding}>{val.locationName}</TableCell>
                                            <TableCell className={classes.tablePadding} style={{ textAlign: 'center' }}>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => this.getRow(ind)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    style={{ marginLeft: 5 }}
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                    onClick={() => this.onDelete(ind)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
    }

    renderBlock = () => {
        const { book } = this.props;
        switch (book) {
            case 'product': {
                return this.renderProduct();
            }
            case 'location': {
                return this.renderLocation();
            }
            case 'purchase': {
                return this.renderPurchase();
            }
            case 'sale': {
                return this.renderSale();
            }
            default: {
                return null;
            }
        }
    }

    render() {
        const { open, close } = this.props;
        return (
            <div>
                <Dialog
                    maxWidth='lg'
                    open={open}
                    onClose={close}
                    scroll='paper'
                    aria-labelledby="detail"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <DialogTitle id="detail">{this.getButtonText()}</DialogTitle>
                        <DialogActions>
                            <Button
                                onClick={close}
                                color="secondary"
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                    <DialogContent>
                        {this.renderBlock()}
                    </DialogContent>
                </Dialog>
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
    root: {
        width: 'fit-content',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        overFlowX: 'auto',
        minWidth: '100%',
    },
    tablePadding: {
        padding: 10,
    },
});

ScrollDialog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(withStyles(styles)(ScrollDialog));