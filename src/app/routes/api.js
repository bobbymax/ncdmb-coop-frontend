import GroupModel from "../models/GroupModel";
import ModuleModel from "../models/ModuleModel";
import UserModel from "../models/UserModel";
import PlanModel from "../models/PlanModel";
import ActivityModel from "../models/ActivityModel";
import FundModel from "../models/FundModel";
import LoanTypeModel from "../models/LoanTypeModel";
import InterestRateModel from "../models/InterestRateModel";
import LoanModel from "../models/LoanModel";
import GuarantorModel from "../models/GuarantorModel";
import LoanRequestModel from "../models/LoanRequestModel";
import ExpenditureModel from "../models/ExpenditureModel";
import MandateModel from "../models/MandateModel";
import AccountTypeModel from "../models/AccountTypeModel";
import ChartOfAccountModel from "../models/ChartOfAccountModel";
import JournalModel from "../models/JournalModel";
import JournalEntryModel from "../models/JournalEntryModel";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import Groups from "src/pages/groups/Groups";
import Modules from "src/pages/modules/Modules";
import Members from "src/pages/members/Members";
import Plans from "src/pages/accounting/plans/Plans";
import Activities from "src/pages/accounting/activities/Activities";
import Funds from "src/pages/accounting/funding/Funds";
import LoanTypes from "src/pages/secretariat/loan-types/LoanTypes";
import InterestRates from "src/pages/secretariat/interest-rates/InterestRates";
import Loans from "src/pages/secretariat/loans/Loans";
import ReadLoan from "src/pages/secretariat/loans/ReadLoan";
import Guarantors from "src/pages/requests/commitments/Guarantors";
import LoanRequests from "src/pages/secretariat/loans/LoanRequests";
import Expenditures from "src/pages/accounting/expenditures/Expenditures";
import Mandates from "src/pages/accounting/mandates/Mandates";
import BatchExpenditures from "src/pages/accounting/mandates/BatchExpenditures";
import AccountTypes from "src/pages/secretariat/account-types/AccountTypes";
import ChartOfAccounts from "src/pages/secretariat/chart-of-accounts/ChartOfAccounts";
import Journals from "src/pages/book-keeping/journals/Journals";
import PostJournal from "src/pages/book-keeping/journals/PostJournal";
import JournalEntries from "src/pages/book-keeping/journal-entries/JournalEntries";
import Profile from "src/pages/members/Profile";
import Imports from "src/pages/admin-center/imports/Imports";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    requiresAuth: true,
  },
  {
    path: "/auth/login",
    component: Login,
    requiresAuth: false,
  },
  {
    path: "/member/register",
    component: Register,
    requiresAuth: false,
  },
  {
    path: GroupModel.init().path,
    component: Groups,
    requiresAuth: true,
  },
  {
    path: ModuleModel.init().path,
    component: Modules,
    requiresAuth: true,
  },
  {
    path: UserModel.init().path,
    component: Members,
    requiresAuth: true,
  },
  {
    path: PlanModel.init().path,
    component: Plans,
    requiresAuth: true,
  },
  {
    path: ActivityModel.init().path,
    component: Activities,
    requiresAuth: true,
  },
  {
    path: FundModel.init().path,
    component: Funds,
    requiresAuth: true,
  },
  {
    path: LoanTypeModel.init().path,
    component: LoanTypes,
    requiresAuth: true,
  },
  {
    path: InterestRateModel.init().path,
    component: InterestRates,
    requiresAuth: true,
  },
  {
    path: LoanModel.init().path,
    component: Loans,
    requiresAuth: true,
  },
  {
    path: `${LoanModel.init().path}/:id/view`,
    component: ReadLoan,
    requiresAuth: true,
  },
  {
    path: GuarantorModel.init().path,
    component: Guarantors,
    requiresAuth: true,
  },
  {
    path: LoanRequestModel.init().path,
    component: LoanRequests,
    requiresAuth: true,
  },
  {
    path: `${LoanRequestModel.init().path}/:id/schedule`,
    component: ReadLoan,
    requiresAuth: true,
  },
  {
    path: ExpenditureModel.init().path,
    component: Expenditures,
    requiresAuth: true,
  },
  {
    path: MandateModel.init().path,
    component: Mandates,
    requiresAuth: true,
  },
  {
    path: `${MandateModel.init().path}/batch`,
    component: BatchExpenditures,
    requiresAuth: true,
  },
  {
    path: AccountTypeModel.init().path,
    component: AccountTypes,
    requiresAuth: true,
  },
  {
    path: ChartOfAccountModel.init().path,
    component: ChartOfAccounts,
    requiresAuth: true,
  },
  {
    path: JournalModel.init().path,
    component: Journals,
    requiresAuth: true,
  },
  {
    path: `${JournalModel.init().path}/:id/post`,
    component: PostJournal,
    requiresAuth: true,
  },
  {
    path: JournalEntryModel.init().path,
    component: JournalEntries,
    requiresAuth: true,
  },
  {
    path: "/accounts/member-profile",
    component: Profile,
    requiresAuth: true,
  },
  {
    path: "/admin-center/imports",
    component: Imports,
    requiresAuth: true,
  },
];

export default routes;
