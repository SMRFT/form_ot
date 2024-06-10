import React, { useState ,useEffect} from 'react';
import { Row, Form, Button, Alert ,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled(Container)`
  margin-bottom: 15%; /* Adjust the margin-top as needed */
`;

function ChemoWardForm() {
  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [numberOfPatientsDischarged, setNumberOfPatientsDischarged] = useState('');
  const [numberOfIpPatients, setNumberOfIpPatients] = useState('');
  const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
  const [timeTakenForDischarge, setTimeTakenForDischarge] = useState('');
  const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
  const [totalNumberOfOpportunitiesOfMedicationErrors, setTotalNumberOfOpportunitiesOfMedicationErrors] = useState('');
  const [numberOfMedicationChartsWithErrorProneAbbreviation, setNumberOfMedicationChartsWithErrorProneAbbreviation] = useState('');
  const [numberOfMedicationChartsReviewed, setNumberOfMedicationChartsReviewed] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [numberOfTransfusionReaction, setNumberOfTransfusionReaction] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
  const [numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer, setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer] = useState('');
  const [numberOfUrinaryCatheterAssociatedUTIsInMonth, setNumberOfUrinaryCatheterAssociatedUTIsInMonth] = useState('');
  const [numberOfUrinaryCatheterDaysInMonth, setNumberOfUrinaryCatheterDaysInMonth] = useState('');
  const [numberOfCentralLineAssociatedBloodStreamInfectionsInMonth, setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth] = useState('');
  const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
  const [numberOfSurgicalSiteInfectionsInMonth, setNumberOfSurgicalSiteInfectionsInMonth] = useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitis, setTotalNoOfPatientsDevelopingPhlebitis] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const [totalNoOfRestraintPatientsDays, setTotalNoOfRestraintPatientsDays] = useState('');
  const [numberOfPatientsOnIVTherapy, setNumberOfPatientsOnIVTherapy] = useState('');
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');



const [formData, setFormData] = useState({
timeTakenForInitialAssessment:'',
totalNumberOfAdmissions:'',
numberOfPatientsDischarged:'',
numberOfIpPatients:'',
numberOfBedsOccupied:'',
timeTakenForDischarge:'',
totalNumberOfMedicationErrors:'',
totalNumberOfOpportunitiesOfMedicationErrors:'',
numberOfMedicationChartsWithErrorProneAbbreviation:'',
numberOfMedicationChartsReviewed:'',
numberOfPatientsDevelopingAdverseDrugReactions:'',
numberOfTransfusionReaction:'',
numberOfUnitsTransfused:'',
timeTakenForBloodAndBloodComponents:'',
totalNoOfBloodAndBloodComponentsCrossMatched:'',
numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer:'',
numberOfUrinaryCatheterAssociatedUTIsInMonth:'',
numberOfUrinaryCatheterDaysInMonth:'',
numberOfCentralLineAssociatedBloodStreamInfectionsInMonth:'',
numberOfCentralLineDaysInMonth:'',
numberOfSurgicalSiteInfectionsInMonth:'',
numberOfNursingStaff:'',
numberOfPatientFalls:'',
numberOfNearMissReported:'',
numberOfIncidentsReported:'',
numberOfParenteralExposures:'',
totalNoOfHandoversDoneAppropriately:'',
totalNoOfHandoverOpportunities:'',
totalNoOfPatientsDevelopingPhlebitis:'',
numberOfRestraintInjuries:'',
totalNoOfRestraintPatientsDays:'',
numberOfPatientsOnIVTherapy:'',
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
        const response = await fetch('http://127.0.0.1:8000/post-chemo-ward-data/', {
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
      <h1 className="text-center mb-4">Chemo Ward</h1><br/>

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
<br/>
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

        <Row className="mb-3">
        <Form.Group  controlId="totalNumberOfAdmissions">
          <Form.Label>Total Number of Admissions</Form.Label>
          <Form.Control  required
          type="text" value={totalNumberOfAdmissions} 
          onChange={(e) => {setTotalNumberOfAdmissions(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group controlId="numberOfPatientsDischarged">
          <Form.Label>Number of Patients Discharged</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={numberOfPatientsDischarged} onChange={(e) => {setNumberOfPatientsDischarged(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group  controlId="numberOfIpPatients">
          <Form.Label>Number of IP Patients</Form.Label>
          <Form.Control type="text" 
           required
          value={numberOfIpPatients} onChange={(e) => {setNumberOfIpPatients(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>


        <Row className="mb-3">
        <Form.Group  controlId="numberOfBedsOccupied">
          <Form.Label>Number Of Beds Occupied</Form.Label>
          <Form.Control 
           required
          type="text" value={numberOfBedsOccupied} onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e);}} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group controlId="timeTakenForDischarge">
          <Form.Label>Sum of Time Taken for Discharge</Form.Label>
          <Form.Control
           required
           
           type="text" value={timeTakenForDischarge} onChange={(e) => {setTimeTakenForDischarge(e.target.value);handleChange(e);}} />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="mb-3">
  <Form.Group controlId="totalNumberOfMedicationErrors">
    <Form.Label>Total Number of Medication Errors</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNumberOfMedicationErrors}
      onChange={(e) => {setTotalNumberOfMedicationErrors(e.target.value);handleChange(e);}}

    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNumberOfOpportunitiesOfMedicationErrors">
    <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNumberOfOpportunitiesOfMedicationErrors}
      onChange={(e) => {setTotalNumberOfOpportunitiesOfMedicationErrors(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfMedicationChartsWithErrorProneAbbreviation">
    <Form.Label>Number of Medication Charts with Error Prone Abbreviation</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfMedicationChartsWithErrorProneAbbreviation}
      onChange={(e) => {setNumberOfMedicationChartsWithErrorProneAbbreviation(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfMedicationChartsReviewed">
    <Form.Label>Number of Medication Charts Reviewed</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfMedicationChartsReviewed}
      onChange={(e) => {setNumberOfMedicationChartsReviewed(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfPatientsDevelopingAdverseDrugReactions">
    <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfPatientsDevelopingAdverseDrugReactions}
      onChange={(e) => {setNumberOfPatientsDevelopingAdverseDrugReactions(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfTransfusionReaction">
    <Form.Label>Number of Transfusion Reaction</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfTransfusionReaction}
      onChange={(e) => {setNumberOfTransfusionReaction(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfUnitsTransfused">
    <Form.Label>Number of Units Transfused</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfUnitsTransfused}
      onChange={(e) => {setNumberOfUnitsTransfused(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="timeTakenForBloodAndBloodComponents">
    <Form.Label>Sum of Time Taken for Blood & Blood Components (Min)</Form.Label>
    <Form.Control
     required
      type="text"
      value={timeTakenForBloodAndBloodComponents}
      onChange={(e) => {setTimeTakenForBloodAndBloodComponents(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
    <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNoOfBloodAndBloodComponentsCrossMatched}
      onChange={(e) => {setTotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer">
    <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer}
      onChange={(e) => {setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfUrinaryCatheterAssociatedUTIsInMonth">
    <Form.Label>Number of Urinary Catheter Associated UTIs In a Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfUrinaryCatheterAssociatedUTIsInMonth}
      onChange={(e) => {setNumberOfUrinaryCatheterAssociatedUTIsInMonth(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfUrinaryCatheterDaysInMonth">
    <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfUrinaryCatheterDaysInMonth}
      onChange={(e) => {setNumberOfUrinaryCatheterDaysInMonth(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfCentralLineAssociatedBloodStreamInfectionsInMonth">
    <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfCentralLineAssociatedBloodStreamInfectionsInMonth}
      onChange={(e) => {setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfCentralLineDaysInMonth">
    <Form.Label>Number of Central Line Days in that Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfCentralLineDaysInMonth}
      onChange={(e) => {setNumberOfCentralLineDaysInMonth(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfSurgicalSiteInfectionsInMonth">
    <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfSurgicalSiteInfectionsInMonth}
      onChange={(e) => {setNumberOfSurgicalSiteInfectionsInMonth(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfNursingStaff">
    <Form.Label>Number of Nursing Staff</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfNursingStaff}
      onChange={(e) => {setNumberOfNursingStaff(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfPatientFalls">
    <Form.Label>Number of Patient Falls</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfPatientFalls}
      onChange={(e) => {setNumberOfPatientFalls(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfNearMissReported">
    <Form.Label>Number of Near Miss Reported</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfNearMissReported}
      onChange={(e) =>{ setNumberOfNearMissReported(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfIncidentsReported">
    <Form.Label>Number of Incidents Reported</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfIncidentsReported}
      onChange={(e) => {setNumberOfIncidentsReported(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfParenteralExposures">
    <Form.Label>Number of Parenteral Exposures</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfParenteralExposures}
      onChange={(e) => {setNumberOfParenteralExposures(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNoOfHandoversDoneAppropriately">
    <Form.Label>Total Number of Handovers Done Appropriately</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNoOfHandoversDoneAppropriately}
      onChange={(e) => {setTotalNoOfHandoversDoneAppropriately(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNoOfHandoverOpportunities">
    <Form.Label>Total Number of Handover Opportunities</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNoOfHandoverOpportunities}
      onChange={(e) => {setTotalNoOfHandoverOpportunities(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNoOfPatientsDevelopingPhlebitis">
    <Form.Label>Total Number of Patients Developing Phlebitis</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNoOfPatientsDevelopingPhlebitis}
      onChange={(e) => {setTotalNoOfPatientsDevelopingPhlebitis(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfRestraintInjuries">
    <Form.Label>Number of Restraint Injuries</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfRestraintInjuries}
      onChange={(e) => {setNumberOfRestraintInjuries(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="totalNoOfRestraintPatientsDays">
    <Form.Label>Total Number of Restraint Patients Days</Form.Label>
    <Form.Control
     required
      type="text"
      value={totalNoOfRestraintPatientsDays}
      onChange={(e) => {setTotalNoOfRestraintPatientsDays(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group controlId="numberOfPatientsOnIVTherapy">
    <Form.Label>Number of Patients on IV Therapy</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfPatientsOnIVTherapy}
      onChange={(e) => {setNumberOfPatientsOnIVTherapy(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>
<br/>
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

export default ChemoWardForm;
