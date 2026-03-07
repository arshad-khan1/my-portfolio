"use client";

import { person } from "@/resources";
import { Button, Heading, Text, Column, Row } from "@once-ui-system/core";

export const Contact: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Column maxWidth="xs" horizontal="center" gap="m">
        <Heading variant="display-strong-xs">
          Let's work together
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </Text>
        <Row gap="8">
          <Button
            href={`mailto:${person.email}`}
            variant="primary"
            size="m"
          >
            Contact Me
          </Button>
        </Row>
      </Column>
    </Column>
  );
};
