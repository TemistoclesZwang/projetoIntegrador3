// hooks/usePost.js
import { useState } from "react";

function usePost() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url: RequestInfo | URL, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (e) {
    //   setError(e.message);
      console.error("There was an error!", e);
    } finally {
      setLoading(false);
    }
  };

  return { postData, isLoading, error };
}

export default usePost;
