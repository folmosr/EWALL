import * as React from "React";
import ISponsor from "../../../interfaces/sponsor.interfaces";
import { TableComponent } from "../../generics/Table/Table.Component";
import IHeadColumn from "../../../interfaces/headColumn.interface";
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
};

const columns: Array<IHeadColumn> = [
    { id: "name", numeric: false, disablePadding: true, label: "Nombre/Descripción" },
    { id: "url", numeric: true, disablePadding: false, label: "Url" },
    { id: "logo", numeric: true, disablePadding: false, label: "" },
];

class SponsorTable extends TableComponent<ISponsor> { }
let isSelected: boolean = false;
const SponsorList: React.SFC<PropsTable> = ({ data }): JSX.Element => {
    return (
        <SponsorTable
            data={data}
            keys={ data.map(item=>item._id)}
            tableTitle={"Sponsor"}
            columns={columns}
            withCheckColumn={true}
            itemRenderer={(item) => {
                return (<TableRow
                    hover
                    role="checkbox"
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
};
export default SponsorList;