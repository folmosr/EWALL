import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import HomeComponent from "../../admin/Home.Component";
import CountryComponent from "../../admin/country/Country.Component";
import ClasificationComponent from "../../admin/Clasification/Clasification.Component"
import SponsorComponent from "../../admin/sponsor/Sponsor.Component";

const styles: any = (theme: any) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0
    },
    toolbar: theme.mixins.toolbar
});

const BodyComponent: React.SFC<any> = (props: any): JSX.Element => {
    const { classes } = props;
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/clasifications" component={ClasificationComponent} />
                <Route path="/countries" component={CountryComponent} />
                <Route path="/sponsors" component={SponsorComponent} />
            </Switch>
        </main>
    );
};

export default withStyles(styles)(BodyComponent);
