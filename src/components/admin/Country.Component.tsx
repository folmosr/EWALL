import * as React from "React";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Theme, withStyles, WithStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import blue from "material-ui/colors/blue";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

import Store from "../../store/store.namespace";
import {
    loadCountries,
    addCountry,
    initCountryForm,
    deleteCountry
} from "../../actions/countries.actions";
import CountryList from "./CountryList.Component";
import DialogCountries from "./DialogCountry.Component";
import ICountry from "../../interfaces/country.interfaces";
import ConfirmDialog from "../generics/confirmationDialog.Component";
import ReactDOM = require("react-dom");

type State = { selected: ICountry; openConfirm: boolean };

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

    state: State = {
        selected: {
            _id: null,
            name: null,
            code: null,
            currency: null
        },
        openConfirm: false
    };

    constructor(props: CountryProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.loadCountries) {
            this.props.loadCountries();
        }
    }

    static getDerivedStateFromProps(nextProps: CountryProps, prevState: State): State {
        if (nextProps.updated) {
            return {
                selected: {
                    _id: null,
                    name: null,
                    code: null,
                    currency: null
                },
                openConfirm: false
            };
        }
        return null;
    }

    handleClickOpen = () => {
        this.props.initCountryForm({
            _id: undefined,
            name: undefined,
            code: undefined,
            currency: undefined
        }, true);
    }

    handleClose = (): void => {
        this.props.initCountryForm({
            _id: undefined,
            name: undefined,
            code: undefined,
            currency: undefined
        }, false);
    }

    asyncValidate = async (value: ICountry) => {
        const sleep: any = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(1000);
        let founded: ICountry = this.props.countries.find((element: ICountry) => element.name === value.name)
        if (founded && !value._id) {
            return Promise.reject({ name: `Nombre de país ${value.name} existente` });
        }
    }

    submit = (value: ICountry): void => {
        this.props.addCountry(value);
    }

    onSelect = (selected: ICountry): any => {
        this.props.initCountryForm(selected, true);
    }

    onDelete = (selected: ICountry): any => {
        this.setState({ selected, openConfirm: true });
    }

    onClickDeleteOk = (): void => {
        this.props.deleteCountry(this.state.selected);
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
            (this.props.countries.length > 0) &&
            <CountryList countries={this.props.countries} onSelect={this.onSelect} onDelete={this.onDelete} />;
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
                    handleClose={this.handleClose}
                    loading={this.props.loading}
                    onSubmit={this.submit}
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