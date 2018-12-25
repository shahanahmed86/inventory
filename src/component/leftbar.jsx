//Basic Component
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-ui
import {
  withStyles,
  List, ListItem, ListItemText,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

//Redux
import { connect } from "react-redux";
import allMethods from '../store/actions/actions';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function mapStateToProps(store) {
  return {
    reducer: store,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isProfile: result => dispatch(allMethods.isProfile(result)),
    isProduct: result => dispatch(allMethods.isProduct(result)),
    isPurchase: result => dispatch(allMethods.isPurchase(result)),
    isSale: result => dispatch(allMethods.isSale(result)),
    isLocation: result => dispatch(allMethods.isLocation(result)),
    isInventory: result => dispatch(allMethods.isInventory(result)),
  }
}

class NestedList extends Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary="Menus" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button onClick={() => this.props.isProfile(true)}>
              <ListItemText
                primary="1. Profile"
              />
            </ListItem>
            <ListItem button onClick={() => this.props.isProduct(true)}>
              <ListItemText
                primary="2. Product Book"
              />
            </ListItem>
            <ListItem button onClick={() => this.props.isPurchase(true)}>
              <ListItemText
                primary="3. Purchase Book"
              />
            </ListItem>
            <ListItem button onClick={() => this.props.isSale(true)}>
              <ListItemText
                primary="4. Sale Book"
              />
            </ListItem>
            <ListItem button onClick={() => this.props.isLocation(true)}>
              <ListItemText
                primary="5. Location"
              />
            </ListItem>
            <ListItem button onClick={() => this.props.isInventory(true)}>
              <ListItemText
                primary="6. Inventory Report"
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NestedList));