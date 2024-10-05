import { lazy } from "react";

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
    path: "/admin-center/groups",
    component: Groups,
    requiresAuth: true,
  },
  {
    path: "/admin-center/modules",
    component: Modules,
    requiresAuth: true,
  },
  {
    path: "/secretariat/members",
    component: Members,
    requiresAuth: true,
  },
  {
    path: "/accounting/plans",
    component: Plans,
    requiresAuth: true,
  },
  {
    path: "/accounting/activities",
    component: Activities,
    requiresAuth: true,
  },
  {
    path: "/accounting/funds",
    component: Funds,
    requiresAuth: true,
  },
  {
    path: "/secretariat/loan-types",
    component: LoanType,
    requiresAuth: true,
  },
  {
    path: "/secretariat/interest-rates",
    component: InterestRates,
    requiresAuth: true,
  },
  {
    path: "/requests/loan-requests",
    component: Loans,
    requiresAuth: true,
  },
  {
    path: "/requests/loan-requests/:id/view",
    component: ReadLoan,
    requiresAuth: true,
  },
  {
    path: "/requests/commitments",
    component: Guarantors,
    requiresAuth: true,
  },
  {
    path: "/secretariat/loans",
    component: LoanRequests,
    requiresAuth: true,
  },
  {
    path: "/secretariat/loans/:id/schedule",
    component: ReadLoan,
    requiresAuth: true,
  },
  {
    path: "/accounting/expenditures",
    component: Expenditures,
    requiresAuth: true,
  },
  {
    path: "/accounting/mandates",
    component: Mandates,
    requiresAuth: true,
  },
  {
    path: "/accounting/mandates/batch",
    component: BatchExpenditures,
    requiresAuth: true,
  },
  {
    path: "/secretariat/account-types",
    component: AccountTypes,
    requiresAuth: true,
  },
  {
    path: "/secretariat/chart-of-accounts",
    component: ChartOfAccounts,
    requiresAuth: true,
  },
  {
    path: "/book-keeping/journals",
    component: Journals,
    requiresAuth: true,
  },
  {
    path: "/book-keeping/journals/:id/post",
    component: PostJournal,
    requiresAuth: true,
  },
  {
    path: "/book-keeping/journal-entries",
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
