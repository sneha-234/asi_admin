import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {

  const [page, setPage] =
    useState({

      heading: "",

      subheading: "",

      backgroundImage: "",

      sections: []

    });

  const [bgFile, setBgFile] =
    useState(null);

  useEffect(() => {

    loadPage();

  }, []);

  const loadPage = async () => {

    try {

      const res =
        await api.get(
          "/why-choose-us"
        );

      setPage({

        heading:
          res.data.heading || "",

        subheading:
          res.data.subheading || "",

        backgroundImage:
          res.data.backgroundImage || "",

        sections:
          res.data.sections || []

      });

    } catch (err) {

      console.log(err);

    }

  };

  const addSection = () => {

    setPage({

      ...page,

      sections: [

        ...page.sections,

        {
          content: ""
        }

      ]

    });

  };

  const removeSection = (index) => {

    const updated =
      page.sections.filter(
        (_, i) =>
          i !== index
      );

    setPage({

      ...page,

      sections:
        updated

    });

  };

  const updateSection = (
    index,
    value
  ) => {

    const updated =
      [...page.sections];

    updated[index].content =
      value;

    setPage({

      ...page,

      sections:
        updated

    });

  };

  const savePage = async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "heading",
        page.heading
      );

      formData.append(
        "subheading",
        page.subheading
      );

      formData.append(
        "sections",
        JSON.stringify(
          page.sections
        )
      );

      if (bgFile) {

        formData.append(
          "backgroundImage",
          bgFile
        );

      }

      await api.post(
        "/why-choose-us",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert(
        "Saved Successfully"
      );

      loadPage();

    } catch (err) {

      console.log(err);

      alert(
        "Failed To Save"
      );

    }

  };

  return (

    <div className="why-page">

      <Sidebar />

      <div className="why-content">

        <div className="why-header">

          <div>

            <h1>
              Why Choose Us CMS
            </h1>

            <p>
              Manage Why Choose Us Page
            </p>

          </div>

          <button
            className="btn-save"
            onClick={savePage}
          >
            Save Changes
          </button>

        </div>

        <div className="why-card">

          <h3>
            Banner Content
          </h3>

          <input
            type="text"
            placeholder="Heading"
            value={page.heading}
            onChange={(e) =>
              setPage({

                ...page,

                heading:
                  e.target.value

              })
            }
          />

          <input
            type="text"
            placeholder="Sub Heading"
            value={page.subheading}
            onChange={(e) =>
              setPage({

                ...page,

                subheading:
                  e.target.value

              })
            }
          />

          <label>
            Background Image
          </label>

          <input
            type="file"
            onChange={(e) =>
              setBgFile(
                e.target.files[0]
              )
            }
          />

          {

            page.backgroundImage && (

              <img
                src={
                  "https://asi-admin-4.onrender.com" +
                  page.backgroundImage
                }
                alt=""
                className="preview-image"
              />

            )

          }

        </div>

        <div className="why-card">

          <div className="section-header">

            <h3>
              Dynamic Elements
            </h3>

            <button
              className="btn-add"
              onClick={addSection}
            >
              + Add Element
            </button>

          </div>

          {

            page.sections.map(
              (
                section,
                index
              ) => (

                <div
                  className="element-box"
                  key={index}
                >

                  <h4>
                    Element {index + 1}
                  </h4>

                  <textarea
                    rows="10"
                    placeholder="Paste HTML Here"
                    value={
                      section.content
                    }
                    onChange={(e) =>
                      updateSection(

                        index,

                        e.target.value

                      )
                    }
                  />

                  <button
                    className="btn-delete"
                    onClick={() =>
                      removeSection(
                        index
                      )
                    }
                  >
                    Delete
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