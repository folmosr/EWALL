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

type State = { selected: ICountry };

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
            _id: "",
            name: "",
            code: "",
            currency: ""
        }
    };

    constructor(props: CountryProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.loadCountries) {
            this.props.loadCountries();
        }
    }

    componentWillReceiveProps(nextProps: CountryProps): void {
        if (nextProps.updated) {
            this.props.initCountryForm({
                _id: null,
                name: null,
                code: null,
                currency: null
            }, false);
        }
    }

    handleClickOpen = () => {
        this.props.initCountryForm({
            _id: null,
            name: null,
            code: null,
            currency: null
        }, true);
    }

    handleClose = (): void => {
        this.props.initCountryForm({
            _id: null,
            name: null,
            code: null,
            currency: null
        }, false);
    }

    submit = (value: ICountry): void => {
        this.props.addCountry(value);
    }

    onSelect = (selected: ICountry): any => {
        this.props.initCountryForm(selected, true);
    }

    onDelete = (selected: ICountry): any => {
        this.props.deleteCountry(selected);
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
                <DialogCountries
                    handleClose={this.handleClose}
                    loading={this.props.loading}
                    onSubmit={this.submit}
                />
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