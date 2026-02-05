import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import { withForm } from "../../lib";
import { userProfileFormOptions, validators } from "./form-options";

/**
 * Address section of the user profile form.
 * Uses withForm to receive the form instance from the parent.
 */
export const AddressSection = withForm({
  ...userProfileFormOptions,
  render: function Render({ form }) {
    return (
      <Container header={<Header variant="h2">Address</Header>}>
        <SpaceBetween size="l">
          <form.AppField
            name="street"
            validators={validators.forField("street")}
          >
            {(field) => (
              <field.TextField
                label="Street address"
                placeholder="123 Main St"
              />
            )}
          </form.AppField>

          <ColumnLayout columns={3}>
            <form.AppField name="city" validators={validators.forField("city")}>
              {(field) => <field.TextField label="City" />}
            </form.AppField>

            <form.AppField
              name="state"
              validators={validators.forField("state")}
            >
              {(field) => <field.TextField label="State" />}
            </form.AppField>

            <form.AppField
              name="zipCode"
              validators={validators.forField("zipCode")}
            >
              {(field) => (
                <field.TextField
                  label="ZIP code"
                  constraintText="5 digits minimum"
                />
              )}
            </form.AppField>
          </ColumnLayout>
        </SpaceBetween>
      </Container>
    );
  },
});
