import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {

  const [content, setContent] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {

    try {

      const res =
        await api.get("/privacy-policy");

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
        "/privacy-policy",
        {
          content
        }
      );

      alert(
        "Privacy Policy Saved Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Error Saving Privacy Policy"
      );

    }

  };

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <h1>
            Privacy Policy
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
            placeholder="Paste Privacy Policy HTML here..."
          />

        </div>

      </div>

    </div>

  );

}