import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Enquiries.css";

export default function Enquiries() {

  const [showModal, setShowModal] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");
    const [pageData, setPageData] =
  useState({

    heading: "",

    subheading: "",

    bannerImage: ""

  });

const [bannerFile, setBannerFile] =
  useState(null);

  useEffect(() => {

    loadEnquiries();
      loadPageContent();

  }, []);

  const loadEnquiries = async () => {

    try {

      const res =
        await api.get("/enquiry");

      setEnquiries(res.data);

    } catch (err) {

      console.log(
        "Enquiry Error",
        err
      );

    } finally {

      setLoading(false);

    }

  };

  const loadPageContent = async () => {

  try {

    const res =
      await api.get(
        "/enquiry/page-content"
      );

    setPageData(
      res.data
    );

  } catch (err) {

    console.log(err);

  }

};

const savePageContent = async () => {

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

    if (bannerFile) {

      formData.append(
        "bannerImage",
        bannerFile
      );

    }

    await api.post(
      "/enquiry/page-content",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    alert(
      "Banner Saved Successfully"
    );

    loadPageContent();

  } catch (err) {

    console.log(err);

    alert(
      "Failed To Save"
    );

  }

};

  const filteredEnquiries =
    enquiries.filter((item) => {

      const searchValue =
        search.toLowerCase();

      return (

        item.name
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.phone
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.email
          ?.toLowerCase()
          .includes(searchValue)

      );

    });

  return (

    <div className="enquiries-page">

      <Sidebar />

      <div className="enquiries-content">

        <div className="enquiries-header">

          <div>

            <h1>
              📩 Enquiries
            </h1>

            <p>
              All contact form &
              bulk enquiries
            </p>

          </div>

          <input
            type="text"
            placeholder="Search..."
            className="search-box"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>
<div className="cms-card">

  <h3>Enquiry Page Banner</h3>

  <input
    type="text"
    placeholder="Heading"
    value={pageData.heading}
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
    value={pageData.subheading}
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
        className="banner-preview"
      />

    )

  }

  <div className="banner-actions">

    <button
      className="btn-save-banner"
      onClick={savePageContent}
    >
      Save Banner
    </button>

  </div>

</div>

        <div className="filters">

          <button
            className={
              activeFilter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setActiveFilter(
                "all"
              )
            }
          >
            All
          </button>

          <button
            className="filter-btn"
            onClick={() =>
              setActiveFilter(
                "new"
              )
            }
          >
            New
          </button>

          <button
            className="filter-btn"
            onClick={() =>
              setActiveFilter(
                "read"
              )
            }
          >
            Read
          </button>

          <button
            className="filter-btn"
            onClick={() =>
              setActiveFilter(
                "replied"
              )
            }
          >
            Replied
          </button>

        </div>

        <div className="table-card">
           <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredEnquiries
                  .length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    No enquiries found
                  </td>

                </tr>

              ) : (

                filteredEnquiries.map(
                  (
                    enquiry,
                    index
                  ) => (

                  <tr
                    key={
                      enquiry._id
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {
                        enquiry.name
                      }
                    </td>

                    <td>
                      {
                        enquiry.email
                      }
                    </td>

                    <td>
                      {
                        enquiry.phone
                      }
                    </td>

                    <td>
                      {
                        enquiry.type
                      }
                    </td>

                    <td>

                      <span
                        className={`status-badge ${enquiry.status}`}
                      >
                        {
                          enquiry.status
                        }
                      </span>

                    </td>

                    <td>

                      {new Date(
                        enquiry.date
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
         </div>
        </div>

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Enquiry Detail
            </h2>

          </div>

        </div>

      )}

    </div>

  );

}