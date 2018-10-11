import * as React from "React";
import * as ReactDOM from "react-dom";
import ISponsor, { ISponsorForm } from "../../../interfaces/Sponsor.interfaces";
import { TableComponent } from "../../generics/Table/Table.Component";
import IHeadColumn from "../../../interfaces/HeadColumn.interface";
import ITable from "../../../interfaces/Table.interface";
import {
    TableRow,
    TableCell,
    Checkbox,
    Typography,
    Avatar
} from "../../../../node_modules/@material-ui/core";
import ConfirmDialog from "../../generics/confirmationDialog.Component";
import { bufferToBase64 } from "../../../helpers/Util";
import { InitFormAction } from "../../../types/Sponsors.actions.types";
import _ = require("lodash");

const initialState = { openConfirm: false, dblClick: false }

type PropsTable = {
    data: Array<ISponsor>;
    setSelected: (ids: Array<string>) => void,
    deleteSelected: (ids: Array<string>) => void,
    initSponsorForm: (sponsor: ISponsorForm, open?: boolean) => InitFormAction,
    elements: Array<string>;
};

type State = Readonly<typeof initialState>;

const columns: Array<IHeadColumn> = [
    { id: "name", numeric: false, disablePadding: true, label: "Nombre/Descripción" },
    { id: "url", numeric: false, disablePadding: false, label: "Url" },
    { id: "logo", numeric: false, disablePadding: false, label: "" },
];

class SponsorTable extends TableComponent<ISponsor> { }
class SponsorList extends React.Component<PropsTable, State> implements ITable {

    readonly state: State = initialState;
    debouncedClickEvents: Array<any>;

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

    deleteElements = () => {
        this.setState(this.openConfirm);
    }

    openConfirm = (prevState: State) => ({ openConfirm: !prevState.openConfirm });

    isSelected = (id: string) => this.props.elements.indexOf(id) !== -1;

    onClickDeleteOk = () => {
        this.props.deleteSelected(this.props.elements);
        this.props.setSelected([]);
        this.setState(this.openConfirm);
    };

    onClickCancelDelete = () => { this.setState(this.openConfirm); };

    openFormDialog = (item: ISponsor): void => {
        let sponsor: ISponsorForm = {
            name: item.name,
            url: item.url,
            _id: item._id,
            imageBase64Encode: `data:image/jpeg;base64,${bufferToBase64(item.logo.data.data)}`,
            open: true
        }
        this.props.initSponsorForm(sponsor);
    }

    openFormSelected = (): void => {
        let id: string = this.props.elements.shift();
        let item: ISponsor = this.props.data.filter((el: ISponsor) => el._id === id).shift();
        let sponsor: ISponsorForm = {
            name: item.name,
            url: item.url,
            _id: item._id,
            imageBase64Encode: `data:image/jpeg;base64,${bufferToBase64(item.logo.data.data)}`,
            open: true
        }
        this.props.initSponsorForm(sponsor);
    }

    onClickEventOnRow = (item: ISponsor): void => {
        this.debouncedClickEvents = this.debouncedClickEvents || [];
        const callback = _.debounce(_ => {
            this.handleClick(item._id);
            this.debouncedClickEvents = [];
        }, 250);
        this.debouncedClickEvents.push(callback);
        callback(_);
    }

    onDoubleClicked = (item: ISponsor): void => {
        if (this.debouncedClickEvents.length > 0) {
            _.map(this.debouncedClickEvents, (debounce) => debounce.cancel());
            this.debouncedClickEvents = [];
        }
        this.openFormDialog(item);
    }

    render(): JSX.Element {

        return (
            <React.Fragment>
                <SponsorTable
                    data={this.props.data}
                    keys={this.props.data.map(item => item._id)}
                    selected={this.props.elements}
                    tableTitle={"Patrocinadores"}
                    columns={columns}
                    openFormSelected={this.openFormSelected}
                    deleteElements={this.deleteElements}
                    updateSelected={this.updateSelectedInParent}
                    withCheckColumn={true}
                    itemRenderer={(item) => {
                        const isSelected: boolean = this.isSelected(item._id);
                        return (<TableRow
                            hover
                            role="checkbox"
                            onClick={() => this.onClickEventOnRow(item)}
                            onDoubleClick={() => this.onDoubleClicked(item)}
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
                {
                    ReactDOM.createPortal(
                        <ConfirmDialog
                            openDialog={this.state.openConfirm}
                            handlerOk={this.onClickDeleteOk}
                            handlerCancel={this.onClickCancelDelete} />,
                        document.getElementById("portal-container")
                    )
                }
            </React.Fragment>
        );

    }
}
export default SponsorList;