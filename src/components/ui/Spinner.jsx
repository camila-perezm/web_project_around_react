export default function Spinner() {
  return (
    <span
      className="card__like-loading"
      style={{
        width: 20,
        height: 20,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="card__like-spinner"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="#888"
          strokeWidth="3"
          strokeDasharray="12 12"
          strokeLinecap="round"
        />
        <style>
          {`
                      @keyframes spin {
                        100% { transform: rotate(360deg); }
                      }
                    `}
        </style>
      </svg>
    </span>
  );
}