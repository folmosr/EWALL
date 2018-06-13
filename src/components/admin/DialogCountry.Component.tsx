import * as React from "react";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    FieldsProps,
    SubmitHandler,
    FormInstance
} from "redux-form";
import Store from "../../store/store.namespace";
import { Theme, withStyles, WithStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import blue from "material-ui/colors/blue";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { TextField } from "material-ui";
import ICountry from "../../interfaces/country.interfaces";

import { addCountry } from "../../actions/countries.actions";
import { TextFieldProps } from "material-ui/TextField";
import { connect } from "react-redux";

type DispatchProps = { onSubmit: (value: ICountry) => void, handleClose: () => void };
type Props = {
    loading: boolean;
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues: ICountry;
} & DispatchProps;
type PropsWithStyle = Props & WithStyles<"progress" | "textField">;
type InputTexField = {
    className: string
};


const styles: any = (theme: Theme) => ({
    progress: {
        margin: theme.spacing.unit * 2,
        color: blue[500]
    },
    textField: {
        marginLeft: 20,
        marginRight: 20,
        width: 500,
    },
});


const renderTextField: React.StatelessComponent<WrappedFieldProps & InputTexField> = (props: WrappedFieldProps & InputTexField) => {
    const { className, input, label, meta: { touched, error, dirty } } = props;
    return (
        <TextField
            placeholder={label}
            label={label}
            {...input}
            className={className}
        />
    );
};

class DialogCountries extends React.Component<PropsWithStyle & InjectedFormProps<{}, PropsWithStyle>, {}> {

    constructor(props: PropsWithStyle & InjectedFormProps<{}, PropsWithStyle>) {
        super(props);
    }

    render(): JSX.Element {
        let components: JSX.Element = (this.props.loading) ? (<CircularProgress className={this.props.classes.progress} thickness={7} />) :
            (<React.Fragment>
                <DialogContentText id="alert-dialog-description">
                    Administra los paises donde el sistema de manejo de eventos está actualmente operando.
                    </DialogContentText>
                <Field
                    className={this.props.classes.textField}
                    name="name"
                    label="Nombre"
                    component={renderTextField} />
                <Field
                    className={this.props.classes.textField}
                    name="code"
                    label="Código ISO"
                    component={renderTextField} />
                <Field
                    className={this.props.classes.textField}
                    name="currency"
                    label="Moneda (Simbolo + Texto)"
                    component={renderTextField} />
            </React.Fragment>);
        return (
            <div>
                <Dialog
                    open={this.props.openDialog}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Registro</DialogTitle>
                    <form onSubmit={this.props.handleSubmit}>
                        <DialogContent>
                            {components}
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={this.props.handleClose} color="secondary">Cancelar</Button>
                            <Button type="submit" color="primary">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}
let DialogCountriesForm: DecoratedComponentClass<{}, PropsWithStyle> =
    reduxForm<{}, PropsWithStyle>({ form: "countryForm", enableReinitialize: true })(DialogCountries);
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.CountryData,
    }),
)(withStyles(styles)<Props>(DialogCountriesForm));