import Button from "@cloudscape-design/components/button";
import { useFormContext } from "./form-context";

interface SubmitButtonProps {
  label?: string;
}

/**
 * A submit button that integrates with TanStack Form and Cloudscape.
 * Automatically disables while the form is submitting.
 */
export function SubmitButton({ label = "Submit" }: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button variant="primary" disabled={isSubmitting} loading={isSubmitting}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
