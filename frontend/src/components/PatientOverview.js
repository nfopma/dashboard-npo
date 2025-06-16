import React from 'react';
import { UserPlus, Users } from 'lucide-react'; // Verwijder TestTube2 import
import { useAuth } from '../contexts/AuthContext'; // Importeer useAuth

const PatientOverview = ({ patients, onSelectPatient, onAddPatient }) => {
  const { signOut } = useAuth(); // Gebruik de signOut functie van de AuthContext

  // Verwijder filtering van 'test-patient'
  // const testPatient = patients.find(p => p.id === 'test-patient');
  // const otherPatients = patients.filter(p => p.id !== 'test-patient');
  const allPatients = patients; // Gebruik alle patiënten direct

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error("Fout bij uitloggen:", error.message);
      alert("Er is een fout opgetreden bij het uitloggen.");
    } else {
      console.log("Succesvol uitgelogd.");
      // Optioneel: Navigeer de gebruiker naar de loginpagina of refresh de pagina
      // window.location.reload(); // Dit kan handig zijn om de state volledig te resetten
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-700 text-white p-4 rounded-t-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-3" size={28}/> Patiëntenoverzicht
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Uitloggen
          </button>
        </div>
      </header>

      <div className="bg-white shadow-md rounded-b-lg p-6">
        {/* Nieuwe Patiënt knop verplaatst naar hier voor betere zichtbaarheid */}
        <div className="mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={onAddPatient}
          >
            <UserPlus className="mr-2" size={20} />
            Nieuwe Patiënt
          </button>
        </div>

        {/* Verwijder de testpatiënt weergave */}
        {/* {testPatient && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 flex items-center">
              <TestTube2 className="mr-2" size={24} /> Testpatiënt
            </h2>
            <div
              key={testPatient.id}
              className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer transition-colors bg-blue-50 border-blue-200"
              onClick={() => onSelectPatient(testPatient.id)}
            >
              <h3 className="font-medium text-blue-700">{testPatient.name}</h3>
              <p className="text-sm text-gray-600">Klik om de testgegevens te bekijken en te bewerken.</p>
            </div>
          </div>
        )} */}

        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Mijn Patiënten</h2>
          {allPatients.length > 0 ? ( // Gebruik allPatients
            <ul className="space-y-3">
              {allPatients.map(patient => ( // Gebruik allPatients
                <li
                  key={patient.id}
                  className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => onSelectPatient(patient.id)}
                >
                  <h3 className="font-medium text-gray-800">{patient.name || 'Naamloos'}</h3>
                  <p className="text-sm text-gray-500">Geboortedatum: {patient.data.basisgegevens.geboortedatum || 'N.v.t.'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              Nog geen patiënten toegevoegd. Klik op "Nieuwe Patiënt" om te beginnen.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
