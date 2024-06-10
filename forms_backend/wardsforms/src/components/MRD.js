import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled(Container)`
  margin-bottom: 15%;
`;

function MRDForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [NumberofMedicalRecords, setNumberofMedicalRecords] = useState('');
  const [Numberofdischarge, setNumberofdischarge] = useState('');
  const [Numberofdeath, setNumberofdeath] = useState('');
  const [numberOfBedsOccupied, setnumberOfBedsOccupied] = useState('');

  const [formData, setFormData] = useState({
    selectedDate: '',
    NumberofMedicalRecords: '',
    Numberofdischarge: '',
    Numberofdeath: '',
    numberOfBedsOccupied: '',
  });

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
    try {
      const response = await fetch('http://127.0.0.1:8000/MRDData/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <StyledContainer style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">MRD</h1>
      <Form onSubmit={handleSubmit}>
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
        <Form.Group className="mb-3" controlId="NumberofMedicalRecords">
          <Form.Label>Number of Medical Records having Incomplete and /or Improper Consent (Min)</Form.Label>
          <Form.Control type="text" value={NumberofMedicalRecords} onChange={(e) => { setNumberofMedicalRecords(e.target.value); handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Numberofdischarge">
          <Form.Label>Number of discharge</Form.Label>
          <Form.Control type="text" value={Numberofdischarge} onChange={(e) => { setNumberofdischarge(e.target.value); handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Numberofdeath">
          <Form.Label>Number of death</Form.Label>
          <Form.Control type="text" value={Numberofdeath} onChange={(e) => { setNumberofdeath(e.target.value); handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label>Number Of Beds Occupied</Form.Label>
          <Form.Control type="text" value={numberOfBedsOccupied} onChange={(e) => { setnumberOfBedsOccupied(e.target.value); handleChange(e); }} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </StyledContainer>
  );
}

export default MRDForm;