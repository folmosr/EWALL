import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import ThumbsUpDown from "@material-ui/icons/ThumbsUpDown";

const styles: any = (theme: any) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  a: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
    lineHeight: "1.5em",
    textDecoration: "none"
  }
});

const MenuListComponent: React.SFC<any> = (props: any) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary={<Link to="/" className={classes.a} > Home </Link>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={<Link to="/countries" className={classes.a} > Países </Link>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ThumbsUpDown />
          </ListItemIcon>
          <ListItemText primary={<Link to="/sponsors" className={classes.a} > Sponsors </Link>} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};
export default withStyles(styles)(MenuListComponent);