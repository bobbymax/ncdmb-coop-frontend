import Calculator, { CalculatorResponse } from "./Calculator";

export default class LoanOffer extends Calculator {
  public init(): CalculatorResponse {
    return {
      requested_amount: this.loanAmount,
      deductable_amount: this.getDeductibleAmount(),
      commitment_amount: this.getCommitmentAmount(),
      commitment: this.commitment,
      interest_rate: this.interestRate,
      total_amount_recieveable: this.totalRecieveableAmount(),
      total_amount_payable: this.totalPayableAmount(),
      total_interest_payable: this.getInterestRateAmount(),
      schedule: this.schedule(),
      principal: this.requestable(),
    };
  }
}
