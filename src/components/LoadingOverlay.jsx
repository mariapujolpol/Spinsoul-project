import Spinner from "./Spinner";

export default function LoadingOverlay({ text = "Loading..." }) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <Spinner />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
}



