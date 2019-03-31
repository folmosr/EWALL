import * as React from "react";
import { 
    WrappedFieldProps, 
    InjectedFormProps,
    formValueSelector,
    DecoratedComponentClass,
    reduxForm
} from "redux-form";
import { IEventForm } from "../../../interfaces/Event.interface";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button 
} from "@material-ui/core";
import { connect } from "react-redux";
import Store from "../../../store/Store.namespace";

type Props = {
    openDialog: boolean;
    children?: React.ReactNode;
    initialValues:IEventForm;
    idEventFormValue:string
}

type PropsWithStyle = Props;

class DialogEventComponent extends React.Component<PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>, {}> {

    constructor(props: PropsWithStyle & WrappedFieldProps & InjectedFormProps<{}, PropsWithStyle>) {
        super(props);
    }

    render(): JSX.Element {
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
                            
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" color="secondary">Cancelar</Button>
                            <Button type="submit" disabled={this.props.pristine || this.props.submitting} color="primary">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const selector = formValueSelector("eventForm")
let DialogEventsForm: DecoratedComponentClass<{}, PropsWithStyle, {}> =
    reduxForm<{}, PropsWithStyle>({
        form: "eventForm",
        enableReinitialize: true
    })(DialogEventComponent);
export default connect(
    (state: Store.Types.All) => ({
        initialValues: state.EventData,
        idEventFormValue: selector(state, "_id"),
        openDialog: selector(state, "open")
    }),
)(DialogEventsForm);