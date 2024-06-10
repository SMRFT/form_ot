# Create your models here.
# models.py
from django.db import models

# from django.contrib.auth.models import AbstractUser
class Register(models.Model):
    name = models.CharField(max_length=500)
    department = models.CharField(max_length=500)
    designation = models.CharField(max_length=500)
    email = models.EmailField(max_length=500, unique=True)
    password = models.CharField(max_length=500)

    
class OTData(models.Model):
    selectedDate= models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNumberOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfusedReactions = models.PositiveIntegerField(default=0)
    totalNoOfBloodAndBloodComponentsCrossMatched = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfCentralLineDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDoneAppropriately = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    totalNoOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    noOfRestraintInjuries = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='OT', blank=True, null=True)


    def __str__(self):
        return f"OT Data for {self.selectedDate}"
    

class RecoveryWard(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNumberOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    numberOfTransfusionReactions = models.PositiveIntegerField(default=0)
    totalNoOfBloodAndBloodComponentsCrossMatched = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfCentralLineDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDoneAppropriately = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    totalNoOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Recovery ward', blank=True, null=True)
    def __str__(self):
        return self.selectedDate


class NICU(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNumberOfMedicationErrors = models.PositiveIntegerField(default=0)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    totalNoOfBloodAndBloodComponentsCrossMatched = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterAssociatedUTIsInMonth = models.PositiveIntegerField(default=0)
    numberOfUrinaryCatheterDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineAssociatedBloodStreamInfectionsInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfectionsInMonth = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDoneAppropriately = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    totalNoOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfCasesheetsWhereNursingCarePlanIsDocumented = models.PositiveIntegerField(default=0)
    actualDeathInICU = models.PositiveIntegerField(default=0)
    predictedDeathsInICU = models.PositiveIntegerField(default=0)
    numberOfVentilatorAssociatedPneumonia = models.PositiveIntegerField(default=0)
    numberOfVentilatorDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='NICU', blank=True, null=True)
    def __str__(self):
        return f"NICU Data: {self.selectedDate}"

class ChemoWard(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    numberOfIpPatients = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfMedicationErrors = models.PositiveIntegerField(default=0)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    totalNoOfBloodAndBloodComponentsCrossMatched = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopNewOrWorseningOfPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfUrinaryCatheterAssociatedUTIsInMonth = models.PositiveIntegerField(default=0)
    numberOfUrinaryCatheterDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineAssociatedBloodStreamInfectionsInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfectionsInMonth = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDoneAppropriately = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    totalNoOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Chemo Ward', blank=True, null=True)
    def __str__(self):
        return self.selectedDate


class Physiotherapy(models.Model):
    selectedDate = models.DateField()
    numberOfIpPatients = models.IntegerField(default=0)
    numberOfOpPatients= models.IntegerField(default=0)
    totalCsess = models.IntegerField(default=0)
    numberOfBedsOccupied= models.IntegerField(default=0)
    ward = models.CharField(max_length=100, default='Physiotherapy', blank=True, null=True)
    def __str__(self):
        return self.selectedDate
    


class Dialysis(models.Model):
    selectedDate = models.DateField()
    numberOfIpPatients = models.IntegerField(default=0)
    numberOfOpPatients = models.IntegerField(default=0)
    totalCsess = models.IntegerField(default=0)
    numberOfBedsOccupied = models.IntegerField(default=0)
    ward = models.CharField(max_length=100, default='Dialysis', blank=True, null=True)
    def __str__(self):
        return "Diagnostic Center Data"
    
class Lab(models.Model):
    selectedDate = models.DateField()
    numberOfReportingErrors = models.PositiveIntegerField(default=0)
    numberOfTestsPerformed = models.PositiveIntegerField(default=0)
    numberOfStaffAdheringToSafety = models.PositiveIntegerField(default=0)
    numberOfStaffAudited = models.PositiveIntegerField(default=0)
    waitingTimeForDiagnostics = models.CharField(max_length=100, blank=True)
    numberOfPatientsReportedInDiagnostics = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Lab', blank=True, null=True)
    def __str__(self):
        return f"Lab Data: {self.selectedDate}"

class CT(models.Model):
    selectedDate = models.DateField()
    numberOfReportingErrors = models.PositiveIntegerField(default=0)
    numberOfTestsPerformed = models.PositiveIntegerField(default=0)
    numberOfStaffAdheringToSafety = models.PositiveIntegerField(default=0)
    numberOfStaffAudited = models.PositiveIntegerField(default=0)
    waitingTimeForDiagnostics = models.CharField(max_length=100, blank=True)
    numberOfPatientsReportedInDiagnostics = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='CT', blank=True, null=True)
    def __str__(self):
        return f"Lab Data: {self.selectedDate}"

class MRI(models.Model):
    selectedDate = models.DateField()
    numberOfReportingErrors = models.PositiveIntegerField(default=0)
    numberOfTestsPerformed = models.PositiveIntegerField(default=0)
    numberOfStaffAdheringToSafety = models.PositiveIntegerField(default=0)
    numberOfStaffAudited = models.PositiveIntegerField(default=0)
    waitingTimeForDiagnostics = models.CharField(max_length=100, blank=True)
    numberOfPatientsReportedInDiagnostics = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='MRI', blank=True, null=True)
    def __str__(self):
        return f"MRI Data: {self.selectedDate}"
    
class Xray(models.Model):
    selectedDate = models.DateField()
    numberOfReportingErrors = models.PositiveIntegerField(default=0)
    numberOfTestsPerformed = models.PositiveIntegerField(default=0)
    numberOfStaffAdheringToSafety = models.PositiveIntegerField(default=0)
    numberOfStaffAudited = models.PositiveIntegerField(default=0)
    waitingTimeForDiagnostics = models.CharField(max_length=100, blank=True)
    numberOfPatientsReportedInDiagnostics = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='X-Ray', blank=True, null=True)
    def __str__(self):
        return f"Xray Data: {self.selectedDate}"

class EmergencyRoom(models.Model):
    selectedDate = models.DateField()
    returnsToEmergency = models.CharField(max_length=100, blank=True)
    patientsToEmergency = models.CharField(max_length=100, blank=True)
    surgicalSiteInfection = models.CharField(max_length=100, blank=True)
    parenteralExposures = models.CharField(max_length=100, blank=True)
    incidents = models.CharField(max_length=100, blank=True)
    ward = models.CharField(max_length=100, default='ER', blank=True, null=True)
    def __str__(self):
        return f"Emergency Room Data: {self.selectedDate}"
    



class SICU(models.Model):
      selectedDate=models.DateField()
      timeTakenForInitialAssessment=models.CharField(max_length=100)
      totalNumberOfAdmissions=models.CharField(max_length=100)
      numberOfInPatients=models.CharField(max_length=100)
      numberOfPatientsDischarged=models.CharField(max_length=100)
      timeTakenForDischarge=models.CharField(max_length=100)
      numberOfNursingStaff=models.CharField(max_length=100)
      totalNumberOfMedicationErrors=models.CharField(max_length=100)
      totalNumberOfOpportunitiesOfMedicationErrors=models.CharField(max_length=100)
      numberOfMedicationChartsWithErrorProneAbbreviation=models.CharField(max_length=100)
      numberOfMedicationChartsReviewed=models.CharField(max_length=100)
      numberOfPatientsDevelopingPressureUlcer=models.CharField(max_length=100)
      numberOfPatientsDevelopingAdverseDrugReactions=models.CharField(max_length=100)
      numberOfPatientFalls=models.CharField(max_length=100)
      numberOfTransfusionReaction=models.CharField(max_length=100)
      numberOfUnitsTransfused=models.CharField(max_length=100)
      totalNoOfBloodAndBloodComponentsCrossMatched=models.CharField(max_length=100)
      timeTakenForBloodAndBloodComponents=models.CharField(max_length=100)
      numberOfUrinaryCatheterAssociatedUTIsInMonth=models.CharField(max_length=100)
      numberOfUrinaryCatheterDaysInMonth=models.CharField(max_length=100)
      numberOfCentralLineAssociatedBloodStreamInfectionsInMonth=models.CharField(max_length=100)
      numberOfCentralLineDaysInMonth=models.CharField(max_length=100)
      numberOfSurgicalSiteInfectionsInMonth=models.CharField(max_length=100)
      numberOfNearMissReported=models.CharField(max_length=100)
      numberOfIncidentsReported=models.CharField(max_length=100)
      numberOfParenteralExposures=models.CharField(max_length=100)
      totalNoOfHandoversDoneAppropriately=models.CharField(max_length=100)
      totalNoOfHandoverOpportunities=models.CharField(max_length=100)
      totalNoOfPatientsDevelopingPhlebitis=models.CharField(max_length=100)
      numberOfRestraintInjuries=models.CharField(max_length=100)
      totalNoOfRestraintPatientsDays=models.CharField(max_length=100)
      numberOfPatientsOnIVTherapy=models.CharField(max_length=100)
      numberOfBedsOccupied=models.CharField(max_length=100)
      ward = models.CharField(max_length=100, default='SICU', blank=True, null=True)
      def __str__(self):
        return f"SICU: {self.selectedDate}"


# models.py
from django.db import models

class FirstFloor(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0) 
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterDays = models.PositiveIntegerField(default=0)
    numberOfCentralLineInfections = models.PositiveIntegerField(default=0)
    numberOfCentralLineDays = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfections = models.PositiveIntegerField(default=0)
    totalNoOfBloodCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfBedOccupied = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDone = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='First Floor', blank=True, null=True)
    def __str__(self):
        return f"first floor Data: {self.selectedDate}"

from django.db import models

class Secondfloor(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterDays = models.PositiveIntegerField(default=0)
    numberOfCentralLineInfections = models.PositiveIntegerField(default=0)
    numberOfCentralLineDays = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfections = models.PositiveIntegerField(default=0)
    totalNoOfBloodCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfBedOccupied = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDone = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Second Floor', blank=True, null=True)

    def __str__(self):
        return f"Ward: {self.ward}"
    
class Thirdfloor(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterDays = models.PositiveIntegerField(default=0)
    numberOfCentralLineInfections = models.PositiveIntegerField(default=0)
    numberOfCentralLineDays = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfections = models.PositiveIntegerField(default=0)
    totalNoOfBloodCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfBedOccupied = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDone = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Third Floor', blank=True, null=True)
    def __str__(self):
        return f"Thirdfloor Data: {self.selectedDate}"
    


class firstsuit(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterDays = models.PositiveIntegerField(default=0)
    numberOfCentralLineInfections = models.PositiveIntegerField(default=0)
    numberOfCentralLineDays = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfections = models.PositiveIntegerField(default=0)
    totalNoOfBloodCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfBedOccupied = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDone = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='First Suit', blank=True, null=True)
    def __str__(self):
        return f"1stsuit Data: {self.selectedDate}"
    
class Secondsuit(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsWhoDevelopPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterDays = models.PositiveIntegerField(default=0)
    numberOfCentralLineInfections = models.PositiveIntegerField(default=0)
    numberOfCentralLineDays = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfections = models.PositiveIntegerField(default=0)
    totalNoOfBloodCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfBedOccupied = models.PositiveIntegerField(default=0)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDone = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    numberOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    numberOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPhlebitis = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Second Suit', blank=True, null=True)
    def __str__(self):
        return f"2suit Data: {self.selectedDate}"
    


class Frontoffice(models.Model):
    selectedDate = models.DateField()
    SumtotalPatient = models.PositiveIntegerField(default=0)
    TotalnoofOutPatients = models.PositiveIntegerField(default=0)
    SumtotalpatientReportingtime = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='Front Office', blank=True, null=True)
    def __str__(self):
        return f"Frontoffice Data: {self.selectedDate}"
    


# models.py
from django.db import models

class MRD(models.Model):
    selectedDate = models.DateField()
    NumberofMedicalRecords = models.PositiveIntegerField(default=0)
    Numberofdischarge = models.PositiveIntegerField(default=0)
    Numberofdeath = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='MRD', blank=True, null=True)
    def __str__(self):
        return f"MRD Data: {self.selectedDate}"


class MICU(models.Model):
    selectedDate = models.DateField()
    timeTakenForInitialAssessment = models.CharField(max_length=100, blank=True)
    totalNumberOfAdmissions = models.PositiveIntegerField(default=0)
    numberOfInPatients = models.PositiveIntegerField(default=0)
    numberOfBedsOccupied = models.PositiveIntegerField(default=0)
    numberOfPatientsDischarged = models.PositiveIntegerField(default=0)
    timeTakenForDischarge = models.CharField(max_length=100, blank=True)
    numberOfNursingStaff = models.PositiveIntegerField(default=0)
    totalNumberOfMedicationErrors = models.PositiveIntegerField(default=0)
    totalNumberOfOpportunitiesOfMedicationErrors = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsWithErrorProneAbbreviation = models.PositiveIntegerField(default=0)
    numberOfMedicationChartsReviewed = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingAdverseDrugReactions = models.PositiveIntegerField(default=0)
    numberOfPatientsDevelopingPressureUlcer = models.PositiveIntegerField(default=0)
    numberOfPatientFalls = models.PositiveIntegerField(default=0)
    numberOfTransfusionReaction = models.PositiveIntegerField(default=0)
    numberOfUnitsTransfused = models.PositiveIntegerField(default=0)
    timeTakenForBloodAndBloodComponents = models.CharField(max_length=100, blank=True)
    numberOfUrinaryCatheterAssociatedUTIsInMonth = models.PositiveIntegerField(default=0)
    numberOfUrinaryCatheterDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineAssociatedBloodStreamInfectionsInMonth = models.PositiveIntegerField(default=0)
    numberOfCentralLineDaysInMonth = models.PositiveIntegerField(default=0)
    numberOfSurgicalSiteInfectionsInMonth = models.PositiveIntegerField(default=0)
    totalNoOfBloodAndBloodComponentsCrossMatched = models.PositiveIntegerField(default=0)
    numberOfNearMissReported = models.PositiveIntegerField(default=0)
    numberOfIncidentsReported = models.PositiveIntegerField(default=0)
    numberOfParenteralExposures = models.PositiveIntegerField(default=0)
    totalNoOfHandoversDoneAppropriately = models.PositiveIntegerField(default=0)
    totalNoOfHandoverOpportunities = models.PositiveIntegerField(default=0)
    totalNoOfPatientsDevelopingExtravasation = models.PositiveIntegerField(default=0)
    noOfRestraintInjuries = models.PositiveIntegerField(default=0)
    totalNoOfRestraintPatientsDays = models.PositiveIntegerField(default=0)
    actualDeathInICU = models.PositiveIntegerField(default=0)
    predictedDeathsInICU = models.PositiveIntegerField(default=0)
    noOfVentilatorAssociatedPneumonia = models.PositiveIntegerField(default=0)
    numberOfVentilatorDays = models.PositiveIntegerField(default=0)
    noOfPatientsOnIVTherapy = models.PositiveIntegerField(default=0)
    incidentsOfDeclining = models.PositiveIntegerField(default=0)
    ward = models.CharField(max_length=100, default='MICU', blank=True, null=True)

    def __str__(self):
        return f"MICU {self.selectedDate}"
    

class AvailabilityOfRoomsAndBeds(models.Model):
    selectedward = models.CharField(max_length=200)
    numberOfBedsOccupied = models.IntegerField()
    numberOfAvailability = models.IntegerField()

