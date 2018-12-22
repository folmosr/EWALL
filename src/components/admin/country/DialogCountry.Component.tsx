import * as React from "react";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    formValueSelector,
    AsyncValidateCallback
} from "redux-form";
import { connect } from "react-redux";
import Store from "../../../store/Store.namespace";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ICountry from "../../../interfaces/Country.interfaces";
import { renderTextField } from "../../generics/RenderFormField.Component";
import { required, justLetter, minLengthOfISO, asyncValidateCountry } from "../../../helpers/Validations";

type Props = {
    loading: boolean;
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues: ICountry;
    idCountryFormValue: string;
    initForm: (param: ICountry) => void;
    onSubmit: (value: ICountry) => void
}

type PropsWithStyle = Props & WithStyles<"progress" | "textField" | "dialogContentText">;

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

class DialogCountries extends React.Component<PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>, {}> {

    constructor(props: PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>) {
        super(props);
    }

    render(): JSX.Element {
        let components: JSX.Element = (this.props.loading) ? (<div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress className={this.props.classes.progress} thickness={7} /></div>) :
            (<React.Fragment>
                <DialogContentText className={this.props.classes.dialogContentText} id="alert-dialog-description">
                    Creación/Administración de datos.
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
                    disabled={!(this.props.idCountryFormValue === null || this.props.idCountryFormValue === undefined)}
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
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.openDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Registro</DialogTitle>
                    <form onSubmit={this.props.handleSubmit}>
                        <DialogContent>
                            {components}
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={() => { this.props.initForm({ name: undefined, currency: undefined, code: undefined, open: false }); }}
                                color="secondary">Cancelar</Button>
                            <Button type="submit" disabled={this.props.pristine || this.props.submitting} color="primary">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const selector = formValueSelector("countryForm")
let DialogCountriesForm: DecoratedComponentClass<{}, PropsWithStyle, {}> =
    reduxForm<{}, PropsWithStyle>({
        form: "countryForm",
        asyncValidate: asyncValidateCountry,
        asyncBlurFields: ["code"],
        enableReinitialize: true,
        shouldAsyncValidate: (param: AsyncValidateCallback<FormData, {}> = {
            trigger: "blur",
            initialized: false,
            pristine: false,
            syncValidationPasses: true
        }) => {
            switch (param.trigger) {
                case "blur":
                    return true
                default:
                    return false
            }
        }
    })(DialogCountries);
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.CountryData.country,
        idCountryFormValue: selector(state, "_id"),
        openDialog: selector(state, "open")
    }),
)(withStyles(styles)<Props>(DialogCountriesForm));