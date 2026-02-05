import { createFormHookContexts } from "@tanstack/react-form";

// Create contexts for field and form - exported separately to avoid circular deps
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
