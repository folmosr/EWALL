import * as React from "React";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Store from "../../../store/Store.namespace";
import {
    loadCountries,
    addCountry,
    initCountryForm,
    deleteCountry
} from "../../../actions/Countries.actions";
import CountryList from "./CountryList.Component";
import DialogCountries from "./DialogCountry.Component";
import ICountry from "../../../interfaces/Country.interfaces";
import ConfirmDialog from "../../generics/confirmationDialog.Component";

const initialState = {
    selected: {
        _id: "",
        name: "",
        code: "",
        currency: ""
    },
    openConfirm: false
};

type State = Readonly<typeof initialState>;

type DispatchProps = {
    loadCountries: typeof loadCountries;
    addCountry: typeof addCountry;
    initCountryForm: typeof initCountryForm;
    deleteCountry: typeof deleteCountry
};

type CountryProps = Store.Types.CountryComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadCountries,
    addCountry,
    initCountryForm,
    deleteCountry
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

class Countries extends React.Component<CountryProps, State> {

    readonly state: State = initialState;

    constructor(props: CountryProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.loadCountries) {
            this.props.loadCountries();
        }
    }

    handleClickOpen = () => {
        this.props.initCountryForm({
            _id: null,
            name: null,
            code: null,
            currency: null,
            open: true
        });
    }

    submit = (value: ICountry): void => {
        value.open = false;
        this.props.addCountry(value);
    }

    onSelect = (selected: ICountry): any => {
        selected.open = true;
        this.props.initCountryForm(selected);
    }

    onDelete = (country: ICountry): void => {

        this.setState({
            selected: {
                _id: country._id,
                name: country.name,
                currency: country.currency,
                code: country.code
            }, openConfirm: true
        });
    }

    onClickDeleteOk = (): void => {
        this.props.deleteCountry(this.state.selected);
        this.setState({
            selected: {
                _id: null,
                name: null,
                code: null,
                currency: null
            },
            openConfirm: false
        });
    }

    onClickCancelDelete = (): void => {
        this.setState({
            selected: {
                _id: null,
                name: null,
                code: null,
                currency: null
            },
            openConfirm: false
        });
    }

    render(): JSX.Element {
        let innerComponent: JSX.Element = (this.props.loading) ?
            <CircularProgress className={this.props.classes.progress} thickness={7} /> :
            ((this.props.countries.length > 0) && (!this.props.loading)) &&
            <CountryList countries={this.props.countries} onSelect={this.onSelect} onDelete={this.onDelete} />;
        innerComponent = ((this.props.countries.length == 0) && (!this.props.loading)) ?
            <Typography component="p">
                Aún no ha creado el primero
                </Typography> : innerComponent
        return (
            <React.Fragment>
                <Typography variant="headline" component="h3">
                    Países
                </Typography>
                <Typography component="p">
                    Lista de países ya configurados
                </Typography>
                <Paper className={this.props.classes.root} elevation={4}>
                    {innerComponent}
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                        onClick={this.handleClickOpen}>
                        <AddIcon />
                    </Button>
                </Paper>
                {ReactDOM.createPortal(<DialogCountries
                    loading={this.props.loading}
                    onSubmit={this.submit}
                    initForm={this.props.initCountryForm}
                />,
                    document.getElementById("portal-container")
                )
                }
                {ReactDOM.createPortal(
                    <ConfirmDialog
                        openDialog={this.state.openConfirm}
                        handlerOk={this.onClickDeleteOk}
                        handlerCancel={this.onClickCancelDelete} />,
                    document.getElementById("portal-container")
                )}
            </React.Fragment>
        );
    }
}

export default connect(
    (state: Store.Types.All) => {
        return state.CountryComponent;
    },
    (dispatch: Dispatch<DispatchProps>) => {
        return bindActionCreators(actions, dispatch);
    }
)(withStyles(styles)(Countries));