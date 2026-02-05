import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useAppForm } from "../../lib";
import { userProfileFormOptions } from "./form-options";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { AddressSection } from "./AddressSection";
import { PreferencesSection } from "./PreferencesSection";

/**
 * User profile page demonstrating form composition with withForm.
 *
 * This example shows how to break a large form into smaller, reusable pieces:
 * - Each section is defined with `withForm` in its own file
 * - The parent component creates the form and passes it to each section
 * - All sections share the same form state and validation
 */
export function UserProfilePage() {
  const form = useAppForm({
    ...userProfileFormOptions,
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", value);
      alert("Profile saved successfully!");
    },
  });

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout header={<Header variant="h1">Edit Profile</Header>}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button variant="link" onClick={() => form.reset()}>
                    Cancel
                  </Button>
                  <form.AppForm>
                    <form.SubmitButton label="Save profile" />
                  </form.AppForm>
                </SpaceBetween>
              }
            >
              <SpaceBetween size="l">
                {/* Each section receives the form instance */}
                <PersonalInfoSection form={form} />
                <AddressSection form={form} />
                <PreferencesSection form={form} />
              </SpaceBetween>
            </Form>
          </form>
        </ContentLayout>
      }
    />
  );
}
