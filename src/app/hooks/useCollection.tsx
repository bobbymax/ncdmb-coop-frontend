import { useCallback, useEffect, useState } from "react";

interface DataProps {
  id: number;
}

export interface ServiceClassInstance {
  url: string;
  collection: (url: string) => Promise<{ record: DataProps[] }>;
}

const useCollection = (serviceInstance: ServiceClassInstance) => {
  const [collection, setCollection] = useState<DataProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const replaceCollection = useCallback((data: DataProps[]) => {
    setCollection(data);
  }, []);

  // Memoize the function to avoid unnecessary re-renders.
  const fetchCollection = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        // Since the collection method only needs a URL
        const { record } = await serviceInstance.collection(
          serviceInstance.url
        );

        // console.log(record);

        setCollection(record);
        setError(null); // Reset any previous errors
      } catch (err: unknown) {
        if (signal && signal.aborted) {
          console.log("Fetch aborted");
        } else {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch data.";
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [serviceInstance]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchCollection(signal);

    // Cleanup function to abort the fetch if the component unmounts
    return () => controller.abort();
  }, [fetchCollection]);

  const updateCollection = useCallback(
    (data: DataProps, action: "store" | "update" | "destroy" | "replace") => {
      if (action === "replace") {
        replaceCollection(Array.isArray(data) ? data : [data]);
      } else {
        setCollection((prevCollection) => {
          switch (action) {
            case "store":
              return [data, ...prevCollection];
            case "destroy":
              return prevCollection.filter((item) => item.id !== data.id);
            case "update":
              return prevCollection.map((item) =>
                item.id === data.id ? data : item
              );
            default:
              console.warn("Unknown action provided:", action);
              return prevCollection;
          }
        });
      }
    },
    [replaceCollection]
  );

  // Expose a refresh function to manually trigger a refetch
  const refresh = useCallback(() => {
    const controller = new AbortController();
    fetchCollection(controller.signal);
    return () => controller.abort();
  }, [fetchCollection]);

  return {
    collection,
    updateCollection,
    error,
    loading,
    refresh,
  };
};

export default useCollection;
