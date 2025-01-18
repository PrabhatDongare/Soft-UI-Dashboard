import React, { useEffect, useState } from "react";
import useGetSummary from "../hooks/useFetchAuthors";

interface authorsTable {
  id: number;
  profile_img: string;
  name: string;
  email: string;
  role: string;
  function: string;
  technology: boolean;
  date: string;
}

const AuthorsTable: React.FC = () => {
  const [AuthorsTable, setAuthorsTable] = useState<authorsTable[]>([]);
  const fetchAuthors = useGetSummary();

  const [formData, setFormData] = useState({
    id: 0,
    profile_img: "",
    name: "",
    email: "",
    role: "",
    function: "",
    technology: false,
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdown = (dropdown: "role" | "function", value: string) => {
    setFormData((formData) => ({ ...formData, [dropdown]: value }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, technology: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorsTable((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === formData.id ? { ...formData } : author
      )
    );
  };

  const handleDelete = (id: number) => {
    setAuthorsTable((AuthorsTable) =>
      AuthorsTable.filter((author) => author.id !== id)
    );
  };

  useEffect(() => {
    const loadAuthors = async () => {
      const data = await fetchAuthors();
      if (data) {
        setAuthorsTable(data);
      }
    };
    loadAuthors();
  }, []);

  return (
    <>
      <div className="card py-2 ">
        <p className="h6 mb-0 ps-4 pt-1 fw-medium">Authors table</p>
        <div className="table-responsive ">
          <table className="table align-items-center mb-0 ">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Author
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Function
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Technology
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Employed
                </th>
                <th className="text-secondary opacity-7" />
              </tr>
            </thead>
            <tbody>
              {AuthorsTable.length > 0 ? (
                AuthorsTable.map((author: authorsTable) => (
                  <tr key={author.id}>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src={author.profile_img}
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">{author.name}</h6>
                          <p className="text-xs text-secondary mb-0">
                            {author.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">
                        {author.role}
                      </p>
                      <p className="text-xs text-secondary mb-0">
                        {author.function}
                      </p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span
                        className={`badge bg-gradient-${
                          author.technology ? "success" : "secondary"
                        }`}
                      >
                        {author.technology ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        {author.date}
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="javascript:;"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        data-bs-toggle="modal"
                        data-bs-target={`#${String(author.id)}`}
                        onClick={() => setFormData(author)}
                      >
                        Edit
                      </a>
                      {/* Modal to edit Author */}
                      <div
                        className="modal fade"
                        id={String(author.id)}
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="editAuthorModalTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                              <div className="modal-header d-flex align-items-center">
                                <h5 className="modal-title ps-2">
                                  Edit Author
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close text-dark pe-3 pb-3"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span className="fs-5" aria-hidden="true">
                                    x
                                  </span>
                                </button>
                              </div>
                              <div className="modal-body mx-2">
                                <div className="form-group d-flex gap-3 align-items-center">
                                  <div>
                                    <img
                                      src={author.profile_img}
                                      className="avatar avatar-xxl me-3"
                                    />
                                  </div>
                                  <div className="d-flex flex-column gap-3 w-100">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      placeholder="Name"
                                      id="recipient-name"
                                    />
                                    <input
                                      type="text"
                                      name="email"
                                      className="form-control"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      placeholder="Email"
                                      id="recipient-name"
                                    />
                                  </div>
                                </div>

                                {/* Function dropdowns */}
                                <div className="d-flex gap-2 justify-content-around">
                                  <div className="dropdown">
                                    <button
                                      className="btn bg-gradient-info dropdown-toggle"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                    >
                                      {formData.role}
                                    </button>
                                    <ul className="dropdown-menu">
                                      {[
                                        "Manager",
                                        "Developer",
                                        "Executive",
                                      ].map((role) => (
                                        <li key={role}>
                                          <a
                                            className="dropdown-item"
                                            href="javascript:;"
                                            onClick={() =>
                                              handleDropdown("role", role)
                                            }
                                          >
                                            {role}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="dropdown">
                                    <button
                                      className="btn bg-gradient-light dropdown-toggle"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                    >
                                      {formData.function}
                                    </button>
                                    <ul className="dropdown-menu">
                                      {[
                                        "Organization",
                                        "Projects",
                                        "Executive",
                                      ].map((func) => (
                                        <li key={func}>
                                          <a
                                            className="dropdown-item"
                                            href="javascript:;"
                                            onClick={() =>
                                              handleDropdown("function", func)
                                            }
                                          >
                                            {func}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="modal-footer d-flex justify-content-between">
                                {/* toggle for online, offline */}
                                <div className="d-flex justify-content-center fw-6">
                                  <label className="form-check-label pe-3">
                                    Offline
                                  </label>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={formData.technology}
                                      onChange={handleToggle}
                                    />
                                  </div>
                                  <label className="form-check-label ps-1">
                                    Online
                                  </label>
                                </div>
                                {/* Author delete & update */}
                                <div className="me-3">
                                  <button
                                    type="button"
                                    className="btn bg-gradient-danger me-3"
                                    onClick={() => handleDelete(author.id)}
                                    data-bs-dismiss="modal"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn bg-gradient-success"
                                    data-bs-dismiss="modal"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {/* Dummy Authors */}
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">John Michael</h6>
                          <p className="text-xs text-secondary mb-0">
                            john@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Manager</p>
                      <p className="text-xs text-secondary mb-0">
                        Organization
                      </p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-success">Online</span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        23/04/18
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="javascript:;"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Alexa Liras</h6>
                          <p className="text-xs text-secondary mb-0">
                            alexa@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">
                        Programator
                      </p>
                      <p className="text-xs text-secondary mb-0">Developer</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-secondary">
                        Offline
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        11/01/19
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="#!"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Laurent Perrier</h6>
                          <p className="text-xs text-secondary mb-0">
                            laurent@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Executive</p>
                      <p className="text-xs text-secondary mb-0">Projects</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-success">Online</span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        19/09/17
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="#!"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Michael Levi</h6>
                          <p className="text-xs text-secondary mb-0">
                            michael@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">
                        Programator
                      </p>
                      <p className="text-xs text-secondary mb-0">Developer</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-success">Online</span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        24/12/08
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="#!"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Richard Gran</h6>
                          <p className="text-xs text-secondary mb-0">
                            richard@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">Manager</p>
                      <p className="text-xs text-secondary mb-0">Executive</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-secondary">
                        Offline
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        04/10/21
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="#!"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img
                            src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg"
                            className="avatar avatar-sm me-3"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="mb-0 text-sm">Miriam Eric</h6>
                          <p className="text-xs text-secondary mb-0">
                            miriam@creative-tim.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-weight-bold mb-0">
                        Programtor
                      </p>
                      <p className="text-xs text-secondary mb-0">Developer</p>
                    </td>
                    <td className="align-middle text-center text-sm">
                      <span className="badge bg-gradient-secondary">
                        Offline
                      </span>
                    </td>
                    <td className="align-middle text-center">
                      <span className="text-secondary text-xs font-weight-bold">
                        14/09/20
                      </span>
                    </td>
                    <td className="align-middle">
                      <a
                        href="#!"
                        className="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                      >
                        Edit
                      </a>
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

export default AuthorsTable;
