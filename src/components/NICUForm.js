import React, { useState ,useEffect} from 'react';
import { Row, Form, Col, Alert ,Container} from 'react-bootstrap';
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

function NICU() {
  const MAX_CHAR_LIMIT = 100; // Define the max character limit

  const [timeTakenForInitialAssessment, setTimeTakenForInitialAssessment] = useState('');
  const [totalNumberOfAdmissions, setTotalNumberOfAdmissions] = useState('');
  const [numberOfPatientsDischarged, setNumberOfPatientsDischarged] = useState('');
  const [numberOfIpPatients, setNumberOfIpPatients] = useState('');
  const [numberOfBedsOccupied, setnumberOfBedsOccupied] = useState('');
  const [timeTakenForDischarge, setTimeTakenForDischarge] = useState('');
  const [totalNumberOfMedicationErrors, setTotalNumberOfMedicationErrors] = useState('');
  const [totalNumberOfMedicationErrorsRemarks, setTotalNumberOfMedicationErrorsRemarks] = useState('');
  const [totalNumberOfOpportunitiesOfMedicationErrors, setTotalNumberOfOpportunitiesOfMedicationErrors] = useState('');
  const [numberOfMedicationChartsWithErrorProneAbbreviation, setNumberOfMedicationChartsWithErrorProneAbbreviation] = useState('');
  const [MedicationChartsWithErrorProneAbbreviationRemarks, setMedicationChartsWithErrorProneAbbreviationRemarks] = useState('');
  const [numberOfMedicationChartsReviewed, setNumberOfMedicationChartsReviewed] = useState('');
  const [numberOfMedicationChartsReviewedRemarks, setNumberOfMedicationChartsReviewedRemarks] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactions, setNumberOfPatientsDevelopingAdverseDrugReactions] = useState('');
  const [numberOfPatientsDevelopingAdverseDrugReactionsRemarks, setNumberOfPatientsDevelopingAdverseDrugReactionsRemarks] = useState('');
  const [numberOfTransfusionReaction, setNumberOfTransfusionReaction] = useState('');
  const [numberOfTransfusionReactionRemarks, setNumberOfTransfusionReactionRemarks] = useState('');
  const [numberOfUnitsTransfused, setNumberOfUnitsTransfused] = useState('');
  const [timeTakenForBloodAndBloodComponents, setTimeTakenForBloodAndBloodComponents] = useState('');
  const [totalNoOfBloodAndBloodComponentsCrossMatched, setTotalNoOfBloodAndBloodComponentsCrossMatched] = useState('');
  const [numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer, setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer] = useState('');
  const [numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks, setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks] = useState('');
  const [numberOfUrinaryCatheterAssociatedUTIsInMonth, setNumberOfUrinaryCatheterAssociatedUTIsInMonth] = useState('');
  const [numberOfUrinaryCatheterAssociatedUTIsInMonthRemarks, setNumberOfUrinaryCatheterAssociatedUTIsInMonthRemarks] = useState('');
  const [numberOfUrinaryCatheterDaysInMonth, setNumberOfUrinaryCatheterDaysInMonth] = useState('');
  const [numberOfUrinaryCatheterDaysInMonthRemarks, setNumberOfUrinaryCatheterDaysInMonthRemarks] = useState('');
  const [numberOfCentralLineAssociatedBloodStreamInfectionsInMonth, setNumberOfCentralLineAssociatedBloodStreamInfectionsInMonth] = useState('');
  const [CentralLineAssociatedBloodRemarks, setCentralLineAssociatedBloodRemarks]=useState('');
  const [numberOfCentralLineDaysInMonth, setNumberOfCentralLineDaysInMonth] = useState('');
  const [numberOfSurgicalSiteInfectionsInMonth, setNumberOfSurgicalSiteInfectionsInMonth] = useState('');
  const [numberOfSurgicalSiteInfectionsInMonthRemarks, setNumberOfSurgicalSiteInfectionsInMonthremarks] = useState('');
  const [numberOfNursingStaff, setNumberOfNursingStaff] = useState('');
  const [numberOfPatientFalls, setNumberOfPatientFalls] = useState('');
  const [numberOfPatientFallsRemarks, setNumberOfPatientFallsRemarks] = useState('');
  const [numberOfNearMissReported, setNumberOfNearMissReported] = useState('');
  const [numberOfNearMissReportedRemarks, setNumberOfNearMissReportedRemarks] = useState('');
  const [numberOfIncidentsReported, setNumberOfIncidentsReported] = useState('');
  const [numberOfIncidentsReportedRemarks, setNumberOfIncidentsReportedRemarks] = useState('');
  const [numberOfParenteralExposures, setNumberOfParenteralExposures] = useState('');
  const [numberOfParenteralExposuresRemarks, setNumberOfParenteralExposuresRemarks] = useState('');
  const [totalNoOfHandoversDoneAppropriately, setTotalNoOfHandoversDoneAppropriately] = useState('');
  const [totalNoOfHandoverOpportunities, setTotalNoOfHandoverOpportunities] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitis, setTotalNoOfPatientsDevelopingPhlebitis] = useState('');
  const [totalNoOfPatientsDevelopingPhlebitisRemarks, setTotalNoOfPatientsDevelopingPhlebitisRemarks] = useState('');
  const [numberOfRestraintInjuries, setNumberOfRestraintInjuries] = useState('');
  const [numberOfRestraintInjuriesRemarks, setNumberOfRestraintInjuriesRemarks] = useState('');
  const [totalNoOfRestraintPatientsDays, setTotalNoOfRestraintPatientsDays] = useState('');
  const [NursingCarePlan, setNursingCarePlan]= useState('');
  const [ActualDeathinICU, setActualDeathinICU] = useState('');
  const [ActualDeathinICURemarks, setActualDeathinICURemarks] = useState('');
  const [PredictedDeathsinICU, setPredictedDeathsinICU] = useState('');
  const [VentilatorAssociatedPneumonia,setVentilatorAssociatedPneumonia] = useState('');
  const [VentilatorAssociatedPneumoniaRemarks,setVentilatorAssociatedPneumoniaRemarks] = useState('');
  const [NumberofVentilatorDays,setNumberofVentilatorDays]= useState('');
  const [numberOfPatientsOnIVTherapy, setNumberOfPatientsOnIVTherapy] = useState('');
  const [Incidentsofdelining , setIncidentsofdelining] = useState('');
  const [IncidentsofdeliningRemarks , setIncidentsofdeliningRemarks] = useState('');
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');
 

  const [formData, setFormData] = useState({
    id: '',  
    name: '',
    timeTakenForInitialAssessment: '',
    totalNumberOfAdmissions: '',
    numberOfPatientsDischarged: '',
    numberOfIpPatients: '',
    numberOfBedsOccupied: '',
    timeTakenForDischarge: '',
    totalNumberOfMedicationErrors: '',
    totalNumberOfMedicationErrorsRemarks:'',
    totalNumberOfOpportunitiesOfMedicationErrors: '',
    numberOfMedicationChartsWithErrorProneAbbreviation: '',
    MedicationChartsWithErrorProneAbbreviationRemarks: '',
    numberOfMedicationChartsReviewed: '',
    numberOfMedicationChartsReviewedRemarks:'',
    numberOfPatientsDevelopingAdverseDrugReactions: '',
    numberOfPatientsDevelopingAdverseDrugReactionsRemarks: '',
    numberOfTransfusionReaction: '',
    numberOfTransfusionReactionRemarks: '',
    timeTakenForBloodAndBloodComponents: '',
    totalNoOfBloodAndBloodComponentsCrossMatched: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer: '',
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks:'',
    numberOfUrinaryCatheterAssociatedUTIsInMonth: '',
    numberOfUrinaryCatheterAssociatedUTIsInMonthRemarks:'',
    numberOfUrinaryCatheterDaysInMonth: '',
    numberOfUrinaryCatheterDaysInMonthRemarks:'',
    numberOfCentralLineAssociatedBloodStreamInfectionsInMonth: '',
    CentralLineAssociatedBloodRemarks:'',
    numberOfCentralLineDaysInMonth: '',
    numberOfSurgicalSiteInfectionsInMonth: '',
    numberOfSurgicalSiteInfectionsInMonthRemarks:'',
    numberOfNursingStaff: '',
    numberOfPatientFalls: '',
    numberOfPatientFallsRemarks:'',
    numberOfNearMissReported: '',
    numberOfNearMissReportedRemarks:'',
    numberOfIncidentsReported: '',
    numberOfIncidentsReportedRemarks:'',
    numberOfParenteralExposures: '',
    numberOfParenteralExposuresRemarks:'',
    totalNoOfHandoversDoneAppropriately: '',
    totalNoOfHandoverOpportunities: '',
    totalNoOfPatientsDevelopingPhlebitis: '',
    totalNoOfPatientsDevelopingPhlebitisRemarks:'',
    numberOfRestraintInjuries: '',
    NursingCarePlan:'',
    ActualDeathinICU:'',
    ActualDeathinICURemarks:'',
    PredictedDeathsinICU:'',
    VentilatorAssociatedPneumonia:'',
    VentilatorAssociatedPneumoniaRemarks:'',
    numberOfRestraintInjuriesRemarks:'',
    totalNoOfRestraintPatientsDays: '',
    NumberofVentilatorDays:'',
    numberOfPatientsOnIVTherapy: '',
    Incidentsofdelining:'',
    IncidentsofdeliningRemarks:'',
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
        const response = await fetch('http://127.0.0.1:8000/NICU/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUser),
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
    <StyledContainer style={{ maxWidth: '600px' }} className="NumericalData">
       <h2 className="text-center">NICU</h2>
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
<br/>
        <Row className="mb-3">
          <Form.Group controlId="timeTakenForInitialAssessment">
            <Form.Label>Sum of Time Taken for Initial Assessment (Minutes)</Form.Label>
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
  <Col sm='8'>
    <Form.Group controlId="totalNumberOfMedicationErrors">
      <Form.Label>Total Number of Medication Errors</Form.Label>
      <Form.Control
        required
        type="text"
        value={totalNumberOfMedicationErrors}
        onChange={(e) => {
          setTotalNumberOfMedicationErrors(e.target.value);
          handleChange(e);
        }}
      />
      <Form.Control.Feedback type="invalid">
        Please fill out this field
      </Form.Control.Feedback>
    </Form.Group>
  </Col>
  <Col sm='4'>
  <Form.Group controlId="totalNumberOfMedicationErrorsRemarks">
      <Form.Label>Remarks</Form.Label>
      <Form.Control
        required
        type="text"
        value={totalNumberOfMedicationErrorsRemarks}
        onChange={(e) => {
          setTotalNumberOfMedicationErrorsRemarks(e.target.value);
          handleChange(e);
        }}
      />
      <Form.Control.Feedback type="invalid">
        Please fill out this field
      </Form.Control.Feedback>
    </Form.Group>
  </Col>
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
  <Col sm='8'>
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
  </Col>

  <Col sm='4'>
            <Form.Group >
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              required
                type="text"
                value={MedicationChartsWithErrorProneAbbreviationRemarks}
      onChange={(e) => {setMedicationChartsWithErrorProneAbbreviationRemarks(e.target.value);handleChange(e);}}
              />
              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
</Row>

      <Row className="mb-3">
      <Col sm='8'>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfMedicationChartsReviewedRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={numberOfMedicationChartsReviewedRemarks}
            onChange={(e) => {setNumberOfMedicationChartsReviewedRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>


    <Row className="mb-3">
    <Col sm='4'>
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

      </Col> 
          <Col sm='4' controlId="numberOfPatientsDevelopingAdverseDrugReactionsRemarks">
            <Form.Group >
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              required
                type="text"
                value={numberOfPatientsDevelopingAdverseDrugReactionsRemarks}
                onChange={(e) => {setNumberOfPatientsDevelopingAdverseDrugReactionsRemarks(e.target.value);handleChange(e);}}
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
          <Col sm='8'>
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
          </Col>

          <Col sm='4'>
          <Form.Group controlId="numberOfTransfusionReactionRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={numberOfTransfusionReactionRemarks}
              onChange={(e) => {setNumberOfTransfusionReactionRemarks(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>

      {/* <Row className="mb-3">
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
      </Row> */}

<Row className="mb-3">
  <Form.Group controlId="timeTakenForBloodAndBloodComponents">
    <Form.Label>Sum of Time Taken for Blood & Blood Components (Minutes)</Form.Label>
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
  <Col sm='8'>
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
  </Col>
  <Col sm='4'>

  <Form.Group controlId="numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks">
    <Form.Label>Remarks</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks}
      onChange={(e) => {setNumberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcerRemarks(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
       Please fill out this field
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
</Row>

<Row className="mb-3">
<Col sm='8'>
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
  </Col>

  <Col sm='4'>
  <Form.Group controlId="numberOfUrinaryCatheterAssociatedUTIsInMonthRemarks">
    <Form.Label>Remarks</Form.Label>
    <Form.Control
     required
      type="text"
      value={numberOfUrinaryCatheterAssociatedUTIsInMonthRemarks}
      onChange={(e) => {setNumberOfUrinaryCatheterAssociatedUTIsInMonthRemarks(e.target.value);handleChange(e);}}
    />
     <Form.Control.Feedback type="invalid">
     Please fill out this field
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
</Row>

      <Row className="mb-3">
      <Col sm='8'>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfUrinaryCatheterDaysInMonthRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={numberOfUrinaryCatheterDaysInMonthRemarks}
            onChange={(e) => {setNumberOfUrinaryCatheterDaysInMonthRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
                  Please fill out this field
                </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

    <Row className="mb-3">
    <Col sm='8'>
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
      </Col>

      <Col sm='4'>
      <Form.Group controlId="CentralLineAssociatedBloodRemarks">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
        required
          type="text"
          value={CentralLineAssociatedBloodRemarks}
          onChange={(e) => {setCentralLineAssociatedBloodRemarks(e.target.value);handleChange(e);}}
        />
        <Form.Control.Feedback type="invalid">
         Please fill out this field
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
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
        <Col sm='8'>
          <Form.Group controlId="numberOfSurgicalSiteInfectionsInMonth">
            <Form.Label>Number of Surgical Site Infections in a Given Month</Form.Label>
            <Form.Control
            required
              type="text"
              value={numberOfSurgicalSiteInfectionsInMonth}
              onChange={(e) => { setNumberOfSurgicalSiteInfectionsInMonth(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>

          <Col sm='4'>
          <Form.Group controlId="numberOfSurgicalSiteInfectionsInMonthRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={numberOfSurgicalSiteInfectionsInMonthRemarks}
              onChange={(e) => {setNumberOfSurgicalSiteInfectionsInMonthremarks(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
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
        <Col sm='8'>
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
          </Col>

          <Col sm='4'>
          <Form.Group controlId="numberOfPatientFallsRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
            required
              type="text"
              value={numberOfPatientFallsRemarks}
              onChange={(e) => {setNumberOfPatientFallsRemarks(e.target.value);handleChange(e);}}
            />
            <Form.Control.Feedback type="invalid">
            Please fill out this field
          </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm='8'>
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

      <Row className="mb-3">
      <Col sm='8'>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfIncidentsReportedRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={numberOfIncidentsReportedRemarks}
            onChange={(e) => {setNumberOfIncidentsReportedRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
                  Please fill out this field
                </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

    <Row className="mb-3">
    <Col sm='8'>
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
      <Col sm='8'>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="totalNoOfPatientsDevelopingPhlebitisRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={totalNoOfPatientsDevelopingPhlebitisRemarks}
            onChange={(e) => {setTotalNoOfPatientsDevelopingPhlebitisRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
      <Col sm='8'>
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
        </Col>

        <Col sm='4'>
        <Form.Group controlId="numberOfRestraintInjuriesRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={numberOfRestraintInjuriesRemarks}
            onChange={(e) => {setNumberOfRestraintInjuriesRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
           Please fill out this field
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group controlId="NursingCarePlan">
          <Form.Label>Total Number of Restraint Patients Days</Form.Label>
          <Form.Control
          required
            type="text"
            value={NursingCarePlan}
            onChange={(e) => {setNursingCarePlan(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
      </Row>
      

      <Row className="mb-3">
        <Form.Group controlId="totalNoOfRestraintPatientsDays">
          <Form.Label>No of casesheets where Nursing Care Plan is documented</Form.Label>
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
        <Col sm='8'>
        <Form.Group controlId="ActualDeathinICU">
          <Form.Label>Actual Death in ICU</Form.Label>
          <Form.Control
          required
            type="text"
            value={ActualDeathinICU}
            onChange={(e) => {setActualDeathinICU(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="ActualDeathinICURemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={ActualDeathinICURemarks}
            onChange={(e) => {setActualDeathinICURemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>


      <Row className="mb-3">
        <Form.Group controlId="PredictedDeathsinICU">
          <Form.Label>Predicted Deaths in ICU</Form.Label>
          <Form.Control
          required
            type="text"
            value={PredictedDeathsinICU}
            onChange={(e) => {setPredictedDeathsinICU(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Col sm='8'>
        <Form.Group controlId="VentilatorAssociatedPneumonia">
          <Form.Label>No of Ventilator Associated Pneumonia</Form.Label>
          <Form.Control
          required
            type="text"
            value={VentilatorAssociatedPneumonia}
            onChange={(e) => {setVentilatorAssociatedPneumonia(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="VentilatorAssociatedPneumoniaRemarks">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
          required
            type="text"
            value={VentilatorAssociatedPneumoniaRemarks}
            onChange={(e) => {setVentilatorAssociatedPneumoniaRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>



      <Row className="mb-3">
          <Form.Group controlId="NumberofVentilatorDays">
            <Form.Label>Number of Ventilator Days</Form.Label>
            <Form.Control
            required
              type="text"
              value={NumberofVentilatorDays}
              onChange={(e) => {setNumberofVentilatorDays(e.target.value);handleChange(e);}}
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



        <Row className="mb-3">
          <Col sm='8'>
        <Form.Group controlId="Incidentsofdelining">
          <Form.Label>Incidents of delining </Form.Label>
          <Form.Control
          required
            type="text"
            value={Incidentsofdelining}
            onChange={(e) => {setIncidentsofdelining(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>

        <Col sm='4'>
        <Form.Group controlId="IncidentsofdeliningRemarks">
          <Form.Label>Remarks </Form.Label>
          <Form.Control
          required
            type="text"
            value={IncidentsofdeliningRemarks}
            onChange={(e) => {setIncidentsofdeliningRemarks(e.target.value);handleChange(e);}}
          />
          <Form.Control.Feedback type="invalid">
          Please fill out this field
        </Form.Control.Feedback>
        </Form.Group>
        </Col>
      </Row>
      
        <br/>

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
}

export default NICU;
