import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Content.css";
import { useNavigate } from "react-router-dom";

export default function Content() {

  const [activeTab, setActiveTab] = useState("home");
  const [content, setContent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {

    try {

      const res = await api.get(
        `/content/page/${activeTab}`
      );

      setContent(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const saveContent = async () => {

    try {

      const items = [];

      Object.keys(content).forEach((key) => {

        items.push({
          page: activeTab,
          section: "",
          key,
          value: content[key],
          type: "text"
        });

      });

      console.log(items);

      alert("Content Ready To Save");

      //Later enable:
      await api.post("/content/page/bulk", { items });

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="content-page">

      <Sidebar />

      <div className="content-wrapper">

        <div className="page-header">

          <div>
            <h1>Page Content</h1>
            <p>Manage website content</p>
          </div>

          <button
            className="btn-save-all"
            onClick={saveContent}
          >
            Save Changes
          </button>

        </div>

        <div className="tabs">

          <button
            className={
              activeTab === "home"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("home")
            }
          >
            Home
          </button>

          

        </div>

        {activeTab === "home" && (

          <>

            <div className="content-card">

              <h3>Hero Section</h3>

              <input
                type="text"
                placeholder="Hero Title"
                value={content.hero_title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero_title: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Hero Subtitle"
                value={content.hero_subtitle || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero_subtitle: e.target.value
                  })
                }
              />
               <label>Hero Image</label>

<input
  type="file"
  accept="image/*"
  onChange={async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {

      const res = await api.post(
        "/content/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setContent({
        ...content,
        hero_image: res.data.image
      });

    } catch (err) {
      console.log(err);
    }

  }}
/>

{content.hero_image && (
  <img
    src={`https://asi-admin-4.onrender.com${content.hero_image}`}
    alt="Hero"
    width="200"
  />
)}

            </div>

            <div className="content-card">

              <h3>Leaders Section</h3>

              <input
                type="text"
                placeholder="Leaders Heading"
                value={content.leaders_heading || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    leaders_heading: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Leaders Description"
                value={content.leaders_description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    leaders_description: e.target.value
                  })
                }
              />
              <label>Leader Image 1</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {

                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {

                      const res = await api.post(
                        "/content/upload",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data"
                          }
                        }
                      );

                      setContent({
                        ...content,
                        leader_image_1: res.data.image
                      });

                    } catch (err) {
                      console.log(err);
                    }

                  }}
                />

                {content.leader_image_1 && (
                  <img
                    src={`https://asi-admin-4.onrender.com${content.leader_image_1}`}
                    alt="Leader 1"
                    width="200"
                  />
                )}

              <label>Leader Image 2</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {

                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {

                      const res = await api.post(
                        "/content/upload",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data"
                          }
                        }
                      );

                      setContent({
                        ...content,
                        leader_image_2: res.data.image
                      });

                    } catch (err) {
                      console.log(err);
                    }

                  }}
                />

                {content.leader_image_2 && (
                  <img
                    src={`https://asi-admin-4.onrender.com${content.leader_image_2}`}
                    alt="Leader 2"
                    width="200"
                  />
                )}

            </div>

           

            <div className="content-card">
                <h3>ASI At A Glance</h3>
                <input
                  type="text"
                  placeholder="Glance Title"
                  value={content.glance_title || ""}
                  onChange={(e)=>
                    setContent({
                      ...content,
                      glance_title:e.target.value
                    })
                  }
                />
                <button
                  className="btn-manage"
                  onClick={() =>
                    window.location.href =
                    "/glance-cards"
                  }
                >
                  Manage Glance Cards
                </button>
            </div>

            <div className="content-card">
                <h3>Building Solutions</h3>
                <input
                  type="text"
                  placeholder="Glance Title"
                  value={content.building_title || ""}
                  onChange={(e)=>
                    setContent({
                      ...content,
                      building_title:e.target.value
                    })
                  }
                />
                <button
                  onClick={() =>
                    navigate("/building-cards")
                  }
                >
                  Manage Building Cards
                </button>
            </div>

          </>

        )}
      </div>
    </div>

  );

}