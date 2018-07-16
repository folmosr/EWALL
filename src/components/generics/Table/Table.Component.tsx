import * as React from "React";
import {
    WithStyles,
    Theme,
    withStyles,
    TablePagination,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Typography
} from "../../../../node_modules/@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { bufferToBase64, getSorting } from "../../../helpers/util";
import HeadTable from "./HeadTable.Component";
import ToolBarTable from "./Toolbar.Component";

type Style = {
    order: "asc" | "desc",
    orderBy: string,
    selected: Array<string>,
    page: number,
    rowsPerPage: number,
};
type Props = {
    data: Array<any>;
    columns: Array<any>;
    withCheckColumn: boolean;
    tableTitle: string;
};
type PropsWithStyles = Props & WithStyles<"root" | "table" | "tableWrapper">;

const styles: any = (theme: Theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 550,
    },
    tableWrapper: {
        overflowX: "auto",
    },
});
class TableComponent extends React.Component<PropsWithStyles, Style> {

    constructor(props: PropsWithStyles) {
        super(props);
        this.state = {
            order: "asc",
            orderBy: "name",
            selected: [],
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (property: string) => {
        const orderBy: string = property;
        let order: "asc" | "desc" = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({ order, orderBy });
    }

    handleSelectAllClick = (event: React.ChangeEvent, checked: boolean) => {
        if (checked) {
            this.setState(state => ({ selected: this.props.data.map(n => n._id) }));
            return;
        }
        this.setState({ selected: [] });
    }

    handleClick = (id: string) => {
        const { selected } = this.state;
        const selectedIndex: number = selected.indexOf(id);
        let newSelected: Array<string> = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    }

    handleChangePage = (page: number) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({ rowsPerPage: Number.parseInt(event.target.value) });
    }

    isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;

    render(): JSX.Element {

        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows: number = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

        return (
            <React.Fragment>
                <ToolBarTable numSelected={selected.length} headTitle={this.props.tableTitle} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <HeadTable
                            withCheckColumn={this.props.withCheckColumn}
                            columns={this.props.columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.data.length}
                        />
                        <TableBody>
                            {this.props.data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected: boolean = this.isSelected(n._id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(n._id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}>
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>
                                                <Typography component="p">
                                                    <a href={n.url} target="_blank">{n.url}</a>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Avatar
                                                    alt={`${n.name}`}
                                                    src={`data:image/jpeg;base64,${bufferToBase64(n.logo.data.data)}`}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={this.props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onChangePage={() => this.handleChangePage(this.state.page)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(TableComponent);