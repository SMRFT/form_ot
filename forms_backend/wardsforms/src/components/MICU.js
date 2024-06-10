import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the DatePicker
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StyledContainer = styled(Container)`
  margin-bottom: 15%; /* Adjust the margin-top as needed */
`;

function MICUForm() {
    
    const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
    const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
    const [numberOfInPatients, setNumberOfInPatients] = useState('');
    const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
    const [numberOfPatientsDischarged, setNumberOfPatientsDischarged] = useState('');
    const [timeTakenForDischarge, setTimeTakenForDischarge] = useState('');
    const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
    const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
    const [totalNumberOfOpportunitiesOfMedicationErrors, setTotalNumberOfOpportunitiesOfMedicationErrors] = useState('');
    const [numberOfMedicationChartsWithErrorProneAbbreviation, setNumberOfMedicationChartsWithErrorProneAbbreviation] = useState('');
    const [numberOfMedicationChartsReviewed, setNumberOfMedicationChartsReviewed] = useState('');
    const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
    const [numberOfPatientsDevelopingPressureUlcer, setNumberOfPatientsDevelopingPressureUlcer] = useState('');
    const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
    const [numberOfTransfusionReaction, setNumberOfTransfusionReaction] = useState('');
    const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
    const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
    const [numberOfUrinaryCatheterAssociatedUTIsInMonth, setNumberOfUrinaryCatheterAssociatedUTIsInMonth] = useState('');
    const [numberOfUrinaryCatheterDaysInMonth, setNumberOfUrinaryCatheterDaysInMonth] = useState('');
    const [numberOfCentralLineAssociatedBloodStreamInfectionsInMonth, setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth] = useState('');
    const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
    const [numberOfSurgicalSiteInfectionsInMonth, setNumberOfSurgicalSiteInfectionsInMonth] = useState('');
    const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
    const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
    const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
    const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
    const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
    const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
    const [totalNoOfPatientsDevelopingExtravasation, setTotalNoOfPatientsDevelopingExtravasation] = useState('');
    const [noOfRestraintInjuries, setNoOfRestraintInjuries] = useState('');
    const [totalNoOfRestraintPatientsDays, setTotalNoOfRestraintPatientsDays] = useState('');
    const [actualDeathInICU, setActualDeathInICU] = useState('');
    const [predictedDeathsInICU, setPredictedDeathsInICU] = useState('');
    const [noOfVentilatorAssociatedPneumonia, setNoOfVentilatorAssociatedPneumonia] = useState('');
    const [numberOfVentilatorDays, setNumberOfVentilatorDays] = useState('');
    const [noOfPatientsOnIVTherapy, setNoOfPatientsOnIVTherapy] = useState('');
    const [incidentsOfDeclining, setIncidentsOfDeclining] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [validated, setValidated] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');
  
const [formData, setFormData] = useState({
selectedDate:'',
timeTakenForInitialAssessment:'',
totalNumberOfAdmissions:'',
numberOfInPatients:'',
numberOfBedsOccupied:'',
numberOfPatientsDischarged:'',
timeTakenForDischarge:'',
numberOfNursingStaff:'',
totalNumberOfMedicationErrors:'',
totalNumberOfOpportunitiesOfMedicationErrors:'',
numberOfMedicationChartsWithErrorProneAbbreviation:'',
numberOfMedicationChartsReviewed:'',
numberOfPatientsDevelopingAdverseDrugReactions:'',
numberOfPatientsDevelopingPressureUlcer:'',
numberOfPatientFalls:'',
numberOfTransfusionReaction:'',
numberOfUnitsTransfused:'',
timeTakenForBloodAndBloodComponents:'',
numberOfUrinaryCatheterAssociatedUTIsInMonth:'',
numberOfUrinaryCatheterDaysInMonth:'',
numberOfCentralLineAssociatedBloodStreamInfectionsInMonth:'',
numberOfCentralLineDaysInMonth:'',
numberOfSurgicalSiteInfectionsInMonth:'',
totalNoOfBloodAndBloodComponentsCrossMatched:'',
numberOfNearMissReported:'',
numberOfIncidentsReported:'',
numberOfParenteralExposures:'',
totalNoOfHandoversDoneAppropriately:'',
totalNoOfHandoverOpportunities:'',
totalNoOfPatientsDevelopingExtravasation:'',
noOfRestraintInjuries:'',
totalNoOfRestraintPatientsDays:'',
actualDeathInICU:'',
predictedDeathsInICU:'',
noOfVentilatorAssociatedPneumonia:'',
numberOfVentilatorDays:'',
noOfPatientsOnIVTherapy:'',
incidentsOfDeclining:'',
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
            const response = await fetch('http://127.0.0.1:8000/post-MICU/', {
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
            <h1 className="text-center mb-4">MICU Form</h1>

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
                      className="position-absolute top-100 start-0 d-none" // Hide the input element
                      calendarClassName="position-absolute top-100 start-0" // Position the calendar
                      placeholderText="Select Date" // Placeholder text for the date picker
                    />
                    {selectedDate && (
                      <div className="position-absolute top-100 start-0 translate-middle-y" style={{ marginLeft: '50px',marginTop:"-15px" }}>
                        {selectedDate.toLocaleDateString('en-GB')} {/* 'en-GB' for date/month/year format */}
                      </div>
                    )}
                  </div>
                </Form.Group>
               
      <br/>    
               
                <Form.Group className="mb-3" controlId="timeTakenForInitialAssessment">
                <Form.Label>Sum of Time Taken for Initial Assessment (Min)</Form.Label>
                <Form.Control type="text"
                required
                 value={timeTakenForInitialAssessment} onChange={(e) => {setTimeTakenForInitialAssessment(e.target.value);handleChange(e);}}
                />
                 <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNumberOfAdmissions">
                    <Form.Label>Total Number of Admissions</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={totalNumberOfAdmissions} 
                    onChange={(e) => {setTotalNumberOfAdmissions(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfInPatients">
                    <Form.Label>Number of In-Patients</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfInPatients} onChange={(e) => {setNumberOfInPatients(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3" controlId="numberOfBedsOccupied">
                    <Form.Label>NumberOfBedsOccupied</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfBedsOccupied} onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfPatientsDischarged">
                    <Form.Label>Number of Patients Discharged</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfPatientsDischarged} onChange={(e) => {setNumberOfPatientsDischarged(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="timeTakenForDischarge">
                    <Form.Label>Sum of Time Taken for Discharge</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={timeTakenForDischarge} 
                    onChange={(e) => {setTimeTakenForDischarge(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfNursingStaff">
                    <Form.Label>Number of Nursing Staff</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfNursingStaff} 
                    onChange={(e) => {setNumberOfNursingStaff(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNumberOfMedicationErrors">
                    <Form.Label>Total Number of Medication Errors</Form.Label>
                    <Form.Control type="text" value={totalNumberOfMedicationErrors} 
                    onChange={(e) =>{ setTotalNumberOfMedicationErrors(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNumberOfOpportunitiesOfMedicationErrors">
                    <Form.Label>Total Number of Opportunities of Medication Errors</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={totalNumberOfOpportunitiesOfMedicationErrors} 
                    onChange={(e) => {setTotalNumberOfOpportunitiesOfMedicationErrors(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfMedicationChartsWithErrorProneAbbreviation">
                    <Form.Label>Number Medication Charts with Error Prone Abbreviation</Form.Label>
                    <Form.Control
                     required 
                     type="text" value={numberOfMedicationChartsWithErrorProneAbbreviation} 
                     onChange={(e) => {setNumberOfMedicationChartsWithErrorProneAbbreviation(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfMedicationChartsReviewed">
                    <Form.Label>Number of Medication Charts Reviewed</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfMedicationChartsReviewed} 
                    onChange={(e) => {setNumberOfMedicationChartsReviewed(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingAdverseDrugReactions">
                    <Form.Label>Number of Patients Developing Adverse Drug Reactions</Form.Label>
                    <Form.Control type="text" value={numberOfPatientsDevelopingAdverseDrugReactions} 
                    onChange={(e) => {setNumberOfPatientsDevelopingAdverseDrugReactions(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfPatientsDevelopingPressureUlcer">
                    <Form.Label>Number of Patients Developing Pressure Ulcer</Form.Label>
                    <Form.Control 
                     required
                    type="text" value={numberOfPatientsDevelopingPressureUlcer} 
                    onChange={(e) => {setNumberOfPatientsDevelopingPressureUlcer(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfPatientFalls">
                    <Form.Label>Number of Patient Falls</Form.Label>
                    <Form.Control   
                    required type="text" 
                    value={numberOfPatientFalls} 
                    onChange={(e) =>{ setNumberOfPatientFalls(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfTransfusionReaction">
                    <Form.Label>Number of Transfusion Reaction</Form.Label>
                    <Form.Control   
                    required type="text" 
                    value={numberOfTransfusionReaction} 
                    onChange={(e) => {setNumberOfTransfusionReaction(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfUnitsTransfused">
                    <Form.Label>Number of Units Transfused</Form.Label>
                    <Form.Control required 
                    type="text" value={numberOfUnitsTransfused} 
                    onChange={(e) => {setNumberOfUnitsTransfused(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="timeTakenForBloodAndBloodComponents">
                    <Form.Label>Sum of Time Taken for Blood and Blood Components</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={timeTakenForBloodAndBloodComponents} 
                    onChange={(e) => {setTimeTakenForBloodAndBloodComponents(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterAssociatedUTIsInMonth">
                    <Form.Label>Number of Urinary Catheter Associated UTIs in Month</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={numberOfUrinaryCatheterAssociatedUTIsInMonth}
                     onChange={(e) => {setNumberOfUrinaryCatheterAssociatedUTIsInMonth(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfUrinaryCatheterDaysInMonth">
                    <Form.Label>Number of Urinary Catheter Days in Month</Form.Label>
                    <Form.Control 
                     required 
                     type="text" 
                     value={numberOfUrinaryCatheterDaysInMonth}
                      onChange={(e) => {setNumberOfUrinaryCatheterDaysInMonth(e.target.value);handleChange(e);}} />
                      <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfCentralLineAssociatedBloodStreamInfectionsInMonth">
                    <Form.Label>Number of Central Line Associated Blood Stream Infections in Month</Form.Label>
                    <Form.Control 
                     required 
                     type="text" 
                     value={numberOfCentralLineAssociatedBloodStreamInfectionsInMonth}
                      onChange={(e) => {setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth(e.target.value);handleChange(e);}} />
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
                     onChange={(e) => {setNumberOfCentralLineDaysInMonth(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSurgicalSiteInfectionsInMonth">
                    <Form.Label>Number of Surgical Site Infections in Month</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={numberOfSurgicalSiteInfectionsInMonth} 
                    onChange={(e) => {setNumberOfSurgicalSiteInfectionsInMonth(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNoOfBloodAndBloodComponentsCrossMatched">
                    <Form.Label>Total Number of Blood and Blood Components Cross Matched</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={totalNoOfBloodAndBloodComponentsCrossMatched} 
                    onChange={(e) => {setTotalNoOfBloodAndBloodComponentsCrossMatched(e.target.value);handleChange(e);}} />
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
                    <Form.Label>Total Number of Handovers Done Appropriately</Form.Label>
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
                    <Form.Label>Total Number of Handover Opportunities</Form.Label>
                    <Form.Control  
                    required 
                    type="text" value={totalNoOfHandoverOpportunities}
                     onChange={(e) => {setTotalNoOfHandoverOpportunities(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNoOfPatientsDevelopingExtravasation">
                    <Form.Label>Total Number of Patients Developing Extravasation</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={totalNoOfPatientsDevelopingExtravasation} 
                    onChange={(e) => {setTotalNoOfPatientsDevelopingExtravasation(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="noOfRestraintInjuries">
                    <Form.Label>Number of Restraint Injuries</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={noOfRestraintInjuries} 
                    onChange={(e) =>{ setNoOfRestraintInjuries(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="totalNoOfRestraintPatientsDays">
                    <Form.Label>Total Number of Restraint Patients Days</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={totalNoOfRestraintPatientsDays} 
                    onChange={(e) => {setTotalNoOfRestraintPatientsDays(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="actualDeathInICU">
                    <Form.Label>Actual Death in ICU</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={actualDeathInICU} 
                    onChange={(e) => {setActualDeathInICU(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="predictedDeathsInICU">
                    <Form.Label>Predicted Deaths in ICU</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={predictedDeathsInICU} 
                    onChange={(e) => {setPredictedDeathsInICU(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="noOfVentilatorAssociatedPneumonia">
                    <Form.Label>Number of Ventilator Associated Pneumonia</Form.Label>
                    <Form.Control  
                    required 
                    type="text"
                     value={noOfVentilatorAssociatedPneumonia} 
                     onChange={(e) => {setNoOfVentilatorAssociatedPneumonia(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfVentilatorDays">
                    <Form.Label>Number of Ventilator Days</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={numberOfVentilatorDays}
                     onChange={(e) => {setNumberOfVentilatorDays(e.target.value);handleChange(e);}} />
                     <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="noOfPatientsOnIVTherapy">
                    <Form.Label>Number of Patients on IV Therapy</Form.Label>
                    <Form.Control  
                    required 
                    type="text" 
                    value={noOfPatientsOnIVTherapy} 
                    onChange={(e) => {setNoOfPatientsOnIVTherapy(e.target.value);handleChange(e);}} />
                    <Form.Control.Feedback type="invalid">
                    Please fill out this field
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="incidentsOfDeclining">
                    <Form.Label>Incidents of Declining</Form.Label>
                    <Form.Control 
                     required 
                     type="text" 
                     value={incidentsOfDeclining} 
                     onChange={(e) => {setIncidentsOfDeclining(e.target.value);handleChange(e);}} />
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

export default MICUForm;
