import * as React from "React";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import { Theme, withStyles, WithStyles } from "material-ui/styles";

import ICountry from "../../interfaces/country.interfaces";

type Props = { countries: Array<ICountry>, onSelect: (selected: ICountry) => any, children?: React.ReactNode };

type PropsWithStyles = Props & WithStyles<"chip">;

const styles: any = (theme: Theme) => ({
    chip: {
        margin: theme.spacing.unit / 2,
    }
});

const CountryList: React.SFC<PropsWithStyles> = ({ countries, onSelect, classes }): JSX.Element => {
    let node: Array<JSX.Element> = countries.map((country: ICountry, index: number) =>
        <Chip key={index}
            avatar={<Avatar src={`/static/images/flags/${country.code}.png`} />}
            label={`${country.name}`}
            className={classes.chip}
            onClick={ ()=> { onSelect(country); } }
        />
    );
    return (<React.Fragment>{node}</React.Fragment>);
};

export default withStyles(styles)<Props>(CountryList);