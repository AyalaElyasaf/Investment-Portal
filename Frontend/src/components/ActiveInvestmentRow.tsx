import type { ActiveInvestment } from "../types";

export default function ActiveInvestmentRow({ inv }: { inv: ActiveInvestment }) {
  return (
    <div>
      {inv.name} → ${inv.expectedReturn} (ends {new Date(inv.endTime).toLocaleTimeString()})
    </div>
  );
}
