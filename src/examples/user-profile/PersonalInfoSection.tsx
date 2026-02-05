import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import { withForm } from "../../lib";
import { userProfileFormOptions, validators } from "./form-options";

/**
 * Personal information section of the user profile form.
 * Uses withForm to receive the form instance from the parent.
 */
export const PersonalInfoSection = withForm({
  ...userProfileFormOptions,
  render: function Render({ form }) {
    return (
      <Container header={<Header variant="h2">Personal Information</Header>}>
        <SpaceBetween size="l">
          <ColumnLayout columns={2}>
            <form.AppField
              name="firstName"
              validators={validators.forField("firstName")}
            >
              {(field) => <field.TextField label="First name" />}
            </form.AppField>

            <form.AppField
              name="lastName"
              validators={validators.forField("lastName")}
            >
              {(field) => <field.TextField label="Last name" />}
            </form.AppField>
          </ColumnLayout>

          <form.AppField name="email" validators={validators.forField("email")}>
            {(field) => (
              <field.TextField
                label="Email"
                type="email"
                placeholder="user@example.com"
              />
            )}
          </form.AppField>
        </SpaceBetween>
      </Container>
    );
  },
});
