import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/apiService';
import { useAuth } from '../contexts/AuthContext'; // Importeer de auth hook

const usePatientData = () => {
  const { session, user } = useAuth(); // Haal de sessie en de user op
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data ophalen, maar alleen als de gebruiker is ingelogd
  useEffect(() => {
    const loadData = async () => {
      // Als er geen sessie is, toon lege data en stop met laden.
      if (!session) {
        setPatients([]);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const token = session.access_token;
        // Geef het token door aan de API-aanroep
        const fetchedPatients = await api.getPatients(token);
        
        // Geen sortering meer op testpatiënt, gewoon de opgehaalde lijst
        setPatients(fetchedPatients);
        setError(null);
      } catch (err) {
        setError("Kon patiëntgegevens niet laden.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [session]); // Deze effect-hook draait opnieuw als de sessie verandert

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const selectPatient = useCallback((patientId) => {
    setSelectedPatientId(patientId);
  }, []);

  const deselectPatient = useCallback(() => {
    setSelectedPatientId(null);
  }, []);

  const addPatient = useCallback(async () => {
    if (!session || !user) return; // Zorg ervoor dat user ook beschikbaar is
    try {
      const token = session.access_token;
      // Geef het token door aan de API-aanroep
      const newPatient = await api.addPatient(token); // De backend koppelt de user_id
      setPatients(prev => [...prev, newPatient]);
      setSelectedPatientId(newPatient.id);
      return newPatient.id;
    } catch (err) {
      setError("Kon nieuwe patiënt niet toevoegen.");
      console.error(err);
    }
  }, [session, user]); // user toevoegen aan dependency array

  const deletePatient = useCallback(async (patientId) => {
    if (!patientId || !session || !user) return; // Zorg ervoor dat user ook beschikbaar is
    try {
      const token = session.access_token;
      // Verwijder de check voor algemene testpatiënt
      // const patientToDelete = patients.find(p => p.id === patientId);
      // if (patientToDelete && patientToDelete.userId === null) {
      //   setError("De algemene testpatiënt kan niet worden verwijderd.");
      //   return;
      // }

      const originalPatients = [...patients];
      const patientsAfterDelete = patients.filter(p => p.id !== patientId);
      setPatients(patientsAfterDelete);
      if (selectedPatientId === patientId) {
        setSelectedPatientId(null);
      }
      
      // Geef het token door aan de API-aanroep
      await api.deletePatient(token, patientId);

    } catch (err) {
      setError("Kon patiënt niet verwijderen.");
      console.error(err);
      // Rollback kan hier geïmplementeerd worden
      setPatients(originalPatients); // Rollback bij fout
    }
  }, [patients, selectedPatientId, session, user]); // user toevoegen aan dependency array
  
  const handleUpdate = useCallback(async (patientId, updatedPatient) => {
    if (!session || !user) return; // Zorg ervoor dat user ook beschikbaar is
    try {
      const token = session.access_token;
      // Verwijder de check voor algemene testpatiënt
      // const patientToUpdate = patients.find(p => p.id === patientId);
      // if (patientToUpdate && patientToUpdate.userId === null) {
      //   setError("De algemene testpatiënt kan niet worden gewijzigd.");
      //   return;
      // }

      setPatients(prev =>
        prev.map(p => (p.id === patientId ? updatedPatient : p))
      );
      // Geef het token door aan de API-aanroep
      await api.updatePatient(token, patientId, updatedPatient);
    } catch (err) {
      setError("Kon de wijziging niet opslaan.");
      console.error(err);
      // Rollback kan hier geïmplementeerd worden
      // Optioneel: opnieuw laden van data om de state te synchroniseren met de backend
      // loadData(); 
    }
  }, [session, user, patients]); // user en patients toevoegen aan dependency array

  const updateFormData = useCallback((section, field, value) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) {
    //   setError("De algemene testpatiënt kan niet worden gewijzigd.");
    //   return;
    // }
    const updatedPatient = JSON.parse(JSON.stringify(selectedPatient));
    updatedPatient.data[section][field] = value;
    
    if (section === 'basisgegevens' && field === 'naam') {
      updatedPatient.name = value || 'Naamloos';
    }
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  const updateScore = useCallback((category, field, value) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) {
    //   setError("De algemene testpatiënt kan niet worden gewijzigd.");
    //   return;
    // }
    const updatedPatient = JSON.parse(JSON.stringify(selectedPatient));
    updatedPatient.data.intelligentie[category][field] = value;
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  const updateList = useCallback((listName, newList) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) {
    //   setError("De algemene testpatiënt kan niet worden gewijzigd.");
    //   return;
    // }
    const updatedPatient = { ...selectedPatient, [listName]: newList };
    handleUpdate(selectedPatient.id, updatedPatient);
  }, [selectedPatient, handleUpdate]);

  // De handlers voor lijsten (add/remove/update) blijven ongewijzigd,
  // omdat ze `updateList` aanroepen, die al sessie-bewust is via `handleUpdate`.

  const addKlacht = useCallback(() => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = [...selectedPatient.klachten, { tekst: '', emoji: '⚠️' }];
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const removeKlacht = useCallback((index) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = selectedPatient.klachten.filter((_, i) => i !== index);
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const updateKlacht = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = selectedPatient.klachten.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateList('klachten', newList);
  }, [selectedPatient, updateList]);

  const addBevinding = useCallback(() => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = [...selectedPatient.belangrijksteBevindingen, { tekst: '', emoji: '🔍' }];
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const removeBevinding = useCallback((index) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = selectedPatient.belangrijksteBevindingen.filter((_, i) => i !== index);
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const updateBevinding = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = selectedPatient.belangrijksteBevindingen.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateList('belangrijksteBevindingen', newList);
  }, [selectedPatient, updateList]);

  const addAdvies = useCallback(() => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = [...selectedPatient.praktischeAdviezen, { tekst: '', emoji: '💡' }];
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const removeAdvies = useCallback((index) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
    const newList = selectedPatient.praktischeAdviezen.filter((_, i) => i !== index);
    updateList('praktischeAdviezen', newList);
  }, [selectedPatient, updateList]);

  const updateAdvies = useCallback((index, field, value) => {
    if (!selectedPatient) return;
    // Verwijder de check voor algemene testpatiënt
    // if (selectedPatient.userId === null) { setError("De algemene testpatiënt kan niet worden gewijzigd."); return; }
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
