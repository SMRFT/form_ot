import React, { useState ,useEffect } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled(Container)`
  margin-bottom: 15%;
`;

function FrontOffice(){
    const [selectedDate, setSelectedDate] = useState(null);
    const[SumtotalPatient,setSumtotalPatient]=useState('');
    const[TotalnoofOutPatients,setTotalnoofOutPatients]=useState('');
    const[SumtotalpatientReportingtime,setSumtotalpatientReportingtime]=useState('');
    const[NoofPatientsReportedinDiagnostics,setNoofPatientsReportedinDiagnostics]=useState('');
    const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
    const [validated, setValidated] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        selectedDate: '',
        SumtotalPatient: '',
        TotalnoofOutPatients: '',
        SumtotalpatientReportingtime: '',
        numberOfBedsOccupied: '',
    });
// Update the selectedDate key in formData when it changes
useEffect(() => {
    if (selectedDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: selectedDate.toISOString().split('T')[0],
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
          const response = await fetch('http://127.0.0.1:8000/Frontoffice/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
          setError(error.message || 'Network error occurred');
        }
      }
      setValidated(true);
    };
  
  
    return (
        <StyledContainer style={{ maxWidth: '600px' }}>
          <h1 className="text-center mb-4">Front Office</h1>

         <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group className="position-relative mb-3" controlId="selectedDate">
              <div className="position-relative">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ cursor: 'pointer', color: 'blue', fontSize: '25px' }}
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
        <Form.Group className="mb-3" controlId="SumtotalPatien">
          <Form.Label>Sum total Patient - in time for Consultation</Form.Label>
          <Form.Control
            required 
          type="text" value={SumtotalPatient} onChange={(e) => { setSumtotalPatient(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="TotalnoofOutPatients">
          <Form.Label>Total no of Out Patients</Form.Label>
          <Form.Control 
            required
          type="text" value={TotalnoofOutPatients} onChange={(e) => { setTotalnoofOutPatients(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="SumtotalpatientReportingtime">
          <Form.Label>Sum total patient Reporting time</Form.Label>
          <Form.Control required
          type="text" value={SumtotalpatientReportingtime} onChange={(e) => { setSumtotalpatientReportingtime(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="NoofPatientsReportedinDiagnostics">
          <Form.Label>No of Patients Reported in Diagnostics (MRI, CT, USG, ECHO, LAB, X-ray)</Form.Label>
          <Form.Control 
            required
          type="text" value={NoofPatientsReportedinDiagnostics} onChange={(e) => { setNoofPatientsReportedinDiagnostics(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label>Number Of Beds Occupied</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfBedsOccupied} onChange={(e) => { setnumberOfBedsOccupied(e.target.value); handleChange(e); }} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

            <Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
          Save
        </Button>


        <Alert variant="success" show={formSubmitted}>
          Form submitted successfully.
        </Alert>

        <Alert variant="danger" show={error !== ''}>
          {error}
        </Alert>

      </Form>
    </StyledContainer>
  );
}
export default FrontOffice;
