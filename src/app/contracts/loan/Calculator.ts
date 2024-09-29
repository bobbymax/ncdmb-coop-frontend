interface LoanCalculatorData {
  interestRate: number;
  loanAmount: number;
  tenor: number;
  commitment: number;
  frequency: "monthly" | "annually";
  type: "single" | "compound";
  deduction: number;
  base_iterable_amount: "requested" | "total" | "reduced";
  total_recieveable_amount: "all" | "deducted";
  available_balance: number;
  member_name: string;
  max_requestable_amount: number;
  start_month: string;
}

interface RepaymentSchedule {
  year: number;
  month: string;
  repayment_date: string; // e.g., "January 2024"
  amount: number;
  balance: number;
}

export interface CalculatorResponse {
  requested_amount: number;
  deductable_amount: number;
  commitment_amount: number;
  commitment: number;
  interest_rate: number;
  total_amount_recieveable: number;
  total_amount_payable: number;
  total_interest_payable: number;
  schedule: RepaymentSchedule[];
  principal: number;
}

export default abstract class Calculator {
  public interestRate;
  public loanAmount;
  public tenor;
  public commitment;
  public frequency;
  public type;
  public deduction;
  public base_iterable_amount;
  public total_recieveable_amount;
  public available_balance;
  public member_name;
  public max_requestable_amount;
  public start_month;

  constructor(data: LoanCalculatorData) {
    this.interestRate = data.interestRate;
    this.loanAmount = data.loanAmount;
    this.tenor = data.tenor;
    this.commitment = data.commitment;
    this.frequency = data.frequency;
    this.type = data.type;
    this.deduction = data.deduction;
    this.base_iterable_amount = data.base_iterable_amount;
    this.total_recieveable_amount = data.total_recieveable_amount;
    this.available_balance = data.available_balance;
    this.member_name = data.member_name;
    this.max_requestable_amount = data.max_requestable_amount;
    this.start_month = new Date(data.start_month);
  }

  public abstract init(): CalculatorResponse;

  protected eligibility(): boolean {
    return (
      this.walletAndRequestedAmount() &&
      this.requestedAmountAndMaxRequestableAmount()
    );
  }

  protected walletAndRequestedAmount(): boolean {
    return this.available_balance * 2 <= this.loanAmount;
  }

  protected requestedAmountAndMaxRequestableAmount(): boolean {
    return this.loanAmount <= this.max_requestable_amount;
  }

  protected getCommitmentAmount = (): number => {
    if (this.commitment < 1) {
      return 0;
    }
    return (this.commitment / 100) * this.loanAmount;
  };

  protected getInterestRateAmount = (): number => {
    return (this.interestRate / 100) * this.requestable();
  };

  protected totalPayableAmount = (): number => {
    return this.requestable() + this.getInterestRateAmount();
  };

  protected requestable = (): number => {
    return this.loanAmount - this.getCommitmentAmount();
  };

  protected getDeductibleAmount = (): number => {
    if (this.deduction < 1) {
      return 0;
    }

    return (this.deduction / 100) * this.requestable();
  };

  protected totalRecieveableAmount = (): number => {
    if (this.total_recieveable_amount === "deducted") {
      return (
        this.requestable() -
        this.getDeductibleAmount() -
        this.getInterestRateAmount()
      );
    }

    return this.requestable();
  };

  protected getPrincipal = (): number => {
    let principal: number = 0;
    switch (this.base_iterable_amount) {
      case "total":
        principal = this.requestable() + this.getInterestRateAmount();
        break;

      default:
        principal = this.requestable();
        break;
    }

    return principal;
  };

  protected getInstallment = (): number => {
    return this.getPrincipal() / this.tenor;
  };

  protected schedule = (): RepaymentSchedule[] => {
    if (this.frequency === "annually") {
      return this.yearlyRepayments();
    }

    return this.monthlyRepayments();
  };

  protected monthlyRepayments = (): RepaymentSchedule[] => {
    const repaymentSchedule: RepaymentSchedule[] = [];

    const installment = this.getInstallment();

    let currentDate = new Date(this.start_month);
    let remainingBalance = this.getPrincipal();

    for (let i = 0; i < this.tenor; i++) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
      });
      remainingBalance -= installment;

      repaymentSchedule.push({
        year: currentYear,
        month: currentMonth,
        repayment_date: `${currentMonth} ${currentYear}`,
        amount: parseFloat(installment.toFixed(2)),
        balance: parseFloat(remainingBalance.toFixed(2)),
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return repaymentSchedule;
  };

  protected yearlyRepayments = (): RepaymentSchedule[] => {
    const repaymentSchedule: RepaymentSchedule[] = [];

    const installment = this.getInstallment();

    const startYear = this.start_month.getFullYear();
    let remainingBalance = this.getPrincipal();

    for (let i = 0; i < this.tenor; i++) {
      const currentYear = startYear + i;
      remainingBalance -= installment;

      repaymentSchedule.push({
        year: currentYear,
        month: "January",
        repayment_date: `January ${currentYear}`,
        amount: parseFloat(installment.toFixed(2)),
        balance: parseFloat(remainingBalance.toFixed(2)),
      });
    }

    return repaymentSchedule;
  };
}
