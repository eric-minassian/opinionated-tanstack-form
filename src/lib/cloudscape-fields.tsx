import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Checkbox from "@cloudscape-design/components/checkbox";
import { useFieldContext } from "./form-context";

interface TextFieldProps {
  label: string;
  description?: string;
  constraintText?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "url" | "search";
}

/**
 * A text input field that integrates with TanStack Form and Cloudscape.
 * Uses field context for automatic state management and error display.
 */
export function TextField({
  label,
  description,
  constraintText,
  placeholder,
  type = "text",
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const firstError = field.state.meta.errors[0];

  return (
    <FormField
      label={label}
      description={description}
      constraintText={constraintText}
      errorText={typeof firstError === "string" ? firstError : undefined}
    >
      <Input
        value={field.state.value}
        onChange={({ detail }) => field.handleChange(detail.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
        type={type}
      />
    </FormField>
  );
}

interface CheckboxFieldProps {
  label: string;
  description?: string;
}

/**
 * A checkbox field that integrates with TanStack Form and Cloudscape.
 * Uses field context for automatic state management.
 */
export function CheckboxField({ label, description }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  return (
    <Checkbox
      checked={field.state.value}
      onChange={({ detail }) => field.handleChange(detail.checked)}
      description={description}
    >
      {label}
    </Checkbox>
  );
}
