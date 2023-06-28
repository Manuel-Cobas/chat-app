import { Contact } from "@prisma/client"

function ContactList({ contacts }: { contacts: Contact[] }) {
  if (!contacts || contacts.length === 0) return null

  return (
    <ul className="flex flex-col items-center w-full gap-2">
      {contacts.map((c) => (
        <li key={c.id} className="">
          {c.firstName}
        </li>
      ))}
    </ul>
  )
}

export default ContactList