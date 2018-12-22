import * as React from "React";
import * as ReactDOM from "react-dom";

import { connect } from "react-redux";
import Store from "../../../store/Store.namespace";
import { bindActionCreators } from "redux";
import actions from "redux-form/lib/actions";
import {
    withStyles,
    Typography,
    Paper,
    Button,
    Theme,
    WithStyles,
    DialogContentText,
    MenuItem,
    ListItemText
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps
} from "redux-form";
import { required } from "../../../helpers/Validations";
import { renderSelectField } from "../../generics/RenderFormField.Component";
import ICountry from "../../../interfaces/Country.interfaces";
import IClasification from "../../../interfaces/Clasification.interface";

type Props = {
    countries: Array<ICountry>,
    clasifications: Array<IClasification>,
    initForm: () => void,
    onSubmit: () => void
}

type PropsWithStyle = Props & WithStyles<"root" | "progress" | "button" | "fab" | "dialogContentText" | "field" | "menuItem" | "primary">;

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

class EventComponent extends React.Component<PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>, {}>
{
    constructor(props: PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>) {
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
                    Lista de países ya configurados
                </Typography>
                <Paper className={this.props.classes.root} elevation={4}>
                    <form>
                        <Field
                            className={this.props.classes.field}
                            name="color"
                            label="Color Favorito"
                            component={renderSelectField}
                            validate={[required]}>
                            <MenuItem value="" disabled>
                                País
                            </MenuItem>
                            {this.props.countries.map(country =>
                                <MenuItem key={country._id} value={country._id}>
                                    {country.name}
                                </MenuItem>
                            )}
                        </Field>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}
let EventForm: DecoratedComponentClass<{}, PropsWithStyle, {}> =
    reduxForm<{}, PropsWithStyle>({
        form: "EventForm",
        enableReinitialize: true
    })(EventComponent);
export default connect(
    (state: Store.Types.All) => {
        return {
            countries: state.CountryComponent.countries,
            clasifications: state.ClasificationData.clasifications
        }
    }
)(withStyles(styles)<Props>(EventForm));