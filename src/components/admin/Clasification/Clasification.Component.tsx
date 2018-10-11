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
    loadClasifications
} from "../../../actions/Clasifications.actions";
import IClasification from "../../../interfaces/Clasification.interface";
import ClasificationList from "./ClasificationList.Component"


type DispatchProps = {
    loadClasifications: typeof loadClasifications;
};

type ClasificationProps = Store.Types.ClasificationComponentType & DispatchProps & WithStyles<"root" | "progress" | "button" | "fab">;

const actions: DispatchProps = {
    loadClasifications
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
                        className={this.props.classes.fab}>
                        <AddIcon />
                    </Button>
                </Paper>
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