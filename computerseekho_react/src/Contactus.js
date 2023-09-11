import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Map from './map'

function ContactUs() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);

  const [enquiryData, setEnquiryData] = useState({
    enquirer_name: '',
    enquirer_mobile: '',
    enquirer_email_id: '',
    enquirer_query: '',
  });

  useEffect(() => {
    // Fetch staff data when the component mounts
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Staff/GetStaff"); // Replace with your API endpoint for staff data
      const staffData = await response.json();
      setStaffList(staffData);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const getNextStaff = () => {
    const nextStaffIndex = (currentStaffIndex + 1) % staffList.length;
    setCurrentStaffIndex(nextStaffIndex);
    return staffList[nextStaffIndex];
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    const selectedStaff = getNextStaff();

    if (!selectedStaff) {
      console.error('No staff found');
      return;
    }

    const enrichedEnquiryData = {
      ...enquiryData,
      staff_id: selectedStaff.staff_id // Set the staff_id from the selected staff object
    };

    // Set today's date to enquiry_date
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    enrichedEnquiryData.enquiry_date = currentDate;

    try {
      const response = await fetch("http://localhost:8080/api/Enquiry/new_enquiry", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrichedEnquiryData), // Use the enrichedEnquiryData object
      });

      if (response.ok) {
        // Enquiry successfully stored
        console.log('Enquiry stored successfully');
        // Clear the form fields
        setEnquiryData({
          enquirer_name: '',
          enquirer_mobile: '',
          enquirer_email_id: '',
          enquirer_query: '',
        });
        navigate("/");
      } else {
        console.error('Failed to store enquiry');
      }
    } catch (error) {
      console.error('Error storing enquiry:', error);
    }
    navigate("/");
  };

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Row className="mt-4">
        <Col lg={6}>
          <h2 align="center">Enquiry Form</h2>
          <Form onSubmit={handleEnquirySubmit}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={enquiryData.enquirer_name}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile:</Form.Label>
              <Form.Control
                type="text"
                value={enquiryData.enquirer_mobile}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_mobile: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={enquiryData.enquirer_email_id}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_email_id: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Query:</Form.Label>
              <Form.Control
                type="text"
                value={enquiryData.enquirer_query}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_query: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Form>
        </Col>

        {/* MAP */}
        <Col lg={6}>
          <Map/>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
