import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const HR = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    NoofAbsenteeism: '',
    NoofNewJoinees: '',
    TotalNoofStaffNursing: '',
    TotNoofPharamedicalStaff: '',
    TotNumberofDoctor: '',
    TotNumberofAdminStaff: '',
    TotNumberofHouseKeepingStaff: '',
    NoofStaffLeftOrganization: '',
    TotalNoofStaff: '',
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (id && name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id,   // Updated field
        name, // Updated field
      }));
    }
  }, []);  

  useEffect(() => {
    if (selectedDate) {
      // Adjust date to UTC
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const id = localStorage.getItem('userId');
        const name = localStorage.getItem('userName');
        const formDataWithUser = {
              ...formData,
              id,  
              name 
            };
        const response = await fetch('http://127.0.0.1:8000/HR/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUser),
        });
        if (response.ok) {
          console.log('Data submitted successfully');
          setFormSubmitted(true); // Update form submission status
        } else {
          const errorText = await response.json();
          throw new Error(errorText || 'Failed to submit data');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message || 'Failed to submit data');
      }
    }
    setValidated(true);
  };

  return (
    <StyledContainer style={{ maxWidth: '600px' }} className="NumericalData">
    <h2 className="text-center">HR</h2>
    <div style={{float:"right"}} className='mt-3'>
       <div><b>ID: </b>{formData.id}</div>
       <div><b>Name: </b>{formData.name}</div>
     </div>
    <br/>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="position-relative mb-3" controlId="selectedDate">
          <div className="position-relative">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ cursor: 'pointer', color: '#EBB099', fontSize: '25px' }}
              onClick={() => document.getElementById('datePicker').click()}
            />
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="position-absolute top-100 start-0 d-none"
              calendarClassName="position-absolute top-100 start-0"
              placeholderText="Select Date"
            />
            {selectedDate && (
              <div className="position-absolute top-100 start-0 translate-middle-y" style={{ marginLeft: '50px', marginTop: '-15px' }}>
                {selectedDate.toLocaleDateString('en-GB')}
              </div>
            )}
          </div>
        </Form.Group>
        <br />

        <Row className="mb-3">
          <Form.Group controlId="NoofAbsenteeism">
            <Form.Label>No of Absenteeism</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.NoofAbsenteeism}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="NoofNewJoinees">
            <Form.Label>No of New Joinees</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.NoofNewJoinees}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotalNoofStaffNursing">
            <Form.Label>Total No Of Nursing Staff</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotalNoofStaffNursing}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotNoofPharamedicalStaff">
            <Form.Label>Total Number Of Paramedical Staff</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotNoofPharamedicalStaff}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotNumberofDoctor">
            <Form.Label>Total Number Of Doctors</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotNumberofDoctor}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotNumberofAdminStaff">
            <Form.Label>Total Number Of Admin Staff</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotNumberofAdminStaff}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotNumberofHouseKeepingStaff">
            <Form.Label>Total Number Of HouseKeeping Staff</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotNumberofHouseKeepingStaff}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="NoofStaffLeftOrganization">
            <Form.Label>No. of Staff left the Organization</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.NoofStaffLeftOrganization}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="TotalNoofStaff">
            <Form.Label>Total No of Staff</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.TotalNoofStaff}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <button variant="primary" type="submit" className="mb-3">
          Save
        </button>

        <Alert variant="success" show={formSubmitted}>
          Form submitted successfully.
        </Alert>

        <Alert variant="danger" show={error !== ''}>
          {error}
        </Alert>
      </Form>
    </StyledContainer>
  );
};

export default HR;
