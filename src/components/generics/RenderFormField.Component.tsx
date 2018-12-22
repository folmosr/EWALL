import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
    WrappedFieldInputProps,
    WrappedFieldProps
} from 'redux-form';
import Input from "@material-ui/core/Input";
import { uniqueId } from "lodash";

import InputTextField from '../../interfaces/InputTextField.interface';
import ISelectFieldProps from '../../interfaces/SelectField.Interface';

const onChange = (input: WrappedFieldInputProps) => (event: React.ChangeEvent<HTMLSelectElement>) =>
    input.onChange(event.target.value);

const renderTextField: React.StatelessComponent<InputTextField> = ({ className, input, label, disabled, meta: { touched, error, asyncValidating, dirty } }) => {
    return (
        <React.Fragment><TextField
            placeholder={label}
            label={label}
            {...input}
            error={(error && touched)}
            className={className}
            disabled={disabled}
        />
            {(error && touched) && <FormHelperText error={error} className={className}>{error}</FormHelperText>}
        </React.Fragment>
    );
};
const renderSelectField: React.StatelessComponent<ISelectFieldProps> = ({ className, input, children, label, disabled, meta: { touched, error, asyncValidating, dirty } }) => {
    const id = uniqueId();
    return (
        <React.Fragment>
            <Select
                error={touched && error}
                {...input}
                displayEmpty
                input={<Input name={input.name} id={id} />}
                onChange={onChange(input)}
                className={className}
            >
                {children}
            </Select>
            {(error && touched) && <FormHelperText error={error} className={className}>{error}</FormHelperText>}
        </React.Fragment>
    );
};
export { renderTextField, renderSelectField };