import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Value.css";

export default function Values() {

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {

    try {

      const res =
        await api.get("/values");

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
        subtitle: "",
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
          `/values/${id}`
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

      await api.post(
        "/values",
        {
          id: card._id,
          title: card.title,
          subtitle: card.subtitle,
          description: card.description,
          icon: card.icon
        }
      );

    }

    alert("Values Saved Successfully");

    loadCards();

  } catch (err) {

    console.log(err);

    alert("Error Saving Values");

  }

};

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <h1>
            Values Cards
          </h1>

          <div>

            <button
              className="btn-back"
              onClick={() =>
                navigate("/about-content")
              }
            >
              Back To About
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
              Value Card {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={card.title || ""}
              onChange={(e) =>
                handleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Subtitle"
              value={card.subtitle || ""}
              onChange={(e) =>
                handleChange(
                  index,
                  "subtitle",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Description"
              value={
                card.description || ""
              }
              onChange={(e) =>
                handleChange(
                  index,
                  "description",
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Font Awesome Icon"
              value={card.icon || ""}
              onChange={(e) =>
                handleChange(
                  index,
                  "icon",
                  e.target.value
                )
              }
            />

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