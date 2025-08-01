import {createSafeContext} from "../utils/create-safe-context";

export interface FormContext {
    control: any;
    errors: any;
}

export const [FormContextProvider, useFormContext] = createSafeContext<FormContext>(
    'Form component was not found in the tree',
);
