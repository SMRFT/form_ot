import React, { useState ,useEffect } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const FirstFloor = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [numberOfInPatients, setNumberOfInPatients] = useState('');
  const[numberOfBedsOccupied,setnumberOfBedsOccupied]=useState('');
  const [numberOfPatientsDischarged, setNumberOfPatientsDischarged] = useState('');
  const [timeTakenForDischarge, setTimeTakenForDischarge] = useState('');
  const [totalNumberOfOpportunitiesOfMedicationErrors, setTotalNumberOfOpportunitiesOfMedicationErrors] = useState('');
  const [numberOfMedicationChartsReviewed, setNumberOfMedicationChartsReviewed] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [numberOfPatientsWhoDevelopPressureUlcer, setNumberOfPatientsWhoDevelopPressureUlcer] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfTransfusionReaction, setNumberOfTransfusionReaction] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [numberOfUrinaryCatheterDays, setNumberOfUrinaryCatheterDays] = useState('');
  const [numberOfCentralLineInfections, setNumberOfCentralLineInfections] = useState('');
  const [numberOfCentralLineDays, setNumberOfCentralLineDays] = useState('');
  const [numberOfSurgicalSiteInfections, setNumberOfSurgicalSiteInfections] = useState('');
  const [totalNoOfBloodCrossMatched, setTotalNoOfBloodCrossMatched] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfBedOccupied, setNumberOfBedOccupied] = useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [totalNoOfHandoversDone, setTotalNoOfHandoversDone] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const [totalNoOfRestraintPatientsDays, setTotalNoOfRestraintPatientsDays] = useState('');
  const [numberOfPatientsOnIVTherapy, setNumberOfPatientsOnIVTherapy] = useState('');
  const [numberOfPatientsDevelopingPhlebitis, setNumberOfPatientsDevelopingPhlebitis] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [validated, setValidated] = useState(false);




  const [formData, setFormData] = useState({
      selectedDate:'',
      timeTakenForInitialAssessment:'',
      totalNumberOfAdmissions:'',
      numberOfInPatients:'',
      numberOfBedsOccupied:'',
      numberOfPatientsDischarged:'',
      timeTakenForDischarge:'',
      totalNumberOfOpportunitiesOfMedicationErrors:'',
      numberOfMedicationChartsReviewed:'',
      numberOfPatientsDevelopingAdverseDrugReactions:'',
      numberOfPatientsWhoDevelopPressureUlcer:'',
      numberOfPatientFalls:'',
      numberOfTransfusionReaction:'',
      numberOfUnitsTransfused:'',
      timeTakenForBloodAndBloodComponents:'',
      numberOfUrinaryCatheterDays:'',
      numberOfCentralLineInfections:'',
      numberOfCentralLineDays:'',
      numberOfSurgicalSiteInfections:'',
      totalNoOfBloodCrossMatched:'',
      numberOfNearMissReported:'',
      numberOfIncidentsReported:'',
      numberOfBedOccupied:'',
      numberOfNursingStaff:'',
      totalNoOfHandoversDone:'',
      totalNoOfHandoverOpportunities:'',
      numberOfRestraintInjuries:'',
      totalNoOfRestraintPatientsDays:'',
      numberOfPatientsOnIVTherapy:'',
      numberOfPatientsDevelopingPhlebitis:'',
      numberOfParenteralExposures:'',

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
        const response = await fetch('http://127.0.0.1:8000/firstfloor/', {
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
    }
    setValidated(true);
  };

  return (
    <StyledContainer style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">1st Floor</h1>
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
      required
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
  {/* Manually check if the date is selected and display error if not */}
  {!selectedDate && (
    <Form.Control.Feedback type="invalid">
      Please select a date
    </Form.Control.Feedback>
  )}
</Form.Group>


        <Row className="mb-3">
          <Form.Group controlId="timeTakenForInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment Nurses (Min)</Form.Label>
            <Form.Control
             required
              type="text"
              value={timeTakenForInitialAssessment}
              onChange={(e) => {setTimeTakenForInitialAssessment(e.target.value);handleChange(e);}}
            /><Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="totalNumberOfAdmissions">
            <Form.Label>Total Number of Admissions</Form.Label>
            <Form.Control
             required
              type="text"
              value={totalNumberOfAdmissions}
              onChange={(e) =>{ setTotalNumberOfAdmissions(e.target.value);handleChange(e);}}
            />
             <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
         
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfInPatients">
            <Form.Label>Number of In-Patients</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfInPatients}
              onChange={(e) => {setNumberOfInPatients(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfBedsOccupied">
            <Form.Label>NumberOfBedsOccupied</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfBedsOccupied}
              onChange={(e) => {setnumberOfBedsOccupied(e.target.value);handleChange(e);}}
            />
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
              value={numberOfPatientsDischarged}
              onChange={(e) => {setNumberOfPatientsDischarged(e.target.value);handleChange(e);}}
            />
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
              type="text"
              value={timeTakenForDischarge}
              onChange={(e) => {setTimeTakenForDischarge(e.target.value);handleChange(e);}}
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
              onChange={(e) =>{ setTotalNumberOfOpportunitiesOfMedicationErrors(e.target.value);handleChange(e);}}
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
          <Form.Group controlId="numberOfPatientsWhoDevelopPressureUlcer">
            <Form.Label>Number of Patients Who Develop New / Worsening of Pressure Ulcer</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfPatientsWhoDevelopPressureUlcer}
              onChange={(e) => {setNumberOfPatientsWhoDevelopPressureUlcer(e.target.value);handleChange(e);}}
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
          <Form.Group controlId="numberOfUrinaryCatheterDays">
            <Form.Label>Number of Urinary Catheter Days in that Month</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfUrinaryCatheterDays}
              onChange={(e) => {setNumberOfUrinaryCatheterDays(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfCentralLineInfections">
            <Form.Label>Number Central Line - Associated Blood Stream Infections in a Month</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfCentralLineInfections}
              onChange={(e) => {setNumberOfCentralLineInfections(e.target.value);handleChange(e);}}
            />
             <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
         
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfCentralLineDays">
            <Form.Label>Number of Central Line Days in that Month</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfCentralLineDays}
              onChange={(e) => {setNumberOfCentralLineDays(e.target.value);handleChange(e);}}
            />
             <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
         
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfSurgicalSiteInfections">
            <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfSurgicalSiteInfections}
              onChange={(e) =>{ setNumberOfSurgicalSiteInfections(e.target.value);handleChange(e);}}
            />
             <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
         
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="totalNoOfBloodCrossMatched">
            <Form.Label>Total No of Blood & Blood Components Cross-Matched/ Reserved</Form.Label>
            <Form.Control
             required
              type="text"
              value={totalNoOfBloodCrossMatched}
              onChange={(e) => {setTotalNoOfBloodCrossMatched(e.target.value);handleChange(e);}}
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
              onChange={(e) => {setNumberOfNearMissReported(e.target.value);handleChange(e);}}
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
          <Form.Group controlId="numberOfBedOccupied">
            <Form.Label>NO OF BED OCCUPIED</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfBedOccupied}
              onChange={(e) => {setNumberOfBedOccupied(e.target.value);handleChange(e);}}
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
          <Form.Group controlId="totalNoOfHandoversDone">
            <Form.Label>Total No of Handovers Done Appropriately</Form.Label>
            <Form.Control
             required
              type="text"
              value={totalNoOfHandoversDone}
              onChange={(e) => {setTotalNoOfHandoversDone(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="totalNoOfHandoverOpportunities">
            <Form.Label>Total no. of handover Opportunities</Form.Label>
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
          <Form.Group controlId="numberOfRestraintInjuries">
            <Form.Label>No of Restraint Injuries / Strangulation</Form.Label>
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
            <Form.Label>Total no of restraint patients Days</Form.Label>
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
            <Form.Label>No of patients on IV therapy</Form.Label>
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

        <Row className="mb-3">
          <Form.Group controlId="numberOfPatientsDevelopingPhlebitis">
            <Form.Label>Total No of patient who develops phlebitis/Extravasation</Form.Label>
            <Form.Control
             required
              type="text"
              value={numberOfPatientsDevelopingPhlebitis}
              onChange={(e) => {setNumberOfPatientsDevelopingPhlebitis(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="numberOfParenteralExposures">
            <Form.Label>Number of Parenteral Exposures (Injury due to any sharp)</Form.Label>
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

        <Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
          Save
        </Button>

        
         <Alert variant="danger" show={!validated}>
          Please fill out all required fields.
        </Alert>

      </Form>
    </StyledContainer>
  );
};

export default FirstFloor;
