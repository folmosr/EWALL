import * as React from "React";
import {
    Table,
    TableBody
} from "../../../../node_modules/@material-ui/core";
import {
    Theme,
} from "../../../../node_modules/@material-ui/core";
import HeadTable from "./HeadTable.Component";
import ToolBarTable from "./Toolbar.Component";
import { getSorting } from "../../../helpers/Util";

type State = {
    order: "asc" | "desc",
    orderBy: string,
    selected: Array<string>
};

type Props<T extends object = object> = {
    data: Array<T>;
    columns: Array<any>;
    withCheckColumn: boolean;
    tableTitle: string;
    keys: string[];
    selected: Array<string>;
    itemRenderer: (item: T) => JSX.Element;
    updateSelected: (selected: Array<string>) => void;
    openFormSelected: () => void,
    deleteElements: () => void
};

const initialState: State = {
    order: "asc",
    orderBy: "name",
    selected: []
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

    static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
        return {
            ...prevState,
            selected: nextProps.selected
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
            this.props.updateSelected(this.props.keys);
            return;
        }
        this.props.updateSelected([]);
    }

    render(): JSX.Element {
        const { order, orderBy, selected } = this.state;
        return (
            <React.Fragment>
                <ToolBarTable
                    numSelected={selected.length}
                    headTitle={this.props.tableTitle}
                    openFormSelected={this.props.openFormSelected}
                    deleteElements={this.props.deleteElements}
                />
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
                            {this.props.data
                                .sort(getSorting(order, orderBy))
                                .map(this.props.itemRenderer)}
                        </TableBody>
                    </Table>
                </div>
            </React.Fragment>
        );
    }
}