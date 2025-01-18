import React, { useEffect, useState } from "react";
import useFetchProjects from "../hooks/useFetchProjects";

interface projectsTable {
  id: number;
  company_logo: string;
  company_name: string;
  budget: number;
  country: string;
  completion: number;
}

const ProjectsTable: React.FC = () => {
  const [ProjectsTable, setProjectsTable] = useState<projectsTable[]>([]);

  function completionColor(completion: number) {
    if (completion <= 33) return "danger";
    else if (completion > 66) return "success";
    else return "info";
  }

  const fetchProjects = useFetchProjects();
  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      if (data) {
        setProjectsTable(data);
      }
    };
    loadProjects();
  }, []);

  return (
    <>
      <div className="card py-2">
        <p className="h6 mb-0 ps-4 pt-1 fw-medium">Projects table</p>
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  style={{ width: "30%" }}
                >
                  Project
                </th>
                <th
                  className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  style={{ width: "20%" }}
                >
                  Budget
                </th>
                <th
                  className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  style={{ width: "20%" }}
                >
                  Country
                </th>
                <th
                  className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  style={{ width: "30%" }}
                >
                  Completion
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ProjectsTable.length > 0 ? (
                ProjectsTable.map((project: projectsTable) => (
                  <tr key={project.id}>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src={project.company_logo}
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">
                            {project.company_name}
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">
                        ${project.budget}
                      </p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        {project.country}
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          {project.completion}%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className={`progress-bar bg-${completionColor(
                                project.completion
                              )}`}
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${project.completion}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-link text-secondary mb-0">
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {/* Dummy Projects */}
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-spotify.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Spotify</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$2,500</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        France
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          60%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "60%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-link text-secondary mb-0">
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-invision.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Invision</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$5,000</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        Russia
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          100%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              aria-valuenow={100}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-secondary mb-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-jira.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Jira</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$3,400</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        Japan
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          30%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              aria-valuenow={30}
                              aria-valuemin={0}
                              aria-valuemax={30}
                              style={{ width: "30%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-secondary mb-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-slack.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Slack</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$1,000</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        India
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          0%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              aria-valuenow={0}
                              aria-valuemin={0}
                              aria-valuemax={0}
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-secondary mb-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-webdev.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Webdev</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$14,000</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        Brazil
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          80%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              aria-valuenow={80}
                              aria-valuemin={0}
                              aria-valuemax={80}
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-secondary mb-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/small-logos/logo-xd.svg"
                            className="avatar avatar-sm rounded-circle me-2"
                          />
                        </div>
                        <div className="my-auto">
                          <h6 className="mb-0 text-sm">Adobe XD</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm fw-medium mb-0">$2,300</p>
                    </td>
                    <td>
                      <span className="text-dark opacity-7 text-xs font-weight-bold">
                        Canada
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <div className="d-flex align-items-center">
                        <span className="me-2 text-xs font-weight-bold">
                          100%
                        </span>
                        <div>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              aria-valuenow={100}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-link text-secondary mb-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i
                          className="fa fa-ellipsis-v text-xs"
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectsTable;
