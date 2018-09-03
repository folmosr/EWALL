import * as React from "React";
import * as ReactDOM from "react-dom";
import Store from "../../../store/store.namespace";
import { loadSponsors } from "../../../actions/sponsors.actions";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Paper, Button, Theme, WithStyles, withStyles, CircularProgress, Icon, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SyncIcon from "@material-ui/icons/Sync";
import blue from "@material-ui/core/colors/blue";
import SponsorList from "./SponsorTable.Component";

import DialogSponsor from "./DialogSponsor.Component";
type State = {
    selected: Array<string>;
    openDialog: boolean;
};

type DispatchProps = {
    loadSponsors: typeof loadSponsors;
};

type SponsorProps = Store.Types.SponsorComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadSponsors,
};

const initialState: State = {
    selected: [],
    openDialog: false
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

class Sponsors extends React.Component<SponsorProps, State> {

    constructor(props: SponsorProps) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(): void {
        if (this.props.loadSponsors) {
            this.props.loadSponsors();
        }
    }

    setSelected = (selected: Array<string> = []) => {
        this.setState({ selected });
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true });
    }

    render(): JSX.Element {
        let innerComponent: JSX.Element = (this.props.loading) ?
            <CircularProgress className={this.props.classes.progress} thickness={7} /> :
            <SponsorList data={this.props.sponsors} setSelected={this.setSelected} elements={this.state.selected} />;
        let iconButton: JSX.Element = (this.state.selected.length === 1) ? <SyncIcon /> : <AddIcon />;
        return (
            <React.Fragment>
                <Paper className={this.props.classes.root} elevation={4}>
                    {innerComponent}
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                        onClick={this.handleClickOpen}
                    >
                        {iconButton}
                    </Button>
                </Paper>
                {ReactDOM.createPortal(<DialogSponsor
                    openDialog={this.state.openDialog}
                />,
                    document.getElementById("portal-container")
                )
                }
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