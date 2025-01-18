import React from "react";
import AuthorsTable from "../components/AuthorsTable";
import ProjectsTable from "../components/ProjectsTable";

const Tables: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-column gap-4 mt-2 ms-2 me-1">
        {/* Header */}
        <div className="d-flex justify-content-between">
          <div>
            <div>
              <span>Pages </span>
              <span className="text-dark">/ Tables</span>
            </div>
            <span
              className="text-dark"
              style={{ fontWeight: 500, fontSize: "18px" }}
            >
              Tables
            </span>
          </div>
          <div className="d-flex gap-4 align-items-center pe-5">
            <input
              type="text"
              style={{ width: "15rem" }}
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button type="button" className="my-auto btn btn-outline-primary">
              Online Builder
            </button>
            <p className="my-auto" style={{ fontSize: "14px" }}>
              Sign In
            </p>
          </div>
        </div>
        <AuthorsTable />
        <ProjectsTable />
        {/* Footer */}
        <div
          className="d-flex justify-content-between pe-3 mb-3 mt-1 ps-4"
          style={{ fontSize: "15px" }}
        >
          <div>
            <span>&copy; 2025, made with by </span>
            <span className="text-dark" style={{ fontWeight: 500 }}>
              Creative Tim
            </span>
            <span> for a better web.</span>
          </div>
          <div className="d-flex gap-4">
            <span>Creative Tim</span>
            <span>About Us</span>
            <span>Blog</span>
            <span>License</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
