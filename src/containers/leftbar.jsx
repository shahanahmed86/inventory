import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class NestedList extends React.Component {
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
        subheader={<ListSubheader component="div">Transaction</ListSubheader>}
        className={classes.root}
      >
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary="Menus" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button>
              <ListItemText primary="1. Product" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="2. Purchase Book" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="3. Sales Book" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="4. Store/Location" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="5. Closing Stock" />
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

export default withStyles(styles)(NestedList);