import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserField } from "../../api/userApi";
import { setUser } from "../../app/slices/userSlice";
import "./FieldSelection.css";
import { useDispatch } from "react-redux";

export default function FieldSelection() {
   const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fields = ["Student", "Developer", "Creator", "Business"];

  const handleSubmit = async () => {
    if (!field) return;

    try {
      setLoading(true);

      const res = await selectUserField(field);

      const updatedUser = res?.data?.user;

      // 🔥 Redux update (MOST IMPORTANT)
      dispatch(setUser(updatedUser));

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      console.error("Field select error:", err);
    } finally {
      setLoading(false);
    }
  };

      

  return (
     <div className="select-field-container">
      <h2>What do you want to use AI for?</h2>

      <div className="field-options">
        {fields.map((item) => (
          <button
            key={item}
            className={field === item ? "active" : ""}
            onClick={() => setField(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="continue-btn"
        onClick={handleSubmit}
        disabled={!field || loading}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
