import * as React from "React";
import Store from "../../../store/store.namespace";
import { loadSponsors } from "../../../actions/sponsors.actions";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Paper, Button, Theme, WithStyles, withStyles, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";
import SponsorList from "./SponsorTable.Component";
import ISponsor from "../../../interfaces/sponsor.interfaces";


type TableProps = {
    data: Array<ISponsor>;
    columns: Array<any>;
    withCheckColumn: boolean;
    tableTitle: string;
};

type DispatchProps = {
    loadSponsors: typeof loadSponsors;
};

type SponsorProps = Store.Types.SponsorComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadSponsors,
};

const styles: any = (theme: Theme) => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        minHeight: 270,
        display: "flow-root",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    }),
    progress: {
        margin: theme.spacing.unit * 2,
        color: blue[500]
    },
    fab: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Sponsors extends React.Component<SponsorProps, {}> {

    componentDidMount(): void {
        if (this.props.loadSponsors) {
            this.props.loadSponsors();
        }
    }

    render(): JSX.Element {
        let innerComponent: JSX.Element = (this.props.loading) ?
            <CircularProgress className={this.props.classes.progress} thickness={7} /> :
            <SponsorList data={this.props.sponsors} />;
        return (
            <React.Fragment>
                <Paper className={this.props.classes.root} elevation={4}>
                    {innerComponent}
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                    >
                        <AddIcon />
                    </Button>
                </Paper>
            </React.Fragment>
        );
    }
}

export default connect(
    (state: Store.Types.All) => {
        return state.SponsorComponent;
    },
    (dispatch: Dispatch<DispatchProps>) => {
        return bindActionCreators(actions, dispatch);
    }
)(withStyles(styles)(Sponsors));