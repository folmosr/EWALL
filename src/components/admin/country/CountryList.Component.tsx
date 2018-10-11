import * as React from "React";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";

import ICountry from "../../../interfaces/Country.interfaces";

type Props = {
    countries: Array<ICountry>,
    onSelect: (selected: ICountry) => any,
    onDelete: (selected: ICountry) => any,
    children?: React.ReactNode
};

type PropsWithStyles = Props & WithStyles<"chip">;

const styles: any = (theme: Theme) => ({
    chip: {
        margin: theme.spacing.unit * 2,
    }
});

const CountryList: React.SFC<PropsWithStyles> = ({ countries, onSelect, onDelete, classes }): JSX.Element => {
    let node: Array<JSX.Element> = countries.map((country: ICountry, index: number) =>
        <Chip key={index}
            avatar={<Avatar src={`/static/images/flags/${country.code}.png`} />}
            label={`${country.name}`}
            className={classes.chip}
            onDelete={() => { onDelete(country); }}
            onClick={() => { onSelect(country); }}
        />
    );
    return (<React.Fragment>{node}</React.Fragment>);
};

export default withStyles(styles)<Props>(CountryList);