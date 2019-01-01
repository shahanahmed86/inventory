//Basic Component
import React, { Component } from "react";
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Typography, TextField, Button,
} from '@material-ui/core';

//Redux
import { connect } from "react-redux";
import allMethods from '../../store/actions/actions';

//Custom Component
import PositionedSnackbar from '../../containers/snackbar';
import ScrollDialog from '../../containers/dialog'

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
                    this.setState({
                        open: true,
                        message: 'Transaction updated successfully',
                    })
                    this.onNew();
                }
            }
            else {
                this.props.onAddProduct({ name, manufacturer, description });
                this.setState({
                    open: true,
                    message: 'Recorded recorded successfully',
                })
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
            this.setState({
                open: true,
                message: 'Transaction deleted successfully',
            })
            this.onNew();
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
                <ScrollDialog
                    getRow={this.getRow}
                    onDelete={this.onDelete}
                    book='product'
                />
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

Product.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));