import { useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import useCollection from "./useCollection";
import { ModelColumnsProps, TableBttnProps } from "../models/Model";

export interface EntityProps {
  id: number;
  [key: string]: unknown;
}

interface ServiceClassInstance {
  url: string;
  collection: (url: string) => Promise<{ record: EntityProps[] }>;
  createOrUpdate: (
    url: string,
    body: object,
    action: "store" | "update",
    param?: number
  ) => Promise<{ record: EntityProps }>;
  getDependencies: () => Promise<object>;
}

type Constructor = new (...args: any[]) => Model;

interface Model {
  columns: ModelColumnsProps[];
  manageButtons: TableBttnProps[];
}

// Define custom hooks to handle additional logic
const useEntityManager = (
  ControllerClass: new () => ServiceClassInstance,
  ModelClass: Constructor,
  customLogic?: {
    onManage?: (
      data: EntityProps,
      action:
        | "update"
        | "destroy"
        | "external"
        | "block"
        | "guarantors"
        | "view"
    ) => void;
    onSubmit?: (response: any) => void;
    onClose?: () => void;
  }
) => {
  const controller = useMemo(() => new ControllerClass(), [ControllerClass]);
  const model = useMemo(() => new ModelClass(), [ModelClass]);

  const { collection, updateCollection } = useCollection(controller);

  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<EntityProps | null>(null);

  const manage = (
    raw: EntityProps,
    action: "update" | "destroy" | "external" | "block" | "guarantors" | "view"
  ) => {
    if (customLogic?.onManage && action !== "update") {
      customLogic.onManage(raw, action);
    } else {
      setData(raw);
      setIsUpdating(true);
      setShow(true);
    }
  };

  const handleClose = useCallback(() => {
    if (customLogic?.onClose) {
      customLogic.onClose();
    } else {
      setShow(false);
      setIsUpdating(false);
      setData(null);
    }
  }, [customLogic]);

  const handleSubmit = (response: {
    record: EntityProps;
    action: "store" | "update" | "destroy" | "replace";
    message: string;
  }) => {
    if (customLogic?.onSubmit) {
      customLogic.onSubmit(response);
    } else {
      updateCollection(response.record, response.action);
      toast.success(response.message);
      handleClose();
    }
  };

  return {
    show,
    setShow,
    isUpdating,
    data,
    manage,
    handleClose,
    handleSubmit,
    collection,
    columns: model.columns,
    buttons: model.manageButtons,
  };
};

export default useEntityManager;
