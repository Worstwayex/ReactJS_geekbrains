import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from "prop-types"
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {(props.chats[props.chatId]===undefined)? "": `${props.chats[props.chatId].title}` }
          </Typography>
          <Link to = '/profile/' style ={{color: "white"}}>
            <Button color="inherit">{props.profile.username}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ profileReducer, chatReducer }) => ({
  profile: profileReducer.profile,
  chats: chatReducer.chats,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);