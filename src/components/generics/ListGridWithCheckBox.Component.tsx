import * as React from "React";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { bufferToBase64 } from "../../helpers/util";
import ISponsor from "../../interfaces/sponsor.interfaces";

type Props = {
    data: Array<ISponsor>,
    onSelect?: (selected: ISponsor) => any,
    onDelete?: (selected: ISponsor) => any,
    children?: React.ReactNode
};

type PropsWithStyles = Props & WithStyles<"root" | "listItem">;

const styles: any = (theme: Theme) => ({
    root: {
        width: "100%",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper
    },
});

class ListGridWithCheckBox extends React.Component<PropsWithStyles, {}> {



    render(): JSX.Element {
        return (
            <div className={this.props.classes.root}>
                <List>
                    {this.props.data.map(item => (
                        <React.Fragment>
                            <ListItem key={item._id} dense button className={this.props.classes.listItem}>
                                <ListItemSecondaryAction>
                                    <Avatar alt={`${item.name}`} src={`data:image/jpeg;base64,${bufferToBase64(item.logo.data.data)}`} />
                                </ListItemSecondaryAction>
                                <Checkbox
                                />
                                <ListItemText primary={`${item.name}`} secondary={`${item.url}`} />
                            </ListItem>
                            <Divider inset component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)<Props>(ListGridWithCheckBox);