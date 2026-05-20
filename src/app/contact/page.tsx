import { Meta, Schema, Column } from "@once-ui-system/core";
import { baseURL, contact, person } from "@/resources";
import { ScrollProgressBar } from "@/components/home/ScrollProgressBar";
import { ContactHero } from "@/components/contact/ContactHero";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function Contact() {
  return (
    <Column maxWidth="m" gap="0" paddingY="0" horizontal="center" fillWidth>
      <ScrollProgressBar />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${contact.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <ContactHero />
    </Column>
  );
}
