import * as React from "React";
import { connect } from "react-redux";
import Store from "../../../store/Store.namespace";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    formValueSelector
} from "redux-form";
import {
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core/styles";
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
import { required, justLetter } from "../../../helpers/Validations";
import { Dispatch } from "redux";
import { IClasificationForm } from "../../../interfaces/Clasification.interface"

type Props = {
    loading: boolean;
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues: IClasificationForm;
    idClasificationFormValue: string;
    nameFormValue: string;
    logoFormValue: string;
    initForm: (param: IClasificationForm) => void
    onSubmit: (value: IClasificationForm) => void
};

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

class DialogClasification extends React.Component<globalProps, {}> {

    constructor(props: globalProps) {
        super(props);
    }

    previewThumbnail = (e: React.FormEvent<HTMLInputElement>) => {
        let file: Blob = e.currentTarget.files[0];
        let reader: FileReader = new FileReader();
        ((props: globalProps, input: HTMLInputElement) =>
            reader.addEventListener("loadend", function (): void {
                props.change("imageBase64Encode", this.result.toString());
                input.value = null;
            }, true)
        )(this.props, e.currentTarget);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render(): JSX.Element {
        let avatarJSX: JSX.Element = (this.props.logoFormValue == null) ? <Avatar className={this.props.classes.avatar}>A</Avatar> : <Avatar className={this.props.classes.avatar} src={this.props.logoFormValue} />
        let components: JSX.Element = (this.props.loading) ? (<div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress className={this.props.classes.progress} thickness={7} /></div>) :
            <React.Fragment>
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
                <label htmlFor="flat-button-file">
                    <Button color="secondary"
                        component="span"
                        className={this.props.classes.button}>
                        <CloudUploadIcon className={this.props.classes.extendedIcon} />
                        Avatar
</Button>
                </label>
            </React.Fragment>
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
                        {components}
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={() => {
                            this.props.initForm({
                                name: null,
                                imageBase64Encode: null,
                                _id: null,
                                open: false
                            })
                        }}
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

let DialogClasificationForm: DecoratedComponentClass<{}, PropsWithStyle> =
    reduxForm<{}, PropsWithStyle>({
        form: "clasificationForm",
        enableReinitialize: true
    })(DialogClasification);
const selector = formValueSelector("clasificationForm")
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.ClasificationFormData.clasification,
        nameFormValue: selector(state, "name"),
        logoFormValue: selector(state, "imageBase64Encode"),
        idClasificationFormValue: selector(state, "_id"),
        openDialog: selector(state, "open")
    }),
)(withStyles(styles)<Props>(DialogClasificationForm));