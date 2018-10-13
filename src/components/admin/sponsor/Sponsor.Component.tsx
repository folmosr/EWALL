import * as React from "React";
import * as ReactDOM from "react-dom";
import Store from "../../../store/Store.namespace";
import {
    loadSponsors,
    initSponsorForm,
    addSponsor,
    deleteSponsor
} from "../../../actions/Sponsors.actions";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Paper,
    Button,
    Theme,
    WithStyles,
    withStyles,
    CircularProgress
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";
import SponsorList from "./SponsorTable.Component";

import DialogSponsor from "./dialogSponsor.Component";
import { ISponsorForm } from "../../../interfaces/Sponsor.interfaces";

type State = {
    selected: Array<string>;
};

type DispatchProps = {
    loadSponsors: typeof loadSponsors;
    initSponsorForm: typeof initSponsorForm;
    addSponsor: typeof addSponsor;
    deleteSponsor: typeof deleteSponsor;
};

type SponsorProps = Store.Types.SponsorComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadSponsors,
    initSponsorForm,
    addSponsor,
    deleteSponsor
};

const initialState: State = {
    selected: []
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

    submit = (value: ISponsorForm): void => {
        value.imageBase64Encode = value.imageBase64Encode.split(",").pop();
        value.open = false;
        this.props.addSponsor(value);
    }

    setSelected = (selected: Array<string> = []) => {
        this.setState({ selected });
    }

    deleteSponsors = (selected: Array<string> = []): void => {
        this.props.deleteSponsor(selected);
    }

    handleClickOpen = () => {
        this.props.initSponsorForm(
            {
                name: null,
                url: null,
                imageBase64Encode: null,
                _id: null,
                open: true
            });
    }

    render(): JSX.Element {
        let innerComponent: JSX.Element = (this.props.loading) ?
            <CircularProgress className={this.props.classes.progress} thickness={7} /> :
            <SponsorList data={this.props.sponsors} initSponsorForm={this.props.initSponsorForm} setSelected={this.setSelected} deleteSelected={this.deleteSponsors} elements={this.state.selected} />;
        return (
            <React.Fragment>
                <Paper className={this.props.classes.root} elevation={4}>
                    {innerComponent}
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Button>
                </Paper>
                {ReactDOM.createPortal(<DialogSponsor
                    loading={this.props.loading}
                    onSubmit={this.submit}
                    initForm={this.props.initSponsorForm}
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