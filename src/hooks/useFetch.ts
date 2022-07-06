import { useState, useEffect, useCallback } from "react";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetch(url)
      .then(async (res) => setData(await res.json()))
      .catch((err) => setError(err));
    setLoading(false);
  }, [url]);

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  return { data, loading, error, refetch };
}
