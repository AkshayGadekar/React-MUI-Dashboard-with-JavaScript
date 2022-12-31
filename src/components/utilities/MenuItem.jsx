import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import {log} from "../../funcs/helpers";
import {isLinkSame} from "../../funcs/helpers";
import { useLocation } from 'react-router-dom';

const MenuItem = (props) => {
  const theme = useTheme();
  const {pathname} = useLocation();
  const Icon = props.icon;

  const activeStyles = {
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  }
  //log('MenuItem rendered', pathname);

  const checkIfActive = ({ isActive }) => {
    if (!isActive) {
      const hrefs = props.otherHrefs;
      for(const key in hrefs){
        const dynamicLink = hrefs[key].href;
        const actualLink = pathname;
        isActive = isLinkSame(dynamicLink, actualLink);
        if (isActive) {
          break;
        }
      }
    }
    return isActive ? activeStyles : undefined;
  }
  
  let navigation = {};
  if (props.href) {
    navigation = {
      component: NavLink,
      to: props.href,
      end: true,
      style: checkIfActive            
    };
  }
  
  return (
    <ListItem key={props.label} disablePadding>
      <ListItemButton {...navigation}>
        <ListItemIcon>
          {<Icon />}
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  )
}

export default MenuItem;