import * as React from "React";
import ISponsor from "../../../interfaces/sponsor.interfaces";
import { TableComponent } from "../../generics/Table/Table.Component";
import IHeadColumn from "../../../interfaces/headColumn.interface";
import ITable from "../../../interfaces/table.interface";
import {
    TableRow,
    TableCell,
    Checkbox,
    Typography,
    Avatar
} from "../../../../node_modules/@material-ui/core";
import { bufferToBase64 } from "../../../helpers/util";

type PropsTable = {
    data: Array<ISponsor>;
    setSelected: (ids: Array<string>) => void,
    elements: Array<string>;
};

const columns: Array<IHeadColumn> = [
    { id: "name", numeric: false, disablePadding: true, label: "Nombre/Descripción" },
    { id: "url", numeric: true, disablePadding: false, label: "Url" },
    { id: "logo", numeric: true, disablePadding: false, label: "" },
];

class SponsorTable extends TableComponent<ISponsor> { }
class SponsorList extends React.Component<PropsTable, {}> implements ITable {

    constructor(props: PropsTable) {
        super(props);
    }

    updateSelectedInParent = (selected: Array<string>) => {
        this.props.setSelected(selected);
    }

    handleClick = (id: string) => {
        const selectedIndex: number = this.props.elements.indexOf(id);
        let newSelected: Array<string> = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.props.elements, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.props.elements.slice(1));
        } else if (selectedIndex === this.props.elements.length - 1) {
            newSelected = newSelected.concat(this.props.elements.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.props.elements.slice(0, selectedIndex),
                this.props.elements.slice(selectedIndex + 1),
            );
        }

        this.props.setSelected(newSelected);
    }

    isSelected = (id: string) => this.props.elements.indexOf(id) !== -1;

    render(): JSX.Element {

        return (
            <SponsorTable
                data={this.props.data}
                keys={this.props.data.map(item => item._id)}
                selected={this.props.elements}
                tableTitle={"Sponsor"}
                columns={columns}
                updateSelected={this.updateSelectedInParent}
                withCheckColumn={true}
                itemRenderer={(item) => {
                    const isSelected: boolean = this.isSelected(item._id);
                    return (<TableRow
                        hover
                        role="checkbox"
                        onClick={() => this.handleClick(item._id)}
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={item._id}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                            {item.name}
                        </TableCell>
                        <TableCell numeric>
                            <Typography component="p">
                                <a href={item.url} target="_blank">{item.url}</a>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Avatar
                                alt={`${item.name}`}
                                src={`data:image/jpeg;base64,${bufferToBase64(item.logo.data.data)}`}
                            />
                        </TableCell>
                    </TableRow>);
                }
                } />
        );
    }
}
export default SponsorList;