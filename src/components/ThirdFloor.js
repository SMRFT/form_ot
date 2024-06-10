import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Alert, Button, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const MAX_CHAR_LIMIT = 255;

const ThirdFloor = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    sumTimeInitialAssessment: '',
    totalAdmissions: '',
    numberOfInPatients: '',
    patientsDischarged: '',
    sumTimeDischarge: '',
    MedicationErrors: '',
    MedicationErrorsRemarks: '',
    totalMedicationErrors: '',
    medicationChartsReviewed: '',
    medicationChartsReviewedRemarks: '',
    adverseDrugReactions: '',
    adverseDrugReactionsRemarks: '',
    pressureUlcers: '',
    pressureUlcersRemarks: '',
    patientFalls: '',
    patientFallsRemarks: '',
    transfusionReactions: '',
    transfusionReactionsRemarks: '',
    unitsTransfusedCount: '',
    unitsTransfusedRemarks: {},
    timeForBloodComponents: '',
    catheruti: '',
    catherutiRemarks: '',
    urinaryCatheterDays: '',
    clabsi: '',
    clabsiRemarks: '',
    centralLineDays: '',
    surgicalSiteInfections: '',
    surgicalSiteInfectionsRemarks: '',
    bloodComponentsCrossMatched: '',
    nearMisses: '',
    nearMissesRemarks: '',
    incidentsReported: '',
    incidentsReportedRemarks: '',
    bedOccupied: '',
    nursingStaff: '',
    handoversDone: '',
    handoverOpportunities: '',
    restraintInjuries: '',
    restraintInjuriesRemarks: '',
    restraintPatientDays: '',
    restraintPatientDaysRemarks: '',
    patientsOnIV: '',
    phlebitis: '',
    phlebitisRemarks: '',
    parenteralExposures: '',
    parenteralExposuresRemarks: '',
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

  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        unitsTransfusedRemarks: {
          ...prevFormData.unitsTransfusedRemarks,
          [id]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [id]: value });
    }
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
        const response = await fetch('http://127.0.0.1:8000/ThirdFloor/', {
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
       <h2 className="text-center">Third Floor</h2>
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

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="sumTimeInitialAssessment">
              <Form.Label>Sum of Time Taken for Initial Assessment (Minutes)</Form.Label>
              <Form.Control type="text" value={formData.sumTimeInitialAssessment} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalAdmissions">
              <Form.Label>Total Number of Admissions</Form.Label>
              <Form.Control type="text" value={formData.totalAdmissions} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numberOfInPatients">
              <Form.Label>Number of In-Patients</Form.Label>
              <Form.Control type="text" value={formData.numberOfInPatients} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="patientsDischarged">
              <Form.Label>Number of Patients Discharged</Form.Label>
              <Form.Control type="text" value={formData.patientsDischarged} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="sumTimeDischarge">
              <Form.Label>Sum of Time Taken for Discharge(Minutes)</Form.Label>
              <Form.Control type="text" value={formData.sumTimeDischarge} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="MedicationErrors">
              <Form.Label>Total Number of Medication Errors</Form.Label>
              <Form.Control type="text" value={formData.MedicationErrors} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="MedicationErrorsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.MedicationErrorsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="totalMedicationErrors">
              <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
              <Form.Control type="text" value={formData.totalMedicationErrors} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="medicationChartsReviewed">
              <Form.Label>Number of Medication Charts Reviewed</Form.Label>
              <Form.Control type="text" value={formData.medicationChartsReviewed} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="medicationChartsReviewedRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.medicationChartsReviewedRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm>
            <Form.Group controlId="adverseDrugReactions">
              <Form.Label>Number of Patients Developing Adverse Drug Reaction's</Form.Label>
              <Form.Control type="text" value={formData.adverseDrugReactions} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group controlId="adverseDrugReactionsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.adverseDrugReactionsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="pressureUlcers">
              <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
              <Form.Control type="text" value={formData.pressureUlcers} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="pressureUlcersRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.pressureUlcersRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="unitsTransfusedCount">
              <Form.Label>Enter Number of Units Transfused</Form.Label>
              <Form.Control type="text" value={formData.unitsTransfusedCount} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        {Array.from({ length: formData.unitsTransfusedCount || 0 }).map((_, index) => (
          <Row className="mb-3" key={index}>
            <Col>
              <Form.Group controlId={`transfusion-reaction-${index}`}>
                <Form.Label>{`Transfusion Reaction ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.unitsTransfusedRemarks[`transfusion-reaction-${index}`] || ''}
                  onChange={handleChange}
                  maxLength={MAX_CHAR_LIMIT}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`transfusion-reaction-remarks-${index}`}>
                <Form.Label>{`Remarks ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.unitsTransfusedRemarks[`transfusion-reaction-remarks-${index}`] || ''}
                  onChange={handleChange}
                  maxLength={MAX_CHAR_LIMIT}
                />
              </Form.Group>
            </Col>
          </Row>
        ))}

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="transfusionReactions">
              <Form.Label>Number of Transfusion Reactions</Form.Label>
              <Form.Control type="text" value={formData.transfusionReactions} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="transfusionReactionsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.transfusionReactionsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="timeForBloodComponents">
              <Form.Label>Sum of Time Taken for Blood & Blood Components(Minutes)</Form.Label>
              <Form.Control type="text" value={formData.timeForBloodComponents} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="catheruti">
              <Form.Label>Number of uninary cather associated UTI's In a month</Form.Label>
              <Form.Control type="text" value={formData.catheruti} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="catherutiRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.catherutiRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="urinaryCatheterDays">
              <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
              <Form.Control type="text" value={formData.urinaryCatheterDays} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
         <Col>
            <Form.Group controlId="clabsi">
              <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
              <Form.Control type="text" value={formData.clabsi} onChange={handleChange} required />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group controlId="clabsiRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.clabsiRemarks} onChange={handleChange} required />
            </Form.Group>
            </Col>
            </Row> 

             <Row className="mb-3">
            <Form.Group controlId="centralLineDays">
              <Form.Label>Number of Central Line Days in that Month
            </Form.Label>
              <Form.Control type="text" value={formData.centralLineDays} onChange={handleChange} required />
            </Form.Group>
            </Row> 
      
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="surgicalSiteInfections">
              <Form.Label>Number of Surgical Site Infections in a Given Month
            </Form.Label>
              <Form.Control type="text" value={formData.surgicalSiteInfections} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="surgicalSiteInfectionsRemarks">
              <Form.Label>Remarks
            </Form.Label>
              <Form.Control type="text" value={formData.surgicalSiteInfectionsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="bloodComponentsCrossMatched">
              <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
              <Form.Control type="text" value={formData.bloodComponentsCrossMatched} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="patientFalls">
              <Form.Label>Number of Patient Falls</Form.Label>
              <Form.Control type="text" value={formData.patientFalls} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="patientFallsRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.patientFallsRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nearMisses">
              <Form.Label>Number of Near Misses Reported</Form.Label>
              <Form.Control type="text" value={formData.nearMisses} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="nearMissesRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.nearMissesRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="incidentsReported">
              <Form.Label>Number of Incidents Reported</Form.Label>
              <Form.Control type="text" value={formData.incidentsReported} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="incidentsReportedRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.incidentsReportedRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="bedOccupied">
              <Form.Label>Number of Bed Occupied</Form.Label>
              <Form.Control type="text" value={formData.bedOccupied} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nursingStaff">
              <Form.Label>Number of Nursing Staff </Form.Label>
              <Form.Control type="text" value={formData.nursingStaff} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
            <Form.Group controlId="handoversDone">
              <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
              <Form.Control type="text" value={formData.handoversDone} onChange={handleChange} required />
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group controlId="handoverOpportunities">
              <Form.Label>Total Number of Handover Opportunities</Form.Label>
              <Form.Control type="text" value={formData.handoverOpportunities} onChange={handleChange} required />
            </Form.Group>
          
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="restraintInjuries">
              <Form.Label>Number of Restraint Injuries /Strangulatio</Form.Label>
              <Form.Control type="text" value={formData.restraintInjuries} onChange={handleChange} required />
              </Form.Group>
              </Col>   
          <Col>
            <Form.Group controlId="restraintInjuriesRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.restraintInjuriesRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="restraintPatientDays">
              <Form.Label>Number of Restraint Patient Days</Form.Label>
              <Form.Control type="text" value={formData.restraintPatientDays} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="restraintPatientDaysRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.restraintPatientDaysRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="patientsOnIV">
              <Form.Label>Number of Patients on IV Therapy</Form.Label>
              <Form.Control type="text" value={formData.patientsOnIV} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="phlebitis">
              <Form.Label>Total No of patient who develops phlebitis/Extravasation</Form.Label>
              <Form.Control type="text" value={formData.phlebitis} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phlebitisRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.phlebitisRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="parenteralExposures">
              <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
              <Form.Control type="text" value={formData.parenteralExposures} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="parenteralExposuresRemarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control type="text" value={formData.parenteralExposuresRemarks} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

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
};

export default ThirdFloor;