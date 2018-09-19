interface ITable {
    updateSelectedInParent: (selected: Array<string>) => void;
    handleClick: (id: string) => void;
    isSelected: (id: string) => void;
    deleteElements: () => void;
    onClickDeleteOk: () => void;
    onClickCancelDelete: () => void;
}
export default ITable;