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
        onEditPurchase: (row, index) => dispatch(allMethods.onEditPurchase(row, index)),
        onEditRowOfPurchase: (row, index) => dispatch(allMethods.onEditRowOfPurchase(row, index)),
        onDeletePurchase: (row, ind) => dispatch(allMethods.onDeletePurchase(row, ind)),
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
            bill: '123',
            vendor: 'Gul Muhammad',
            quantity: 55,
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
            editing: false,
            index: '',
        });
    }

    onSave = () => {
        const { date, bill, vendor, quantity, productName, locationName, index, editing } = this.state;
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
            if (editing) {
                this.props.onEditPurchase({
                    date, bill, vendor, quantity, productName, locationName,
                }, index)
            }
            else {
                this.props.onAddPurchase({
                    date, bill, vendor, quantity, productName, locationName,
                })
            }
            this.onNew();
        }
    }

    onCancelEdit = () => {
        const { oldQty, index } = this.state;
        const { date, bill, vendor, productName, locationName } = this.props.reducer.purchase[index];
        this.props.onEditPurchase({
            date, bill, vendor,
            quantity: oldQty,
            productName, locationName,
        }, index);
        this.onNew();
    }

    getRow = index => {
        const { date, bill, vendor, quantity, productName, locationName } = this.props.reducer.purchase[index];
        this.setState({
            date, bill, vendor, quantity, productName, locationName,
            oldQty: quantity,
            editing: true,
            index,
        });
        this.props.onEditRowOfPurchase({
            quantity, productName, locationName
        }, index)
    }

    onDelete = index => {
        const { quantity, productName, locationName } = this.props.reducer.purchase[index];
        this.props.onDeletePurchase({
            quantity, productName, locationName
        }, index);
        this.onNew();
    }

    renderDataBlock = () => {
        const { purchase } = this.props.reducer;
        const { editing } = this.state;
        if (purchase.length > 0) {
            const { classes } = this.props;
            return (
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
                                                onClick={() => this.getRow(ind)}
                                                disabled={editing ? true : false}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                style={{ marginLeft: 5 }}
                                                variant='contained'
                                                color='secondary'
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    doPadding: {
        padding: theme.spacing.unit * 2,
    },
    widthParam: {
        width: 400,
    },
    doGapBetween: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 700,
    },
    tablePadding: {
        padding: 10,
    },
});

PurchaseBook.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PurchaseBook));