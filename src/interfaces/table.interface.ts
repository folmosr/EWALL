interface ITable {
    updateSelectedInParent: (selected: Array<string>) => void;
    handleClick: (id: string) => void;
    isSelected: (id: string) => void;
}
export default ITable;