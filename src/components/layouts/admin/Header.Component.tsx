import * as React from "React";
import { AppBar, Toolbar, IconButton, Typography, Button, withStyles, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth: number = 240;

const styles: any = (theme: Theme) => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: {
        background: "rgb(255,255,255)",
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

const HeaderComponent: React.SFC<any> = (props: any): JSX.Element => {
    const { classes } = props;
    return (
        <AppBar position="absolute" className={classes.appBar} >
            <Toolbar>
                {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Administración de Eventos
                    </Typography>
                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(HeaderComponent);