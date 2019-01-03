//Basic Components
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Material-ui
import {
  withStyles, AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

function mapStateToProps(store) {
  return {
    reducer: store,
  }
}

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        color='primary'
      >
        <Toolbar>
          <Typography
            children='Inventory System'
            className={classes.grow}
            variant="h6"
            color="inherit"
          />
          <Button
            color="inherit"
            onClick={props.onSignOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));