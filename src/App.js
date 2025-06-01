import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Eye, Edit, HelpCircle } from 'lucide-react'; // Verwijder ongebruikte imports
import EmojiSizeControl from './components/EmojiSizeControl';
import SectionNavigation from './components/SectionNavigation';
import DashboardHeader from './components/DashboardHeader';
import BasicInfoForm from './components/BasicInfoForm';
import VoorinformatieForm from './components/VoorinformatieForm';
import BeinvloedendeFactorenForm from './components/BeinvloedendeFactorenForm';
import ConclusieForm from './components/ConclusieForm';
import BehandelingForm from './components/BehandelingForm';
import { getIQNiveau, getIQKleur, getIQPositie } from './utils/iqCalculations'; // Importeer IQ functies
import { getEmojiSizeClass } from './utils/emojiUtils'; // Importeer emoji grootte functie
import emojiOptions from './config/emojiOptions'; // Importeer emoji opties
import beschrijvingOpties from './config/beschrijvingOpties'; // Importeer beschrijving opties


// Behandelaar invoerscherm voor Neuropsychologisch Dashboard
const BehandelaarInvoer = () => {
  // State voor actieve sectie en formuliergegevens
  const [activeSection, setActiveSection] = useState('basisgegevens');
  const [previewMode, setPreviewMode] = useState(false);
  const [emojiSize, setEmojiSize] = useState(2); // 1=klein, 2=medium, 3=groot, 4=extra groot

  // Voorbeeld formuliergegevens - zou in praktijk state management gebruiken (Redux, Context)
  const [formData, setFormData] = useState({
    basisgegevens: {
      naam: 'J. Jansen',
      geboortedatum: '1985-05-15',
      onderzoeksdatum: '2025-05-10',
      onderzoeker: 'Dr. A. de Vries',
      afdeling: 'Forensische Psychiatrie'
    },
    voorinformatie: {
      opleidingsniveau: 'Havo, vwo, mbo',
      letsel: 'Lichte hersenschudding na val in 2020',
      middelengebruik: 'Dagelijks alcohol gebruik (4-6 glazen), cannabis recreatief in weekend'
    },
    beinvloedendeFactoren: {
      medicatie: 'Sertraline 50mg dagelijks, Melatonine 3mg voor slapen',
      sclUitkomsten: 'Verhoogde scores op depressie en angst schalen (respectievelijk 68 en 72)',
      motorischeSnelheid: 'Lichte tremor in beide handen, mogelijk gerelateerd aan medicatie'
    },
    conclusie: {
      belangrijksteBevindingen: [
        { tekst: 'Verminderde werkgeheugencapaciteit beïnvloedt dagelijks functioneren', emoji: '🧩' },
        { tekst: 'Goede verbale vaardigheden kunnen compenseren voor andere tekorten', emoji: '💬' },
        { tekst: 'Middelengebruik heeft waarschijnlijk negatieve impact op cognitieve functies', emoji: '🍺' }
      ],
      dsmClassificatie: 'F06.7 Lichte neurocognitieve stoornis ten gevolge van multipele etiologieën'
    },
    intelligentie: {
      verbaalBegrip: {
        iqScore: 85,
        betrouwbaarheidsLinks: 75,
        betrouwbaarheidsRechts: 95,
        emoji: '💬',
        beschrijving: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken'
      },
      perceptueelRedeneren: {
        iqScore: 102,
        betrouwbaarheidsLinks: 92,
        betrouwbaarheidsRechts: 112,
        emoji: '👁️',
        beschrijving: 'Visueel-analytisch oplossingsvermogen, planning, overzicht'
      },
      werkgeheugen: {
        iqScore: 78,
        betrouwbaarheidsLinks: 68,
        betrouwbaarheidsRechts: 88,
        emoji: '🧩',
        beschrijving: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen'
      },
      verwerkingssnelheid: {
        iqScore: 89,
        betrouwbaarheidsLinks: 79,
        betrouwbaarheidsRechts: 99,
        emoji: '⚡',
        beschrijving: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden'
      },
      totaalIQ: {
        iqScore: 88,
        betrouwbaarheidsLinks: 82,
        betrouwbaarheidsRechts: 94,
        emoji: '🧠',
        beschrijving: 'Je totale IQ score',
        disharmonisch: 'Ja'
      }
    }
  });

  // State voor dynamische lijsten (klachten, bevindingen, adviezen)
  const [klachten, setKlachten] = useState([
    { tekst: 'Woordvindproblemen', emoji: '🔤' },
    { tekst: 'Geheugenproblemen', emoji: '🧠' },
    { tekst: 'Verhoogd alcoholgebruik', emoji: '🍺' },
    { tekst: 'Agressie', emoji: '😠' },
    { tekst: 'Problemen met Politie & Justitie', emoji: '👮' }
  ]);

  const [belangrijksteBevindingen, setBelangrijksteBevindingen] = useState([
    { tekst: 'Verminderde werkgeheugencapaciteit beïnvloedt dagelijks functioneren', emoji: '🧩' },
    { tekst: 'Goede verbale vaardigheden kunnen compenseren voor andere tekorten', emoji: '💬' },
    { tekst: 'Middelengebruik heeft waarschijnlijk negatieve impact op cognitieve functies', emoji: '🍺' }
  ]);

  const [praktischeAdviezen, setPraktischeAdviezen] = useState([
    { tekst: 'Gebruik externe geheugensteun zoals agenda\'s en notities voor dagelijkse taken', emoji: '📝' },
    { tekst: 'Verminder alcohol consumptie tot maximaal 1-2 glazen per week', emoji: '🍺' },
    { tekst: 'Structureer complexe taken in kleinere, overzichtelijke stappen', emoji: '🔄' }
  ]);


  // Handler voor formulier updates (voor vaste velden)
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handler voor score updates (Intelligentie sectie)
  const updateScore = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      intelligentie: {
        ...prev.intelligentie,
        [category]: {
          ...prev.intelligentie[category],
          [field]: value
        }
      }
    }));
  };

  // Handlers voor Klachten lijst
  const addKlacht = () => {
    setKlachten(prev => [...prev, { tekst: '', emoji: '⚠️' }]);
  };

  const removeKlacht = (index) => {
    setKlachten(prev => prev.filter((_, i) => i !== index));
  };

  const updateKlacht = (index, field, value) => {
    setKlachten(prev => prev.map((klacht, i) =>
      i === index ? { ...klacht, [field]: value } : klacht
    ));
  };

  // Handlers voor Belangrijkste Bevindingen lijst
  const addBevinding = () => {
    setBelangrijksteBevindingen(prev => [...prev, { tekst: '', emoji: '🔍' }]);
  };

  const removeBevinding = (index) => {
    setBelangrijksteBevindingen(prev => prev.filter((_, i) => i !== index));
  };

  const updateBevinding = (index, field, value) => {
    setBelangrijksteBevindingen(prev => prev.map((bevinding, i) =>
      i === index ? { ...bevinding, [field]: value } : bevinding
    ));
  };

  // Handlers voor Praktische Adviezen lijst
  const addAdvies = () => {
    setPraktischeAdviezen(prev => [...prev, { tekst: '', emoji: '💡' }]);
  };

  const removeAdvies = (index) => {
    setPraktischeAdviezen(prev => prev.filter((_, i) => i !== index));
  };

  const updateAdvies = (index, field, value) => {
    setPraktischeAdviezen(prev => prev.map((advies, i) =>
      i === index ? { ...advies, [field]: value } : advies
    ));
  };


  // Intelligentie categorieën voor formulier rendering
  const intelligentieCategorieen = [
    {
      key: 'verbaalBegrip',
      label: 'Verbaal Begrip',
      emoji: '💬',
      beschrijvingDefault: 'Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken'
    },
    {
      key: 'perceptueelRedeneren',
      label: 'Perceptueel Redeneren',
      emoji: '👁️',
      beschrijvingDefault: 'Visueel-analytisch oplossingsvermogen, planning, overzicht'
    },
    {
      key: 'werkgeheugen',
      label: 'Werkgeheugen',
      emoji: '🧩',
      beschrijvingDefault: 'Informatie tijdelijk vasthouden, \'iets\' doen en tot een resultaat komen'
    },
    {
      key: 'verwerkingssnelheid',
      label: 'Verwerkingssnelheid',
      emoji: '⚡',
      beschrijvingDefault: 'Snel en correct eenvoudige visuele informatie scannen, onderscheiden'
    },
    {
      key: 'totaalIQ',
      label: 'Totaal IQ',
      emoji: '🧠',
      beschrijvingDefault: 'Je totale IQ score'
    }
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IQ Score
          </label>
          <input
            type="number"
            min="50"
            max="150"
            className="w-full p-2 border rounded-md"
            value={data.iqScore}
            onChange={(e) => updateScore(categorie.key, 'iqScore', parseInt(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Betrouwbaarheidsinterval - Links
          </label>
          <input
            type="number"
            min="50"
            max="150"
            className="w-full p-2 border rounded-md"
            value={data.betrouwbaarheidsLinks}
            onChange={(e) => updateScore(categorie.key, 'betrouwbaarheidsLinks', parseInt(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Betrouwbaarheidsinterval - Rechts
          </label>
          <input
            type="number"
            min="50"
            max="150"
            className="w-full p-2 border rounded-md"
            value={data.betrouwbaarheidsRechts}
            onChange={(e) => updateScore(categorie.key, 'betrouwbaarheidsRechts', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Extra vraag voor Totaal IQ: Disharmonisch? */}
      {categorie.key === 'totaalIQ' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ⚖️ Disharmonisch?
          </label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Beschrijving (eenvoudige taal)
        </label>
        <select
          className="w-full p-2 border rounded-md mb-2"
          value=""
          onChange={(e) => {
            if (e.target.value) {
              updateScore(categorie.key, 'beschrijving', e.target.value);
            }
          }}
        >
          <option value="">-- Kies een standaard beschrijving --</option>
          {beschrijvingOpties[categorie.key]?.map((optie, idx) => (
            <option key={idx} value={optie}>{optie}</option>
          ))}
        </select>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="2"
          placeholder="Of voer een aangepaste beschrijving in"
          value={data.beschrijving}
          onChange={(e) => updateScore(categorie.key, 'beschrijving', e.target.value)}
        ></textarea>
      </div>

      {/* Preview van de IQ score - alleen tonen als niet disharmonisch bij totaal IQ */}
      {!(categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') && (
        <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
          <h4 className="font-medium mb-2 text-blue-800">Preview van score-weergave</h4>

          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium">
                {categorie.emoji} {categorie.label}
              </span>
              <span className="text-sm">
                IQ: {data.iqScore} ({getIQNiveau(data.iqScore)})
              </span>
            </div>

            {/* IQ schaal visualisatie (50-150 range, 7 segmenten) */}
            <div className="relative h-12 w-full rounded overflow-hidden mb-1">
              {/* Kleurenschaal achtergrond voor 7 IQ segmenten */}
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-red-500"></div>
                <div className="flex-1 bg-red-400"></div>
                <div className="flex-1 bg-orange-400"></div>
                <div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-green-300"></div>
                <div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-green-600"></div>
              </div>

              {/* Labels onder de schaal */}
              <div className="absolute inset-0 flex text-xs text-white font-bold">
                <div className="flex-1 flex justify-center items-end pb-1">50-64</div>
                <div className="flex-1 flex justify-center items-end pb-1">65-79</div>
                <div className="flex-1 flex justify-center items-end pb-1">80-94</div>
                <div className="flex-1 flex justify-center items-end pb-1">95-105</div>
                <div className="flex-1 flex justify-center items-end pb-1">106-120</div>
                <div className="flex-1 flex justify-center items-end pb-1">121-135</div>
                <div className="flex-1 flex justify-center items-end pb-1">136-150</div>
              </div>

              {/* Betrouwbaarheidsinterval */}
              <div
                className="absolute top-2 h-3 bg-white opacity-40 rounded"
                style={{
                  left: `${getIQPositie(data.betrouwbaarheidsLinks)}%`,
                  width: `${getIQPositie(data.betrouwbaarheidsRechts) - getIQPositie(data.betrouwbaarheidsLinks)}%`
                }}>
              </div>

              {/* IQ score indicator (driehoek wijzer) */}
              <div
                className="absolute"
                style={{
                  left: `calc(${getIQPositie(data.iqScore)}% - 8px)`,
                  top: '0'
                }}>
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

      {/* Melding wanneer totaal IQ wordt verborgen */}
      {categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee' && (
        <div className="border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
          <h4 className="font-medium mb-2 text-orange-800">⚠️ Totaal IQ score verborgen</h4>
          <p className="text-sm text-orange-700">
            Deze totaal IQ score wordt <strong>niet getoond</strong> in de visuele weergave omdat het profiel als disharmonisch is beoordeeld.
            Alleen de individuele subtestscores worden weergegeven.
          </p>
        </div>
      )}
    </div>
  );

  // Navigatie tussen secties
  const sections = [
    { id: 'basisgegevens', label: '👤 Basisgegevens' },
    { id: 'voorinformatie', label: '📝 Voorinformatie' },
    { id: 'beinvloedendeFactoren', label: '⚖️ Beïnvloedende factoren' },
    { id: 'intelligentie', label: '🧠 Intelligentie' },
    { id: 'executief', label: '⚙️ Executief Functioneren' },
    { id: 'conclusie', label: '🎯 Conclusie' },
    { id: 'behandeling', label: '🤝 Behandeling' }
  ];

  const nextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const prevSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header met titel en knoppen */}
      <DashboardHeader
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        emojiSize={emojiSize}
        setEmojiSize={setEmojiSize}
      />

      <div className="container mx-auto p-4">
        {/* Navigatie tussen secties */}
        <SectionNavigation
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Hoofdinhoud - formulier of preview */}
        <div className="bg-white rounded-lg shadow p-6">
          {previewMode ? (
            <div className="border-2 border-green-500 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-green-700">Preview Modus</h2>
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm flex items-center"
                  onClick={() => setPreviewMode(false)}
                >
                  <Edit className="mr-1" size={14} />
                  Terug naar bewerken
                </button>
              </div>

              {/* Preview van voorinformatie en beïnvloedende factoren */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">📝 Patiëntgegevens</h3>
                  <p><span className="font-semibold">Naam:</span> {formData.basisgegevens.naam}</p>
                  <p><span className="font-semibold">Geboortedatum:</span> {new Date(formData.basisgegevens.geboortedatum).toLocaleDateString('nl-NL')}</p>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>📋</span>Voorinformatie
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🎓</span><span className="font-semibold">Opleidingsniveau:</span> {formData.voorinformatie.opleidingsniveau || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🤕</span><span className="font-semibold">Letsel:</span> {formData.voorinformatie.letsel || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>🍺</span><span className="font-semibold">Middelengebruik:</span> {formData.voorinformatie.middelengebruik || 'Niet ingevuld'}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>⚠️</span>Klachten
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {klachten.map((klacht, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{klacht.emoji}</span>
                        {klacht.tekst}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>⚖️</span>Beïnvloedende factoren
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>💊</span><span className="font-semibold">Medicatie:</span> {formData.beinvloedendeFactoren.medicatie || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>📊</span><span className="font-semibold">SCL uitkomsten:</span> {formData.beinvloedendeFactoren.sclUitkomsten || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass(emojiSize, 'subheader')} mr-2`}>✋</span><span className="font-semibold">Motorische snelheid:</span> {formData.beinvloedendeFactoren.motorischeSnelheid || 'Niet ingevuld'}</p>
                  </div>
                </div>

                <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>🧠</span>Intelligentie Test Resultaten
                  </h3>

                  {intelligentieCategorieen.map(categorie => {
                    const data = formData.intelligentie[categorie.key];

                    // Verberg totaal IQ in preview als disharmonisch = 'Nee'
                    if (categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') {
                      return null; // Toon deze niet in de preview
                    }

                    return (
                      <div key={categorie.key} className="mb-4 p-3 bg-white rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium flex items-center">
                            <span className={`${getEmojiSizeClass(emojiSize, 'header')} mr-3`}>{categorie.emoji}</span>
                            {categorie.label}
                          </span>
                          <span className="text-sm">
                            IQ: {data.iqScore} ({getIQNiveau(data.iqScore)})
                          </span>
                        </div>

                        {/* Mini versie van de IQ score visualisatie */}
                        <div className="relative h-8 w-full rounded overflow-hidden mb-2">
                          <div className="absolute inset-0 flex">
                            <div className="flex-1 bg-red-500"></div>
                            <div className="flex-1 bg-red-400"></div>
                            <div className="flex-1 bg-orange-400"></div>
                            <div className="flex-1 bg-yellow-400"></div>
                            <div className="flex-1 bg-green-300"></div>
                            <div className="flex-1 bg-green-500"></div>
                            <div className="flex-1 bg-green-600"></div>
                          </div>

                          <div
                            className="absolute top-1 h-2 bg-white opacity-40 rounded"
                            style={{
                              left: `${getIQPositie(data.betrouwbaarheidsLinks)}%`,
                              width: `${getIQPositie(data.betrouwbaarheidsRechts) - getIQPositie(data.betrouwbaarheidsLinks)}%`
                            }}>
                          </div>

                          <div
                            className="absolute"
                            style={{
                              left: `calc(${getIQPositie(data.iqScore)}% - 6px)`,
                              top: '0'
                            }}>
                            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black"></div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 mb-1">
                          95% BI: {data.betrouwbaarheidsLinks}-{data.betrouwbaarheidsRechts}
                        </div>

                        <p className="text-sm text-gray-600">{data.beschrijving}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>🎯</span>Conclusie
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>🔍</span>Belangrijkste bevindingen:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {belangrijksteBevindingen.map((bevinding, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{bevinding.emoji}</span>
                            {bevinding.tekst}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1 flex items-center">
                        <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>📋</span>DSM Classificatie:
                      </h4>
                      <p className="text-sm bg-white p-2 rounded border">
                        {formData.conclusie.dsmClassificatie || 'Niet ingevuld'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'header')}`}>🤝</span>Behandeling
                  </h3>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <span className={`mr-2 ${getEmojiSizeClass(emojiSize, 'subheader')}`}>💡</span>Praktische adviezen:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {praktischeAdviezen.map((advies, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className={`mr-3 ${getEmojiSizeClass(emojiSize, 'normal')}`}>{advies.emoji}</span>
                          {advies.tekst}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Formulier sectie */}
              {activeSection === 'basisgegevens' && (
                <BasicInfoForm
                  formData={formData.basisgegevens}
                  updateFormData={updateFormData}
                />
              )}

              {activeSection === 'voorinformatie' && (
                <VoorinformatieForm
                  formData={{ ...formData.voorinformatie, klachten: klachten }}
                  updateFormData={updateFormData}
                  addKlacht={addKlacht}
                  removeKlacht={removeKlacht}
                  updateKlacht={updateKlacht}
                  emojiOptions={emojiOptions}
                />
              )}

              {activeSection === 'beinvloedendeFactoren' && (
                <BeinvloedendeFactorenForm
                  formData={formData.beinvloedendeFactoren}
                  updateFormData={updateFormData}
                />
              )}

              {activeSection === 'intelligentie' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="text-3xl mr-3">🧠</span>
                      Intelligentie
                    </h2>
                    <div className="text-sm text-gray-500">Stap 4 van 7</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
                    <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
                    <div className="text-sm text-blue-700">
                      <p className="mb-2"><strong>IQ Scores uitleg (Range: 50-150):</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>136-150: Zeer hoog</li>
                        <li>121-135: Hoog</li>
                        <li>106-120: Boven gemiddeld</li>
                        <li>95-105: Gemiddeld</li>
                        <li>80-94: Beneden gemiddeld</li>
                        <li>65-79: Laag</li>
                        <li>50-64: Zeer laag</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {intelligentieCategorieen.map(categorie => (
                      <IntelligentieSubtest
                        key={categorie.key}
                        categorie={categorie}
                        data={formData.intelligentie[categorie.key]}
                      />
                    ))}
                  </div>

                  {/* Overzicht van alle IQ scores */}
                  <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-bold mb-4 text-purple-800">📊 Overzicht alle IQ scores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {intelligentieCategorieen.map(categorie => {
                        const data = formData.intelligentie[categorie.key];

                        // Verberg totaal IQ als disharmonisch = 'Nee'
                        if (categorie.key === 'totaalIQ' && data.disharmonisch === 'Nee') {
                          return (
                            <div key={categorie.key} className="bg-orange-100 p-3 rounded-lg border border-orange-300">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-orange-700">
                                  {categorie.emoji} {categorie.label}
                                </span>
                                <span className="text-sm text-orange-600 font-medium">
                                  Verborgen
                                </span>
                              </div>
                              <div className="text-xs text-orange-600 mb-2">
                                Disharmonisch profiel
                              </div>
                              <p className="text-xs text-orange-700">
                                Deze score wordt niet getoond vanwege te grote verschillen tussen subtests
                              </p>
                            </div>
                          );
                        }

                        // Normale weergave voor andere scores en harmonisch totaal IQ
                        return (
                          <div key={categorie.key} className="bg-white p-3 rounded-lg border">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">
                                {categorie.emoji} {categorie.label}
                              </span>
                              <span className="text-lg font-bold text-purple-600">
                                {data.iqScore}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {getIQNiveau(data.iqScore)}
                            </div>
                            <div className="text-xs text-gray-400">
                              95% BI: {data.betrouwbaarheidsLinks}-{data.betrouwbaarheidsRechts}
                            </div>

                            {/* Mini IQ score bar */}
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

              {activeSection === 'executief' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="text-3xl mr-3">⚙️</span>
                      Executief Functioneren
                    </h2>
                    <div className="text-sm text-gray-500">Stap 5 van 7</div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-md text-center">
                    <p className="text-yellow-700">Deze sectie wordt binnenkort toegevoegd</p>
                  </div>
                </div>
              )}

              {activeSection === 'conclusie' && (
                <ConclusieForm
                  formData={{ ...formData.conclusie, belangrijksteBevindingen: belangrijksteBevindingen }}
                  updateFormData={updateFormData}
                  addBevinding={addBevinding}
                  removeBevinding={removeBevinding}
                  updateBevinding={updateBevinding}
                  emojiOptions={emojiOptions}
                />
              )}

              {activeSection === 'behandeling' && (
                <BehandelingForm
                  formData={{ ...formData.behandeling, praktischeAdviezen: praktischeAdviezen }}
                  updateFormData={updateFormData}
                  addAdvies={addAdvies}
                  removeAdvies={removeAdvies}
                  updateAdvies={updateAdvies}
                  emojiOptions={emojiOptions}
                />
              )}
            </>
          )}

          {/* Navigatieknoppen */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md flex items-center disabled:opacity-50"
              onClick={prevSection}
              disabled={activeSection === sections[0].id}
            >
              <ChevronLeft className="mr-2" size={18} />
              Vorige
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center disabled:opacity-50"
              onClick={nextSection}
              disabled={activeSection === sections[sections.length - 1].id}
            >
              Volgende
              <ChevronRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehandelaarInvoer;
