import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./GlanceCards.css";

export default function GlanceCards() {

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {

    try {

      const res =
        await api.get("/glancecards");

      setCards(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const addCard = () => {

    setCards([
      ...cards,
      {
        title: "",
        description: "",
        icon: null,
        isNew: true
      }
    ]);

  };

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...cards];

    updated[index][field] = value;

    setCards(updated);

  };

  const removeCard = async (
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
          (_, i) => i !== index
        );

      setCards(updated);

    } catch (err) {

      console.log(err);

    }

  };

const saveCards = async () => {
  try {

    for (const card of cards) {

      console.log("CARD DATA =>", card);

      const formData = new FormData();

      // Update case
      if (card._id) {
        formData.append("id", card._id);

        console.log(
          "UPDATING CARD ID =>",
          card._id
        );
      } else {
        console.log(
          "NEW CARD CREATE"
        );
      }
      
      formData.append(
        "title",
        card.title || ""
      );

      formData.append(
        "description",
        card.description || ""
      );

      // Only new image upload
      if (
        card.icon &&
        typeof card.icon !== "string"
      ) {

        console.log(
          "ICON FILE =>",
          card.icon
        );

        formData.append(
          "icon",
          card.icon
        );
      }

      // Debug FormData
      for (let pair of formData.entries()) {
        console.log(
          pair[0],
          pair[1]
        );
      }

      const response =
        await api.post(
          "/glancecards",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "API RESPONSE =>",
        response.data
      );
    }

    alert(
      "Cards Saved Successfully"
    );

    await loadCards();

  } catch (err) {

    console.error(
      "SAVE ERROR =>",
      err
    );

    alert("Save Failed");
  }
};

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <h1>
            Glance Cards
          </h1>

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
              Save Cards
            </button>

          </div>

        </div>

        <button
          className="btn-add-card"
          onClick={addCard}
        >
          + Add Card
        </button>

        {cards.map(
          (card, index) => (

          <div
            className="content-card"
            key={index}
          >

            <h3>
              Card {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={card.title || ""}
              onChange={(e)=>
                handleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Description"
              value={
                card.description || ""
              }
              onChange={(e)=>
                handleChange(
                  index,
                  "description",
                  e.target.value
                )
              }
            />

             <input
                type="file"
                onChange={(e) => {

                  console.log("SELECTED FILE =>", e.target.files[0]);

                  handleChange(
                    index,
                    "icon",
                    e.target.files[0]
                  );

                }}
              />

            {card.icon && typeof card.icon === "string" && (
              <img
                src={`https://asi-admin-4.onrender.com${card.icon}`}
                alt=""
                width="80"
              />
            )}

            {card.icon && typeof card.icon !== "string" && (
              <img
                src={URL.createObjectURL(card.icon)}
                alt=""
                width="80"
              />
            )}
            <button
              className="btn-delete"
              onClick={() =>
                removeCard(
                  index,
                  card._id
                )
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}