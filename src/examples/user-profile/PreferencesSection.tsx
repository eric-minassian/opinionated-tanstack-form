import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { withForm } from "../../lib";
import { userProfileFormOptions } from "./form-options";

/**
 * Preferences section of the user profile form.
 * Uses withForm to receive the form instance from the parent.
 */
export const PreferencesSection = withForm({
  ...userProfileFormOptions,
  render: function Render({ form }) {
    return (
      <Container header={<Header variant="h2">Preferences</Header>}>
        <SpaceBetween size="m">
          <form.AppField name="newsletter">
            {(field) => (
              <field.CheckboxField
                label="Subscribe to newsletter"
                description="Receive weekly updates about new features and tips"
              />
            )}
          </form.AppField>

          <form.AppField name="notifications">
            {(field) => (
              <field.CheckboxField
                label="Enable notifications"
                description="Get notified about important account activity"
              />
            )}
          </form.AppField>
        </SpaceBetween>
      </Container>
    );
  },
});
