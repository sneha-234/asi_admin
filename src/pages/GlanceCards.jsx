import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Content.css";

export default function GlanceCards() {

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {

    try {

      const res =
        await api.get(
          "/glancecards"
        );

      setCards(
        res.data || []
      );

    }

    catch (err) {

      console.log(err);

    }

  };

  const addCard = () => {

    setCards([

      ...cards,

      {
        content: ""
      }

    ]);

  };

  const deleteCard = async (
    index,
    id
  ) => {

    try {

      if (id) {

        await api.delete(
          `/glancecards/${id}`
        );

      }

      const updated =
        cards.filter(
          (_, i) =>
            i !== index
        );

      setCards(updated);

    }

    catch (err) {

      console.log(err);

    }

  };

  const updateCard = (
    index,
    value
  ) => {

    const updated =
      [...cards];

    updated[index].content =
      value;

    setCards(updated);

  };

  const saveCards = async () => {

    try {

      for (const card of cards) {

        await api.post(
          "/glancecards",
          {
            id:
              card._id || "",

            content:
              card.content || ""
          }
        );

      }

      alert(
        "Glance Content Saved Successfully"
      );

      await loadCards();

    }

    catch (err) {

      console.log(
        "SAVE ERROR =>",
        err
      );

      alert(
        "Save Failed"
      );

    }

  };

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <div>

            <h1>
              Glance Cards
            </h1>

            <p>
              Manage HTML Content
            </p>

          </div>

          <div>

            <button
              className="btn-back"
              onClick={() =>
                navigate("/content")
              }
            >
              ← Back To Home
            </button>

            <button
              className="btn-save-all"
              onClick={saveCards}
            >
              Save Changes
            </button>

          </div>

        </div>

        <div className="content-card">

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginBottom:
                "20px"
            }}
          >

            <h3>
              HTML Sections
            </h3>

            <button
              className="btn-primary"
              onClick={
                addCard
              }
            >
              + Add Section
            </button>

          </div>

          {

            cards.map(
              (
                card,
                index
              ) => (

                <div
                  key={index}
                  style={{
                    border:
                      "1px solid #ddd",
                    borderRadius:
                      "10px",
                    padding:
                      "20px",
                    marginBottom:
                      "25px"
                  }}
                >

                  <h4>
                    Section {index + 1}
                  </h4>

                  <textarea
                    rows="20"
                    value={
                      card.content || ""
                    }
                    onChange={(e) =>
                      updateCard(
                        index,
                        e.target.value
                      )
                    }
                    style={{
                      width:
                        "100%",
                      minHeight:
                        "500px",
                      fontFamily:
                        "monospace",
                      fontSize:
                        "14px",
                      padding:
                        "12px",
                      border:
                        "1px solid #ccc",
                      borderRadius:
                        "6px",
                      marginTop:
                        "15px"
                    }}
                  />

                  <button
                    className="btn-delete"
                    style={{
                      marginTop:
                        "15px"
                    }}
                    onClick={() =>
                      deleteCard(
                        index,
                        card._id
                      )
                    }
                  >
                    Delete Section
                  </button>

                </div>

              )
            )

          }

        </div>

      </div>

    </div>

  );

}