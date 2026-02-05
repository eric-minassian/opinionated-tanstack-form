import { createFormHook, formOptions } from "@tanstack/react-form";
import {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} from "./form-context";
import { TextField, CheckboxField } from "./cloudscape-fields";
import { SubmitButton } from "./cloudscape-form-components";

// Re-export validation utilities
export { createFieldValidators, createFormValidators } from "./validation";

// Re-export formOptions and contexts for convenience
export {
  formOptions,
  useFieldContext,
  useFormContext,
  fieldContext,
  formContext,
};

// Create the form hook with Cloudscape components
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
});
