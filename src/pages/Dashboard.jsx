import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] =
    useState({

      totalEnquiries: 0,

      newEnquiries: 0,

      applications: 0,

      activeJobs: 0

    });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const enquiryRes =
        await api.get(
          "/enquiry/counts"
        );

      const appsRes =
        await api.get(
          "/career/applications"
        );

      const jobsRes =
        await api.get(
          "/career/jobs"
        );

      setStats({

        totalEnquiries:
          enquiryRes.data.total || 0,

        newEnquiries:
          enquiryRes.data.new || 0,

        applications:
          appsRes.data.length || 0,

        activeJobs:
          jobsRes.data.filter(
            job => job.isActive
          ).length || 0

      });

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <div className="dashboard-header">

          <div>

            <h1>
              Dashboard Overview
            </h1>

            <p>
              Welcome back Admin 👋
            </p>

          </div>

          <div className="admin-badge">
            ASI CMS
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card enquiries">

            <span>📩</span>

            <p className="stat-title">
              Total Enquiries
            </p>

            <h2 className="stat-value">
              {stats.totalEnquiries}
            </h2>

          </div>

          <div className="stat-card new">

            <span>🆕</span>

            <p className="stat-title">
              New Enquiries
            </p>

            <h2 className="stat-value">
              {stats.newEnquiries}
            </h2>

          </div>

          <div className="stat-card apps">

            <span>👨‍💼</span>

            <p className="stat-title">
              Applications
            </p>

            <h2 className="stat-value">
              {stats.applications}
            </h2>

          </div>

          <div className="stat-card jobs">

            <span>💼</span>

            <p className="stat-title">
              Active Jobs
            </p>

            <h2 className="stat-value">
              {stats.activeJobs}
            </h2>

          </div>

        </div>

        <div className="quick-links">

          <a
            href="/enquiries"
            className="quick-card primary"
          >
            <h3>
              📩 Manage Enquiries
            </h3>

            <p>
              View all contact forms
            </p>

          </a>

          <a
            href="/careers"
            className="quick-card secondary"
          >
            <h3>
              💼 Career Management
            </h3>

            <p>
              Jobs & Applications
            </p>

          </a>

          <a
            href="/contact-us"
            className="quick-card secondary"
          >
            <h3>
              📞 Contact Page CMS
            </h3>

            <p>
              Edit Contact Content
            </p>

          </a>

        </div>

      </div>

    </div>

  );

}