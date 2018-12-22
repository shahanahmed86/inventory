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
            <ListItem button>
              <ListItemText
                primary="1. Profile"
                onClick={() => this.props.isProfile(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="2. Product Book"
                onClick={() => this.props.isProduct(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="3. Purchase Book"
                onClick={() => this.props.isPurchase(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="4. Sale Book"
                onClick={() => this.props.isSale(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="5. Location"
                onClick={() => this.props.isLocation(true)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="6. Inventory Report"
                onClick={() => this.props.isInventory(true)}
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