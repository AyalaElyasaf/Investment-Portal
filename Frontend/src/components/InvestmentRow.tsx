import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

interface InvestmentRowProps {
  name: string;
  required: number;
  minReturn: number;
  maxReturn: number;
  duration: string;
  balance: number;
  isActive: boolean;
  onInvest: () => void;
}

export default function InvestmentRow({
  name,
  required,
  minReturn,
  maxReturn,
  duration,
  balance,
  isActive,
  onInvest,
}: InvestmentRowProps) {
  //const user = localStorage.getItem("user")!;
  const [confirm, setConfirm] = useState(false);

  const disabled = balance < required || isActive;
  let reason = "";
  if (balance < required) reason = "Insufficient balance";
  else if (isActive) reason = "Already invested";

  return (
    <div className="table-row" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", alignItems: "center", gap: "8px", padding: "6px 12px", borderBottom: "1px solid #1e293b" }}>
      <span>{name}</span>
      <span>${required}</span>
      <span>${minReturn}-${maxReturn}</span>
      <span>{duration}</span>
      <span>
        <button
          onClick={() => setConfirm(true)}
          disabled={disabled}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            background: disabled ? "#555" : "#10b981",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "6px",
            border: "none",
          }}
        >
          Invest
        </button>
        {disabled && <span style={{ marginLeft: 8, fontSize: 12, color: "#f87171" }}>{reason}</span>}
      </span>

      {confirm && (
        <ConfirmDialog
          text={`Confirm investment in ${name}?`}
          onConfirm={async () => {
            try {
              onInvest();
              setConfirm(false);
            } catch (e: any) {
              alert(e);
            }
          }}
          onCancel={() => setConfirm(false)}
        />
      )}
    </div>
  );
}
