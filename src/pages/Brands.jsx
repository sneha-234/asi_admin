import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Brands.css";

export default function Brands() {

  const [showModal, setShowModal] =
    useState(false);

  const [sectionId, setSectionId] =
    useState(null);

  const [sectionTitle, setSectionTitle] =
    useState("");

  const [sectionSubtitle, setSectionSubtitle] =
    useState("");

  const [logos, setLogos] =
    useState([]);

  const [logo, setLogo] =
    useState(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {

    try {

      const res =
        await api.get(
          "/content/brands"
        );

      const data =
        Array.isArray(res.data)
          ? res.data
          : [];

      const section =
        data.find(
          item => item.isSection
        );

      const logoData =
        data.filter(
          item => !item.isSection
        );

      setLogos(logoData);

      if (section) {

        setSectionId(
          section._id
        );

        setSectionTitle(
          section.title || ""
        );

        setSectionSubtitle(
          section.subtitle || ""
        );

      }

    } catch (err) {

      console.log(err);

      setLogos([]);

    }

  };

  const saveSection = async () => {

    try {

      const formData =
        new FormData();

      if (sectionId) {

        formData.append(
          "id",
          sectionId
        );

      }

      formData.append(
        "title",
        sectionTitle
      );

      formData.append(
        "subtitle",
        sectionSubtitle
      );

      await api.post(
        "/content/brands",
        formData
      );

      loadBrands();

      alert(
        "Section Saved Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed To Save Section"
      );

    }

  };

  const saveBrand = async () => {

    try {

      if (!logo) {

        alert(
          "Please select logo"
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "logo",
        logo
      );

      await api.post(
        "/content/brands",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setLogo(null);

      setShowModal(false);

      loadBrands();

      alert(
        "Logo Uploaded Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Upload Failed"
      );

    }

  };

  const deleteBrand = async (id) => {

    try {

      await api.delete(
        `/content/brands/${id}`
      );

      loadBrands();

    } catch (err) {

      console.log(err);

      alert(
        "Delete Failed"
      );

    }

  };

  return (

    <div className="brands-page">

      <Sidebar />

      <div className="brands-content">

        <div className="brands-header">

          <div>

            <h1>
              Brands Section
            </h1>

            <p>
              Manage partner logos
            </p>

          </div>

          <button
            className="btn-primary"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Upload Logo
          </button>

        </div>

        <div className="section-box">

          <label>
            Section Title
          </label>

          <input
            type="text"
            value={sectionTitle}
            onChange={(e) =>
              setSectionTitle(
                e.target.value
              )
            }
            placeholder="Enter Section Title"
            className="title-input"
          />

          <label>
            Section Subtitle
          </label>

          <input
            type="text"
            value={sectionSubtitle}
            onChange={(e) =>
              setSectionSubtitle(
                e.target.value
              )
            }
            placeholder="Enter Section Subtitle"
            className="title-input"
          />

          <button
            className="btn-primary"
            onClick={saveSection}
          >
            Save Section
          </button>

        </div>

        <div className="brand-grid">

          {logos.length > 0 ? (

            logos.map((brand) => (

              <div
                key={brand._id}
                className="brand-card"
              >

                {brand.logo && (

                  <img
                    src={`https://asi-admin-4.onrender.com${brand.logo}`}
                    alt="Brand Logo"
                    className="brand-logo"
                  />

                )}

                <button
                  className="btn-delete"
                  onClick={() =>
                    deleteBrand(
                      brand._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))

          ) : (

            <div className="empty-state">

              No logos uploaded yet.

            </div>

          )}

        </div>

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Upload Brand Logo
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setLogo(
                  e.target.files[0]
                )
              }
            />

            <div
              className="modal-actions"
            >

              <button
                className="btn-primary"
                onClick={saveBrand}
              >
                Upload
              </button>

              <button
                className="btn-secondary"
                onClick={() =>
                  setShowModal(false)
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