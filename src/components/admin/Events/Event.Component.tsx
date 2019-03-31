import * as React from "React";
import * as ReactDOM from "react-dom";
import { connect, Dispatch } from "react-redux";
import Store from "../../../store/Store.namespace";
import AddIcon from "@material-ui/icons/Add";
import { bindActionCreators } from "redux";
import {
    withStyles,
    Typography,
    Paper,
    Button,
    Theme,
    WithStyles
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import ICountry from "../../../interfaces/Country.interfaces";
import IClasification from "../../../interfaces/Clasification.interface";
import { initEventForm } from "../../../actions/Events.actions";
import EventDialog from "./DialogEvent.Component";

type Props = {
    countries: Array<ICountry>,
    clasifications: Array<IClasification>
}

type DispatchProps = {
    initEventForm: typeof initEventForm;
};

type PropsWithStyle = Props & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab" | "dialogContentText" | "field" | "menuItem" | "primary">;

const actions: DispatchProps = {
    initEventForm
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
    field: {
        marginLeft: 20,
        marginRight: 20,
        width: 500,
    },
    button: {
        margin: theme.spacing.unit,
    },
    dialogContentText: {
        marginTop: 0,
        marginBotton: 15,
        marginLeft: 20,
        marginRight: 20
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
});

class EventComponent extends React.Component<PropsWithStyle>
{
    constructor(props: PropsWithStyle) {
        super(props);
        console.log('paises', this.props.countries);
        console.log('clasifications', this.props.clasifications);
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <Typography variant="headline" component="h3">
                    Eventos
            </Typography>
                <Typography component="p">
                    Lista de eventos ya configurados
                </Typography>
                <Paper className={this.props.classes.root} elevation={4}>
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                        onClick={() => this.props.initEventForm(this.props.countries, this.props.clasifications)}
                    >
                        <AddIcon />
                    </Button>
                </Paper>
                {ReactDOM.createPortal(
                    <EventDialog />,
                    document.getElementById("portal-container")
                )}
            </React.Fragment>
        )
    }
}

export default connect(
    (state: Store.Types.All) => {
        return {
            countries: state.CountryComponent.countries,
            clasifications: state.ClasificationData.clasifications
        }
    },
    (dispatch: Dispatch<DispatchProps>) => {
        return bindActionCreators(actions, dispatch);
    }
)(withStyles(styles)(EventComponent));