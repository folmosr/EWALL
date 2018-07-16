import * as React from "React";
import * as classNames from "classnames";
import { WithStyles, Theme, withStyles, Toolbar, Typography, Tooltip, IconButton } from "../../../../node_modules/@material-ui/core";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

type Props = {
    numSelected: number;
    headTitle: string;
    children?: React.ReactNode
};
type PropsWithStyles = Props & WithStyles<"root" | "highlight" | "spacer" | "actions" | "title">;

const styles: any = (theme: Theme) => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: "1 1 100%",
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: "0 0 auto",
    },
});

const ToolBarTable: React.StatelessComponent<PropsWithStyles> = ({ numSelected, headTitle, classes }): JSX.Element => {
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}>
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <React.Fragment>
                        <Typography variant="title" id="tableTitle">
                            {headTitle}
                        </Typography>
                        <Typography color="inherit" variant="subheading">
                            {numSelected} seleccionado
              </Typography>
                    </React.Fragment>
                ) : (
                        <Typography variant="title" id="tableTitle">
                            {headTitle}
                        </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </div>
        </Toolbar>
    );
};

export default withStyles(styles)<Props>(ToolBarTable);