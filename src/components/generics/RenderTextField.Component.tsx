import * as React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
    WrappedFieldProps,
} from "redux-form";

type InputTexField = {
    className: string
};
const renderTextField: React.StatelessComponent<WrappedFieldProps & InputTexField> = (props: WrappedFieldProps & InputTexField) => {
    const { className, input, label, meta: { touched, error, asyncValidating, dirty } } = props;
    return (
        <React.Fragment><TextField
            placeholder={label}
            label={label}
            {...input}
            error={(error && touched)}
            className={className}
        />
            {(error && touched) && <FormHelperText error={error} className={className}>{error}</FormHelperText>}
        </React.Fragment>
    );
};
export default renderTextField;