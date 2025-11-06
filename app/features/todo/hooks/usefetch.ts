import { useEffect, useState } from "react";

type ApiResult = {
  todos: any[];
  total: number;
  skip: number;
  limit: number;
};

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Gagal mengambil data: Status ${response.status}`);
        }

        const result: ApiResult = await response.json();

        if (isMounted) {
          setData(result.todos || []);
        }
      } catch (err) {
        if (isMounted) {
          // setError(err.message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
