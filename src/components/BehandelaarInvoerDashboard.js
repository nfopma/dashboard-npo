import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, ArrowLeftCircle } from 'lucide-react';
import SectionNavigation from './SectionNavigation';
import DashboardHeader from './DashboardHeader';
import BasicInfoForm from './BasicInfoForm';
import VoorinformatieForm from './VoorinformatieForm';
import BeinvloedendeFactorenForm from './BeinvloedendeFactorenForm';
import ConclusieForm from './ConclusieForm';
import BehandelingForm from './BehandelingForm';
import { getIQNiveau, getIQKleur, getIQPositie } from '../utils/iqCalculations';
// import { getEmojiSizeClass } from '../utils/emojiUtils'; // emojiSize wordt nu hier beheerd
import beschrijvingOpties from '../config/beschrijvingOpties';
import PatientInfoCard from './preview/PatientInfoCard';
import IntelligenceResultsCard from './preview/IntelligenceResultsCard';
import ConclusieCard from './preview/ConclusieCard';

// Behandelaar invoerscherm voor Neuropsychologisch Dashboard
const BehandelaarInvoerDashboard = ({
  patient, // Geselecteerde patiënt object
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
  onCloseDashboard // Functie om terug te gaan naar overzicht
}) => {
  // State voor actieve sectie en preview modus, emojiSize lokaal voor dit dashboard
  const [activeSection, setActiveSection] = useState('basisgegevens');
  const [previewMode, setPreviewMode] = useState(false);
  const [emojiSize, setEmojiSize] = useState(2); // 1=klein, 2=medium, 3=groot, 4=extra groot

  if (!patient) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">Geen patiënt geselecteerd.</p>
        <button
          onClick={onCloseDashboard}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto"
        >
          <ArrowLeftCircle className="mr-2" size={18} />
          Terug naar overzicht
        </button>
      </div>
    );
  }

  const { data: formData, klachten, belangrijksteBevindingen, praktischeAdviezen } = patient;

  // Intelligentie categorieën voor formulier rendering
  const intelligentieCategorieen = [
    { key: 'verbaalBegrip', label: 'Verbaal Begrip', emoji: '💬', beschrijvingDefault: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken' },
    { key: 'perceptueelRedeneren', label: 'Perceptueel Redeneren', emoji: '👁️', beschrijvingDefault: 'Visueel-analytisch oplossingsvermogen, planning, overzicht' },
    { key: 'werkgeheugen', label: 'Werkgeheugen', emoji: '🧩', beschrijvingDefault: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen' },
    { key: 'verwerkingssnelheid', label: 'Verwerkingssnelheid', emoji: '⚡', beschrijvingDefault: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden' },
    { key: 'totaalIQ', label: 'Totaal IQ', emoji: '🧠', beschrijvingDefault: 'Je totale IQ score' }
  ];

  // Component voor individuele intelligentie subtest invoer
  const IntelligentieSubtest = ({ categorie, data }) => (
    <div className="border rounded-lg p-4 bg-gray-50 mb-4">
      <h3 className="font-bold mb-3 text-lg flex items-center">
        <span className="mr-2">{categorie.emoji}</span>
        {categorie.label}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IQ Score</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={data.iqScore}
            onChange={(e) => updateScore(categorie.key, 'iqScore', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Betrouwbaarheidsinterval - Links</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={data.betrouwbaarheidsLinks}
            onChange={(e) => updateScore(categorie.key, 'betrouwbaarheidsLinks', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Betrouwbaarheidsinterval - Rechts</label>
          <input
            type="number" min="50" max="150" className="w-full p-2 border rounded-md"
            value={data.betrouwbaarheidsRechts}
            onChange={(e) => updateScore(categorie.key, 'betrouwbaarheidsRechts', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {categorie.key === 'totaalIQ' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">⚖️ Disharmonisch?</label>
          <select
            className="w-full p-2 border rounded-md"
            value={data.disharmonisch || 'Ja'}
            onChange={(e) => updateScore(categorie.key, 'disharmonisch', e.target.value)}
          >
            <option value="Ja">Ja - Toon totaal IQ score</option>
            <option value="Nee">Nee - Verberg totaal IQ score</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Bij 'Nee' wordt de totaal IQ score niet getoond in de visuele weergave (bij te grote verschillen tussen subtests)
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving (eenvoudige taal)</label>
        <select
          className="w-full p-2 border rounded-md mb-2" value=""
          onChange={(e) => { if (e.target.value) { updateScore(categorie.key, 'beschrijving', e.target.value); } }}
        >
          <option value="">-- Kies een standaard beschrijving --</option>
          {beschrijvingOpties[categorie.key]?.map((optie, idx) => (
            <option key={idx} value={optie}>{optie}</option>
          ))}
        </select>
        <textarea
          className="w-full p-2 border rounded-md" rows="2" placeholder="Of voer een aangepaste beschrijving in"
          value={data.beschrijving}
          onChange={(e) => updateScore(categorie.key, 'beschrijving', e.target.value)}
        ></textarea>
      </div>

      {!(categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') && (
        <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
          <h4 className="font-medium mb-2 text-blue-800">Preview van score-weergave</h4>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{categorie.emoji} {categorie.label}</span>
              <span className="text-sm">IQ: {data.iqScore} ({getIQNiveau(data.iqScore)})</span>
            </div>
            <div className="relative h-12 w-full rounded overflow-hidden mb-1">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-red-500"></div><div className="flex-1 bg-red-400"></div>
                <div className="flex-1 bg-orange-400"></div><div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-green-300"></div><div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-green-600"></div>
              </div>
              <div className="absolute inset-0 flex text-xs text-white font-bold">
                <div className="flex-1 flex justify-center items-end pb-1">50-64</div>
                <div className="flex-1 flex justify-center items-end pb-1">65-79</div>
                <div className="flex-1 flex justify-center items-end pb-1">80-94</div>
                <div className="flex-1 flex justify-center items-end pb-1">95-105</div>
                <div className="flex-1 flex justify-center items-end pb-1">106-120</div>
                <div className="flex-1 flex justify-center items-end pb-1">121-135</div>
                <div className="flex-1 flex justify-center items-end pb-1">136-150</div>
              </div>
              <div
                className="absolute top-2 h-3 bg-white opacity-40 rounded"
                style={{ left: `${getIQPositie(data.betrouwbaarheidsLinks)}%`, width: `${getIQPositie(data.betrouwbaarheidsRechts) - getIQPositie(data.betrouwbaarheidsLinks)}%` }}
              ></div>
              <div className="absolute" style={{ left: `calc(${getIQPositie(data.iqScore)}% - 8px)`, top: '0' }}>
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>95% Betrouwbaarheidsinterval: {data.betrouwbaarheidsLinks} - {data.betrouwbaarheidsRechts}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{data.beschrijving}</p>
          </div>
        </div>
      )}
      {categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee' && (
        <div className="border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
          <h4 className="font-medium mb-2 text-orange-800">⚠️ Totaal IQ score verborgen</h4>
          <p className="text-sm text-orange-700">Deze score wordt niet getoond vanwege te grote verschillen tussen subtests</p>
        </div>
      )}
    </div>
  );

  const sections = [
    { id: 'basisgegevens', label: '👤 Basisgegevens' },
    { id: 'voorinformatie', label: '📝 Voorinformatie' },
    { id: 'beinvloedendeFactoren', label: '⚖️ Beïnvloedende factoren' },
    { id: 'intelligentie', label: '🧠 Intelligentie' },
    { id: 'conclusie', label: '🎯 Conclusie' },
    { id: 'behandeling', label: '🤝 Behandeling' }
  ];

  const nextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
  };

  const prevSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        emojiSize={emojiSize}
        setEmojiSize={setEmojiSize}
        showPatientName={patient.name} // Toon patiëntnaam in header
        onCloseDashboard={onCloseDashboard} // Knop om terug te gaan
      />

      <div className="container mx-auto p-4">
        <SectionNavigation sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="bg-white rounded-lg shadow p-6">
          {previewMode ? (
            <div> {/* Preview Modus */}
              <PatientInfoCard formData={formData} klachten={klachten} emojiSize={emojiSize} />
              <IntelligenceResultsCard formData={formData} emojiSize={emojiSize} />
              <ConclusieCard formData={formData} belangrijksteBevindingen={belangrijksteBevindingen} praktischeAdviezen={praktischeAdviezen} emojiSize={emojiSize} />
            </div>
          ) : (
            <> {/* Bewerkingsmodus */}
              {activeSection === 'basisgegevens' && <BasicInfoForm formData={formData.basisgegevens} updateFormData={updateFormData} />}
              {activeSection === 'voorinformatie' && <VoorinformatieForm formData={{ ...formData.voorinformatie, klachten: klachten }} updateFormData={updateFormData} addKlacht={addKlacht} removeKlacht={removeKlacht} updateKlacht={updateKlacht} />}
              {activeSection === 'beinvloedendeFactoren' && <BeinvloedendeFactorenForm formData={formData.beinvloedendeFactoren} updateFormData={updateFormData} />}
              {activeSection === 'intelligentie' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center"><span className="text-3xl mr-3">🧠</span>Intelligentie</h2>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
                    <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
                    <div className="text-sm text-blue-700">
                      <p className="mb-2"><strong>IQ Scores uitleg (Range: 50-150):</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>136-150: Zeer hoog</li><li>121-135: Hoog</li><li>106-120: Boven gemiddeld</li>
                        <li>95-105: Gemiddeld</li><li>80-94: Beneden gemiddeld</li><li>65-79: Laag</li><li>50-64: Zeer laag</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {intelligentieCategorieen.map(categorie => (
                      <IntelligentieSubtest key={categorie.key} categorie={categorie} data={formData.intelligentie[categorie.key]} />
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-bold mb-4 text-purple-800">📊 Overzicht alle IQ scores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {intelligentieCategorieen.map(categorie => {
                        const data = formData.intelligentie[categorie.key];
                        if (categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') {
                          return (
                            <div key={categorie.key} className="bg-orange-100 p-3 rounded-lg border border-orange-300">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-orange-700">{categorie.emoji} {categorie.label}</span>
                                <span className="text-sm text-orange-600 font-medium">Verborgen</span>
                              </div>
                              <div className="text-xs text-orange-600 mb-2">Disharmonisch profiel</div>
                              <p className="text-xs text-orange-700">Deze score wordt niet getoond vanwege te grote verschillen tussen subtests</p>
                            </div>
                          );
                        }
                        return (
                          <div key={categorie.key} className="bg-white p-3 rounded-lg border">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{categorie.emoji} {categorie.label}</span>
                              <span className="text-lg font-bold text-purple-600">{data.iqScore}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">{getIQNiveau(data.iqScore)}</div>
                            <div className="text-xs text-gray-400">95% BI: {data.betrouwbaarheidsLinks}-{data.betrouwbaarheidsRechts}</div>
                            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getIQKleur(data.iqScore)} transition-all`}
                                style={{ width: `${Math.max(5, Math.min(100, ((data.iqScore - 50) / 100) * 100))}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {activeSection === 'conclusie' && <ConclusieForm formData={{ ...formData.conclusie, belangrijksteBevindingen: belangrijksteBevindingen }} updateFormData={updateFormData} addBevinding={addBevinding} removeBevinding={removeBevinding} updateBevinding={updateBevinding} />}
              {activeSection === 'behandeling' && <BehandelingForm formData={{ ...formData.behandeling, praktischeAdviezen: praktischeAdviezen }} updateFormData={updateFormData} addAdvies={addAdvies} removeAdvies={removeAdvies} updateAdvies={updateAdvies} />}
            </>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md flex items-center disabled:opacity-50"
              onClick={prevSection} disabled={activeSection === sections[0].id}
            >
              <ChevronLeft className="mr-2" size={18} /> Vorige
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center disabled:opacity-50"
              onClick={nextSection} disabled={activeSection === sections[sections.length - 1].id}
            >
              Volgende <ChevronRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehandelaarInvoerDashboard;
