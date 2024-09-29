import { useCallback } from "react";
import Alert from "../../app/helpers/Alert";

interface ResourceActionsParams<T> {
  controller: {
    createOrUpdate: (
      url: string,
      body: Partial<T>,
      action: "store" | "update",
      param?: string | number
    ) => Promise<any>;
    destroy: (url: string, id: string | number) => Promise<any>;
    fetch: (url: string, params: string | number) => Promise<any>;
    url: string;
  };
  submit: (response: any) => void;
  resetState: () => void;
}

export const useResourceActions = <T,>({
  controller,
  submit,
  resetState,
}: ResourceActionsParams<T>) => {
  // Abstracted submit method
  const handleSubmit = useCallback(
    async (body: Partial<T>, isUpdating: boolean, id?: number) => {
      try {
        const response = await controller.createOrUpdate(
          controller.url,
          body,
          isUpdating ? "update" : "store",
          id
        );

        submit({
          ...response,
          action: isUpdating ? "update" : "store",
        });
      } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
      } finally {
        resetState();
      }
    },
    [controller, submit, resetState]
  );

  const fetchRecord = useCallback(
    async (url: string, params: string | number) => {
      try {
        const { record } = await controller.fetch(url, params);
        return record;
      } catch (error) {
        console.log(error);
      }
    },
    [controller]
  );

  // Abstracted destroy method
  const handleDestroy = useCallback(
    (id: number) => {
      Alert.flash(
        "Are You Sure?",
        "warning",
        "You will not be able to reverse this!!"
      ).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await controller.destroy(controller.url, id);
            submit({
              ...response,
              record: { id },
              action: "destroy",
            });
          } catch (error: any) {
            throw new Error(error.message || "Something went wrong");
          } finally {
            resetState();
          }
        }
      });
    },
    [controller, submit, resetState]
  );

  return { handleSubmit, handleDestroy, fetchRecord };
};
