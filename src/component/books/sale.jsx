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
        onAddSale: data => dispatch(allMethods.onAddSale(data)),
        onEditSale: (row, index, oldQty) => dispatch(allMethods.onEditSale(row, index, oldQty)),
        onDeleteSale: (row, ind) => dispatch(allMethods.onDeleteSale(row, ind)),
    }
}

const today = new Date();
const year = today.getFullYear();
const date = today.getDate();
const month = today.getMonth() + 1;

class SaleBook extends Component {

    constructor() {
        super();
        this.state = {
            date: `${year}-${month}-${date}`,
            bill: '123',
            vendee: 'Amir  Muhammad',
            quantity: 45,
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
            vendee: '',
            quantity: 0,
            oldQty: 0,
            productName: '',
            locationName: '',
            editing: false,
            index: '',
        });
    }

    onSave = () => {
        const { date, bill, vendee, quantity, productName, locationName, index, editing } = this.state;
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
            if (stockInHand) {
                if (editing) {
                    if ((stockInHand + parseInt(this.state.oldQty)) < quantity) {
                        this.setState({
                            open: true,
                            message: 'Sale Quantity is exceed from Stock in hand at the location',
                        });
                    }
                    else {
                        const oldQty = parseInt(this.state.oldQty)
                        this.props.onEditSale({
                            date, bill, vendee, quantity, productName, locationName,
                        }, index, oldQty);
                        this.onNew();
                    }
                }
                else {
                    if (stockInHand < quantity) {
                        this.setState({
                            open: true,
                            message: 'Sale Quantity is exceed from Stock in hand at the location',
                        });
                    }
                    else {
                        this.props.onAddSale({
                            date, bill, vendee, quantity, productName, locationName,
                        })
                        this.onNew();
                    }
                }
            }
            else {
                this.setState({
                    open: true,
                    message: `Stock is unavailable at this time`,
                })
            }
        }
    }

    onCancelEdit = () => {
        this.onNew();
    }

    getRow = index => {
        const { date, bill, vendee, quantity, productName, locationName } = this.props.reducer.sale[index];
        this.setState({
            date, bill, vendee, quantity, productName, locationName,
            oldQty: quantity,
            oldProductName: productName,
            editing: true,
            index,
        });
    }

    onDelete = index => {
        const { quantity, productName, locationName } = this.props.reducer.sale[index];
        this.props.onDeleteSale({
            quantity, productName, locationName
        }, index);
        this.onNew();
    }

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    getQty = () => {
        const { productName, locationName, oldQty, editing } = this.state;
        const { product } = this.props.reducer;
        if (!productName || !locationName) {
            return 'Please select product & location fields to view qty';
        }
        else {
            const ind = product.findIndex(val => val.name === productName);
            const stockInHand = parseInt(product[ind][locationName]);
            if (editing) {
                return `stock in hand is ${stockInHand + parseInt(oldQty)}`;
            }
            else {
                if (stockInHand) {
                    return `stock in hand is ${stockInHand}`;
                }
                else {
                    return `Stock is unavailable`;
                }
            }
        }
    }

    renderDataBlock = () => {
        const { sale } = this.props.reducer;
        const { editing } = this.state;
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

    render() {
        const { classes } = this.props;
        const { date, bill, vendee, productName, locationName, editing, quantity, open, message } = this.state;
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
                                    onClick={this.onNew}
                                    variant='contained'
                                    color='primary'
                                    disabled={editing ? true : false}
                                >
                                    New
                            </Button>
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
                                    color='primary'
                                    disabled={editing ? false : true}
                                >
                                    Cancel
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

SaleBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaleBook));