import { useEffect, useState } from "react";

const useFetch = (url) => {
  // The url will be the endpoint that we fetch.

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeOut(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for the resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);
  // Passing the url as a dependency to useEffect. whenever the url changes, the useEffect will rerun to get the data for the endpoint.

  return { data, isPending, error };
};

export default useFetch;

// How do we use the custom hook across the components
// const { data, isPending, error } = useFetch('http://localhost:8000/blogs');
