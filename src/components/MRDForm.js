import React, { useState, useEffect } from 'react';
import { Row, Form, Button ,Alert,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

function MRDForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [NumberofMedicalRecords, setNumberofMedicalRecords] = useState('');
  const [Numberofdischarge, setNumberofdischarge] = useState('');
  const [Numberofdeath, setNumberofdeath] = useState('');
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    NumberofMedicalRecords: '',
    Numberofdischarge: '',
    Numberofdeath: '',
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
            const response = await fetch('http://127.0.0.1:8000/MRD/', {
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
       <h2 className="text-center">MRD</h2>
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

      
        <Form.Group className="mb-3" controlId="NumberofMedicalRecords">
          <Form.Label>Number of Medical Records having Incomplete and /or Improper Consent </Form.Label>
          <Form.Control 
           required
          type="text" 
          value={NumberofMedicalRecords} 
          onChange={(e) => { setNumberofMedicalRecords(e.target.value); handleChange(e); }} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Numberofdischarge">
          <Form.Label>Number of discharge</Form.Label>
          <Form.Control 
           required
          type="text" value={Numberofdischarge} 
          onChange={(e) => { setNumberofdischarge(e.target.value); handleChange(e); }} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Numberofdeath">
          <Form.Label>Number of death</Form.Label>
          <Form.Control 
           required
          type="text" value={Numberofdeath}
          onChange={(e) => { setNumberofdeath(e.target.value); handleChange(e); }} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        
        <button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
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
}

export default MRDForm;
