import * as React from "React";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    DecoratedComponentClass,
    WrappedFieldProps,
    reset
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
import ISponsor from "../../../interfaces/sponsor.interfaces";

import { required, justLetter } from "../../../helpers/validations";
import { Dispatch } from "redux";
import { AvatarProps } from "../../../../node_modules/@material-ui/core/Avatar";
import RootRef from "@material-ui/core/RootRef";

type Props = {
    openDialog: boolean;
    children?: React.ReactNode;
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

class DialogSponsor extends React.Component<PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>, {}> {

    private avatarRef: React.RefObject<HTMLDivElement>;

    constructor(props: PropsWithStyle &
        WrappedFieldProps &
        InjectedFormProps<{}, PropsWithStyle>) {
        super(props);
        this.avatarRef = React.createRef<HTMLDivElement>();
    }
    previewThumbnail = (e: React.FormEvent<HTMLInputElement>) => {
        let file: Blob = e.currentTarget.files[0];
        let reader: FileReader = new FileReader();
        if (this.avatarRef !== null) {
            (function (img: React.Ref<any>, reader: FileReader): void {
                reader.addEventListener("load", function (): void {
                    console.log(img);
                }, false);
            })(this.avatarRef, reader);
        }
        if (file) {
            reader.readAsArrayBuffer(file);
        }
    }

    componentDidMount(): void {
        const node:HTMLDivElement = this.avatarRef.current!;
        console.log(node);
    }

    render(): JSX.Element {
        return (<div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.openDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Registro</DialogTitle>
                <DialogContent>
                    <DialogContentText className={this.props.classes.dialogContentText} id="alert-dialog-description">
                        Creación/Administración de datos.
                    </DialogContentText>
                    <div ref={this.avatarRef} className={this.props.classes.row}>
                        <Avatar className={this.props.classes.avatar}>A</Avatar>
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
                        validate={[required]} />
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
                    <Button type="button"
                        color="secondary">Cancelar</Button>
                    <Button type="submit" disabled={this.props.pristine || this.props.submitting} color="primary">Guardar</Button>
                </DialogActions>
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

let DialogSponsorForm: DecoratedComponentClass<{}, PropsWithStyle> =
    reduxForm<{}, PropsWithStyle>({
        form: "sponsorForm",
        enableReinitialize: true,
    })(DialogSponsor);
export default withStyles(styles)<Props>(DialogSponsorForm);