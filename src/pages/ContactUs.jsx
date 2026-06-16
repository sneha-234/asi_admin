import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./ContactUs.css";

export default function ContactUs() {

  const [pageData, setPageData] =
    useState({

      heading: "",

      subheading: "",

      bannerImage: "",

      features: []

    });

  const [bannerFile, setBannerFile] =
    useState(null);

  useEffect(() => {

    loadPage();

  }, []);

  const loadPage = async () => {

    try {

      const res =
        await api.get(
          "/contact-us"
        );

      setPageData(
        res.data
      );

    }

    catch (err) {

      console.log(err);

    }

  };

  const addCard = () => {

    setPageData({

      ...pageData,

      features: [

        ...pageData.features,

        {

          icon: "",

          title: "",

          subtitle: "",

          buttonText: ""

        }

      ]

    });

  };

  const removeCard = (index) => {

    const updated =

      pageData.features.filter(

        (_, i) => i !== index

      );

    setPageData({

      ...pageData,

      features: updated

    });

  };

  const updateCard = (

    index,

    field,

    value

  ) => {

    const updated =

      [...pageData.features];

    updated[index][field] =
      value;

    setPageData({

      ...pageData,

      features: updated

    });

  };

  const savePage = async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "heading",
        pageData.heading
      );

      formData.append(
        "subheading",
        pageData.subheading
      );

      formData.append(
        "features",
        JSON.stringify(
          pageData.features
        )
      );

      if (bannerFile) {

        formData.append(
          "bannerImage",
          bannerFile
        );

      }

      await api.post(
        "/contact-us",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert(
        "Contact Page Saved Successfully"
      );

      loadPage();

    }

    catch (err) {

      console.log(err);

      alert(
        "Failed To Save"
      );

    }

  };

  return (

    <div className="contact-page">

      <Sidebar />

      <div className="contact-content">

        <div className="contact-header">

    <div>

        <h1>
           Contact Us 
        </h1>

        <p>
            Manage Contact Page Content
        </p>

    </div>

    <button
        className="btn-save"
        onClick={savePage}
    >
        Save Changes
    </button>

</div>

        {/* Banner */}

        <div className="contact-card">

          <h3>
            Contact Banner
          </h3>

          <input
            type="text"
            placeholder="Heading"
            value={pageData.heading || ""}
            onChange={(e) =>
              setPageData({

                ...pageData,

                heading:
                  e.target.value

              })
            }
          />

          <input
            type="text"
            placeholder="Sub Heading"
            value={pageData.subheading || ""}
            onChange={(e) =>
              setPageData({

                ...pageData,

                subheading:
                  e.target.value

              })
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setBannerFile(
                e.target.files[0]
              )
            }
          />

          {

            pageData.bannerImage && (

              <img
                src={
                  "https://asi-admin-4.onrender.com" +
                  pageData.bannerImage
                }
                alt=""
                className="preview-image"
              />

            )

          }

        </div>

        {/* Features */}

        <div className="contact-card">

          <div className="section-top">

            <h3>
              Contact Cards
            </h3>

            <button
              className="btn-add"
              onClick={addCard}
            >
              + Add Card
            </button>

          </div>

          {

            pageData.features?.map(

              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="feature-box"
                >

                  <h4>
                    Card {index + 1}
                  </h4>

                  <input
                    type="text"
                    placeholder="Icon Class"
                    value={item.icon}
                    onChange={(e) =>
                      updateCard(

                        index,

                        "icon",

                        e.target.value

                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      updateCard(

                        index,

                        "title",

                        e.target.value

                      )
                    }
                  />

                  <textarea
                    rows="3"
                    placeholder="Subtitle"
                    value={item.subtitle}
                    onChange={(e) =>
                      updateCard(

                        index,

                        "subtitle",

                        e.target.value

                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Button Text"
                    value={item.buttonText}
                    onChange={(e) =>
                      updateCard(

                        index,

                        "buttonText",

                        e.target.value

                      )
                    }
                  />

                  <button
                    className="btn-delete"
                    onClick={() =>
                      removeCard(index)
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