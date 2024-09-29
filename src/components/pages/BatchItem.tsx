import { currency } from "../../app/helpers/Helpers";
import Button from "../forms/Button";
import Icon from "../forms/Icon";

interface BoardItemProps {
  beneficiary: string;
  amount: number | string;
  expId: number;
  removeItem: (value: number) => void;
}

const BatchItem = ({
  beneficiary,
  amount,
  expId,
  removeItem,
}: BoardItemProps) => {
  return (
    <div className="board-item">
      <div className="flex center-align space-between">
        <div className="flex center-align gap-xl">
          <Icon icon="logo-paypal" />
          <div>
            <small className="line">{beneficiary}</small>
            <h4>{currency(amount)}</h4>
          </div>
        </div>
        <Button
          variant="danger"
          handleClick={() => removeItem(expId)}
          size="nm"
          icon="trash-bin"
          fontSize={15}
          rounded
        />
      </div>
    </div>
  );
};

export default BatchItem;
