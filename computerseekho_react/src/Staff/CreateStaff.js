import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateStaff.css'; // Import your CSS file

function CreateStaff() {
  const [staff, setStaff] = useState({
    staff_name: "",
    staff_mobile: "",
    staff_email: "",
    staff_role: "", // Initialize staff_role as an empty string
    staff_username: "",
    staff_password: "",
    staff_isactive: true, // Default to 'Active'
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(staff);

    fetch("http://localhost:8080/api/Staff/PostStaff", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add staff.");
        }
        return response.json();
      })
      .then((data) => {
        alert("New Staff Added Successfully!");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add staff. Please try again.");
      });
  };

  return (
    <div className="add-staff-form">
      <h3 className="form-title">Add New Staff</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="staff_name"
            value={staff.staff_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="staff_mobile"
            value={staff.staff_mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="staff_email"
            value={staff.staff_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="staff_role"
            value={staff.staff_role}
            onChange={handleChange}
            required // Add 'required' to ensure a role is selected
          >
            <option value="">Select Role</option> {/* Add a default option */}
            <option value="Teacher">Teacher</option>
            <option value="Office_Staff">Office-Staff</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="staff_username"
            value={staff.staff_username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            name="staff_password"
            value={staff.staff_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group radio-options">
          <label>Active Status:</label>
          <div>
            <label>
              <input
                type="radio"
                name="staff_isactive"
                value="true"
                checked={staff.staff_isactive === true}
                onChange={handleChange}
              />{" "}
              Active
            </label>
            <label>
              <input
                type="radio"
                name="staff_isactive"
                value="false"
                checked={staff.staff_isactive === false}
                onChange={handleChange}
              />{" "}
              Inactive
            </label>
          </div>
        </div>
        <button className="submit-button" type="submit">Add Staff</button>
      </form>
    </div>
  );
}

export default CreateStaff;
