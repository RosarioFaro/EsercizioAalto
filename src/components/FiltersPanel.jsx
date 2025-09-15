import { useState } from "react";
import { Dropdown, Form, Badge } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { FaTimes, FaChevronDown } from "react-icons/fa";

export default function FiltersPanel({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") onFilterChange({ search, completed, selectedUsers });
  };

  const handleCompletedChange = (e) => {
    const value = e.target.checked ? true : null;
    setCompleted(value);
    onFilterChange({ search, completed: value, selectedUsers });
  };

  const handleUserToggle = (id) => {
    const updated = selectedUsers.includes(id) ? selectedUsers.filter((u) => u !== id) : [...selectedUsers, id];
    setSelectedUsers(updated);
    onFilterChange({ search, completed, selectedUsers: updated });
  };

  const resetFilters = () => {
    setSearch("");
    setCompleted(null);
    setSelectedUsers([]);
    onFilterChange({ search: "", completed: null, selectedUsers: [] });
  };

  const userIds = [...Array(10).keys()].map((i) => i + 1);

  return (
    <div className="p-3 bg-custom">
      <h2 className="mb-2 text-dark-blue text-center fw-bold">FILTERS</h2>

      <div className="d-flex align-items-center my-4 bg-dark-purple custom-border-purple search-container">
        <BiSearch className="text-light mx-2" size={30} />

        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          className="flex-grow-1 rounded-0 shadow-none search-input"
        />
      </div>

      <div className="my-5">
        <label className="fw-bold text-dark-blue d-block mb-3">COMPLETED</label>
        <div className="d-flex align-items-center">
          <span className="me-2 text-dark-blue">{completed ? "YES" : "NO"}</span>
          <label className="switch">
            <input type="checkbox" checked={!!completed} onChange={handleCompletedChange} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="my-5">
        <label className="fw-bold text-dark-blue d-block mb-3">SELECT USER ID</label>

        <Dropdown className="w-100 custom-border">
          <Dropdown.Toggle
            variant="outline-none"
            className="text-dark-blue w-100 d-flex justify-content-between align-items-center"
            id="user-dropdown"
          >
            <span>{selectedUsers.length > 0 ? `Selected (${selectedUsers.length})` : ""}</span>

            <span className="icon-circle">
              <FaChevronDown size={12} />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto", width: "100%" }}>
            {userIds.map((id) => (
              <Dropdown.Item
                key={id}
                as="div"
                className="d-flex align-items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Form.Check
                  type="checkbox"
                  id={`user-${id}`}
                  label={`User ${id}`}
                  checked={selectedUsers.includes(id)}
                  onChange={() => handleUserToggle(id)}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="mb-2">
          {selectedUsers.map((id) => (
            <Badge
              key={id}
              className="me-1 text-white"
              style={{ cursor: "pointer", backgroundColor: "#003479" }}
              onClick={() => handleUserToggle(id)}
            >
              User {id} <FaTimes size={12} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="text-dark-blue text-decoration-underline border-0 p-0" onClick={resetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
}
