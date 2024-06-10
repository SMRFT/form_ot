import React, { useState ,useEffect} from 'react';
import { Form, Container, Button, Row ,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled(Container)`
  margin-bottom: 15%; /* Adjust the margin-top as needed */
`;

function RecoveryWardForm() {
  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [numberOfTransfusionReactions, setNumberOfTransfusionReactions] = useState('');
  const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitis, setTotalNoOfPatientsDevelopingPhlebitis] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);




  const [formData, setFormData] = useState({
selectedDate:'',
timeTakenForInitialAssessment:'',
totalNumberOfAdmissions:'',
numberOfNursingStaff:'',
totalNumberOfMedicationErrors:'',
numberOfPatientsDevelopingAdverseDrugReactions:'',
numberOfPatientFalls:'',
numberOfUnitsTransfused:'',
numberOfTransfusionReactions:'',
totalNoOfBloodAndBloodComponentsCrossMatched:'',
timeTakenForBloodAndBloodComponents:'',
numberOfCentralLineDaysInMonth:'',
numberOfNearMissReported:'',
numberOfIncidentsReported:'',
numberOfParenteralExposures:'',
totalNoOfHandoversDoneAppropriately:'',
totalNoOfHandoverOpportunities:'',
totalNoOfPatientsDevelopingPhlebitis:'',
numberOfRestraintInjuries:'',
numberOfBedsOccupied:'',
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
        const response = await fetch('http://127.0.0.1:8000/post-recovery-ward-data/', {
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

      <h1 className="text-center mb-4">Recovery Ward</h1>

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
  
        <Row className="mb-3">
          <Form.Group controlId="timeTakenForInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment (Min)</Form.Label>
            <Form.Control
            required
              type="text"
              value={timeTakenForInitialAssessment}
              onChange={(e) => {setTimeTakenForInitialAssessment(e.target.value);handleChange(e);}}
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
          onChange={(e) => {setTotalNumberOfAdmissions(e.target.value);handleChange(e);}} />
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
          onChange={(e) => {setNumberOfNursingStaff(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="totalNumberOfMedicationErrors">
          <Form.Label>Total Number of Medication Errors</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={totalNumberOfMedicationErrors}
           onChange={(e) => {setTotalNumberOfMedicationErrors(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingAdverseDrugReactions">
          <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
          <Form.Control 
          type="text" 
          required
          value={numberOfPatientsDevelopingAdverseDrugReactions} 
          onChange={(e) => {setNumberOfPatientsDevelopingAdverseDrugReactions(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfPatientFalls">
          <Form.Label>Number of Patient Falls</Form.Label>
          <Form.Control 
          type="text" 
          required
          value={numberOfPatientFalls} 
          onChange={(e) => {setNumberOfPatientFalls(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfUnitsTransfused">
          <Form.Label>Number of Units Transfused</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={numberOfUnitsTransfused}
           onChange={(e) => {setNumberOfUnitsTransfused(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfTransfusionReactions">
          <Form.Label>Number of Transfusion Reactions</Form.Label>
          <Form.Control
          required
           type="text" 
           value={numberOfTransfusionReactions}
           onChange={(e) => {setNumberOfTransfusionReactions(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
          <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={totalNoOfBloodAndBloodComponentsCrossMatched} 
          onChange={(e) => {setTotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="timeTakenForBloodAndBloodComponents">
          <Form.Label>Sum of Time Taken for Blood & Blood Components (Min)</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={timeTakenForBloodAndBloodComponents} 
          onChange={(e) => {setTimeTakenForBloodAndBloodComponents(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfCentralLineDaysInMonth">
          <Form.Label>Number of Central Line Days in that Month</Form.Label>
          <Form.Control 
          required
          type="text"
           value={numberOfCentralLineDaysInMonth} 
           onChange={(e) => {setNumberOfCentralLineDaysInMonth(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfNearMissReported">
          <Form.Label>Number of Near Miss Reported</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={numberOfNearMissReported} 
          onChange={(e) => {setNumberOfNearMissReported(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfIncidentsReported">
          <Form.Label>Number of Incidents Reported</Form.Label>
          <Form.Control
          required 
          type="text" 
          value={numberOfIncidentsReported} 
          onChange={(e) => {setNumberOfIncidentsReported(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="numberOfParenteralExposures">
          <Form.Label>Number of Parenteral Exposures</Form.Label>
          <Form.Control 
          required
          type="text"
          value={numberOfParenteralExposures} 
          onChange={(e) => {setNumberOfParenteralExposures(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="totalNoOfHandoversDoneAppropriately">
          <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={totalNoOfHandoversDoneAppropriately} 
          onChange={(e) => {setTotalNoOfHandoversDoneAppropriately(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="totalNoOfHandoverOpportunities">
          <Form.Label>Total No of Handover Opportunities</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={totalNoOfHandoverOpportunities} 
          onChange={(e) => {setTotalNoOfHandoverOpportunities(e.target.value);handleChange(e);}} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="totalNoOfPatientsDevelopingPhlebitis">
          <Form.Label>Total No of Patients Developing Phlebitis</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={totalNoOfPatientsDevelopingPhlebitis} 
          onChange={(e) =>{ setTotalNoOfPatientsDevelopingPhlebitis(e.target.value);handleChange(e);}} />
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
           onChange={(e) => {setNumberOfRestraintInjuries(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label>Number Of Beds Occupied</Form.Label>
          <Form.Control 
          required
          type="text" 
          value={numberOfBedsOccupied} 
          onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e);}} />
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

export default RecoveryWardForm;

