import { useState , useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Content.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function About() {

  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState({

  hero_title: "",
  hero_subtitle: "",
  hero_image: "",

  vision_title: "",
  vision_p1: "",
  vision_p2:"",
  vision_image: "",

  presence_title: "",
  presence_description: "",
  mission_text: "",

  presence_image1: "",
  presence_image2: "",
  values_heading:""

});
const [heroImage, setHeroImage] =
  useState(null);

const [visionImage, setVisionImage] =
  useState(null);

const [presenceImage1, setPresenceImage1] =
  useState(null);

const [presenceImage2, setPresenceImage2] =
  useState(null);

  const uploadImage = async (file) => {

  if (!file) return "";

  const formData =
    new FormData();

  formData.append(
    "image",
    file
  );

  const res =
    await api.post(
      "/content/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return res.data.image;

};

  const handleChange = (e) => {

    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value
    });

  };
  useEffect(() => {

  loadAbout();

}, []);

const loadAbout = async () => {

  try {

    const res =
      await api.get(
        "/content/page/about"
      );

    console.log(
      "ABOUT DATA =>",
      res.data
    );

    setAboutData(prev => ({
      ...prev,
      ...res.data
    }));

  } catch (err) {

    console.log(err);

  }

};

const saveAbout = async () => {

  try {

    const payload = {
      ...aboutData
    };

    if (heroImage) {

      payload.hero_image =
        await uploadImage(
          heroImage
        );

    }

    if (visionImage) {

      payload.vision_image =
        await uploadImage(
          visionImage
        );

    }

    if (presenceImage1) {

      payload.presence_image1 =
        await uploadImage(
          presenceImage1
        );

    }

    if (presenceImage2) {

      payload.presence_image2 =
        await uploadImage(
          presenceImage2
        );

    }

    const items =
      Object.entries(
        payload
      ).map(
        ([key, value]) => ({
          page: "about",
          key,
          value,
          type: "text"
        })
      );
      console.log(aboutData.presence_description);

    await api.post(
      "/content/page/bulk",
      { items }
    );

    alert(
      "About Content Saved Successfully"
    );

    loadAbout();

  } catch (err) {

    console.log(err);

    alert(
      "Error Saving Content"
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
              About Page Content
            </h1>

            <p>
              Manage About Us Page
            </p>

          </div>

          <button
            className="btn-save-all"
            onClick={saveAbout}
          >
            Save Changes
          </button>

        </div>

        {/* About Hero */}

        <div className="content-card">

          <h3>About Hero</h3>

          <input
            type="text"
            name="hero_title"
            placeholder="About Hero Title"
            value={aboutData.hero_title}
            onChange={handleChange}
          />

          <textarea
            name="hero_subtitle"
            placeholder="About Hero Subtitle"
            value={aboutData.hero_subtitle}
            onChange={handleChange}
          />

          <label>
            Hero Image
          </label>

          <input
  type="file"
  onChange={(e) =>
    setHeroImage(
      e.target.files[0]
    )
  }
/>

{aboutData.hero_image && (

  <img
    src={`https://asi-admin-4.onrender.com${aboutData.hero_image}`}
    width="150"
    alt=""
  />

)}

        </div>

        {/* Vision */}

        <div className="content-card">

          <h3>
            Vision & Legacy
          </h3>

          <input
            type="text"
            name="vision_title"
            placeholder="Vision Title"
            value={aboutData.vision_title}
            onChange={handleChange}
          />

          <textarea
            name="vision_p1"
            placeholder="Vision Description"
            value={aboutData.vision_p1}
            onChange={handleChange}
          />
          <textarea
            name="vision_p2"
            placeholder="Vision Description"
            value={aboutData.vision_p2}
            onChange={handleChange}
          />

          <label>
            Vision Image
          </label>

          <input
  type="file"
  onChange={(e) =>
    setVisionImage(
      e.target.files[0]
    )
  }
/>

{aboutData.vision_image && (

  <img
    src={`https://asi-admin-4.onrender.com${aboutData.vision_image}`}
    width="150"
    alt=""
  />

)}

        </div>

        {/* Presence */}

        <div className="content-card">

          <h3>
            Pan India Presence
          </h3>

          <input
            type="text"
            name="presence_title"
            placeholder="Presence Title"
            value={aboutData.presence_title}
            onChange={handleChange}
          />

           <textarea
              name="presence_description"
              rows="15"
              style={{
                width: "100%",
                minHeight: "300px",
                fontFamily: "monospace"
              }}
              value={aboutData.presence_description}
              onChange={handleChange}
            />

          <textarea
            name="mission_text"
            placeholder="Mission Text"
            value={aboutData.mission_text}
            onChange={handleChange}
          />

          <label>
            Presence Image 1
          </label>

          <input
  type="file"
  onChange={(e) =>
    setPresenceImage1(
      e.target.files[0]
    )
  }
/>

{aboutData.presence_image1 && (

  <img
    src={`https://asi-admin-4.onrender.com${aboutData.presence_image1}`}
    width="150"
    alt=""
  />

)}

          <label>
            Presence Image 2
          </label>

          <input
  type="file"
  onChange={(e) =>
    setPresenceImage2(
      e.target.files[0]
    )
  }
/>

{aboutData.presence_image2 && (

  <img
    src={`https://asi-admin-4.onrender.com${aboutData.presence_image2}`}
    width="150"
    alt=""
  />

)}

        </div>

        {/* Values */}
        <div className="content-card">

          <h3>Our Values</h3>

          <input
            type="text"
            placeholder="Values Section Heading"
            value={aboutData.values_heading || ""}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                values_heading: e.target.value
              })
            }
          />

          <button
            className="btn-manage"
            onClick={() =>
              window.location.href =
              "/values"
            }
          >
            Manage Values
          </button>

        </div>

      </div>

    </div>

  );

}