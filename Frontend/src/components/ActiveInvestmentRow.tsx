import type { ActiveInvestment } from "../types";

export default function ActiveInvestmentRow({ inv }: { inv: ActiveInvestment }) {
  return (
    <div
      className="table-row"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderBottom: "1px solid #1e293b",
        fontSize: "14px",
      }}
    >
      <span>{inv.id}</span>
      <span>{inv.name}</span>
      <span>${inv.amountInvested}</span>
      <span>${inv.expectedReturn}</span>
      <span>{new Date(inv.endTime).toLocaleTimeString()}</span>
    </div>
  );
}
