import { useEffect, useState } from "react";
import { getState, invest } from "../services/api";
import type { UserState } from "../types";
import InvestmentRow from "../components/InvestmentRow";
import ActiveInvestmentRow from "../components/ActiveInvestmentRow";

export default function InvestmentConsole() {
  const user = localStorage.getItem("user")!;
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    const fetch = async () => setState(await getState(user));
    fetch();
    const i = setInterval(fetch, 1000);
    return () => clearInterval(i);
  }, [user]);

  if (!state) return null;

  const investmentOptions = [
    { name: "Short Term", required: 10, minReturn: 15, maxReturn: 25, duration: "10s" },
    { name: "Mid Term", required: 100, minReturn: 200, maxReturn: 300, duration: "30s" },
    { name: "Long Term", required: 1000, minReturn: 2500, maxReturn: 3500, duration: "1m" },
  ];

  return (
    <div className="investments-page">
      <div className="investments-card fade-in">

        {/* Header */}
        <div className="top-bar">
          <div className="hello">👋 Hello, {state.userName}</div>
          <div className="balance-box">
            <div>💰 Balance: ${state.balance}</div>
            <div className="updated">
              ⏱ Last update: {new Date(state.lastUpdated).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Active Investments */}
        <h3>📈 Current Investments</h3>
        <div className="table">
          <div className="table-header">
            <span>ID</span>
            <span>Name</span>
            <span>Invested</span>
            <span>Expected</span>
            <span>Ends</span>
          </div>
          {state.activeInvestments.map(inv => (
            <ActiveInvestmentRow key={inv.id} inv={inv} />
          ))}
        </div>

        {/* Available Investments */}
        <h3>🧩 Available Investments</h3>
        <div className="table">
          <div className="table-header">
            <span>Name</span>
            <span>Required</span>
            <span>Expected</span>
            <span>Duration</span>
            <span></span>
          </div>

          {investmentOptions.map(opt => (
            <InvestmentRow
              key={opt.name}
              name={opt.name}
              required={opt.required}
              minReturn={opt.minReturn}
              maxReturn={opt.maxReturn}
              duration={opt.duration}
              balance={state.balance}
              isActive={state.activeInvestments.some(i => i.name === opt.name)}
              onInvest={async () => {
                try {
                  await invest(user, opt.name);
                } catch (e: any) {
                  alert(e);
                }
              }}
            />
          ))}

        </div>

      </div>

      {/* Styles */}
      <style>{`
        .investments-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f172a;
          color: #e5e7eb;
          font-family: system-ui;
        }

        .investments-card {
          width: 1000px;
          background: #020617;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 0 40px rgba(0,0,0,0.6);
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .hello {
          font-size: 20px;
          font-weight: 600;
        }

        .balance-box {
          text-align: right;
          font-size: 14px;
          opacity: 0.9;
        }

        .updated {
          font-size: 12px;
          opacity: 0.6;
        }

        h3 {
          margin: 24px 0 12px;
          border-bottom: 1px solid #1e293b;
          padding-bottom: 6px;
        }

        .table {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .table-header {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          font-size: 13px;
          opacity: 0.6;
          padding: 8px 12px;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
