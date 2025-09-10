
import "@/pages/styles/Loading.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading products...</p>
      </div>
    </div>
  )
}
