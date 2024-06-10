import React, { useState,useEffect } from 'react';
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

function NICUForm() {
  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [timeTakenForDischarge, setTimeTakenForDischarge] = useState('');
  const [numberOfPatientsDischarged, setNumberOfPatientsDischarged] = useState('');
  const [numberOfInPatients, setNumberOfInPatients] = useState('');
  const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
  const [totalNumberOfOpportunitiesOfMedicationErrors, setTotalNumberOfOpportunitiesOfMedicationErrors] = useState('');
  const [numberOfMedicationChartsWithErrorProneAbbreviation, setNumberOfMedicationChartsWithErrorProneAbbreviation] = useState('');
  const [numberOfMedicationChartsReviewed, setNumberOfMedicationChartsReviewed] = useState('');
  const [numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer, setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfTransfusionReaction, setNumberOfTransfusionReaction] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [numberOfUrinaryCatheterAssociatedUTIsInMonth, setNumberOfUrinaryCatheterAssociatedUTIsInMonth] = useState('');
  const [numberOfUrinaryCatheterDaysInMonth, setNumberOfUrinaryCatheterDaysInMonth] = useState('');
  const [numberOfCentralLineAssociatedBloodStreamInfectionsInMonth, setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth] = useState('');
  const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
  const [numberOfSurgicalSiteInfectionsInMonth, setNumberOfSurgicalSiteInfectionsInMonth] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitis, setTotalNoOfPatientsDevelopingPhlebitis] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const [totalNoOfRestraintPatientsDays, setTotalNoOfRestraintPatientsDays] = useState('');
  const [numberOfCasesheetsWhereNursingCarePlanIsDocumented, setNumberOfCasesheetsWhereNursingCarePlanIsDocumented] = useState('');
  const [actualDeathInICU, setActualDeathInICU] = useState('');
  const [predictedDeathsInICU, setPredictedDeathsInICU] = useState('');
  const [numberOfVentilatorAssociatedPneumonia, setNumberOfVentilatorAssociatedPneumonia] = useState('');
  const [numberOfVentilatorDays, setNumberOfVentilatorDays] = useState('');
  const [numberOfPatientsOnIVTherapy, setNumberOfPatientsOnIVTherapy] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    selectedDate:'',
    timeTakenForInitialAssessment:'',
    totalNumberOfAdmissions:'',
    timeTakenForDischarge:'',
    numberOfPatientsDischarged:'',
    numberOfInPatients:'',
    numberOfBedsOccupied:'',
    numberOfNursingStaff:'',
    totalNumberOfMedicationErrors:'',
    totalNumberOfOpportunitiesOfMedicationErrors:'',
    numberOfMedicationChartsWithErrorProneAbbreviation:'',
    numberOfMedicationChartsReviewed:'',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer:'',
    numberOfPatientsDevelopingAdverseDrugReactions:'',
    numberOfPatientFalls:'',
    numberOfTransfusionReaction:'',
    numberOfUnitsTransfused:'',
    totalNoOfBloodAndBloodComponentsCrossMatched:'',
    timeTakenForBloodAndBloodComponents:'',
    numberOfUrinaryCatheterAssociatedUTIsInMonth:'',
    numberOfUrinaryCatheterDaysInMonth:'',
    numberOfCentralLineAssociatedBloodStreamInfectionsInMonth:'',
    numberOfCentralLineDaysInMonth:'',
    numberOfSurgicalSiteInfectionsInMonth:'',
    numberOfNearMissReported:'',
    numberOfIncidentsReported,
    numberOfParenteralExposures:'',
    totalNoOfHandoversDoneAppropriately:'',
    totalNoOfHandoverOpportunities:'',
    totalNoOfPatientsDevelopingPhlebitis:'',
    numberOfRestraintInjuries:'',
    totalNoOfRestraintPatientsDays:'',
    numberOfCasesheetsWhereNursingCarePlanIsDocumented:'',
    actualDeathInICU:'',
    predictedDeathsInICU:'',
    numberOfVentilatorAssociatedPneumonia:'',
    numberOfVentilatorDays:'',
    numberOfPatientsOnIVTherapy:'',

  });

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
        const response = await fetch('http://127.0.0.1:8000/post-nicu-data/', {
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
      <h1 className="text-center mb-4">NICU</h1>

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
    <Form.Label >
      Sum of Time Taken for Initial Assessment (Min)&nbsp;&nbsp;
    </Form.Label>
    <Form.Control
    required
      type="text"
      style={{ display: 'inline-block', width: '150px' }}
      value={timeTakenForInitialAssessment}
      onChange={(e) => setTimeTakenForInitialAssessment(e.target.value)}
    />
     <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
  </Form.Group>
</Row>

        <Form.Group className="mb-3" controlId="totalNumberOfAdmissions">
          <Form.Label>Total Number of Admissions</Form.Label>
          <Form.Control   required type="text" value={totalNumberOfAdmissions} onChange={(e) => setTotalNumberOfAdmissions(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeTakenForDischarge">
          <Form.Label>Sum of Time Taken for Discharge</Form.Label>
          <Form.Control   required type="text" value={timeTakenForDischarge} onChange={(e) => setTimeTakenForDischarge(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsDischarged">
          <Form.Label>Number of Patients Discharged</Form.Label>
          <Form.Control   required type="text" value={numberOfPatientsDischarged} onChange={(e) => setNumberOfPatientsDischarged(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfInPatients">
          <Form.Label>Number of In-Patients</Form.Label>
          <Form.Control   required type="text" value={numberOfInPatients} onChange={(e) => setNumberOfInPatients(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
          <Form.Label> NumberOfBedsOccupied</Form.Label>
          <Form.Control   required type="text" value={numberOfBedsOccupied} onChange={(e) => setnumberOfBedsOccupied(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfNursingStaff">
          <Form.Label>Number of Nursing Staff</Form.Label>
          <Form.Control  required  type="text" value={numberOfNursingStaff} onChange={(e) => setNumberOfNursingStaff(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfMedicationErrors">
          <Form.Label>Total Number of Medication Errors</Form.Label>
          <Form.Control   required type="text" value={totalNumberOfMedicationErrors} onChange={(e) => setTotalNumberOfMedicationErrors(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNumberOfOpportunitiesOfMedicationErrors">
          <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
          <Form.Control   required type="text" value={totalNumberOfOpportunitiesOfMedicationErrors} onChange={(e) => setTotalNumberOfOpportunitiesOfMedicationErrors(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfMedicationChartsWithErrorProneAbbreviation">
          <Form.Label>Number Medication Charts with Error Prone Abbreviation</Form.Label>
          <Form.Control   required type="text" value={numberOfMedicationChartsWithErrorProneAbbreviation} onChange={(e) => setNumberOfMedicationChartsWithErrorProneAbbreviation(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfMedicationChartsReviewed">
          <Form.Label>Number of Medication Charts Reviewed</Form.Label>
          <Form.Control   required type="text" value={numberOfMedicationChartsReviewed} onChange={(e) => setNumberOfMedicationChartsReviewed(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer">
          <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
          <Form.Control 
            required
            type="text" value={numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer} onChange={(e) => setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer(e.target.value)} />
             <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingAdverseDrugReactions">
          <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfPatientsDevelopingAdverseDrugReactions} onChange={(e) => setNumberOfPatientsDevelopingAdverseDrugReactions(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>

        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientFalls">
          <Form.Label>Number of Patient Falls</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfPatientFalls} onChange={(e) => setNumberOfPatientFalls(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfTransfusionReaction">
          <Form.Label>Number of Transfusion Reaction</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfTransfusionReaction} onChange={(e) => setNumberOfTransfusionReaction(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUnitsTransfused">
          <Form.Label>Number of Units Transfused</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfUnitsTransfused} onChange={(e) => setNumberOfUnitsTransfused(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
          <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
          <Form.Control 
            required
          type="text" value={totalNoOfBloodAndBloodComponentsCrossMatched} onChange={(e) => setTotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="timeTakenForBloodAndBloodComponents">
          <Form.Label>Sum of Time Taken for Blood & Blood Components (Min)</Form.Label>
          <Form.Control 
            required
          type="text" value={timeTakenForBloodAndBloodComponents} onChange={(e) => setTimeTakenForBloodAndBloodComponents(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterAssociatedUTIsInMonth">
          <Form.Label>Number of Urinary Catheter Associated UTIs In a Month</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfUrinaryCatheterAssociatedUTIsInMonth} onChange={(e) => setNumberOfUrinaryCatheterAssociatedUTIsInMonth(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterDaysInMonth">
          <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfUrinaryCatheterDaysInMonth} onChange={(e) => setNumberOfUrinaryCatheterDaysInMonth(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineAssociatedBloodStreamInfectionsInMonth">
          <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfCentralLineAssociatedBloodStreamInfectionsInMonth} onChange={(e) => setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCentralLineDaysInMonth">
          <Form.Label>Number of Central Line Days in that Month</Form.Label>
          <Form.Control
            required
           type="text" value={numberOfCentralLineDaysInMonth} onChange={(e) => setNumberOfCentralLineDaysInMonth(e.target.value)} />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfSurgicalSiteInfectionsInMonth">
          <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfSurgicalSiteInfectionsInMonth} onChange={(e) => setNumberOfSurgicalSiteInfectionsInMonth(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfNearMissReported">
          <Form.Label>Number of Near Miss Reported</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfNearMissReported} onChange={(e) => setNumberOfNearMissReported(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfIncidentsReported">
          <Form.Label>Number of Incidents Reported</Form.Label>
          <Form.Control 
            required  
          type="text" value={numberOfIncidentsReported} onChange={(e) => setNumberOfIncidentsReported(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfParenteralExposures">
          <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfParenteralExposures} onChange={(e) => setNumberOfParenteralExposures(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfHandoversDoneAppropriately">
          <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
          <Form.Control 
            required
          type="text" value={totalNoOfHandoversDoneAppropriately} onChange={(e) => setTotalNoOfHandoversDoneAppropriately(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfHandoverOpportunities">
          <Form.Label>Total no. of handover Opportunities</Form.Label>
          <Form.Control 
            required
          type="text" value={totalNoOfHandoverOpportunities} onChange={(e) => setTotalNoOfHandoverOpportunities(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfPatientsDevelopingPhlebitis">
          <Form.Label>Total No of patient who develops phlebitis</Form.Label>
          <Form.Control 
            required
          type="text" value={totalNoOfPatientsDevelopingPhlebitis} onChange={(e) => setTotalNoOfPatientsDevelopingPhlebitis(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfRestraintInjuries">
          <Form.Label>No of Restraint Injuries</Form.Label>
          <Form.Control 
            required
            
          type="text" value={numberOfRestraintInjuries} onChange={(e) => setNumberOfRestraintInjuries(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalNoOfRestraintPatientsDays">
          <Form.Label>Total no of restraint patients Days</Form.Label>
          <Form.Control 
            required
          type="text" value={totalNoOfRestraintPatientsDays} onChange={(e) => setTotalNoOfRestraintPatientsDays(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfCasesheetsWhereNursingCarePlanIsDocumented">
          <Form.Label>No of casesheets where Nursing Care Plan is documented</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfCasesheetsWhereNursingCarePlanIsDocumented} onChange={(e) => setNumberOfCasesheetsWhereNursingCarePlanIsDocumented(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="actualDeathInICU">
          <Form.Label>Actual Death in ICU</Form.Label>
          <Form.Control 
            required
          type="text" value={actualDeathInICU} onChange={(e) => setActualDeathInICU(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="predictedDeathsInICU">
          <Form.Label>Predicted Deaths in ICU</Form.Label>
          <Form.Control 
            required
          type="text" value={predictedDeathsInICU} onChange={(e) => setPredictedDeathsInICU(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfVentilatorAssociatedPneumonia">
          <Form.Label>No of Ventilator Associated Pneumonia</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfVentilatorAssociatedPneumonia} onChange={(e) => setNumberOfVentilatorAssociatedPneumonia(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfVentilatorDays">
          <Form.Label>Number of Ventilator Days</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfVentilatorDays} onChange={(e) => setNumberOfVentilatorDays(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPatientsOnIVTherapy">
          <Form.Label>No of patients on IV therapy</Form.Label>
          <Form.Control 
            required
          type="text" value={numberOfPatientsOnIVTherapy} onChange={(e) => setNumberOfPatientsOnIVTherapy(e.target.value)} />
           <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3">
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

export default NICUForm;
