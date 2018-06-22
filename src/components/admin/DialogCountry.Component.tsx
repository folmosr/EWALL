import * as React from "react";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    reset
} from "redux-form";
import { connect } from "react-redux";
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
import { TextField, FormHelperText } from "material-ui";
import ICountry from "../../interfaces/country.interfaces";

import { required, justLetter, minLengthOfISO, asyncValidateCountry } from "../../helpers/validations";
import { initCountryForm } from "../../actions/countries.actions";

type DispatchProps = {
    onSubmit: (value: ICountry) => void,
    handleClose: () => void
};
type Props = {
    loading: boolean;
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues: ICountry;
} & DispatchProps;
type PropsWithStyle = Props & WithStyles<"progress" | "textField" | "dialogContentText">;
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
    dialogContentText: {
        marginTop: 0,
        marginBotton: 15,
        marginLeft: 20,
        marginRight: 20
    }
});


const renderTextField: React.StatelessComponent<WrappedFieldProps & InputTexField> = (props: WrappedFieldProps & InputTexField) => {
    const { className, input, label, meta: { touched, error, asyncValidating, dirty } } = props;
    return (
        <React.Fragment><TextField
            placeholder={label}
            label={label}
            {...input}
            error={(error && touched)}
            className={className}
        />
            {(error && touched) && <FormHelperText error={error} className={className}>{error}</FormHelperText>}
        </React.Fragment>
    );
};

let asyncValidate: any;

class DialogCountries extends React.Component<PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>, {}> {

    constructor(props: PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>) {
        super(props);
    }

    onComponentWillMount(): void {
        this.props.reset();
    }

    render(): JSX.Element {
        let components: JSX.Element = (this.props.loading) ? (<div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress className={this.props.classes.progress} thickness={7} /></div>) :
            (<React.Fragment>
                <DialogContentText className={this.props.classes.dialogContentText} id="alert-dialog-description">
                    Administra los paises donde el sistema de manejo de eventos está actualmente operando.
                    </DialogContentText>
                <Field
                    className={this.props.classes.textField}
                    name="name"
                    label="Nombre"
                    component={renderTextField}
                    validate={[required, justLetter]} />
                <Field
                    className={this.props.classes.textField}
                    name="code"
                    label="Código ISO"
                    component={renderTextField}
                    validate={[required, minLengthOfISO]} />
                <Field
                    className={this.props.classes.textField}
                    name="currency"
                    label="Moneda (ISO)"
                    component={renderTextField}
                    validate={[required, minLengthOfISO]} />
            </React.Fragment>);
        return (
            <div>
                <Dialog
                    open={this.props.openDialog}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle style={{ paddinBotton: 10 }} id="form-dialog-title">Registro</DialogTitle>
                    <form onSubmit={this.props.handleSubmit}>
                        <DialogContent>
                            {components}
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={() => {
                                this.props.reset();
                                this.props.handleClose();
                            }} color="secondary">Cancelar</Button>
                            <Button type="submit" disabled={this.props.pristine || this.props.submitting} color="primary">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}
const afterSubmit: any = (result: any, dispatch: any) => {
    dispatch(reset("countryForm"));
    dispatch(initCountryForm({
        _id: undefined,
        name: undefined,
        code: undefined,
        currency: undefined
    }, false));
};

let DialogCountriesForm: DecoratedComponentClass<{}, PropsWithStyle> =
    reduxForm<{}, PropsWithStyle>({
        form: "countryForm",
        asyncValidate: asyncValidateCountry,
        asyncBlurFields: ["code"],
        enableReinitialize: true,
        onSubmitSuccess: afterSubmit
    })(DialogCountries);
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.CountryData.country,
        openDialog: state.CountryData.open
    }),
)(withStyles(styles)<Props>(DialogCountriesForm));