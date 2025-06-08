import React from 'react';
import usePatientData from './hooks/usePatientData';
import PatientOverview from './components/PatientOverview';
import BehandelaarInvoerDashboard from './components/BehandelaarInvoerDashboard';
import './App.css'; // Behoud eventuele globale stijlen

// Hoofdapplicatie component
const App = () => {
  const {
    patients,
    selectedPatient,
    selectedPatientId,
    selectPatient,
    deselectPatient,
    addPatient,
    updateFormData,
    updateScore,
    addKlacht,
    removeKlacht,
    updateKlacht,
    addBevinding,
    removeBevinding,
    updateBevinding,
    addAdvies,
    removeAdvies,
    updateAdvies,
  } = usePatientData();

  if (!selectedPatientId || !selectedPatient) {
    return (
      <PatientOverview
        patients={patients}
        onSelectPatient={selectPatient}
        onAddPatient={addPatient}
      />
    );
  }

  return (
    <BehandelaarInvoerDashboard
      patient={selectedPatient}
      updateFormData={updateFormData}
      updateScore={updateScore}
      addKlacht={addKlacht}
      removeKlacht={removeKlacht}
      updateKlacht={updateKlacht}
      addBevinding={addBevinding}
      removeBevinding={removeBevinding}
      updateBevinding={updateBevinding}
      addAdvies={addAdvies}
      removeAdvies={removeAdvies}
      updateAdvies={updateAdvies}
      onCloseDashboard={deselectPatient} // Functie om terug te keren naar het overzicht
    />
  );
};

export default App;
