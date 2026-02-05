import { z } from "zod";
import { createFormValidators, formOptions } from "../../lib";

// Define the complete form schema
export const userProfileSchema = z.object({
  // Personal info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  // Address
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),

  // Preferences
  newsletter: z.boolean(),
  notifications: z.boolean(),
});

// Create validators from the schema
export const validators = createFormValidators(userProfileSchema);

// Shared form options - used by withForm components for type checking
export const userProfileFormOptions = formOptions({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    newsletter: false,
    notifications: true,
  },
  validators: {
    // Form-level validation on submit as a safety net
    // Field-level validators handle the UX timing (onBlur + onChange when invalid)
    onSubmit: userProfileSchema,
  },
});
