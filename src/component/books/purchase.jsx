//Basic Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Typography, TextField, Button,
    FormControl, InputLabel, Select, OutlinedInput,
} from '@material-ui/core';

//Redux
import { connect } from "react-redux";
import allMethods from '../../store/actions/actions';

//Custom Component
import PositionedSnackbar from '../../containers/snackbar';
import ScrollDialog from '../../containers/dialog';

function mapStateToProps(store) {
    return {
        reducer: store,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddPurchase: data => dispatch(allMethods.onAddPurchase(data)),
        onEditPurchase: (row, oldQty, oldProductName, oldLocationName) => dispatch(allMethods.onEditPurchase(row, oldQty, oldProductName, oldLocationName)),
        onDeletePurchase: row => dispatch(allMethods.onDeletePurchase(row)),
    }
}

class PurchaseBook extends Component {

    constructor() {
        super();
        this.state = {
            date: '',
            bill: '',
            vendor: '',
            quantity: 0,
            oldQty: 0,
            productName: '',
            locationName: '',
            editing: false,
            index: '',
            open: false,
            message: '',
            dialogOpen: false,
        }
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    }

    onNew = () => {
        this.setState({
            date: '',
            bill: '',
            vendor: '',
            quantity: 0,
            productName: '',
            locationName: '',
            oldQty: 0,
            oldProductName: '',
            oldLocationName: '',
            editing: false,
            index: '',
        });
    }

    getRow = index => {
        const { date, bill, vendor, quantity, productName, locationName, key } = this.props.reducer.purchase[index];
        this.setState({
            date, bill, vendor, quantity, productName, locationName, key,
            oldQty: quantity,
            oldProductName: productName,
            oldLocationName: locationName,
            editing: true,
            index,
        });
    }

    getQty = () => {
        const {
            productName, locationName,
            oldProductName, oldLocationName, oldQty,
            editing
        } = this.state;
        const { product } = this.props.reducer;
        if (!productName || !locationName) {
            return 'Please select product & location fields to view qty';
        }
        else {
            const ind = product.findIndex(val => val.name === productName);
            const stockInHand = parseInt(product[ind][locationName]);
            if (stockInHand || stockInHand >= 0) {
                if (editing) {
                    if (productName === oldProductName) {
                        if (locationName === oldLocationName) {
                            if ((parseInt(oldQty) - stockInHand) === 0) {
                                return `${productName} quantity before this purchase is ${parseInt(oldQty) - stockInHand}`;
                            }
                            else {
                                return `Sales already recorded in ${productName} at ${locationName} is ${parseInt(oldQty) - stockInHand}`;
                            }
                        }
                        else {
                            return `${productName} stock at ${locationName} is ${stockInHand}`;
                        }
                    }
                    else {
                        return `${productName} stock at ${locationName} is ${stockInHand}`;
                    }
                }
                else {
                    return `${productName} stock at ${locationName} is ${stockInHand}`;
                }
            }
            else {
                return 'This is the first time you are entering the purchase';
            }
        }
    }

    onSave = () => {
        const {
            date, bill, vendor, quantity, productName, locationName, key,
            oldQty, oldProductName, oldLocationName,
            editing } = this.state;
        const { product } = this.props.reducer;
        if (!productName) {
            this.setState({
                open: true,
                message: 'Product Field can not be left empty'
            })
        }
        else if (!locationName) {
            this.setState({
                open: true,
                message: 'Location Field can not be left empty'
            })
        }
        else {
            const ind = product.findIndex(val => val.name === productName);
            const stockInHand = parseInt(product[ind][locationName]);
            if (editing) {
                if (stockInHand || stockInHand >= 0) {
                    if (productName === oldProductName) {
                        if (locationName === oldLocationName) {
                            if ((stockInHand - parseInt(oldQty) + parseInt(quantity)) < 0) {
                                this.setState({
                                    open: true,
                                    message: `${productName} will be negative at ${locationName}. In order to change this purchase try to increase the purchase or delete sale`,
                                });
                            }
                            else {
                                this.props.onEditPurchase({
                                    date, bill, vendor, quantity, productName, locationName, key,
                                }, oldQty, oldProductName, oldLocationName);
                                this.setState({
                                    open: true,
                                    message: 'Transaction updated successfully',
                                })
                                this.onNew();
                            }
                        }
                        else {
                            const oldInd = product.findIndex(val => val.name === oldProductName);
                            const oldStockInHand = parseInt(product[oldInd][oldLocationName]);
                            if (oldStockInHand || oldStockInHand >= 0) {
                                if ((oldStockInHand - parseInt(oldQty)) < 0) {
                                    this.setState({
                                        open: true,
                                        message: `${productName} will be negative at ${oldLocationName}. In order to change this purchase try to increase the purchase or delete sale`,
                                    });
                                }
                                else {
                                    this.props.onEditPurchase({
                                        date, bill, vendor, quantity, productName, locationName, key,
                                    }, oldQty, oldProductName, oldLocationName);
                                    this.setState({
                                        open: true,
                                        message: 'Transaction updated successfully',
                                    })
                                    this.onNew();
                                }
                            }
                        }
                    }
                    else {
                        const oldInd = product.findIndex(val => val.name === oldProductName);
                        const oldStockInHand = parseInt(product[oldInd][oldLocationName]);
                        if (oldStockInHand || oldStockInHand >= 0) {
                            if ((oldStockInHand - parseInt(oldQty)) < 0) {
                                this.setState({
                                    open: true,
                                    message: `${oldProductName} will be negative at ${oldLocationName}. In order to change this purchase try to increase the purchase or delete sale`,
                                });
                            }
                            else {
                                this.props.onEditPurchase({
                                    date, bill, vendor, quantity, productName, locationName, key,
                                }, oldQty, oldProductName, oldLocationName);
                                this.setState({
                                    open: true,
                                    message: 'Transaction updated successfully',
                                })
                                this.onNew();
                            }
                        }
                    }
                }
                else {
                    const oldInd = product.findIndex(val => val.name === oldProductName);
                    const oldStockInHand = parseInt(product[oldInd][oldLocationName]);
                    if (oldStockInHand || oldStockInHand >= 0) {
                        if ((oldStockInHand - parseInt(oldQty)) < 0) {
                            this.setState({
                                open: true,
                                message: `${oldProductName} will be negative at ${oldLocationName}. In order to change this purchase try to increase the purchase or delete sale`,
                            });
                        }
                        else {
                            this.props.onEditPurchase({
                                date, bill, vendor, quantity, productName, locationName, key,
                            }, oldQty, oldProductName, oldLocationName);
                            this.setState({
                                open: true,
                                message: 'Transaction updated successfully',
                            })
                            this.onNew();
                        }
                    }
                }
            }
            else {
                this.props.onAddPurchase({
                    date, bill, vendor, quantity, productName, locationName,
                })
                this.setState({
                    open: true,
                    message: 'Transaction recorded successfully',
                })
                this.onNew();
            }
        }
    }

    onCancelEdit = () => {
        this.onNew();
    }

    onDelete = index => {
        const { quantity, productName, locationName, key } = this.props.reducer.purchase[index];
        const { product } = this.props.reducer;
        const ind = product.findIndex(val => val.name === productName);
        const stockInHand = parseInt(product[ind][locationName]);
        if ((stockInHand - parseInt(quantity)) < 0) {
            this.setState({
                open: true,
                message: `${productName} will be negative at ${locationName}. In order to change this purchase try to increase the purchase or delete sale`,
            });
        }
        else {
            this.props.onDeletePurchase({
                quantity, productName, locationName, key
            });
            this.setState({
                open: true,
                message: 'Transaction deleted successfully',
            })
            this.onNew();
        }
        if (this.props.reducer.purchase.length === 1) {
            this.setState({ dialogOpen: false });
        }
    }
    
    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    handleOpenSnackBar = () => {
        this.setState({
            dialogOpen: true,
        });
    }

    handleOpenSnackBar = () => {
        const { purchase } = this.props.reducer;
        if (purchase.length > 0) {
            this.setState({
                dialogOpen: true,
            });
        }
        else {
            this.setState({
                open: true,
                message: 'Purchases not found',
            })
        }
    }
    
    handleCloseSnackBar = () => {
        this.setState({
            dialogOpen: false,
        });
    }

    render() {
        const { classes } = this.props;
        const { date, bill, vendor, productName, locationName, editing, quantity, open, message, dialogOpen } = this.state;
        const { product, location } = this.props.reducer;
        return (
            <div>
                <Button
                    onClick={this.handleOpenSnackBar}
                    style={{ marginBottom: 10 }}
                    color='secondary'
                    variant='contained'
                >
                    Purchase Details
                </Button>
                <ScrollDialog
                    open={dialogOpen}
                    close={this.handleCloseSnackBar}
                    getRow={this.getRow}
                    onDelete={this.onDelete}
                    book='purchase'
                />
                <div className={classes.container}>
                    <div className={classes.widthParam}>
                        <Paper className={classes.doPadding}>
                            <Typography
                                color='primary'
                                variant='h5'
                                gutterBottom={true}
                                align='center'
                                children="Purchase Book"
                            />
                            <div>
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Date"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    name='date' value={date}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Bill No."
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='text'
                                    name='bill' value={bill}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Vendor"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='text'
                                    name='vendor' value={vendor}
                                    onChange={this.handleChange}
                                />
                                <FormControl
                                    variant='outlined'
                                    fullWidth={true}
                                    margin='normal'
                                >
                                    <InputLabel
                                        htmlFor="filled-product-native-simple"
                                    >
                                        Products
                                    </InputLabel>
                                    <Select
                                        native
                                        value={productName}
                                        onChange={this.handleChange}
                                        input={
                                            <OutlinedInput
                                                labelWidth={60}
                                                name="productName"
                                                id="filled-product-native-simple"
                                            />}
                                    >
                                        <option value='' />
                                        {product.map((val, ind) => {
                                            return (
                                                <option key={ind} value={val.name}>
                                                    {val.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    variant='outlined'
                                    fullWidth={true}
                                    margin='normal'
                                >
                                    <InputLabel
                                        htmlFor="filled-location-native-simple"
                                    >
                                        location
                                    </InputLabel>
                                    <Select
                                        native
                                        value={locationName}
                                        onChange={this.handleChange}
                                        input={
                                            <OutlinedInput
                                                labelWidth={60}
                                                name="locationName"
                                                id="filled-location-native-simple"
                                            />}
                                    >
                                        <option value='' />
                                        {location.map((val, ind) => {
                                            return (
                                                <option key={ind} value={val.name}>
                                                    {val.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Quantity"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='number'
                                    helperText={this.getQty()}
                                    name='quantity' value={quantity}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className={classes.doGapBetween}>
                                <Button
                                    style={{ width: 80 }}
                                    onClick={this.onSave}
                                    variant='contained'
                                    color={editing ? 'inherit' : 'primary'}
                                >
                                    {editing ? 'Update' : 'Save'}
                                </Button>
                                <Button
                                    style={{ width: 80 }}
                                    onClick={this.onCancelEdit}
                                    variant='contained'
                                    color='inherit'
                                >
                                    Clear
                                </Button>
                            </div>
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
        alignItems: 'center',
    },
    doPadding: {
        padding: theme.spacing.unit * 2,
    },
    widthParam: {
        width: 300,
    },
    doGapBetween: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

PurchaseBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PurchaseBook));