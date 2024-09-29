/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { EntityProps } from "./useEntityManager";
import _ from "lodash";

interface ServiceClassInstance {
  url: string;
  fetch: (
    url: string,
    params: string | number
  ) => Promise<{ record: EntityProps } | undefined>;
}

const useFetchSingleManager = (
  ControllerClass: new () => ServiceClassInstance,
  custom?: {
    logic?: () => void;
  }
) => {
  const controller = useMemo(() => new ControllerClass(), [ControllerClass]);
  const { id } = useParams<{ id: string }>();

  const [raw, setRaw] = useState<EntityProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRawData = async (id: string | number) => {
    try {
      setIsLoading(true);
      const response = await controller.fetch(controller.url, id);

      if (_.isObject(response) && _.has(response, "record")) {
        setRaw(response.record);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRawData(id);
    }
  }, [id]);

  return { raw, setRaw, isLoading };
};

export default useFetchSingleManager;
