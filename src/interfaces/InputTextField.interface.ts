import { WrappedFieldProps } from "redux-form";

export default interface  InputTexField extends WrappedFieldProps {
    className: string;
    disabled: boolean,
    label: string
};