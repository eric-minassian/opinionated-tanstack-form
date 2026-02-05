import { z } from "zod";

/**
 * Error type returned by field validators.
 * TanStack Form accepts string | undefined from validator functions.
 */
type ValidationError = string | undefined;

/**
 * The field API shape we need for checking existing errors.
 * This is a minimal interface matching TanStack Form's FieldApi.
 */
interface FieldApiForValidation {
  state: {
    meta: {
      errors: string[];
    };
  };
}

/**
 * Validates a value against a Zod schema and returns the first error message.
 */
function getFirstZodError<T>(schema: z.ZodType<T>, value: T): ValidationError {
  const result = schema.safeParse(value);
  if (result.success) {
    return undefined;
  }
  return result.error.issues[0]?.message;
}

/**
 * Creates field validators implementing the "onBlur + onChange (when invalid)" pattern.
 *
 * Validation timing:
 * - onBlur: Always validates when user leaves the field
 * - onChange: Only validates if field already has errors (user is correcting)
 * - onSubmit: Always validates as a final safety net
 *
 * This provides optimal UX: users aren't interrupted while typing,
 * but get immediate feedback when fixing mistakes.
 *
 * @param schema - A Zod schema for the field value
 * @returns Validators object compatible with TanStack Form's field validators
 *
 * @example
 * ```tsx
 * <form.AppField
 *   name="email"
 *   validators={createFieldValidators(z.string().email())}
 * >
 * ```
 */
export function createFieldValidators<T>(schema: z.ZodType<T>) {
  return {
    onBlur: ({ value }: { value: T }): ValidationError => {
      return getFirstZodError(schema, value);
    },

    onSubmit: ({ value }: { value: T }): ValidationError => {
      return getFirstZodError(schema, value);
    },

    onChange: ({
      value,
      fieldApi,
    }: {
      value: T;
      fieldApi: FieldApiForValidation;
    }): ValidationError => {
      // Only validate on change if the field already has errors.
      // This prevents showing errors while the user is still typing,
      // but provides immediate feedback when they're correcting a mistake.
      const hasExistingErrors = fieldApi.state.meta.errors.length > 0;
      if (!hasExistingErrors) {
        return undefined;
      }
      return getFirstZodError(schema, value);
    },
  };
}

/**
 * Infer the output type of a Zod object schema's field.
 */
type InferFieldType<
  TSchema extends z.ZodObject<z.ZodRawShape>,
  TKey extends keyof z.infer<TSchema>,
> = z.infer<TSchema>[TKey];

/**
 * Creates a helper for extracting field validators from a form-level Zod schema.
 *
 * This allows you to define validation rules once in a schema and use them
 * across your form with full type safety on field names.
 *
 * @param schema - A Zod object schema defining the form structure
 * @returns An object with a `forField` method to get validators for specific fields
 *
 * @example
 * ```tsx
 * const formSchema = z.object({
 *   email: z.string().email(),
 *   age: z.number().min(18),
 * });
 *
 * const validators = createFormValidators(formSchema);
 *
 * // Type-safe: only allows "email" or "age"
 * <form.AppField name="email" validators={validators.forField("email")} />
 * ```
 */
export function createFormValidators<
  TSchema extends z.ZodObject<z.ZodRawShape>,
>(schema: TSchema) {
  type FormData = z.infer<TSchema>;
  type FieldName = keyof FormData & string;

  return {
    /**
     * Get validators for a specific field.
     *
     * Note: Due to TypeScript limitations with Zod's shape types, the returned
     * validators use the inferred field type. This maintains runtime safety
     * while providing good IDE autocomplete for field names.
     */
    forField<K extends FieldName>(fieldName: K) {
      // Access the field schema from the shape.
      // The shape property contains the raw Zod schemas for each field.
      const fieldSchema = schema.shape[fieldName] as z.ZodType<
        InferFieldType<TSchema, K>
      >;
      return createFieldValidators(fieldSchema);
    },

    /** The original schema, useful for form-level validation or type inference. */
    schema,
  };
}
