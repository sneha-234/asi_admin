import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Content.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Products() {

  const [productPage, setProductPage] =
    useState({

      heading: "",

      subheading: "",

      bannerImage: "",

      sections: []

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
          "/product-page"
        );

      setProductPage({

        heading:
          res.data.heading || "",

        subheading:
          res.data.subheading || "",

        bannerImage:
          res.data.bannerImage || "",

        sections:
          res.data.sections || []

      });

    } catch (err) {

      console.log(err);

    }

  };

  const addSection = () => {

    setProductPage({

      ...productPage,

      sections: [

        ...productPage.sections,

        {
          content: ""
        }

      ]

    });

  };

  const deleteSection = (index) => {

    const updated =
      productPage.sections.filter(

        (_, i) =>
          i !== index

      );

    setProductPage({

      ...productPage,

      sections:
        updated

    });

  };

  const updateSectionContent =
    (
      index,
      value
    ) => {

      const updated =
        [...productPage.sections];

      updated[index].content =
        value;

      setProductPage({

        ...productPage,

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
        productPage.heading
      );

      formData.append(
        "subheading",
        productPage.subheading
      );

      formData.append(
        "sections",
        JSON.stringify(
          productPage.sections
        )
      );

      if (
        bannerFile
      ) {

        formData.append(
          "bannerImage",
          bannerFile
        );

      }

      await api.post(
        "/product-page",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      alert(
        "Products Page Saved Successfully"
      );

      loadPage();

    } catch (err) {

      console.log(err);

      alert(
        "Error Saving Data"
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
              Products Page Content
            </h1>

            <p>
              Manage Products Page
            </p>

          </div>

          <button
            className="btn-save-all"
            onClick={savePage}
          >
            Save Changes
          </button>

        </div>

        {/* Page Content */}

        <div className="content-card">

          <h3>
            Page Information
          </h3>

          <input
            type="text"
            placeholder="Heading"
            value={
              productPage.heading
            }
            onChange={(e) =>
              setProductPage({

                ...productPage,

                heading:
                  e.target.value

              })
            }
          />

          <textarea
            placeholder="Sub Heading"
            value={
              productPage.subheading
            }
            onChange={(e) =>
              setProductPage({

                ...productPage,

                subheading:
                  e.target.value

              })
            }
          />

          <label>
            Banner Image
          </label>

          <input
            type="file"
            onChange={(e) =>
              setBannerFile(
                e.target.files[0]
              )
            }
          />

          {

            productPage.bannerImage && (

              <img
                src={`http://localhost:5000${productPage.bannerImage}`}
                width="250"
                alt=""
                style={{
                  marginTop: "15px",
                  borderRadius: "8px"
                }}
              />

            )

          }

        </div>

        {/* Dynamic Sections */}

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
              Product Sections
            </h3>

            <button
              className="btn-primary"
              onClick={
                addSection
              }
            >
              + Add Section
            </button>

          </div>

          {

            productPage.sections.map(

              (
                section,
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
  value={section.content}
  onChange={(e)=>
    updateSectionContent(
      index,
      e.target.value
    )
  }
  style={{
    width:"100%",
    fontFamily:"monospace"
  }}
/>

                  <button
                    className="btn-delete"
                    style={{
                      marginTop:
                        "15px"
                    }}
                    onClick={() =>
                      deleteSection(
                        index
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