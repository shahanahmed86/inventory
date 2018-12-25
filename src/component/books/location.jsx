//Basic Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-UI Component
import {
    withStyles,
    Paper,
    Typography, TextField, Button,
    Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
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
        onAddLocation: data => dispatch(allMethods.onAddLocation(data)),
        onEditLocation: (row, ind) => dispatch(allMethods.onEditLocation(row, ind)),
        onDeleteLocation: ind => dispatch(allMethods.onDeleteLocation(ind)),
    }
}

class Location extends Component {

    constructor() {
        super();
        this.state = {
            name: 'Large Container',
            address: 'Plot ABC at XYZ Area, near DEF, Karachi',
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

    onSave = () => {
        const { name, address, editing, index } = this.state;
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
                this.props.onEditLocation({ name, address }, index);
            }
            else {
                this.props.onAddLocation({ name, address });
            }
            this.onNew();
        }
    }

    onNew = () => {
        this.setState({
            name: '',
            address: '',
            editing: false,
        })
    }

    getRow = index => {
        const { name, address } = this.props.reducer.location[index];
        this.setState({
            name, address,
            editing: true,
            index,
        });
    }

    onDelete = index => {
        this.props.onDeleteLocation(index)
        this.onNew();
    }

    renderDataBlock = () => {
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

    handleCloseMessage = () => {
        this.setState({
            open: false,
        });
    }

    render() {
        const { classes } = this.props;
        const { name, address, editing, open, message } = this.state;
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

Location.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Location));