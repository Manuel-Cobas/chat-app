import Contact from "@/components/Contact";
import type { ContactPayload } from "@/components/types";

function ContactList({ contacts }: { contacts: ContactPayload[] }) {
  if (!contacts || contacts.length === 0) return null

  return (
    <ul className="flex flex-col items-center w-screen pt-4 gap-2">
      {contacts.map((c) => (
        <li key={c.id} className="">
          <Contact contact={c.contact} />
        </li>
      ))}
    </ul>
  )
}

export default ContactList