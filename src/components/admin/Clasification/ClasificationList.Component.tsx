import * as React from "React";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { bufferToBase64 } from "../../../helpers/Util"
import IClasification from "../../../interfaces/Clasification.interface";

type Props = {
    clasifications: Array<IClasification>,
    onSelect: (selected: IClasification) => any,
    onDelete: (selected: IClasification) => any,
    children?: React.ReactNode
};

type PropsWithStyles = Props & WithStyles<"chip">;

const styles: any = (theme: Theme) => ({
    chip: {
        margin: theme.spacing.unit * 2,
    }
});

const ClasificationList: React.SFC<PropsWithStyles> = ({ clasifications, onSelect, onDelete, classes }): JSX.Element => {
    let node: Array<JSX.Element> = clasifications.map((item: IClasification, index: number) =>
        <Chip key={index}
            avatar={<Avatar alt={`${item.name}`}
                src={`data:image/jpeg;base64,${bufferToBase64(item.logo.data.data)}`} />}
            label={`${item.name}`}
            className={classes.chip}
            onDelete={() => { onDelete(item); }}
            onClick={() => { onSelect(item); }}
        />
    );
    return (<React.Fragment>{node}</React.Fragment>);
};

export default withStyles(styles)<Props>(ClasificationList);