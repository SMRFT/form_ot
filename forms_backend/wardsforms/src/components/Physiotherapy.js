import React, { useState ,useEffect} from 'react';
import { Row, Col, Form, Button ,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Physiotherapy = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfIpPatients, setNumberOfIpPatients] = useState('');
  const [numberOfOpPatients, setNumberOfOpPatients] = useState('');
  const [totalCsess, setTotalCsess] = useState('');
  const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    selectedDate: '',
    numberOfIpPatients:'',
    numberOfOpPatients:'',
    totalCsess:'',
    numberOfBedsOccupied:''
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
        const response = await fetch('http://127.0.0.1:8000/post-physiotherapy-dialysis-data/', {
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
    <StyledContainer style={{ maxWidth: '800px' }}>

      <h1 className="text-center mb-4">Physiotherapy</h1><br/>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

       <Form.Group as={Row} className="mb-3" controlId="selectedDate">
        <Col sm="6">
          <div>
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
              <div>
                {selectedDate.toLocaleDateString('en-GB')}
              </div>
            )}
          </div>
        </Col>
      </Form.Group>


        <Form.Group as={Row} className="mb-3" controlId="numberOfIpPatients">
          <Form.Label column sm="3">Number of IP Patients</Form.Label>
          <Col sm="6">
            <Form.Control
             required
              type="text"
              value={numberOfIpPatients}
              onChange={(e) => {setNumberOfIpPatients(e.target.value);handleChange(e);}}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label column sm="3">NumberOfBedsOccupied</Form.Label>
          <Col sm="6">
            <Form.Control
             required
              type="text"
              value={numberOfBedsOccupied}
              onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="numberOfOpPatients">
          <Form.Label column sm="3">Number of OP Patients</Form.Label>
          <Col sm="6">
            <Form.Control
             required
              type="text"
              value={numberOfOpPatients}
              onChange={(e) => {setNumberOfOpPatients(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="totalCsess">
          <Form.Label column sm="3">Total Csess</Form.Label>
          <Col sm="6">
            <Form.Control
             required
              type="text"
              value={totalCsess}
              onChange={(e) => {setTotalCsess(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Col>
          
        
        </Form.Group>
        <br/>
<center>
<Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
          Save
        </Button>
</center>
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

export default Physiotherapy;

