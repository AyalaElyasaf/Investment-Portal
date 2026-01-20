import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import InvestmentConsole from "./pages/InvestmentConsole";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <img
        src="/logo.png"
        alt="Logo"
        className="logo-bottom-left"
      />

      {loggedIn ? (
        <InvestmentConsole />
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}

      <style>{`
        .logo-bottom-left {
          position: fixed;
          left: 16px;
          bottom: 16px;
          width: 120px;
          height: 120px;
          object-fit: contain;
          z-index: 100;
          opacity: 0.85;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: logoPop 0.5s ease-out;
        }

        .logo-bottom-left:hover {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          opacity: 1;
        }

        @keyframes logoPop {
          0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
          70% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </>
  );
}
