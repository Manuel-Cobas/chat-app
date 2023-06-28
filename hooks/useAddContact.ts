import { useState, useCallback, type ChangeEvent } from "react";

export function useAddContact(defaultFirstName = "") {
  const [form, setForm] = useState({
    firstName: defaultFirstName,
    lastName: "",
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      console.log("from", e.target.name, e.target.value);
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  return {
    firstName: form.firstName,
    lastName: form.lastName,
    onChange,
  };
}
