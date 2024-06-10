import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const OTForm = () => {
  const MAX_CHAR_LIMIT = 255;

  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    unplannedReturn: '',
    unplannedReturnRemarks: '',
    totalPatients: '',
    procedureFollowed: '',
    plannedSurgeries: '',
    TransfusionReactions: '',
    TransfusionReactionsRemarks: '',
    unitsTransfusedCount: '',
    unitsTransfusedRemarks: {},
    timeForBlood: '',
    prophylacticAntibiotic: '',
    rescheduledCases: '',
    rescheduledCasesRemarks: '',
    surgicalSiteInfections: '',
    correctProcedures: '',
    dayCareOPCases: '',
    dayCareIPCases: '',
    minorCases: '',
    parenteralExposures: '',
    parenteralExposuresRemarks: '',
  });

  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        setError('');
      }, 3000);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value.length > MAX_CHAR_LIMIT) {
      setError(`Ensure this value has at most ${MAX_CHAR_LIMIT} characters.`);
      return;
    }
    if (id.includes('reaction') || id.includes('remarks')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        unitsTransfusedRemarks: {
          ...formData.unitsTransfusedRemarks,
          [id]: value,
        },
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, selectedDate: date });
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
        const response = await fetch('http://127.0.0.1:8000/OT/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUser),
        });
        if (response.ok) {
          console.log('Data submitted successfully');
          setFormSubmitted(true);
          setError('');
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to submit data');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setError('Failed to submit data');
        setFormSubmitted(false);
      }
    }
    setValidated(true);
  };

  return (
    <StyledContainer style={{ maxWidth: '600px' }} className="NumericalData">
       <h2 className="text-center">OT(Operation Theatre)</h2>
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
          <Col sm='8'>
            <Form.Group controlId="unplannedReturn">
              <Form.Label>Number of Unplanned Return to OT or Re-exploration (within 30 days)</Form.Label>
              <Form.Control required type="text" value={formData.unplannedReturn} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4' className='mt-4'>
            <Form.Group controlId="unplannedReturnRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.unplannedReturnRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="totalPatients">
            <Form.Label>Number of Patients who Underwent Surgeries in the OT</Form.Label>
            <Form.Control required type="text" value={formData.totalPatients} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group controlId="procedureFollowed">
            <Form.Label>Number of Surgeries where the Procedure was Followed (WHO Checklist)</Form.Label>
            <Form.Control required type="text" value={formData.procedureFollowed} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group controlId="plannedSurgeries">
            <Form.Label>Number of Surgeries planned in the OT</Form.Label>
            <Form.Control required type="text" value={formData.plannedSurgeries} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="unitsTransfusedCount">
              <Form.Label>Enter the Number of Units Transfused</Form.Label>
              <Form.Control
                required
                value={formData.unitsTransfusedCount}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {Array.from({ length: parseInt(formData.unitsTransfusedCount) }, (_, index) => (
          <Row key={index} className="mb-3">
            <Col sm="8">
              <Form.Group controlId={`reaction-${index}`}>
                <Form.Label>Transfusion Reaction {index + 1}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.unitsTransfusedRemarks[`reaction-${index}`] || ''}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group controlId={`remarks-${index}`}>
                <Form.Label>Remarks {index + 1}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.unitsTransfusedRemarks[`remarks-${index}`] || ''}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Row className="mb-3">
        <Col sm='8'>
          <Form.Group controlId="TransfusionReactions">
            <Form.Label>Number of Transfusion Reactions</Form.Label>
            <Form.Control required type="text" value={formData.TransfusionReactions} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col sm='4'>
              <Form.Group controlId="TransfusionReactionsRemarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control required type="text" value={formData.TransfusionReactionsRemarks} onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
              </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="timeForBlood">
            <Form.Label>Time taken for Receiving blood from blood bank</Form.Label>
            <Form.Control required type="text" value={formData.timeForBlood} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="prophylacticAntibiotic">
            <Form.Label>Number of patients who received appropriate Prophylactic Antibiotic</Form.Label>
            <Form.Control required type="text" value={formData.prophylacticAntibiotic} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col sm='8'>
            <Form.Group controlId="rescheduledCases">
              <Form.Label style={{whiteSpace:'nowrap'}}>Number of cases Rescheduled or Canceled</Form.Label>
              <Form.Control required type="text" value={formData.rescheduledCases} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group controlId="rescheduledCasesRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.rescheduledCasesRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="surgicalSiteInfections">
            <Form.Label>Number of Surgical Site Infections</Form.Label>
            <Form.Control required type="text" value={formData.surgicalSiteInfections} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="correctProcedures">
            <Form.Label>Number of Surgeries where Procedures were followed (Correct Patient, Correct Surgery)</Form.Label>
            <Form.Control required type="text" value={formData.correctProcedures} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="dayCareOPCases">
            <Form.Label>Number of Day Care OP Cases</Form.Label>
            <Form.Control required type="text" value={formData.dayCareOPCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="dayCareIPCases">
            <Form.Label>Number of Day Care IP Cases</Form.Label>
            <Form.Control required type="text" value={formData.dayCareIPCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="minorCases">
            <Form.Label>Number of Minor Cases</Form.Label>
            <Form.Control required type="text" value={formData.minorCases} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col sm='8'>
            <Form.Group controlId="parenteralExposures">
              <Form.Label style={{whiteSpace:'nowrap'}}>Number of Parenteral Exposures</Form.Label>
              <Form.Control required type="text" value={formData.parenteralExposures} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm='4'>
            <Form.Group controlId="parenteralExposuresRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control required type="text" value={formData.parenteralExposuresRemarks} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please fill out this field</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <button variant="primary" type="submit" className="mb-3">
          Save
        </button>

        {formSubmitted && !error && (
          <Alert variant="success">
            Form submitted successfully.
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </StyledContainer>
  );
};

export default OTForm;
