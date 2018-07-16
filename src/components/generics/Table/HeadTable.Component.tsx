import * as React from "React";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import IHeadColumn from "../../../interfaces/headColumn.interface";
import TableSortLabel from "../../../../node_modules/@material-ui/core/TableSortLabel";

type headPropTable = {
    withCheckColumn: boolean;
    numSelected: number;
    rowCount: number;
    orderBy: string;
    order: "asc" | "desc";
    columns: Array<IHeadColumn>
    onSelectAllClick: (evet: React.ChangeEvent, checked: boolean) => void;
    onRequestSort: (property: React.ReactText) => void;
};

class HeadTable extends React.Component<headPropTable, {}> {

    createSortHandler = (property: React.ReactText) => {
        this.props.onRequestSort(property);
    }

    render(): JSX.Element {
        return (
            <TableHead>
                <TableRow>
                    {(this.props.withCheckColumn) ?
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={this.props.numSelected > 0 && this.props.numSelected < this.props.rowCount}
                                checked={this.props.numSelected === this.props.rowCount}
                                onChange={this.props.onSelectAllClick} />
                        </TableCell> : null}
                    {this.props.columns.map(column =>
                        <TableCell
                            key={column.id}
                            numeric={column.numeric}
                            padding={column.disablePadding ? "none" : "default"}
                            sortDirection={this.props.orderBy === column.id ? this.props.order : false}>
                            <TableSortLabel
                                active={this.props.orderBy === column.id}
                                direction={this.props.order}
                                onClick={() => this.createSortHandler(column.id)}>
                                {column.label}
                            </TableSortLabel>
                        </TableCell>
                    )
                    }
                </TableRow>
            </TableHead>
        );
    }
}
export default HeadTable;