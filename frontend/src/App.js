import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import usePatientData from './hooks/usePatientData';
import PatientOverview from './components/PatientOverview';
import BehandelaarInvoerDashboard from './components/BehandelaarInvoerDashboard';
import AuthForm from './components/AuthForm';
import './App.css'; // Behoud eventuele globale stijlen

// De hoofdapplicatie, die alleen wordt getoond als de gebruiker is ingelogd.
const MainApp = () => {
  const {
    patients,
    selectedPatient,
    selectedPatientId,
    isLoading,
    error,
    selectPatient,
    deselectPatient,
    addPatient,
    deletePatient,
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Patiëntgegevens laden...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!selectedPatientId || !selectedPatient) {
    return (
      <PatientOverview
        patients={patients}
        onSelectPatient={selectPatient}
        onAddPatient={addPatient}
        onDeletePatient={deletePatient}
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

// De App component bepaalt of de login pagina of de hoofdapplicatie getoond wordt.
const App = () => {
  const { session } = useAuth();

  return (
    <>
      {session ? <MainApp /> : <AuthForm />}
    </>
  );
};

// Wikkel de hele applicatie in de AuthProvider
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
