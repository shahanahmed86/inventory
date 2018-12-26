//Basic Component
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//React-Router-Dom
import { Link } from 'react-router-dom';

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


function mapStateToProps(store) {
  return {
    reducer: store,
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
            <Link to='/dashboard'>
              <ListItem button>
                <ListItemText
                  inset={true}
                  primary="Dashboard"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/profile' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="1. Profile"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/product' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="2. Product Book"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/location' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="3. Location"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/purchase' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="4. Purchase Book"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/sale' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="5. Sale Book"
                />
              </ListItem>
            </Link>
            <Link to='/dashboard/inventory' className={classes.styleList}>
              <ListItem button>
                <ListItemText
                  secondary="6. Inventory Report"
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  styleList: {
    textDecoration: 'none',
  }
});

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(withStyles(styles)(NestedList));