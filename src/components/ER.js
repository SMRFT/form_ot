import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Alert, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const ER = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [InitialAssesment, setInitialAssesment] = useState('');
  const [returnsToEmergency, setReturnsToEmergency] = useState('');
  const [returnsToEmergencyRemarks, setReturnsToEmergencyRemarks] = useState('');
  const [patientsToEmergency, setPatientsToEmergency] = useState('');
  const [surgicalSiteInfection, setSurgicalSiteInfection] = useState('');
  const [surgicalSiteInfectionRemarks, setSurgicalSiteInfectionRemarks] = useState('');
  const [parenteralExposures, setParenteralExposures] = useState('');
  const [parenteralExposuresRemarks, setParenteralExposuresRemarks] = useState('');
  const [incidents, setIncidents] = useState('');
  const [incidentsRemarks, setIncidentsRemarks] = useState('');
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    InitialAssesment: '',
    returnsToEmergency: '',
    returnsToEmergencyRemarks: '',
    patientsToEmergency: '',
    surgicalSiteInfection: '',
    surgicalSiteInfectionRemarks: '',
    parenteralExposures: '',
    parenteralExposuresRemarks: '',
    incidents: '',
    incidentsRemarks: '',
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
            const response = await fetch('http://127.0.0.1:8000/EmergencyRoom/', {
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
              const errorText = await response.text();
              throw new Error(errorText || 'Failed to submit data');
            }
          } catch (error) {
            console.error('Error:', error.message);
            if (error.message === 'Failed to submit data') {
              setError(error.message);
            } else {
              setError('Failed to submit data');
            }
          }
        }
        setValidated(true);
      };
      
    return (
      <StyledContainer style={{ maxWidth: '600px' }} className="NumericalData">
      <h2 className="text-center">ER</h2>
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
                      style={{ cursor: 'pointer',  color: '#EBB099',  fontSize: '25px' }}
                      onClick={() => document.getElementById('datePicker').click()}
                    />
                    <DatePicker
                      id="datePicker"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="position-absolute top-100 start-0 d-none" // Hide the input element
                      calendarClassName="position-absolute top-100 start-0" // Position the calendar
                      placeholderText="Select Date" // Placeholder text for the date picker
                    />
                    {selectedDate && (
                      <div className="position-absolute top-100 start-0 translate-middle-y" style={{ marginLeft: '50px',marginTop:"-15px" }}>
                        {selectedDate.toLocaleDateString('en-GB')} {/* 'en-GB' for date/month/year format */}
                      </div>
                    )}
                  </div>
                </Form.Group>
               
      <br/>  

      <Form.Group className="mb-3" controlId="InitialAssesment">
          <Form.Label>Time Taken for Initial Assesment</Form.Label>
          <Form.Control
            required
            type="text"
            value={InitialAssesment}
            onChange={(e) => { setInitialAssesment(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="returnsToEmergency">
            <Form.Label>Number of Returns to Emergency within 72 hours with Similar Presenting Complaints</Form.Label>
            <Form.Control
              required
              type="text"
              value={returnsToEmergency}
              onChange={(e) => { setReturnsToEmergency(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="returnsToEmergencyRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              required
              type="text"
              value={returnsToEmergencyRemarks}
              onChange={(e) => { setReturnsToEmergencyRemarks(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="patientsToEmergency">
            <Form.Label>Number of Patients who Have come to the Emergency</Form.Label>
            <Form.Control
              required
              type="text"
              value={patientsToEmergency}
              onChange={(e) => { setPatientsToEmergency(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="surgicalSiteInfection">
            <Form.Label>Total Number of Surgical Site Infection in a Given Month (Within 30 days)</Form.Label>
            <Form.Control
              required
              type="text"
              value={surgicalSiteInfection}
              onChange={(e) => { setSurgicalSiteInfection(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="surgicalSiteInfectionRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              required
              type="text"
              value={surgicalSiteInfectionRemarks}
              onChange={(e) => { setSurgicalSiteInfectionRemarks(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="parenteralExposures">
            <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
            <Form.Control
              required
              type="text"
              value={parenteralExposures}
              onChange={(e) => { setParenteralExposures(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="parenteralExposuresRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              required
              type="text"
              value={parenteralExposuresRemarks}
              onChange={(e) => { setParenteralExposuresRemarks(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="incidents">
            <Form.Label>Number of incidents</Form.Label>
            <Form.Control
              required
              type="text"
              value={incidents}
              onChange={(e) => { setIncidents(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="incidentsRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              required
              type="text"
              value={incidentsRemarks}
              onChange={(e) => { setIncidentsRemarks(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
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

export default ER;

