import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
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

function FrontOffice() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',  
    name: '' ,
    selectedDate: '',
    SumtotalPatient: '',
    NoofOpPatient:'',
    SumtotalpatientReportingtime: '',
    ECHS: '',
    ESI: '',
    Railway: '',
    TNCM: '',
    PAY: '',
    totalOutPatients: '',
    MRI: '',
    CT: '',
    USG: '',
    ECHO: '',
    LAB: '',
    Xray: ''
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (id && name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id,  
        name, 
      }));
    }
  }, []); 

  useEffect(() => {
    if (selectedDate) {
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = parseInt(value, 10) || 0;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [id]: updatedValue };
      
      if (['ECHS', 'ESI', 'Railway', 'TNCM', 'PAY'].includes(id)) {
        const newTotalOutPatients = ['ECHS', 'ESI', 'Railway', 'TNCM', 'PAY']
        .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);
        return { ...updatedFormData, totalOutPatients: newTotalOutPatients };
      }

      if (['MRI', 'CT', 'USG', 'ECHO', 'LAB', 'Xray'].includes(id)) {
        const newSumTotalPatientReportingTime = ['MRI', 'CT', 'USG', 'ECHO', 'LAB', 'Xray']
          .reduce((sum, field) => sum + (parseInt(updatedFormData[field], 10) || 0), 0);
        return { ...updatedFormData, SumtotalpatientReportingtime: newSumTotalPatientReportingTime };
      }

      return updatedFormData;
    });
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
        const response = await fetch('http://127.0.0.1:8000/FrontOffice/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUser),
        });
        if (response.ok) {
          console.log('Data submitted successfully');
          setFormSubmitted(true);
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
       <h2 className="text-center">Front Office</h2>
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
        <Form.Group className="mb-3" controlId="SumtotalPatient">
          <Form.Label>Sum total Patient - in time for Consultation</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.SumtotalPatient}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        <br/>

        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>Total No of Out-Patients</h4>

        <Form.Group className="mb-3" controlId="ECHS">
          <Form.Label>ECHS</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.ECHS}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ESI">
          <Form.Label>ESI</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.ESI}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Railway">
          <Form.Label>Railway</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.Railway}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="TNCM">
          <Form.Label>TNCM</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.TNCM}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="PAY">
          <Form.Label>PAY</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.PAY}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group className="mb-3" controlId="SumtotalPatient">
          <Form.Label>Number of OP Patients</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.NoofOpPatient}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
       <br/>
        <Form.Group className="mb-3" controlId="totalOutPatients">
          <Form.Label>Total Out-Patients</Form.Label>
          <Form.Control
            readOnly
            type="number"
            value={formData.totalOutPatients}
            onChange={handleChange} />
        </Form.Group>
        <br/>
        <h4 className="text-center mb-4" style={{ backgroundColor: "#EBB099", color: "white" }}>No of Patients Reported in Diagnostics</h4>

        <Form.Group className="mb-3" controlId="MRI">
          <Form.Label>MRI</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.MRI}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="CT">
          <Form.Label>CT</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.CT}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="USG">
          <Form.Label>USG</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.USG}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="ECHO">
          <Form.Label>ECHO</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.ECHO}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="LAB">
          <Form.Label>LAB</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.LAB}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Xray">
          <Form.Label>X-ray</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.Xray}
            onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="SumtotalpatientReportingtime">
          <Form.Label>Sum total patient Reporting time</Form.Label>
          <Form.Control
            readOnly
            type="text"
            value={formData.SumtotalpatientReportingtime}
          />
        </Form.Group>
        <br/>
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
}

export default FrontOffice;

