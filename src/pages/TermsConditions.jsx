import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./TermsCondition.css";

export default function TermsConditions() {

  const [content, setContent] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {

    try {

      const res =
        await api.get("/terms");

      setContent(
        res.data.content || ""
      );

    } catch (err) {

      console.log(err);

    }

  };

  const saveContent = async () => {

    try {

      await api.post(
        "/terms",
        {
          content
        }
      );

      alert(
        "Terms & Conditions Saved"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Error Saving Content"
      );

    }

  };

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <h1>
            Terms & Conditions
          </h1>

          <button
            className="btn-save-all"
            onClick={saveContent}
          >
            Save
          </button>

        </div>

        <div className="content-card">

          <h3>
            HTML Content
          </h3>

          <textarea
            rows="20"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Paste HTML here..."
          />

        </div>

      </div>

    </div>

  );

}