// import StormDataTable from "src/components/tables/StormDataTable";
// import BarChart from "../components/charts/BarChart";
import TransactionPill from "../components/pages/TransactionPill";
import { useStateContext } from "src/app/providers/ContentProvider";
import { formatCurrency } from "src/app/helpers/Helpers";
import useCollection from "src/app/hooks/useCollection";
import DashboardController from "src/app/controllers/DashboardController";
import { useMemo } from "react";
import { currency } from "src/app/helpers/Helpers";

const Dashboard = () => {
  const { auth } = useStateContext();

  const memoizedController = useMemo(() => new DashboardController(), []);
  const { collection } = useCollection(memoizedController);

  return (
    <>
      <div className="container mb-3">
        <div className="col-md-12">
          <div className="flex space-between center-align gap-sm">
            <div style={{ flexGrow: 1 }} className="jumbotron">
              <div className="jumbotorn-header">
                <h1 className="page-title">Dashboard</h1>
                <small>A general overview of your profile</small>
              </div>

              <div className="jumbotron-body">
                <div className="flex center-align space-between gap-sm">
                  <div className="dashboard-items">
                    <div className="item-dash flex center-align gap-xl">
                      <ion-icon
                        style={{ fontSize: 23, color: "#d60b29" }}
                        name="gift-outline"
                      ></ion-icon>
                      <div className="flex column">
                        <h2>{formatCurrency(auth?.total_exposure)}</h2>
                        <p>Total Exposure</p>
                      </div>
                    </div>

                    <div className="item-dash flex center-align gap-xl">
                      <ion-icon
                        style={{ fontSize: 23, color: "#009bb0" }}
                        name="wallet-outline"
                      ></ion-icon>
                      <div className="flex column">
                        <h2>{formatCurrency(auth?.total_contribution)}</h2>
                        <p>Available Balance as of August 2024</p>
                      </div>
                    </div>

                    <div className="item-dash flex center-align gap-xl">
                      <ion-icon
                        style={{ fontSize: 23, color: "#68a14a" }}
                        name="briefcase-outline"
                      ></ion-icon>
                      <div className="flex column">
                        <h2>{formatCurrency(auth?.wallet?.contribution)}</h2>
                        <p>Current Contribution as of August 2024</p>
                      </div>
                    </div>

                    <div className="item-dash flex center-align gap-xl">
                      <ion-icon
                        style={{ fontSize: 23, color: "#a3005c" }}
                        name="receipt-outline"
                      ></ion-icon>
                      <div className="flex column">
                        <h2>{formatCurrency(0)}</h2>
                        <p>Cooperative Purchase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flexGrow: 1 }}>
              <div className="storm-card">
                <div className="storm-card-header mb-3">
                  <div className="flex center-align gap-md">
                    <ion-icon
                      style={{
                        color: "#8d8d8d",
                        fontSize: 16,
                      }}
                      name="cash-outline"
                    ></ion-icon>
                    <p className="subtitle">Recent Transactions</p>
                  </div>
                </div>

                <div className="storm-card-body">
                  {collection?.length > 0 ? (
                    collection?.map((payment, i) => (
                      <TransactionPill
                        key={i}
                        name={payment?.beneficiary}
                        description={payment?.description}
                        amount={currency(payment?.amount)}
                        type={payment?.flag}
                        status={payment?.status}
                      />
                    ))
                  ) : (
                    <TransactionPill
                      name="Empty Transaction"
                      description="No transaction here at this time"
                      amount={currency(0)}
                      type="debit"
                      status="pending"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="analysis">
        <div className="container-fluid">
          <div className="col-md-7 mb-3">
            <h5>Contributions</h5>
            <BarChart />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Dashboard;
