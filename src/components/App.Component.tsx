import * as React from "React";
import { Grid, withStyles } from "material-ui";
import CssBaseline from "material-ui/CssBaseline";

import { Header, SideBar, Body } from "./layouts/admin";

const styles: any = {
    root: {
        flexGrow: 1
    },
    appFrame: {
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
    }
};

const AppComponent: React.SFC<any> = (props: any): JSX.Element => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <CssBaseline />
                <Grid item className={classes.appFrame} >
                    <Header />
                    <SideBar />
                    <Body />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(AppComponent);
