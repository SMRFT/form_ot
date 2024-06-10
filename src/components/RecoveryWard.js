import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Alert } from 'react-bootstrap';
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

function RecoveryWard() {
  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
  const [totalNumberOfMedicationErrorsRemarks, settotalNumberOfMedicationErrorsRemarks] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [DrugReactionsRemarks, setDrugReactionsRemarks] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfPatientFallsRemarks, setNumberOfPatientFallsRemarks] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [numberOfTransfusionReactions, setNumberOfTransfusionReactions] = useState('');
  const [numberOfTransfusionReactionsRemarks, setNumberOfTransfusionReactionsRemarks] = useState('');
  const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfNearMissReportedRemarks, setNumberOfNearMissReportedRemarks] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [numberOfParenteralExposuresRemarks, setNumberOfParenteralExposuresRemarks] = useState('');
  const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitis, setTotalNoOfPatientsDevelopingPhlebitis] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const [numberOfBedsOccupied, setNumberOfBedsOccupied] = useState('');
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    selectedDate: '',
    timeTakenForInitialAssessment: '',
    totalNumberOfAdmissions: '',
    numberOfNursingStaff: '',
    totalNumberOfMedicationErrors: '',
    totalNumberOfMedicationErrorsRemarks:'',
    numberOfPatientsDevelopingAdverseDrugReactions: '',
    DrugReactionsRemarks:'',
    numberOfPatientFalls: '',
    numberOfPatientFallsRemarks:'',
    numberOfUnitsTransfused: '',
    numberOfTransfusionReactions: '',
    numberOfTransfusionReactionsRemarks:'',
    totalNoOfBloodAndBloodComponentsCrossMatched: '',
    timeTakenForBloodAndBloodComponents: '',
    numberOfCentralLineDaysInMonth: '',
    numberOfNearMissReported: '',
    numberOfNearMissReportedRemarks:'',
    numberOfIncidentsReported: '',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks:'',
    totalNoOfHandoversDoneAppropriately: '',
    totalNoOfHandoverOpportunities: '',
    totalNoOfPatientsDevelopingPhlebitis: '',
    numberOfRestraintInjuries: '',
    numberOfBedsOccupied: '',
    unitsTransfusedCount: '',
    unitsTransfusedRemarks: {},
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
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: adjustedDate.toISOString().split('T')[0],
      }));
    }
  }, [selectedDate]);

  const MAX_CHAR_LIMIT = 100;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value.length > MAX_CHAR_LIMIT) {
      setError(`Ensure this value has at most ${MAX_CHAR_LIMIT} characters.`);
      return;
    }
    if (id.includes('reaction')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        unitsTransfusedRemarks: {
          ...formData.unitsTransfusedRemarks,
          [`reaction-${index}`]: value,
        },
      });
    } else if (id.includes('remarks')) {
      const index = parseInt(id.split('-')[1]);
      setFormData({
        ...formData,
        unitsTransfusedRemarks: {
          ...formData.unitsTransfusedRemarks,
          [`remarks-${index}`]: value,
        },
      });
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
        const response = await fetch('http://127.0.0.1:8000/post-recovery-ward-data/', {
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
        setError(error.message || 'Network error occurred');
      }
    }
    setValidated(true);
  };

  return (
    <StyledContainer style={{ maxWidth: '600px' }} className="NumericalData">
       <h2 className="text-center">Recovery Ward</h2>
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
          <Form.Group controlId="timeTakenForInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment (Min)</Form.Label>
            <Form.Control
              required
              type="text"
              value={timeTakenForInitialAssessment}
              onChange={(e) => { setTimeTakenForInitialAssessment(e.target.value); handleChange(e); }}
            />
            <Form.Control.Feedback type="invalid">
              Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="totalNumberOfAdmissions">
          <Form.Label>Total Number of Admissions</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNumberOfAdmissions}
            onChange={(e) => { setTotalNumberOfAdmissions(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfNursingStaff">
          <Form.Label>Number of Nursing Staff</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfNursingStaff}
            onChange={(e) => { setNumberOfNursingStaff(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>


        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="totalNumberOfMedicationErrors">
        <Form.Label>Total Number of Medication Errors</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNumberOfMedicationErrors}
            onChange={(e) => { setTotalNumberOfMedicationErrors(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="totalNumberOfMedicationErrorsRemarks">
        <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNumberOfMedicationErrorsRemarks}
            onChange={(e) => { settotalNumberOfMedicationErrorsRemarks(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>


        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfPatientsDevelopingAdverseDrugReactions">
          <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfPatientsDevelopingAdverseDrugReactions}
            onChange={(e) => { setNumberOfPatientsDevelopingAdverseDrugReactions(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="DrugReactionsRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={DrugReactionsRemarks}
            onChange={(e) => { setDrugReactionsRemarks(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfPatientFalls">
          <Form.Label>Number of Patient Falls</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfPatientFalls}
            onChange={(e) => { setNumberOfPatientFalls(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group  controlId="numberOfPatientFallsRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfPatientFallsRemarks}
            onChange={(e) => { setNumberOfPatientFallsRemarks(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
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
          <Col sm="8">
        <Form.Group  controlId="numberOfTransfusionReactions">
          <Form.Label>Number of Transfusion Reactions</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfTransfusionReactions}
            onChange={(e) => { setNumberOfTransfusionReactions(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm="4">
        <Form.Group  controlId="numberOfTransfusionReactions">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfTransfusionReactionsRemarks}
            onChange={(e) => { setNumberOfTransfusionReactionsRemarks(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        
        </Row>


        <Form.Group className="mb-3" controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
          <Form.Label>Total No. of Blood and Blood Components Cross Matched</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNoOfBloodAndBloodComponentsCrossMatched}
            onChange={(e) => { setTotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeTakenForBloodAndBloodComponents">
          <Form.Label>Time Taken for Blood and Blood Components Cross Matched (Min)</Form.Label>
          <Form.Control
            required
            type="text"
            value={timeTakenForBloodAndBloodComponents}
            onChange={(e) => { setTimeTakenForBloodAndBloodComponents(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineDaysInMonth">
          <Form.Label>Number of Central Line Days in Month</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfCentralLineDaysInMonth}
            onChange={(e) => { setNumberOfCentralLineDaysInMonth(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col sm='8'>
        <Form.Group  controlId="numberOfNearMissReported">
          <Form.Label>Number of Near Miss Reported</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfNearMissReported}
            onChange={(e) => { setNumberOfNearMissReported(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        
        <Col sm='4'>
          <Form.Group controlId="numberOfNearMissReportedRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={numberOfNearMissReportedRemarks}
              onChange={(e) =>{ setNumberOfNearMissReportedRemarks(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
             Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="numberOfIncidentsReported">
          <Form.Label>Number of Incidents Reported</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfIncidentsReported}
            onChange={(e) => { setNumberOfIncidentsReported(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
        <Col sm='8'>
        <Form.Group  controlId="numberOfParenteralExposures">
          <Form.Label>Number of Parenteral Exposures</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfParenteralExposures}
            onChange={(e) => { setNumberOfParenteralExposures(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>


      <Col sm='4'>
      <Form.Group controlId="numberOfParenteralExposuresRemarks">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
        required
          type="text"
          value={numberOfParenteralExposuresRemarks}
          onChange={(e) => {setNumberOfParenteralExposuresRemarks(e.target.value);handleChange(e);}}
        />
        <Form.Control.Feedback type="invalid">
         Please fill out this field
         </Form.Control.Feedback>
      </Form.Group>
      </Col>
    </Row>


        <Form.Group className="mb-3" controlId="totalNoOfHandoversDoneAppropriately">
          <Form.Label>Total No. of Handovers Done Appropriately</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNoOfHandoversDoneAppropriately}
            onChange={(e) => { setTotalNoOfHandoversDoneAppropriately(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfHandoverOpportunities">
          <Form.Label>Total No. of Handover Opportunities</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNoOfHandoverOpportunities}
            onChange={(e) => { setTotalNoOfHandoverOpportunities(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfPatientsDevelopingPhlebitis">
          <Form.Label>Total No. of Patients Developing Phlebitis</Form.Label>
          <Form.Control
            required
            type="text"
            value={totalNoOfPatientsDevelopingPhlebitis}
            onChange={(e) => { setTotalNoOfPatientsDevelopingPhlebitis(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfRestraintInjuries">
          <Form.Label>Number of Restraint Injuries</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfRestraintInjuries}
            onChange={(e) => { setNumberOfRestraintInjuries(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label>Number of Beds Occupied</Form.Label>
          <Form.Control
            required
            type="text"
            value={numberOfBedsOccupied}
            onChange={(e) => { setNumberOfBedsOccupied(e.target.value); handleChange(e); }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <button variant="primary" type="submit" >
          Submit
        </button>
        
      </Form>
    </StyledContainer>
  );
}

export default RecoveryWard;
