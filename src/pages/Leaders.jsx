import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Leaders.css";

export default function Leaders() {

  const [showModal, setShowModal] =
    useState(false);

  const [leaders, setLeaders] =
    useState([]);

  const [form, setForm] =
    useState({

      _id: "",

      name: "",

      role: "",

      quote1: "",

      quote2: "",

      isHighlighted: false

    });

  useEffect(() => {

    loadLeaders();

  }, []);

  const loadLeaders =
    async () => {

      try {

        const res =
          await api.get(
            "/content/leaders/all"
          );

        setLeaders(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  const saveLeader =
  
    async () => {
        console.log(
  "FORM =>",
  form
);
      try {

        if (form._id) {

          await api.put(
            `/content/leaders/${form._id}`,
            form
          );

        } else {

          await api.post(
            "/content/leaders",
            form
          );

        }


        setForm({

          _id: "",

          name: "",

          role: "",

          quote1: "",

          quote2: "",

          isHighlighted: false

        });

        setShowModal(false);

        loadLeaders();

      } catch (err) {

        console.log(err);

      }

    };

  const editLeader =
    (leader) => {

      setForm({

        _id:
          leader._id,

        name:
          leader.name,

        role:
          leader.role,

        quote1:
          leader.quote1,

        quote2:
          leader.quote2,

        isHighlighted:
          leader.isHighlighted

      });

      setShowModal(true);

    };

  const deleteLeader =
    async (id) => {

      try {

        await api.delete(
          `/content/leaders/${id}`
        );

        loadLeaders();

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="leaders-page">

      <Sidebar />

      <div className="leaders-content">

        <div className="leaders-header">

          <div>

            <h1>
              👤 Leadership
            </h1>

            <p>
              Manage leadership team
            </p>

          </div>

          <button
            className="btn-primary"
            onClick={() => {

              setForm({

                _id: "",

                name: "",

                role: "",

                quote1: "",

                quote2: "",

                isHighlighted: false

              });

              setShowModal(true);

            }}
          >
            + Add Leader
          </button>

        </div>

        <div className="leaders-grid">

          {leaders.length === 0 ? (

            <div className="empty-state">

              No leaders added yet

            </div>

          ) : (

            leaders.map(
              (leader) => (

              <div
                className="leader-card"
                key={leader._id}
              >

                <div
                  className="leader-avatar"
                >
                  {
                    leader.initial ||
                    leader.name?.charAt(0)
                  }
                </div>

                <h3>
                  {leader.name}
                </h3>

                <p>
                  {leader.role}
                </p>

                <small>
                  {leader.quote1}
                </small>

                <div
                  className="leader-actions"
                >

                  <button
                    className="btn-edit"
                    onClick={() =>
                      editLeader(
                        leader
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      deleteLeader(
                        leader._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>

              {form._id
                ? "Edit Leader"
                : "Add Leader"}

            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({

                  ...form,

                  name:
                    e.target.value

                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              value={form.role}
              onChange={(e) =>
                setForm({

                  ...form,

                  role:
                    e.target.value

                })
              }
            />

            <textarea
              placeholder="Quote 1"
              value={form.quote1}
              onChange={(e) =>
                setForm({

                  ...form,

                  quote1:
                    e.target.value

                })
              }
            />

            <textarea
              placeholder="Quote 2"
              value={form.quote2}
              onChange={(e) =>
                setForm({

                  ...form,

                  quote2:
                    e.target.value

                })
              }
            />

            <label>

              <input
                type="checkbox"
                checked={
                  form.isHighlighted
                }
                onChange={(e) =>
                  setForm({

                    ...form,

                    isHighlighted:
                      e.target.checked

                  })
                }
              />

              Highlight Leader

            </label>

            <div className="modal-actions">

              <button
                className="btn-primary"
                onClick={
                  saveLeader
                }
              >
                Save
              </button>

              <button
                className="btn-secondary"
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}