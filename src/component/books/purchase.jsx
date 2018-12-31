//Basic Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Typography, TextField, Button,
    Table, TableBody, TableCell, TableHead, TableRow,
    FormControl, InputLabel, Select, OutlinedInput,
} from '@material-ui/core';

//Redux
import { connect } from "react-redux";
import allMethods from '../../store/actions/actions';

//Custom Component
import PositionedSnackbar from '../../containers/snackbar';

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

const today = new Date();
const year = today.getFullYear();
const date = today.getDate();
const month = today.getMonth() + 1;

class PurchaseBook extends Component {

    constructor() {
        super();
        this.state = {
            date: `${year}-${month}-${date}`,
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
            date: `${year}-${month}-${date}`,
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
                                return `Sale recorded in ${productName} at ${locationName} is ${parseInt(oldQty) - stockInHand}`;
                            }
                        }
                        else {
                            return `stock in hand is ${stockInHand}`;
                        }
                    }
                    else {
                        return `stock in hand is ${stockInHand}`;
                    }
                }
                else {
                    return `stock in hand is ${stockInHand}`;
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
                            this.onNew();
                        }
                    }
                }
            }
            else {
                this.props.onAddPurchase({
                    date, bill, vendor, quantity, productName, locationName,
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
                message: 'Stock will be negative. In order to change this purchase try to increase the quantity or delete sale',
            });
        }
        else {
            this.props.onDeletePurchase({
                quantity, productName, locationName, key
            });
            this.onNew();
        }
    }

    renderDataBlock = () => {
        const { purchase } = this.props.reducer;
        const { editing } = this.state;
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
                                                    disabled={editing ? true : false}
                                                >
                                                    Edit
                                            </Button>
                                                <Button
                                                    style={{ marginLeft: 5 }}
                                                    variant='contained'
                                                    color='secondary'
                                                    size='small'
                                                    onClick={() => this.onDelete(ind)}
                                                    disabled={editing ? true : false}
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

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const { classes } = this.props;
        const { date, bill, vendor, productName, locationName, editing, quantity, open, message } = this.state;
        const { product, location } = this.props.reducer;
        return (
            <div>
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
                <div>
                    {this.renderDataBlock()}
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
        width: 350,
    },
    doGapBetween: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    root: {
        width: 'fit-content',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        width: '100%',
    },
    tablePadding: {
        padding: 10,
    },
});

PurchaseBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PurchaseBook));