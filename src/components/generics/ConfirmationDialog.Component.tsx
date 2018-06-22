import * as React from "React";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { Theme, withStyles, WithStyles } from "material-ui/styles";

type Props = {
    openDialog: boolean;
    handlerCancel: () => void;
    handlerOk: () => void;
};

const styles: any = (theme: Theme) => ({
    dialogContentText: {
        marginTop: 0,
        marginBotton: 15,
        marginLeft: 20,
        marginRight: 20
    }
});

type PropsWithStyle = Props & WithStyles<"dialogContentText">;

class ConfirmationDialog extends React.Component<PropsWithStyle, {}> {

    render(): JSX.Element {
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={this.props.openDialog}
            >
                <DialogTitle id="confirmation-dialog-title">Confirmación</DialogTitle>
                <DialogContent>
                    <DialogContentText className={this.props.classes.dialogContentText} id="alert-dialog-description">
                        ¿Seguro de realizar esta acción ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handlerCancel} color="primary">
                        Cancel
              </Button>
                    <Button onClick={this.props.handlerOk} color="primary">
                        Ok
              </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)<Props>(ConfirmationDialog);