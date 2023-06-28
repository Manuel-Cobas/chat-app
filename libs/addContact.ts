import axios from "axios";

export function addContact(
  firstName: string,
  lastName: string,
  contactId: string
) {
  return axios
    .post("/api/contacts/add", {
      firstName,
      lastName,
      contactId,
    })
    .catch((err) => console.error(err))
    .then((res) => console.log(res));
}
