import moment from "moment";
import { currency } from "../../app/helpers/Helpers";
import Button from "../forms/Button";

interface ExpenditureBatchCardProps {
  id: number;
  flag: "credit" | "debit";
  created_at: string | undefined;
  beneficiary: string;
  amount: number | string;
  activity: string | undefined;
  description: string;
  addToBatch: (value: number) => void;
  isDisabled: boolean;
}

const ExpenditureBatchCard = ({
  id,
  flag,
  created_at,
  beneficiary,
  amount,
  activity,
  description,
  addToBatch,
  isDisabled,
}: ExpenditureBatchCardProps) => {
  return (
    <div className="exp-item">
      <div className="exp-top-header flex center-align space-between gap-sm mb-3">
        <span className={`line ${flag}`}>{flag}</span>
        <span className="line">{`Raised on: ${moment(created_at).format(
          "LL"
        )}`}</span>
      </div>
      <div className="exp-header mb-2">
        <h4 className="exp-beneficiary">{beneficiary}</h4>
        <small className="line">{activity}</small>
      </div>
      <div className="exp-body mb-4">
        <h2>{currency(amount)}</h2>
        <span className="line">{description}</span>
      </div>
      <Button
        label="Add to Batch"
        variant="info"
        handleClick={() => addToBatch(id)}
        size="sm"
        icon="medkit"
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default ExpenditureBatchCard;
