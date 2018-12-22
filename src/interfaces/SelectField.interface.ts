import { WrappedFieldProps } from "redux-form";

export default interface ISelectFieldProps extends WrappedFieldProps {
    children: React.ComponentType;
    className: string;
    disabled: boolean,
    label: string
}