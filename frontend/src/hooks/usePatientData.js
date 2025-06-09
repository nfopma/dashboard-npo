import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/apiService'; // Importeer de nieuwe service

const usePatientData = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data ophalen bij de start
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const initialPatients = await api.getPatients();
        setPatients(initialPatients);
        setError(null);
      } catch (err) {
        setError("Kon patiëntgegevens niet laden.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []); // Lege dependency array: alleen uitvoeren bij mount

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const selectPatient = useCallback((patientId) => {
    setSelectedPatientId(patientId);
  }, []);

  const deselectPatient = useCallback(() => {
    setSelectedPatientId(null);
  }, []);

  const addPatient = useCallback(async () => {
    try {
      const newPatient = await api.addPatient();
      setPatients(prev => [...prev, newPatient]);
      setSelectedPatientId(newPatient.id);
      return newPatient.id;
    } catch (err) {
      setError("Kon nieuwe patiënt niet toevoegen.");
      console.error(err);
    }
  }, []);

  const deletePatient = useCallback(async (patientId) => {
    if (!patientId) return;
    try {
      // Optimistic delete
      const originalPatients = [...patients];
      const patientsAfterDelete = patients.filter(p => p.id !== patientId);
      setPatients(patientsAfterDelete);
      if (selectedPatientId === patientId) {
        setSelectedPatientId(null);
      }
      
      await api.deletePatient(patientId);

    } catch (err) {
      setError("Kon patiënt niet verwijderen.");
      console.error(err);
      // Rollback in case of error could be implemented here
    }
  }, [patients, selectedPatientId]);
  
  // Een generieke functie om een patiënt bij te werken en de state te vernieuwen
  const handleUpdate = useCallback(async (patientId, updatedPatient) => {
    try {
      // Optimistic update: update de UI direct voor een snelle respons
      setPatients(prev =>
        prev.map(p => (p.id === patientId ? updatedPatient : p))
      );
      // Stuur de wijziging naar de API
      await api.updatePatient(patientId, updatedPatient);
    } catch (err)
     {
      setError("Kon de wijziging niet opslaan.");
      console.error(err);
      // Hier zou je een rollback kunnen implementeren om de oude staat te herstellen
    }
  }, []);

  const updateFormData = useCallback((section, field, value) => {
    if (!selectedPatient) return;
    // Maak een diepe kopie om onbedoelde mutaties te voorkomen
    const updatedPatient = JSON.parse(JSON.stringify(selectedPatient));
    updatedPatient.data[section][field] = value;
    
    if (section === 'basisgegevens' && field === 'naam') {
      updatedPatient.name = value || 'Naamloos';
    }
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  const updateScore = useCallback((category, field, value) => {
    if (!selectedPatient) return;
    const updatedPatient = JSON.parse(JSON.stringify(selectedPatient));
    updatedPatient.data.intelligentie[category][field] = value;
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  const updateList = useCallback((listName, newList) => {
    if (!selectedPatient) return;
    const updatedPatient = { ...selectedPatient, [listName]: newList };
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  // Handlers voor Klachten lijst
  const addKlacht = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.klachten, { tekst: '', emoji: '⚠️' }];
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const removeKlacht = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.klachten.filter((_, i) => i !== index);
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const updateKlacht = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.klachten.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  // Handlers voor Belangrijkste Bevindingen lijst
  const addBevinding = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.belangrijksteBevindingen, { tekst: '', emoji: '🔍' }];
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const removeBevinding = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.belangrijksteBevindingen.filter((_, i) => i !== index);
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const updateBevinding = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.belangrijksteBevindingen.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  // Handlers voor Praktische Adviezen lijst
  const addAdvies = useCallback(() => {
    if (!selectedPatient) return;
    const newList = [...selectedPatient.praktischeAdviezen, { tekst: '', emoji: '💡' }];
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const removeAdvies = useCallback((index) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.praktischeAdviezen.filter((_, i) => i !== index);
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const updateAdvies = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    const newList = selectedPatient.praktischeAdviezen.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  return {
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
  };
};

export default usePatientData;
