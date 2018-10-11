import * as React from "React";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Store from "../../../store/Store.namespace";
import {
    loadClasifications,
    initClasificationForm,
    addClasification
} from "../../../actions/Clasifications.actions";
import IClasification, { IClasificationForm } from "../../../interfaces/Clasification.interface";
import ClasificationList from "./ClasificationList.Component"
import DialogClasification from "./DialogClasification.Component"

type DispatchProps = {
    loadClasifications: typeof loadClasifications;
    initClasificationForm: typeof initClasificationForm;
    addClasification: typeof addClasification
};

type ClasificationProps = Store.Types.ClasificationComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadClasifications,
    initClasificationForm,
    addClasification
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
    button: {
        margin: theme.spacing.unit,
    },
});

class Clasification extends React.Component<ClasificationProps, {}> {

    constructor(props: ClasificationProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.loadClasifications) {
            this.props.loadClasifications();
        }
    }

    handleClickOpen = () => {
        this.props.initClasificationForm({
            _id: null,
            name: null,
            imageBase64Encode: null,
            open: true
        });
    }

    submit = (value: IClasificationForm) => {
        value.imageBase64Encode = value.imageBase64Encode.split(",").pop();
        value.open = false;
        this.props.addClasification(value);
    }

    onSelect = (clasification: IClasification): void => {
        console.log(clasification);
    }

    onDelete = (clasification: IClasification): any => {
        console.log(clasification);
    }

    render(): JSX.Element {
        let innerComponent: JSX.Element = (this.props.loading) ?
            <CircularProgress className={this.props.classes.progress} thickness={7} /> :
            (this.props.clasifications.length > 0) &&
            <ClasificationList onSelect={this.onSelect} onDelete={this.onDelete} clasifications={this.props.clasifications} />;
        return (
            <React.Fragment>
                <Typography variant="headline" component="h3">
                    Clasificaciones
                </Typography>
                <Typography component="p">
                    Lista de clasificaciones ya configuradas
                </Typography>
                <Paper className={this.props.classes.root} elevation={4}>
                    {innerComponent}
                    <Button variant="fab" mini color="secondary" aria-label="add"
                        className={this.props.classes.fab}
                        onClick={() => this.handleClickOpen()}
                    >
                        <AddIcon />
                    </Button>
                </Paper>
                {ReactDOM.createPortal(<DialogClasification
                    loading={this.props.loading}
                    onSubmit={this.submit}
                    initForm={this.props.initClasificationForm}
                />,
                    document.getElementById("portal-container")
                )
                }
            </React.Fragment>
        );
    }
}

export default connect(
    (state: Store.Types.All) => {
        return state.ClasificationData;
    },
    (dispatch: Dispatch<DispatchProps>) => {
        return bindActionCreators(actions, dispatch);
    }
)(withStyles(styles)(Clasification));