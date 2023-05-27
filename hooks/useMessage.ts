import { ChangeEvent, useCallback, useState } from "react";

function useMessage() {
  const [content, setContent] = useState("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  }, []);

  const cleanInput = () => setContent("");

  return {
    content,
    cleanInput,
    onChange,
  };
}

export default useMessage;
