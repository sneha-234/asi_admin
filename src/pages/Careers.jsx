import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Careers.css";

export default function Careers() {

  const [activeTab, setActiveTab] = useState("jobs");
  const [showModal, setShowModal] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [pageData,setPageData] =
    useState({

      heading:"",
      subheading:"",
      bannerImage:"",
      features:[]

    });

    const [bannerFile,setBannerFile] =
    useState(null);

  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    type: "Full-Time",
    location: "",
    description: ""
  });

  useEffect(() => {

  loadJobs();
  loadApplications();
  loadPageContent();

}, []);

  const loadPageContent = async () => {

  try {

    const res =
      await api.get(
        "/career/page-content"
      );

    setPageData(
      res.data
    );

  }

  catch (err) {

    console.log(err);

  }

};

const addFeature = () => {

  setPageData({

    ...pageData,

    features: [

      ...pageData.features,

      {

        icon: "",

        title: "",

        subtitle: ""

      }

    ]

  });

};

const removeFeature = (index) => {

  setPageData({

    ...pageData,

    features:

      pageData.features.filter(
        (_, i) => i !== index
      )

  });

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

      "/career/page-content",

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data"

        }

      }

    );

    alert(
      "Career Page Saved"
    );

    loadPageContent();

  }

  catch (err) {

    console.log(err);

    alert(
      "Save Failed"
    );

  }

};

  const loadJobs = async () => {
    try {
      const res = await api.get("/career/jobs");
      setJobs(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadApplications = async () => {
    try {
      const res = await api.get("/career/applications");
      setApplications(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const saveJob = async () => {
    try {

      await api.post(
        "/career/jobs",
        jobData
      );

      alert("Job Created Successfully");

      setShowModal(false);

      setJobData({
        title: "",
        department: "",
        type: "Full-Time",
        location: "",
        description: ""
      });

      loadJobs();

    } catch (err) {

      console.log(err);
      alert("Failed To Save Job");

    }
  };

  const deleteJob = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this job?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(
        "/career/jobs/" + id
      );

      loadJobs();

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="careers-page">

      <Sidebar />

      <div className="careers-content">

        <div className="careers-header">

          <div>
            <h1>💼 Career & Jobs</h1>

            <p>
              Manage job listings and applicants
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add New Job
          </button>

        </div>

                <div className="cms-card">

  <h2>
    Career Page Banner
  </h2>

  <input
    type="text"
    placeholder="Heading"
    value={pageData.heading}
    onChange={(e)=>
      setPageData({

        ...pageData,

        heading:e.target.value

      })
    }
  />

  <input
    type="text"
    placeholder="Sub Heading"
    value={pageData.subheading}
    onChange={(e)=>
      setPageData({

        ...pageData,

        subheading:e.target.value

      })
    }
  />

  <input
    type="file"
    onChange={(e)=>
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
        style={{
          width:"250px",
          marginTop:"15px",
          borderRadius:"10px"
        }}
      />

    )

  }

  <br />
  <br />

<div className="cms-actions">
   <button
      className="btn-primary"
      onClick={addFeature}
   >
      + Add Card
   </button>
</div>

  <br />
  <br />

  {

    pageData.features?.map(
      (item,index)=>(

        <div
          key={index}
          className="feature-card"
        >

          <input
            placeholder="Icon"
            value={item.icon}
            onChange={(e)=>{

              const updated =
              [...pageData.features];

              updated[index].icon =
              e.target.value;

              setPageData({

                ...pageData,

                features:updated

              });

            }}
          />

          <input
            placeholder="Title"
            value={item.title}
            onChange={(e)=>{

              const updated =
              [...pageData.features];

              updated[index].title =
              e.target.value;

              setPageData({

                ...pageData,

                features:updated

              });

            }}
          />

          <textarea
            placeholder="Subtitle"
            value={item.subtitle}
            onChange={(e)=>{

              const updated =
              [...pageData.features];

              updated[index].subtitle =
              e.target.value;

              setPageData({

                ...pageData,

                features:updated

              });

            }}
          />

          <div className="feature-actions">
            <button
                className="btn-delete"
                onClick={() => removeFeature(index)}
            >
                Delete
            </button>
          </div>

        </div>

      )
    )

  }

  <br />

 <div className="save-page-wrapper">
   <button
      className="btn-primary"
      onClick={savePageContent}
   >
      Save Career Page
   </button>
</div>

</div>

        <div className="tabs">

          

          <button
            className={
              activeTab === "jobs"
                ? "tab-btn active"
                : "tab-btn"
            }
            onClick={() =>
              setActiveTab("jobs")
            }
          >
            Job Listings
          </button>

          <button
            className={
              activeTab === "apps"
                ? "tab-btn active"
                : "tab-btn"
            }
            onClick={() =>
              setActiveTab("apps")
            }
          >
            Applications
          </button>

        </div>



        {activeTab === "jobs" && (

          <div className="table-card">
             <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {jobs.length === 0 ? (

                  <tr>
                    <td colSpan="7">
                      No Jobs Found
                    </td>
                  </tr>

                ) : (

                  jobs.map((job, index) => (

                    <tr key={job._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {job.title}
                      </td>

                      <td>
                        {job.department}
                      </td>

                      <td>
                        {job.type}
                      </td>

                      <td>
                        {job.location}
                      </td>

                      <td>
                        {job.isActive
                          ? "Active"
                          : "Inactive"}
                      </td>

                      <td>

                        <button
                          className="btn-delete"
                          onClick={() =>
                            deleteJob(
                              job._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>
          </div>
          </div>

        )}

        {activeTab === "apps" && (

          <div className="table-card">

            <table>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Applicant</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Applied</th>
                </tr>

              </thead>

              <tbody>

                {applications.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      No Applications Found
                    </td>
                  </tr>

                ) : (

                  applications.map(
                    (app, index) => (

                    <tr key={app._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {app.fullName}
                      </td>

                      <td>
                        {app.position}
                      </td>

                      <td>
                        {app.status}
                      </td>

                      <td>

                        {new Date(
                          app.appliedAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Add Job</h2>

            <input
              type="text"
              placeholder="Job Title"
              value={jobData.title}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  title: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Department"
              value={jobData.department}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  department:
                    e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Location"
              value={jobData.location}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  location:
                    e.target.value
                })
              }
            />

            <select
              value={jobData.type}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  type:
                    e.target.value
                })
              }
            >
              <option>
                Full-Time
              </option>

              <option>
                Part-Time
              </option>

              <option>
                Internship
              </option>

            </select>

            <textarea
              placeholder="Description"
              value={jobData.description}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  description:
                    e.target.value
                })
              }
            />

            <div className="modal-actions">

              <button
                className="btn-primary"
                onClick={saveJob}
              >
                Save Job
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