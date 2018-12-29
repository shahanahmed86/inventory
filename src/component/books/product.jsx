//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, TextField, Button,
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
        onAddProduct: data => dispatch(allMethods.onAddProduct(data)),
        onEditProduct: row => dispatch(allMethods.onEditProduct(row)),
        onDeleteProduct: key => dispatch(allMethods.onDeleteProduct(key)),
    }
}

class Product extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            manufacturer: '',
            description: '',
            open: false,
            message: '',
            key: '',
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
            name: '',
            manufacturer: '',
            description: '',
            editing: false,
            index: '',
            key: '',
        })
    }

    onSave = () => {
        const {
            name, manufacturer, description,
            editing, key, index
        } = this.state;
        if (!name) {
            this.setState({
                open: true,
                message: 'Product Field can not be left empty'
            })
        }
        else if (!manufacturer) {
            this.setState({
                open: true,
                message: 'Manufacturer Field can not be left empty'
            })
        }
        else {
            if (editing) {
                const { purchase, product } = this.props.reducer;
                let matchFound = false;
                for (var i = 0; i < purchase.length; i++) {
                    if (purchase[i].productName === product[index].name) {
                        matchFound = true
                    }
                }
                if (matchFound) {
                    this.setState({
                        open: true,
                        message: 'Transaction found for this product you cannot edit it',
                    });
                }
                else {
                    this.props.onEditProduct({ name, manufacturer, description, key });
                    this.onNew();
                }
            }
            else {
                this.props.onAddProduct({ name, manufacturer, description });
                this.onNew();
            }
        }
    }

    getRow = index => {
        const { name, manufacturer, description, key } = this.props.reducer.product[index];
        this.setState({
            name, manufacturer, description, key,
            editing: true,
            index,
        });
    }

    onDelete = index => {
        const key = this.props.reducer.product[index].key;
        const { purchase, product } = this.props.reducer;
        let matchFound = false;
        for (var i = 0; i < purchase.length; i++) {
            if (purchase[i].productName === product[index].name) {
                matchFound = true
            }
        }
        if (matchFound) {
            this.setState({
                open: true,
                message: 'Transaction found for this product you cannot delete it',
            });
        }
        else {
            this.props.onDeleteProduct(key)
            this.onNew();
        }
    }

    renderDataBlock = () => {
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

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const { classes } = this.props;
        const { name, manufacturer, description, editing, open, message } = this.state;
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
                                children="Product Book"
                            />
                            <div >
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    label="Product's Name"
                                    type='text'
                                    name='name' value={name}
                                    onChange={this.handleChange} />
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    label="Manufacturer's Name"
                                    type='text'
                                    name='manufacturer' value={manufacturer}
                                    onChange={this.handleChange} />
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    label="Description"
                                    type='text'
                                    name='description' value={description}
                                    onChange={this.handleChange} />
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
                                        onClick={this.onNew}
                                        variant='contained'
                                        color='inherit'
                                    >
                                        Clear
                                    </Button>
                                </div>
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

Product.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));