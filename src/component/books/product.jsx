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
        onEditProduct: (row, index) => dispatch(allMethods.onEditProduct(row, index)),
        onDeleteProduct: index => dispatch(allMethods.onDeleteProduct(index)),
    }
}

class Product extends Component {
    constructor() {
        super();

        this.state = {
            name: 'Prince Biscuits',
            manufacturer: 'Continental Biscuits Ltd',
            description: 'Biscuits',
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
            name: '',
            manufacturer: '',
            description: '',
            editing: false,
            index: '',
        })
    }

    onSave = () => {
        const { editing, index, name, manufacturer, description } = this.state;
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
                this.props.onEditProduct({
                    name, manufacturer, description,
                }, index)
            }
            else {
                this.props.onAddProduct({
                    name, manufacturer, description,
                });
            }
            this.onNew();
        }
    }

    getRow = index => {
        const { name, manufacturer, description } = this.props.reducer.product[index];
        this.setState({
            name, manufacturer, description,
            editing: true,
            index,
        });
    }

    onDelete = index => {
        this.props.onDeleteProduct(index)
        this.onNew();
    }

    renderDataBlock = () => {
        const { product } = this.props.reducer;
        if (product.length > 0) {
            const { classes } = this.props;
            return (
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
                                                onClick={() => this.getRow(ind)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                style={{ marginLeft: 5 }}
                                                variant='contained'
                                                color='secondary'
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
                                    onClick={this.onNew}
                                    variant='contained'
                                    color='primary'
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
                            </div>
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

Product.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));