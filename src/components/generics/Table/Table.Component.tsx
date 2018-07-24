import * as React from "React";
import {
    TablePagination,
    Table,
    TableBody
} from "../../../../node_modules/@material-ui/core";
import {
    Theme,
} from "../../../../node_modules/@material-ui/core";
import HeadTable from "./HeadTable.Component";
import ToolBarTable from "./Toolbar.Component";

type State = {
    order: "asc" | "desc",
    orderBy: string,
    selected: Array<string>,
    page: number,
    rowsPerPage: number
};

type Props<T extends object = object> = {
    data: Array<T>;
    columns: Array<any>;
    withCheckColumn: boolean;
    tableTitle: string;
    keys: string[];
    itemRenderer: (item: T) => JSX.Element
};

const initialState: State = {
    order: "asc",
    orderBy: "name",
    selected: [],
    page: 0,
    rowsPerPage: 5,
};

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

export class TableComponent<T extends object = object> extends React.Component<Props<T>, State> {

    constructor(props: Props<T>) {
        super(props);
        this.state = initialState;
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
            this.setState({ selected: this.props.keys});
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
       const { order, orderBy, selected, rowsPerPage, page } = this.state;
        return (
            <React.Fragment>
                <ToolBarTable numSelected={selected.length} headTitle={this.props.tableTitle} />
                <div className={styles.tableWrapper}>
                    <Table className={styles.table} aria-labelledby="tableTitle">
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
                            {this.props.data.map(this.props.itemRenderer)}
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