import * as React from "React";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    reset,
    formValueSelector
} from "redux-form";
import { connect } from "react-redux";
import Store from "../../../store/store.namespace";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import renderTextField from "../../generics/RenderTextField.Component";
import { Avatar } from "../../../../node_modules/@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import { ISponsorForm } from "../../../interfaces/sponsor.interfaces";
import { initSponsorForm } from "../../../actions/sponsors.actions";
import { required, justLetter, isValidURL } from "../../../helpers/validations";
import { Dispatch } from "redux";
import { InitFormAction } from "../../../types/sponsorsActionsTypes";

type DispatchProps = {
    onSubmit: (value: ISponsorForm) => void
    dispatch: Dispatch<InitFormAction>
};

type Props = {
    loading: boolean;
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues: ISponsorForm;
    nameFormValue: string;
    urlFormValue: string;
    idSponsorFormValue: string;
    logoFormValue: string;
} & DispatchProps;

type PropsWithStyle = Props & WithStyles<
    "progress" |
    "textField" |
    "dialogContentText" |
    "avatar" |
    "row" |
    "button" |
    "extendedIcon" |
    "input">;

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
    },
    avatar: {
        margin: 10,
    },
    row: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: "none",
    },
});

type globalProps = PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>;

class DialogSponsor extends React.Component<globalProps, {}> {

    constructor(props: globalProps) {
        super(props);
    }

    previewThumbnail = (e: React.FormEvent<HTMLInputElement>) => {
        let file: Blob = e.currentTarget.files[0];
        let reader: FileReader = new FileReader();
        ((props: globalProps, input:HTMLInputElement) =>
            reader.addEventListener("loadend", function (): void {
                props.change("imageBase64Encode", this.result.toString());
                input.value = null;
            }, true)
        )(this.props, e.currentTarget);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    componentDidUpdate(): void {
    }

    render(): JSX.Element {
        let avatarJSX: JSX.Element = (this.props.logoFormValue == null) ? <Avatar className={this.props.classes.avatar}>A</Avatar> : <Avatar className={this.props.classes.avatar} src={this.props.logoFormValue} />
        return (<div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.openDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Registro</DialogTitle>
                <form onSubmit={this.props.handleSubmit}>
                    <DialogContent>
                        <DialogContentText className={this.props.classes.dialogContentText} id="alert-dialog-description">
                            Creación/Administración de datos.
                    </DialogContentText>
                        <div className={this.props.classes.row}>
                            {avatarJSX}
                        </div>
                        <Field
                            className={this.props.classes.textField}
                            name="name"
                            label="Nombre"
                            component={renderTextField}
                            validate={[required, justLetter]} />
                        <Field
                            className={this.props.classes.textField}
                            name="url"
                            label="Url"
                            component={renderTextField}
                            validate={[required,isValidURL]} />
                        <label htmlFor="flat-button-file">
                            <Button color="secondary"
                                component="span"
                                className={this.props.classes.button}>
                                <CloudUploadIcon className={this.props.classes.extendedIcon} />
                                Avatar
                        </Button>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={() => resetAndCloseForm("sponsorForm", this.props.dispatch)}
                            color="secondary">Cancelar</Button>
                        <Button type="submit" disabled={this.props.pristine || this.props.submitting} color="primary">Guardar</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <input
                accept="image/*"
                className={this.props.classes.input}
                id="flat-button-file"
                multiple
                type="file"
                onChange={(e) => this.previewThumbnail(e)}
            />
        </div>);
    }
}

const resetAndCloseForm: (v: string, dispatch: Dispatch<any>) => any = (form: string, dispatch: Dispatch<any>): any => {
    dispatch(reset(form));
    dispatch(initSponsorForm({
        _id: null,
        name: null,
        url: null,
        imageBase64Encode: null
    }, false));
};
const afterSubmit: any = (result: any, dispatch: any) => {
    resetAndCloseForm("sponsorForm", dispatch);
};
let DialogSponsorForm: DecoratedComponentClass<{}, PropsWithStyle> =
    reduxForm<{}, PropsWithStyle>({
        form: "sponsorForm",
        enableReinitialize: true,
        onSubmitSuccess: afterSubmit
    })(DialogSponsor);
const selector = formValueSelector("sponsorForm")
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.SponsorData.sponsor,
        openDialog: state.SponsorData.open,
        nameFormValue: selector(state, "name"),
        urlFormValue: selector(state, "url"),
        logoFormValue: selector(state, "imageBase64Encode"),
        idSponsorFormValue: selector(state, "_id")
    }),
)(withStyles(styles)<Props>(DialogSponsorForm));