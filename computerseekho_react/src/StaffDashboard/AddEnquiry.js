import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Dashoption from '../Login/dashoption';
import { useNavigate } from 'react-router-dom';

function AddEnquiry() {
  const [staffList, setStaffList] = useState([]);
  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);
  const [enquiryData, setEnquiryData] = useState({
    enquirer_name: '',
    enquirer_address: '',
    enquirer_mobile: '',
    enquirer_email_id: '',
    enquiry_date: '', // Will be set to the current date
    follow_up_date: '', // Will be set to the current date
    closure_reason: '',
    followup_msg: '',
    enquirer_query: '',
    enquiry_processed_flag: false,
    staff_id: null,
  });

  useEffect(() => {
    // Fetch staff data when the component mounts
    fetchStaffData();
    // Set the default follow-up date and enquiry date to the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    setEnquiryData({
      ...enquiryData,
      enquiry_date: currentDate,
      follow_up_date: currentDate,
    });
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Staff/GetStaff"); // Replace with your API endpoint for staff data
      const staffData = await response.json();
      // console.log(staffData);
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

  let navigate = useNavigate();

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    const selectedStaff = getNextStaff();
    // console.log('Selected Staff:', selectedStaff);

    if (!selectedStaff) {
      console.error('No staff found');
      return;
    }

    const enrichedEnquiryData = {
      ...enquiryData,
      staff_id: selectedStaff.staff_id, // Set the staff_id from the selected staff object
    };

    console.log('Enquiry Data:', enrichedEnquiryData);

    try {
      console.log(enrichedEnquiryData);
      const response = await fetch("http://localhost:8080/api/Enquiry/new_enquiry", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrichedEnquiryData), // Use the enrichedEnquiryData object
      });

      if (response.ok) {
        console.log(response);
        // Enquiry successfully stored
        // console.log('Enquiry stored successfully');
        // Clear the form fields
        setEnquiryData({
          enquirer_name: '',
          enquirer_address: '',
          enquirer_mobile: '',
          enquirer_email_id: '',
          enquiry_date: '',
          follow_up_date: '',
          closure_reason: '',
          followup_msg: '',
          enquirer_query: '',
          enquiry_processed_flag: false,
          staff_id: null,
        });
        navigate("/allenq");
      } else {
        console.error('Failed to store enquiry');
      }
    } catch (error) {
      console.error('Error storing enquiry:', error);
    }
  };

  return (
    <>
      <Dashoption />

      <Container>
        <Row className="mt-3">
          <Col lg="5">
            <h2 align="center">Enquiry Form</h2>
            <Form onSubmit={handleEnquirySubmit}>
              <label>Name:</label>
              <input
                required
                type="text"
                value={enquiryData.enquirer_name}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_name: e.target.value })}
              />

              <label>Mobile:</label>
              <input
                required
                type="text"
                value={enquiryData.enquirer_mobile}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_mobile: e.target.value })}
              />

              <label>Email:</label>
              <input
                type="text"
                value={enquiryData.enquirer_email_id}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_email_id: e.target.value })}
              />

              <label>Address:</label>
              <input
                required
                type="text"
                value={enquiryData.enquirer_address}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_address: e.target.value })}
              />

              <label>Query:</label>
              <input
                required
                type="text"
                value={enquiryData.enquirer_query}
                onChange={(e) => setEnquiryData({ ...enquiryData, enquirer_query: e.target.value })}
              />

              <label>Follow-Up Date:</label>
              <input
                type="date"
                value={enquiryData.follow_up_date}
                onChange={(e) => setEnquiryData({ ...enquiryData, follow_up_date: e.target.value })}
              />

              {/* <label>Closure Reason:</label>
              <input
                type="text"
                value={enquiryData.closure_reason}
                onChange={(e) => setEnquiryData({ ...enquiryData, closure_reason: e.target.value })}
              />

              <label>Follow-Up Message:</label>
              <input
                type="text"
                value={enquiryData.followup_msg}
                onChange={(e) => setEnquiryData({ ...enquiryData, followup_msg: e.target.value })}
              />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={enquiryData.enquiry_processed_flag}
                  onChange={(e) =>
                    setEnquiryData({ ...enquiryData, enquiry_processed_flag: e.target.checked })
                  }
                />
                <label className="form-check-label">Enquiry Processed</label>
              </div> */}

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
              <br />
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddEnquiry;
