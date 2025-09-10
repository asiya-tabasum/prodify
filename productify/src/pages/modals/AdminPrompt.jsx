
import "@/pages/styles/AdminPrompt.css"; 

const AdminPrompt = ({ password, setPassword, onSubmit, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Enter Admin Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPrompt;
