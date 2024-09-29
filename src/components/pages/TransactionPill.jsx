const TransactionPill = ({
  name = "",
  description = "",
  amount = "",
  type = "",
  status = "",
}) => {
  return (
    <div className="transactions">
      <div
        className={`status-pills ${type === "credit" ? "success" : "danger"}`}
      >
        {type}
      </div>
      <div className="flex center-align space-between">
        <div
          className="beneficiary-details flex center-align gap-xl"
          style={{ flexGrow: 2 }}
        >
          <ion-icon
            style={{
              fontSize: 24,
              color: type === "credit" ? "#68a14a" : "#d60b29",
            }}
            name={type === "credit" ? "wallet" : "wallet-outline"}
          ></ion-icon>
          <div>
            <p>{name}</p>
            <small>{description}</small>
          </div>
        </div>
        <div className="transaction-amount" style={{ flexGrow: 1 }}>
          <p>{amount}</p>
        </div>
        <div className="payment-status" style={{ flexGrow: 1 }}>
          <ion-icon
            style={{
              fontSize: 16,
              color: status !== "paid" ? "#fe9f00" : "#68a14a",
            }}
            name={status === "paid" ? "checkmark-done-circle" : "footsteps"}
          ></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default TransactionPill;
