import { useEffect } from "react";

type Props = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ text, onConfirm, onCancel }: Props) {
  // עצירת scroll כשהדיאלוג פתוח
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div
      className="overlay"
      onClick={onCancel}
    >
      <div
        className="modal"
        onClick={e => e.stopPropagation()}
      >
        <p>{text}</p>
        <div className="buttons">
          <button className="confirm" onClick={onConfirm}>Yes</button>
          <button className="cancel" onClick={onCancel}>No</button>
        </div>
      </div>

      <style>{`
        .overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal {
          background: #1f2937;
          color: #e5e7eb;
          padding: 24px 32px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          min-width: 300px;
          text-align: center;
          transform: translateY(-20px);
          animation: popIn 0.3s forwards;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 16px;
        }

        button {
          padding: 8px 20px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        button.confirm {
          background-color: #10b981;
          color: white;
        }
        button.confirm:hover {
          background-color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        button.cancel {
          background-color: #f87171;
          color: white;
        }
        button.cancel:hover {
          background-color: #ef4444;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
