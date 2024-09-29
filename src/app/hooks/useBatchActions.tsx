import { useCallback, useEffect, useState } from "react";
import { ExpenditureData } from "../models/ExpenditureModel";
import Alert from "../helpers/Alert";

interface ActionParams {
  max_batch_value: number;
  expenditures: ExpenditureData[];
}

interface BoardData extends ExpenditureData {
  position?: number;
}

const useBatchActions = ({ max_batch_value, expenditures }: ActionParams) => {
  const [board, setBoard] = useState<BoardData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [fundId, setFundId] = useState<number>(0);
  const [maxNumberReached, setMaxNumberReached] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<BoardData | null>(null);

  // add && remove elements
  const addExpenditure = useCallback(
    (expId: number) => {
      // Fetch expenditure from collection
      const expenditure = expenditures.find((exp) => exp.id === expId);

      if (!expenditure) {
        console.error(`Expenditure with ID ${expId} not found`);
        return;
      }

      // Check if this is the first element to be on Board
      if (board.length < 1) {
        setFundId(expenditure.fund_id);
      }

      // Set the position of the element
      const position = expenditures.indexOf(expenditure);

      const data = {
        ...expenditure,
        position,
      };

      Alert.flash("Add Payment", "info", "Add this payment to mandate?").then(
        (result) => {
          if (result.isConfirmed) {
            if (board.length < max_batch_value) {
              setBoard((prevBoard) => [data, ...prevBoard]);
              setMaxNumberReached(false);
            } else {
              setMaxNumberReached(true);
            }
          }
        }
      );
    },
    [board, expenditures, max_batch_value]
  );

  const removeExpenditure = useCallback(
    (expId: number) => {
      // Set the position of the element
      //   const position = expenditures.indexOf(exp);
      const boardItem = board.find((item) => item.id === expId);

      // Handle case where boardItem is not found
      if (!boardItem) {
        console.error(`Board item with ID ${expId} not found.`);
        return;
      }

      Alert.flash(
        "Remove Payment",
        "error",
        "Remove this payment from mandate?"
      ).then((result) => {
        if (result.isConfirmed) {
          setBoard((prevBoard) =>
            prevBoard.filter((line) => line.id !== boardItem.id)
          );

          setDeletedItem({ ...boardItem, position: undefined });
        }
      });
    },
    [board]
  );

  useEffect(() => {
    const getTotal = () => {
      const total = board
        .map((exp) => parseFloat(exp.amount))
        .reduce((acc, current) => acc + current, 0);

      setTotal(total);
    };

    setMaxNumberReached(board.length >= max_batch_value);
    getTotal();
  }, [board, max_batch_value]);

  return {
    board,
    total,
    fundId,
    setFundId,
    maxNumberReached,
    deletedItem,
    setDeletedItem,
    addExpenditure,
    removeExpenditure,
  };
};

export default useBatchActions;
