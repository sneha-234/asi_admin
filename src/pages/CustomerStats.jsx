import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./CustomerStats.css";

export default function Customer() {

  const [sections, setSections] =
    useState([]);

  useEffect(() => {

    loadData();

  }, []);

 const loadData = async () => {

  try {

    const res =
      await api.get(
        "/customer-page"
      );

    console.log(
      "LOADED =>",
      res.data
    );

    setSections(
      res.data.sections || []
    );

  } catch (err) {

    console.log(err);

  }

};

  const addSection = () => {

    setSections([

      ...sections,

      {
        heading: "",
        subheading: ""
      }

    ]);

  };

  const removeSection = (index) => {

    const updated =
      sections.filter(
        (_, i) => i !== index
      );

    setSections(updated);

  };

  const updateSection = (
    index,
    field,
    value
  ) => {

    const updated =
      [...sections];

    updated[index][field] =
      value;

    setSections(updated);

  };

  const saveData = async () => {

  console.log(
    "SAVING =>",
    sections
  );

  try {

    const res =
      await api.post(
        "/customer-page",
        {
          sections
        }
      );

    console.log(
      "SAVE RESPONSE =>",
      res.data
    );

    alert(
      "Saved Successfully"
    );

  } catch (err) {

    console.log(err);

  }

};

  return (

    <div className="customer-page">

      <Sidebar />

      <div className="customer-content">

        <div className="customer-header">

          <div>

            <h1>
              Customer Heading CMS
            </h1>

            <p>
              Manage Multiple Headings
            </p>

          </div>

          <button
            className="btn-save"
            onClick={saveData}
          >
            Save Changes
          </button>

        </div>

        <div className="add-section-wrapper">

          <button
            className="btn-add"
            onClick={addSection}
          >
            + Add Heading
          </button>

        </div>

        {

          sections.map(
            (
              section,
              index
            ) => (

                <div className="customer-card">

                  <h3>
                    Section {index + 1}
                  </h3>

                  <input
                    type="text"
                    placeholder="Heading"
                    value={section.heading}
                    onChange={(e)=>
                      updateSection(
                        index,
                        "heading",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Sub Heading"
                    value={section.subheading}
                    onChange={(e)=>
                      updateSection(
                        index,
                        "subheading",
                        e.target.value
                      )
                    }
                  />

                  <div className="action-buttons">

                    <button
                      className="btn-delete"
                      onClick={() =>
                        removeSection(index)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

            )
          )

        }

      </div>

    </div>

  );

}