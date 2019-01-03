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
        onAddSale: data => dispatch(allMethods.onAddSale(data)),
        onEditSale: (row, oldQty, oldProductName, oldLocationName) => dispatch(allMethods.onEditSale(row, oldQty, oldProductName, oldLocationName)),
        onDeleteSale: row => dispatch(allMethods.onDeleteSale(row)),
    }
}

class SaleBook extends Component {

    constructor() {
        super();
        this.state = {
            date: '',
            bill: '',
            vendee: '',
            quantity: 0,
            productName: '',
            locationName: '',
            oldQty: 0,
            oldProductName: '',
            oldLocationName: '',
            editing: false,
            index: '',
            key: '',
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
            vendee: '',
            quantity: 0,
            productName: '',
            locationName: '',
            oldQty: 0,
            oldProductName: '',
            oldLocationName: '',
            editing: false,
            index: '',
            key: '',
        });
    }

    onSave = () => {
        const {
            date, bill, vendee, quantity, productName, locationName, key,
            oldQty, oldProductName, oldLocationName,
            editing
        } = this.state;
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
            if (stockInHand || stockInHand >= 0) {
                if (editing) {
                    if (productName === oldProductName) {
                        if (locationName === oldLocationName) {
                            if ((stockInHand + parseInt(oldQty)) < quantity) {
                                this.setState({
                                    open: true,
                                    message: `Sale Quantity (${quantity}) of ${productName} at ${locationName} is exceed from Stock in hand with this sale is ${stockInHand + parseInt(oldQty)}`,
                                });
                            }
                            else {
                                this.setState({
                                    open: true,
                                    message: 'Transaction updated successfully',
                                })
                                this.props.onEditSale({
                                    date, bill, vendee, quantity, productName, locationName, key
                                }, oldQty, oldProductName, oldLocationName);
                                this.onNew();
                            }
                        }
                        else {
                            if (stockInHand < quantity) {
                                this.setState({
                                    open: true,
                                    message: `Sale Quantity (${quantity}) of ${productName} at ${locationName} is exceed from Stock in hand is ${stockInHand}`,
                                });
                            }
                            else {
                                this.setState({
                                    open: true,
                                    message: 'Transaction updated successfully',
                                })
                                this.props.onEditSale({
                                    date, bill, vendee, quantity, productName, locationName, key
                                }, oldQty, oldProductName, oldLocationName);
                                this.onNew();
                            }
                        }
                    }
                    else {
                        if (stockInHand < quantity) {
                            this.setState({
                                open: true,
                                message: `Sale Quantity (${quantity}) of ${productName} at ${locationName} is exceed from Stock in hand is ${stockInHand}`,
                            });
                        }
                        else {
                            this.setState({
                                open: true,
                                message: 'Transaction updated successfully',
                            })
                            this.props.onEditSale({
                                date, bill, vendee, quantity, productName, locationName, key
                            }, oldQty, oldProductName, oldLocationName);
                            this.onNew();
                        }
                    }
                }
                else {
                    if (stockInHand < quantity) {
                        this.setState({
                            open: true,
                            message: `Sale Quantity (${quantity}) of ${productName} at ${locationName} is exceed from Stock in hand is ${stockInHand}`,
                        });
                    }
                    else {
                        this.setState({
                            open: true,
                            message: 'Transaction recorded successfully',
                        })
                        this.props.onAddSale({
                            date, bill, vendee, quantity, productName, locationName
                        })
                        this.onNew();
                    }
                }
            }
            else {
                this.setState({
                    open: true,
                    message: `Stock in ${productName} at ${locationName} is unavailable at this time`,
                })
            }
        }
    }

    onCancelEdit = () => {
        this.onNew();
    }

    getRow = index => {
        const { date, bill, vendee, quantity, productName, locationName, key } = this.props.reducer.sale[index];
        this.setState({
            date, bill, vendee, quantity, productName, locationName, key,
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
                            return `${productName} stock available at ${locationName} with this sale is ${stockInHand + parseInt(oldQty)}`;
                        }
                        else {
                            if (stockInHand === 0) {
                                return `${productName} stock is unavailable at ${locationName}`;
                            }
                            else {
                                return `${productName} stock available at ${locationName} is ${stockInHand}`;
                            }
                        }
                    }
                    else {
                        return `${productName} stock available at ${locationName} is ${stockInHand}`;
                    }
                }
                else {
                    return `${productName} stock available at ${locationName} is ${stockInHand}`;
                }
            }
            else {
                return `${productName} stock is unavailable at ${locationName}`;
            }
        }
    }

    onDelete = index => {
        const { quantity, productName, locationName, key } = this.props.reducer.sale[index];
        this.setState({
            open: true,
            message: 'Transaction deleted successfully',
        })
        this.props.onDeleteSale({
            quantity, productName, locationName, key
        });
        if (this.props.reducer.sale.length === 1) {
            this.setState({ dialogOpen: false });
        }
        this.onNew();
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    handleOpenSnackBar = () => {
        const { sale } = this.props.reducer;
        if (sale.length > 0) {
            this.setState({
                dialogOpen: true,
            });
        }
        else {
            this.setState({
                open: true,
                message: 'Sales not found',
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
        const { date, bill, vendee, productName, locationName, editing, quantity, open, message, dialogOpen } = this.state;
        const { product, location } = this.props.reducer;
        return (
            <div>
                <Button
                    onClick={this.handleOpenSnackBar}
                    style={{ marginBottom: 10 }}
                    color='secondary'
                    variant='contained'
                >
                    Sales Details
                </Button>
                <ScrollDialog
                    open={dialogOpen}
                    close={this.handleCloseSnackBar}
                    getRow={this.getRow}
                    onDelete={this.onDelete}
                    book='sale'
                />
                <div className={classes.container}>
                    <div className={classes.widthParam}>
                        <Paper className={classes.doPadding}>
                            <Typography
                                color='primary'
                                variant='h5'
                                gutterBottom={true}
                                align='center'
                                children="Sale Book"
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
                                    label="Vendee"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='text'
                                    name='vendee' value={vendee}
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

SaleBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaleBook));