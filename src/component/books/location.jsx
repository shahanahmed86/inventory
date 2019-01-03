//Basic Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Typography, TextField, Button,
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
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
        onAddLocation: data => dispatch(allMethods.onAddLocation(data)),
        onEditLocation: row => dispatch(allMethods.onEditLocation(row)),
        onDeleteLocation: key => dispatch(allMethods.onDeleteLocation(key)),
    }
}

class Location extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            editing: false,
            index: '',
            open: false,
            message: '',
            key: '',
            dialogOpen: false,
        }
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    }

    onSave = () => {
        const { name, address, key, index, editing } = this.state;
        if (!name) {
            this.setState({
                open: true,
                message: 'Location Field can not be left empty'
            })
        }
        else if (!address) {
            this.setState({
                open: true,
                message: 'Address Field can not be left empty'
            })
        }
        else {
            if (editing) {
                const { purchase, location } = this.props.reducer;
                let matchFound = false;
                for (var i = 0; i < purchase.length; i++) {
                    if (purchase[i].locationName === location[index].name) {
                        matchFound = true
                    }
                }
                if (matchFound) {
                    this.setState({
                        open: true,
                        message: 'Transaction found for this location you cannot edit it',
                    });
                }
                else {
                    this.props.onEditLocation({ name, address, key });
                    this.setState({
                        open: true,
                        message: 'Transaction updated successfully',
                    })
                    this.onNew();
                }
            }
            else {
                this.props.onAddLocation({ name, address });
                this.setState({
                    open: true,
                    message: 'Transaction recorded successfully',
                })
                this.onNew();
            }
        }
    }

    onNew = () => {
        this.setState({
            name: '',
            address: '',
            key: '',
            editing: false,
        })
    }

    getRow = index => {
        const { name, address, key } = this.props.reducer.location[index];
        this.setState({
            name, address, key,
            editing: true,
            index,
        });
    }

    onDelete = index => {
        const { key } = this.props.reducer.location[index];
        const { purchase, location } = this.props.reducer;
        let matchFound = false;
        for (var i = 0; i < purchase.length; i++) {
            if (purchase[i].locationName === location[index].name) {
                matchFound = true
            }
        }
        if (matchFound) {
            this.setState({
                open: true,
                message: 'Transaction found for this location you cannot delete it',
            });
        }
        else {
            this.props.onDeleteLocation(key);
            this.setState({
                open: true,
                message: 'Transaction deleted successfully',
            })
            this.onNew();
        }
        if (this.props.reducer.location.length === 1) {
            this.setState({ dialogOpen: false });
        }
    }
    
    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    handleOpenSnackBar = () => {
        const { location } = this.props.reducer;
        if (location.length > 0) {
            this.setState({
                dialogOpen: true,
            });
        }
        else {
            this.setState({
                open: true,
                message: 'Location List not found',
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
        const { name, address, editing, open, message, dialogOpen } = this.state;
        return (
            <div>
                <Button
                    onClick={this.handleOpenSnackBar}
                    style={{ marginBottom: 10 }}
                    color='secondary'
                    variant='contained'
                >
                    Location List
                </Button>
                <ScrollDialog
                    open={dialogOpen}
                    close={this.handleCloseSnackBar}
                    getRow={this.getRow}
                    onDelete={this.onDelete}
                    book='location'
                />
                <div className={classes.container}>
                    <div className={classes.widthParam}>
                        <Paper className={classes.doPadding}>
                            <Typography
                                color='primary'
                                variant='h5'
                                gutterBottom={true}
                                align='center'
                                children="Location"
                            />
                            <div>
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Name"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='text'
                                    name='name' value={name}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    margin='normal'
                                    fullWidth={true}
                                    label="Address"
                                    placeholder='Please Enter'
                                    variant='outlined'
                                    type='text'
                                    name='address' value={address}
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
                                    onClick={this.onNew}
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
        maxWidth: 300,
    },
    doGapBetween: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

Location.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Location));