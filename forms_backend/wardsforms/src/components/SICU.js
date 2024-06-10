import React, { useState ,useEffect} from 'react';
import { Row, Form, Button ,Alert,Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the DatePicker
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';



const StyledContainer = styled(Container)`
`;

function SICUForm() {
    
    const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
    const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
    const[numberOfInPatients,setnumberOfInPatients]=useState('');
    const[numberOfPatientsDischarged,setnumberOfPatientsDischarged]=useState('');
    const[timeTakenForDischarge,settimeTakenForDischarge]=useState('');
    const[numberOfNursingStaff,setnumberOfNursingStaff]=useState('');
    const[totalNumberOfMedicationErrors,settotalNumberOfMedicationErrors]=useState('');
    const[totalNumberOfOpportunitiesOfMedicationErrors,settotalNumberOfOpportunitiesOfMedicationErrors]=useState('');
    const[numberOfMedicationChartsWithErrorProneAbbreviation,setnumberOfMedicationChartsWithErrorProneAbbreviation]=useState('');
    const[numberOfMedicationChartsReviewed,setnumberOfMedicationChartsReviewed]=useState('');
    const[numberOfPatientsDevelopingPressureUlcer,setnumberOfPatientsDevelopingPressureUlcer]=useState('');
    const[numberOfPatientsDevelopingAdverseDrugReactions,setnumberOfPatientsDevelopingAdverseDrugReactions]=useState('');
    const[numberOfPatientFalls,setnumberOfPatientFalls]=useState('');
    const[numberOfTransfusionReaction,setnumberOfTransfusionReaction]=useState('');
    const[totalNoOfBloodAndBloodComponentsCrossMatched,settotalNoOfBloodAndBloodComponentsCrossMatched]=useState('');
    const[timeTakenForBloodAndBloodComponents,settimeTakenForBloodAndBloodComponents]=useState('');
    const[numberOfUrinaryCatheterAssociatedUTIsInMonth,setnumberOfUrinaryCatheterAssociatedUTIsInMonth]=useState('');
    const[numberOfUrinaryCatheterDaysInMonth,setnumberOfUrinaryCatheterDaysInMonth]=useState('');
    const[numberOfCentralLineAssociatedBloodStreamInfectionsInMonth,setnumberOfCentralLineAssociatedBloodStreamInfectionsInMonth]=useState('');
    const[numberOfCentralLineDaysInMonth,setnumberOfCentralLineDaysInMonth]=useState('');
    const[numberOfSurgicalSiteInfectionsInMonth,setnumberOfSurgicalSiteInfectionsInMonth]=useState('');
    const[numberOfNearMissReported,setnumberOfNearMissReported]=useState('');
    const[numberOfIncidentsReported,setnumberOfIncidentsReported]=useState('');
    const[numberOfParenteralExposures,setnumberOfParenteralExposures]=useState('');
    const[totalNoOfHandoversDoneAppropriately,settotalNoOfHandoversDoneAppropriately]=useState('');
    const[totalNoOfHandoverOpportunities,settotalNoOfHandoverOpportunities]=useState('');
    const[totalNoOfPatientsDevelopingPhlebitis,settotalNoOfPatientsDevelopingPhlebitis]=useState('');
    const[numberOfRestraintInjuries,setnumberOfRestraintInjuries]=useState('');
    const[totalNoOfRestraintPatientsDays,settotalNoOfRestraintPatientsDays]=useState('');
    const[numberOfPatientsOnIVTherapy,setnumberOfPatientsOnIVTherapy]=useState('');
    const[numberOfUnitsTransfused,setnumberOfUnitsTransfused]=useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
    const [validated, setValidated] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');
    
    


    const [formData, setFormData] = useState({
      selectedDate: '',
      timeTakenForInitialAssessment: '',
      totalNumberOfAdmissions: '',
      numberOfInPatients: '',
      numberOfPatientsDischarged: '',
      timeTakenForDischarge: '',
      numberOfNursingStaff: '',
      totalNumberOfMedicationErrors: '',
      totalNumberOfOpportunitiesOfMedicationErrors: '',
      numberOfMedicationChartsWithErrorProneAbbreviation: '',
      numberOfMedicationChartsReviewed: '',
      numberOfPatientsDevelopingPressureUlcer: '',
      numberOfPatientsDevelopingAdverseDrugReactions: '',
      numberOfPatientFalls: '',
      numberOfTransfusionReaction: '',
      numberOfUnitsTransfused: '',
      totalNoOfBloodAndBloodComponentsCrossMatched: '',
      timeTakenForBloodAndBloodComponents: '',
      numberOfUrinaryCatheterAssociatedUTIsInMonth: '',
      numberOfUrinaryCatheterDaysInMonth: '',
      numberOfCentralLineAssociatedBloodStreamInfectionsInMonth: '',
      numberOfCentralLineDaysInMonth: '',
      numberOfSurgicalSiteInfectionsInMonth: '',
      numberOfNearMissReported: '',
      numberOfIncidentsReported: '',
      numberOfParenteralExposures: '',
      totalNoOfHandoversDoneAppropriately: '',
      totalNoOfHandoverOpportunities: '',
      totalNoOfPatientsDevelopingPhlebitis: '',
      numberOfRestraintInjuries: '',
      totalNoOfRestraintPatientsDays: '',
      numberOfPatientsOnIVTherapy: '',
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
        const response = await fetch('http://127.0.0.1:8000/sicu-submit/', {
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
      <h1 className="text-center mb-4">SICU</h1>

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

      
  <Form.Group as={Row} className="mb-3" controlId="timeTakenForInitialAssessment">
  <Form.Label column sm="3">Sum of Time Taken for Initial Assessment (Min)</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={timeTakenForInitialAssessment}
      onChange={(e) => {setTimeTakenForInitialAssessment(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="totalNumberOfAdmissions">
  <Form.Label column sm="3">Total Number of Admissions</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={totalNumberOfAdmissions}
      onChange={(e) => {setTotalNumberOfAdmissions(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="numberOfInPatients">
  <Form.Label column sm="3">Number of In-Patients</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={numberOfInPatients}
      onChange={(e) => {setnumberOfInPatients(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>

<Form.Group className="mb-3" controlId="numberOfBedsOccupied">
  <Form.Label>No of Beds Occupied</Form.Label>
 <Form.Control
  required 
  type="text" 
  value={numberOfBedsOccupied} 
  onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e); }} />
</Form.Group>



<Form.Group as={Row} className="mb-3" controlId="numberOfPatientsDischarged">
  <Form.Label column sm="3">Number of Patients Discharged</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={numberOfPatientsDischarged}
      onChange={(e) => {setnumberOfPatientsDischarged(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="timeTakenForDischarge">
  <Form.Label column sm="3">Sum of Time Taken for Discharge</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={timeTakenForDischarge}
      onChange={(e) => {settimeTakenForDischarge(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="numberOfNursingStaff">
  <Form.Label column sm="3">Number of Nursing Staff</Form.Label>
  <Col sm="4">
    <Form.Control
     required
      type="text"
      value={numberOfNursingStaff}
      onChange={(e) => {setnumberOfNursingStaff(e.target.value);handleChange(e);}}
    />
  </Col>
</Form.Group>


        <Form.Group className="mb-3" controlId="totalNumberOfMedicationErrors">
          <Form.Label>Total Number of Medication Errors</Form.Label>
          <Form.Control 
           required
          type="text"
           value={totalNumberOfMedicationErrors}
           onChange={(e) => {settotalNumberOfMedicationErrors(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfOpportunitiesOfMedicationErrors">
          <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
          <Form.Control 
           required
          type="text"
           value={totalNumberOfOpportunitiesOfMedicationErrors} 
           onChange={(e) => {settotalNumberOfOpportunitiesOfMedicationErrors(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfMedicationChartsWithErrorProneAbbreviation">
          <Form.Label>Number Medication Charts with Error Prone Abbreviation</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfMedicationChartsWithErrorProneAbbreviation} 
          onChange={(e) => {setnumberOfMedicationChartsWithErrorProneAbbreviation(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfMedicationChartsReviewed">
          <Form.Label>Number of Medication Charts Reviewed</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={numberOfMedicationChartsReviewed} 
          onChange={(e) => {setnumberOfMedicationChartsReviewed(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingPressureUlcer">
          <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfPatientsDevelopingPressureUlcer} 
          onChange={(e) => {setnumberOfPatientsDevelopingPressureUlcer(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingAdverseDrugReactions">
          <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfPatientsDevelopingAdverseDrugReactions}
           onChange={(e) => {setnumberOfPatientsDevelopingAdverseDrugReactions(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientFalls">
          <Form.Label>Number of Patient Falls</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={numberOfPatientFalls} 
          onChange={(e) => {setnumberOfPatientFalls(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfTransfusionReaction">
          <Form.Label>Number of Transfusion Reaction</Form.Label>
          <Form.Control
           required
           type="text" 
           value={numberOfTransfusionReaction} 
           onChange={(e) => {setnumberOfTransfusionReaction(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUnitsTransfused">
          <Form.Label>Number of Units Transfused</Form.Label>
          <Form.Control 
           required
          type="text" 
           value={numberOfUnitsTransfused}
            onChange={(e) => {setnumberOfUnitsTransfused(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
          <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={totalNoOfBloodAndBloodComponentsCrossMatched} 
          onChange={(e) => {settotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeTakenForBloodAndBloodComponents">
          <Form.Label>Sum of Time Taken for Blood & Blood Components (Min)</Form.Label>
          <Form.Control
           required 
          type="text" 
           value={timeTakenForBloodAndBloodComponents}
            onChange={(e) => {settimeTakenForBloodAndBloodComponents(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterAssociatedUTIsInMonth">
          <Form.Label>Number of Urinary Catheter Assiciated UTIs In a Month</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfUrinaryCatheterAssociatedUTIsInMonth} 
          onChange={(e) => {setnumberOfUrinaryCatheterAssociatedUTIsInMonth(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterDaysInMonth">
          <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfUrinaryCatheterDaysInMonth} 
          onChange={(e) => {setnumberOfUrinaryCatheterDaysInMonth(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineAssociatedBloodStreamInfectionsInMonth">
          <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
          <Form.Control 
           required
          type="text" 
           value={numberOfCentralLineAssociatedBloodStreamInfectionsInMonth} 
           onChange={(e) => {setnumberOfCentralLineAssociatedBloodStreamInfectionsInMonth(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineDaysInMonth">
          <Form.Label>Number of Central Line Days in that Month</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfCentralLineDaysInMonth} 
          onChange={(e) => {setnumberOfCentralLineDaysInMonth(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfSurgicalSiteInfectionsInMonth">
          <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
          <Form.Control
           required
           type="text" 
           value={numberOfSurgicalSiteInfectionsInMonth} 
           onChange={(e) => {setnumberOfSurgicalSiteInfectionsInMonth(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfNearMissReported">
          <Form.Label>Number of Near Miss Reported</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfNearMissReported} 
          onChange={(e) =>{ setnumberOfNearMissReported(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfIncidentsReported">
          <Form.Label>Number of Incidents Reported</Form.Label>
          <Form.Control
           required 
          type="text" 
          value={numberOfIncidentsReported} 
          onChange={(e) => {setnumberOfIncidentsReported(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfParenteralExposures">
          <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfParenteralExposures} 
          onChange={(e) => {setnumberOfParenteralExposures(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfHandoversDoneAppropriately">
          <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={totalNoOfHandoversDoneAppropriately} 
          onChange={(e) => {settotalNoOfHandoversDoneAppropriately(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfHandoverOpportunities">
          <Form.Label>Total no. of handover Opportunities</Form.Label>
          <Form.Control
           required 
          type="text" 
          value={totalNoOfHandoverOpportunities} 
          onChange={(e) => {settotalNoOfHandoverOpportunities(e.target.value);handleChange(e); }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfPatientsDevelopingPhlebitis">
          <Form.Label>Total No of patient who develope phlebitis</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={totalNoOfPatientsDevelopingPhlebitis} 
          onChange={(e) => {settotalNoOfPatientsDevelopingPhlebitis(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfRestraintInjuries">
          <Form.Label>No of Restraint Injuries</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={numberOfRestraintInjuries} 
          onChange={(e) => {setnumberOfRestraintInjuries(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfRestraintPatientsDays">
          <Form.Label>Total no of restraint patients Days</Form.Label>
          <Form.Control 
           required
          type="text"  
          value={totalNoOfRestraintPatientsDays}
           onChange={(e) => {settotalNoOfRestraintPatientsDays(e.target.value);handleChange(e); }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsOnIVTherapy">
          <Form.Label>No of patients on IV therapy</Form.Label>
          <Form.Control 
           required
          type="text" 
          value={numberOfPatientsOnIVTherapy} 
          onChange={(e) => {setnumberOfPatientsOnIVTherapy(e.target.value);handleChange(e); }} />
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

export default SICUForm;

// CSS for web view
const webCSS = `
@media (min-width: 768px) {
  .position-relative {
    position: relative;
  }
  /* Add your other web styles here */
}
`;

// CSS for mobile view
const mobileCSS = `
@media (max-width: 767px) {
  /* Add your mobile specific styles here */
}
`;

// Inject the CSS into the DOM
const style = document.createElement('style');
style.innerHTML = webCSS + mobileCSS;
document.head.appendChild(style);