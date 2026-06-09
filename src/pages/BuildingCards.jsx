import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import api from "../services/api";
import "./BuildingCards.css";

export default function BuildingCards() {
  useEffect(() => {
  loadCards();
}, []);

const loadCards = async () => {
  try {
    const res =
      await api.get("/buildingcards");

    console.log(
      "LOADED =>",
      res.data
    );

    setCards(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const navigate = useNavigate();

  
  const [cards, setCards] = useState([
    {
      title: "",
      description: "",
      image: null
    }
  ]);

  const addCard = () => {

    setCards([
      ...cards,
      {
        title: "",
        description: "",
        image: null
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

const removeCard = async (index, id) => {

  try {

    if (id) {

      await api.delete(
        `/buildingcards/${id}`
      );

    }

    const updated =
      cards.filter((_, i) => i !== index);

    setCards(updated);

  } catch (err) {

    console.log(err);

  }

};

const saveCards = async () => {

  try {

    for (const card of cards) {

      console.log("CARD =>", card);

      const formData = new FormData();

      // Existing Card Update
      if (card._id) {

        formData.append(
          "id",
          card._id
        );

        console.log(
          "UPDATING =>",
          card._id
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

      console.log(
        "IMAGE =>",
        card.image
      );

      console.log(
        "IMAGE TYPE =>",
        typeof card.image
      );

      // Only upload if new file selected
      if (
        card.image &&
        typeof card.image !== "string"
      ) {

        formData.append(
          "image",
          card.image
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
          "/buildingcards",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      console.log(
        "RESPONSE =>",
        response.data
      );

    }

    alert(
      "Building Cards Saved Successfully"
    );

    await loadCards();

  } catch (err) {

    console.log(
      "ERROR =>",
      err.response?.data ||
      err.message
    );

    alert(
      "Failed To Save Cards"
    );

  }

};

  return (

    <div className="building-page">

      <Sidebar />

      <div className="building-wrapper">

        <div className="page-header">

          <h1>
            Building Cards
          </h1>

          <div className="header-btns">

            <button
              className="back-btn"
              onClick={() =>
                navigate("/content")
              }
            >
              ← Back To Home
            </button>

            <button
              className="save-btn"
              onClick={saveCards}
            >
              Save Cards
            </button>

          </div>

        </div>

        <button
          className="add-btn"
          onClick={addCard}
        >
          + Add New Card
        </button>

        {cards.map(
          (card, index) => (

          <div
            className="card-box"
            key={index}
          >

            <h3>
              Card {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Card Title"
              value={card.title}
              onChange={(e)=>
                handleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Card Description"
              value={card.description}
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
              accept="image/*"
              onChange={(e)=>
                handleChange(
                  index,
                  "image",
                  e.target.files[0]
                )
              }
            />
            {card.image &&
                typeof card.image === "string" && (
                  <img
                    src={`http://localhost:5000${card.image}`}
                    alt=""
                    width="120"
                  />
              )}

              {card.image &&
                typeof card.image !== "string" && (
                  <img
                    src={URL.createObjectURL(card.image)}
                    alt=""
                    width="120"
                  />
              )}

            <button
              className="delete-btn"
              onClick={() =>
                removeCard(
                  index,
                  card._id
                )
              }
            >
              Delete Card
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}