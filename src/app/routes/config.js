import { lazy } from "react";
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

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Login = lazy(() => import("../../pages/auth/Login"));
const Register = lazy(() => import("../../pages/auth/Register"));
const Groups = lazy(() => import("../../pages/groups/Groups"));
const Modules = lazy(() => import("../../pages/modules/Modules"));
const Members = lazy(() => import("../../pages/members/Members"));

const Plans = lazy(() => import("../../pages/accounting/plans/Plans"));
const Activities = lazy(() =>
  import("../../pages/accounting/activities/Activities")
);
const Funds = lazy(() => import("../../pages/accounting/funding/Funds"));
const LoanType = lazy(() =>
  import("../../pages/secretariat/loan-types/LoanTypes")
);
const InterestRates = lazy(() =>
  import("../../pages/secretariat/interest-rates/InterestRates")
);
const Loans = lazy(() => import("../../pages/secretariat/loans/Loans"));
const ReadLoan = lazy(() => import("../../pages/secretariat/loans/ReadLoan"));
const Guarantors = lazy(() =>
  import("../../pages/requests/commitments/Guarantors")
);
const LoanRequests = lazy(() =>
  import("../../pages/secretariat/loans/LoanRequests")
);

const Expenditures = lazy(() =>
  import("../../pages/accounting/expenditures/Expenditures")
);

const Mandates = lazy(() => import("../../pages/accounting/mandates/Mandates"));
const BatchExpenditures = lazy(() =>
  import("../../pages/accounting/mandates/BatchExpenditures")
);

const AccountTypes = lazy(() =>
  import("../../pages/secretariat/account-types/AccountTypes")
);

const ChartOfAccounts = lazy(() =>
  import("../../pages/secretariat/chart-of-accounts/ChartOfAccounts")
);

const Journals = lazy(() =>
  import("../../pages/book-keeping/journals/Journals")
);
const PostJournal = lazy(() =>
  import("../../pages/book-keeping/journals/PostJournal")
);

const JournalEntries = lazy(() =>
  import("../../pages/book-keeping/journal-entries/JournalEntries")
);

const Profile = lazy(() => import("../../pages/members/Profile"));
const Imports = lazy(() => import("../../pages/admin-center/imports/Imports"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    exact: false,
    requiresAuth: true,
  },
  {
    path: "/auth/login",
    component: Login,
    exact: false,
    requiresAuth: false,
  },
  {
    path: "/member/register",
    component: Register,
    exact: false,
    requiresAuth: false,
  },
  {
    path: GroupModel.init().path,
    component: Groups,
    exact: false,
    requiresAuth: true,
  },
  {
    path: ModuleModel.init().path,
    component: Modules,
    exact: false,
    requiresAuth: true,
  },
  {
    path: UserModel.init().path,
    component: Members,
    exact: false,
    requiresAuth: true,
  },
  {
    path: PlanModel.init().path,
    component: Plans,
    exact: false,
    requiresAuth: true,
  },
  {
    path: ActivityModel.init().path,
    component: Activities,
    exact: false,
    requiresAuth: true,
  },
  {
    path: FundModel.init().path,
    component: Funds,
    exact: false,
    requiresAuth: true,
  },
  {
    path: LoanTypeModel.init().path,
    component: LoanType,
    exact: false,
    requiresAuth: true,
  },
  {
    path: InterestRateModel.init().path,
    component: InterestRates,
    exact: false,
    requiresAuth: true,
  },
  {
    path: LoanModel.init().path,
    component: Loans,
    exact: false,
    requiresAuth: true,
  },
  {
    path: `${LoanModel.init().path}/:id/view`,
    component: ReadLoan,
    exact: false,
    requiresAuth: true,
  },
  {
    path: GuarantorModel.init().path,
    component: Guarantors,
    exact: false,
    requiresAuth: true,
  },
  {
    path: LoanRequestModel.init().path,
    component: LoanRequests,
    exact: false,
    requiresAuth: true,
  },
  {
    path: `${LoanRequestModel.init().path}/:id/schedule`,
    component: ReadLoan,
    exact: false,
    requiresAuth: true,
  },
  {
    path: ExpenditureModel.init().path,
    component: Expenditures,
    exact: false,
    requiresAuth: true,
  },
  {
    path: MandateModel.init().path,
    component: Mandates,
    exact: false,
    requiresAuth: true,
  },
  {
    path: `${MandateModel.init().path}/batch`,
    component: BatchExpenditures,
    exact: false,
    requiresAuth: true,
  },
  {
    path: AccountTypeModel.init().path,
    component: AccountTypes,
    exact: false,
    requiresAuth: true,
  },
  {
    path: ChartOfAccountModel.init().path,
    component: ChartOfAccounts,
    exact: false,
    requiresAuth: true,
  },
  {
    path: JournalModel.init().path,
    component: Journals,
    exact: false,
    requiresAuth: true,
  },
  {
    path: `${JournalModel.init().path}/:id/post`,
    component: PostJournal,
    exact: false,
    requiresAuth: true,
  },
  {
    path: JournalEntryModel.init().path,
    component: JournalEntries,
    exact: false,
    requiresAuth: true,
  },
  {
    path: "/accounts/member-profile",
    component: Profile,
    exact: false,
    requiresAuth: true,
  },
  {
    path: "/admin-center/imports",
    component: Imports,
    exact: false,
    requiresAuth: true,
  },
];

export default routes;
