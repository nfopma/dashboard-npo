import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Eye, Edit, HelpCircle, Plus, Trash2 } from 'lucide-react';
import EmojiSizeControl from './components/EmojiSizeControl';
import SectionNavigation from './components/SectionNavigation';
import DashboardHeader from './components/DashboardHeader'; // Importeer het nieuwe component
import BasicInfoForm from './components/BasicInfoForm'; // Importeer het nieuwe component
import VoorinformatieForm from './components/VoorinformatieForm'; // Importeer het nieuwe component

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
    },
    behandeling: {
      praktischeAdviezen: [
        { tekst: 'Gebruik externe geheugensteun zoals agenda\'s en notities voor dagelijkse taken', emoji: '📝' },
        { tekst: 'Verminder alcohol consumptie tot maximaal 1-2 glazen per week', emoji: '🍺' },
        { tekst: 'Structureer complexe taken in kleinere, overzichtelijke stappen', emoji: '🔄' }
      ]
    },
    klachten: [
      { tekst: 'Woordvindproblemen', emoji: '🔤' },
      { tekst: 'Geheugenproblemen', emoji: '🧠' },
      { tekst: 'Verhoogd alcoholgebruik', emoji: '🍺' },
      { tekst: 'Agressie', emoji: '😠' },
      { tekst: 'Problemen met Politie & Justitie', emoji: '👮' }
    ]
  });

  // Handler voor formulier updates
  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handler voor score updates
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

  // Handler voor praktische adviezen toevoegen/verwijderen
  const addAdvies = () => {
    setFormData(prev => ({
      ...prev,
      behandeling: {
        ...prev.behandeling,
        praktischeAdviezen: [...prev.behandeling.praktischeAdviezen, { tekst: '', emoji: '💡' }]
      }
    }));
  };

  const removeAdvies = (index) => {
    setFormData(prev => ({
      ...prev,
      behandeling: {
        ...prev.behandeling,
        praktischeAdviezen: prev.behandeling.praktischeAdviezen.filter((_, i) => i !== index)
      }
    }));
  };

  const updateAdvies = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      behandeling: {
        ...prev.behandeling,
        praktischeAdviezen: prev.behandeling.praktischeAdviezen.map((advies, i) =>
          i === index ? { ...advies, [field]: value } : advies
        )
      }
    }));
  };

  // Handler voor belangrijkste bevindingen toevoegen/verwijderen
  const addBevinding = () => {
    setFormData(prev => ({
      ...prev,
      conclusie: {
        ...prev.conclusie,
        belangrijksteBevindingen: [...prev.conclusie.belangrijksteBevindingen, { tekst: '', emoji: '🔍' }]
      }
    }));
  };

  const removeBevinding = (index) => {
    setFormData(prev => ({
      ...prev,
      conclusie: {
        ...prev.conclusie,
        belangrijksteBevindingen: prev.conclusie.belangrijksteBevindingen.filter((_, i) => i !== index)
      }
    }));
  };

  const updateBevinding = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      conclusie: {
        ...prev.conclusie,
        belangrijksteBevindingen: prev.conclusie.belangrijksteBevindingen.map((bevinding, i) =>
          i === index ? { ...bevinding, [field]: value } : bevinding
        )
      }
    }));
  };

  // Handler voor klachten toevoegen/verwijderen
  const addKlacht = () => {
    setFormData(prev => ({
      ...prev,
      klachten: [...prev.klachten, { tekst: '', emoji: '⚠️' }]
    }));
  };

  const removeKlacht = (index) => {
    setFormData(prev => ({
      ...prev,
      klachten: prev.klachten.filter((_, i) => i !== index)
    }));
  };

  const updateKlacht = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      klachten: prev.klachten.map((klacht, i) =>
        i === index ? { ...klacht, [field]: value } : klacht
      )
    }));
  };

  // Voorgedefinieerde emoji opties voor verschillende categorieën
  const emojiOptions = {
    klachten: [
      { emoji: '🔤', label: 'Taal/spraak' },
      { emoji: '🧠', label: 'Geheugen' },
      { emoji: '🍺', label: 'Middelen' },
      { emoji: '😠', label: 'Emoties/agressie' },
      { emoji: '👮', label: 'Juridisch' },
      { emoji: '😴', label: 'Slaap' },
      { emoji: '🏃', label: 'Motoriek' },
      { emoji: '🤔', label: 'Concentratie' },
      { emoji: '⚠️', label: 'Algemeen' }
    ],
    bevindingen: [
      { emoji: '🧩', label: 'Werkgeheugen' },
      { emoji: '💬', label: 'Verbale vaardigheden' },
      { emoji: '👁️', label: 'Visueel-ruimtelijk' },
      { emoji: '⚡', label: 'Verwerkingssnelheid' },
      { emoji: '🎯', label: 'Aandacht/concentratie' },
      { emoji: '⚙️', label: 'Executief functioneren' },
      { emoji: '🍺', label: 'Middelengebruik' },
      { emoji: '💊', label: 'Medicatie-effecten' },
      { emoji: '🔍', label: 'Algemene bevinding' },
      { emoji: '📈', label: 'Sterke punt' },
      { emoji: '📉', label: 'Zwak punt' }
    ],
    adviezen: [
      { emoji: '📝', label: 'Geheugensteun' },
      { emoji: '🔄', label: 'Structuur/organisatie' },
      { emoji: '🧠', label: 'Cognitieve training' },
      { emoji: '💊', label: 'Medicatie aanpassing' },
      { emoji: '🍺', label: 'Middelengebruik' },
      { emoji: '😴', label: 'Slaaphygiëne' },
      { emoji: '🏃', label: 'Lichaamsbeweging' },
      { emoji: '🧘', label: 'Ontspanning/mindfulness' },
      { emoji: '👥', label: 'Sociale ondersteuning' },
      { emoji: '🏥', label: 'Medische follow-up' },
      { emoji: '🎯', label: 'Doelgerichte interventie' },
      { emoji: '💡', label: 'Algemeen advies' }
    ],
    intelligentie: [
      { emoji: '💬', label: 'Verbaal' },
      { emoji: '👁️', label: 'Visueel' },
      { emoji: '🧩', label: 'Werkgeheugen' },
      { emoji: '⚡', label: 'Snelheid' },
      { emoji: '🧠', label: 'Totaal IQ' },
      { emoji: '🧮', label: 'Rekenen' }
    ]
  };

  // Voorgeselecteerde beschrijvingen voor intelligentie subtests
  const beschrijvingOpties = {
    verbaalBegrip: [
      "Talige kennis, redeneervermogen, woordenschat, jezelf uitdrukken",
      "Vermogen om taal te begrijpen en je in woorden uit te drukken",
      "Kennis van woorden en talige redeneervaardigheden"
    ],
    perceptueelRedeneren: [
      "Visueel-analytisch oplossingsvermogen, planning, overzicht",
      "Vermogen om visuele patronen te herkennen en problemen op te lossen",
      "Ruimtelijk inzicht en niet-talig redeneren"
    ],
    werkgeheugen: [
      "Informatie tijdelijk vasthouden, 'iets' doen en tot een resultaat komen",
      "Vermogen om informatie in je hoofd te houden en ermee te werken",
      "Concentratie en het onthouden van informatie tijdens taken"
    ],
    verwerkingssnelheid: [
      "Snel en correct eenvoudige visuele informatie scannen, onderscheiden",
      "Hoe snel je simpele taken kunt uitvoeren",
      "Snelheid van denken en reageren op eenvoudige opdrachten"
    ],
    totaalIQ: [
      "Je totale IQ score",
      "Overall maat voor je cognitieve vaardigheden",
      "Combinatie van alle intelligentie-onderdelen"
    ]
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

  // Functie om IQ niveau te bepalen
  const getIQNiveau = (iqScore) => {
    if (iqScore >= 136) return 'Zeer hoog';
    if (iqScore >= 121) return 'Hoog';
    if (iqScore >= 106) return 'Boven gemiddeld';
    if (iqScore >= 95) return 'Gemiddeld';
    if (iqScore >= 80) return 'Beneden gemiddeld';
    if (iqScore >= 65) return 'Laag';
    return 'Zeer laag';
  };

  // Functie om IQ kleur te bepalen
  const getIQKleur = (iqScore) => {
    if (iqScore >= 136) return 'bg-green-600';
    if (iqScore >= 121) return 'bg-green-500';
    if (iqScore >= 106) return 'bg-green-300';
    if (iqScore >= 95) return 'bg-yellow-400';
    if (iqScore >= 80) return 'bg-orange-400';
    if (iqScore >= 65) return 'bg-red-400';
    return 'bg-red-500';
  };

  // Functie om emoji grootte klasse te bepalen
  const getEmojiSizeClass = (type = 'normal') => {
    const sizes = {
      1: { normal: 'text-sm', header: 'text-lg', subheader: 'text-base' },
      2: { normal: 'text-xl', header: 'text-2xl', subheader: 'text-xl' },
      3: { normal: 'text-2xl', header: 'text-3xl', subheader: 'text-2xl' },
      4: { normal: 'text-3xl', header: 'text-4xl', subheader: 'text-3xl' },
      5: { normal: 'text-4xl', header: 'text-5xl', subheader: 'text-4xl' }
    };
    return sizes[emojiSize][type] || sizes[2][type];
  };

  // Functie om IQ score te converteren naar percentiel positie (voor visualisatie)
  const getIQPositie = (iqScore) => {
    // IQ schaal: 50-150 verdeeld over 7 gelijke segmenten
    // Elk segment = (150-50)/7 = ~14.3 punten = 14.29% van de schaal
    const segmentBreedte = 100 / 7; // 14.29%

    if (iqScore <= 50) return 0;
    if (iqScore <= 64) return ((iqScore - 50) / 14) * segmentBreedte;
    if (iqScore <= 79) return segmentBreedte + ((iqScore - 65) / 14) * segmentBreedte;
    if (iqScore <= 94) return 2 * segmentBreedte + ((iqScore - 80) / 14) * segmentBreedte;
    if (iqScore <= 105) return 3 * segmentBreedte + ((iqScore - 95) / 10) * segmentBreedte;
    if (iqScore <= 120) return 4 * segmentBreedte + ((iqScore - 106) / 14) * segmentBreedte;
    if (iqScore <= 135) return 5 * segmentBreedte + ((iqScore - 121) / 14) * segmentBreedte;
    if (iqScore <= 150) return 6 * segmentBreedte + ((iqScore - 136) / 14) * segmentBreedte;
    return 100;
  };

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
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>📋</span>Voorinformatie
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>🎓</span><span className="font-semibold">Opleidingsniveau:</span> {formData.voorinformatie.opleidingsniveau || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>🤕</span><span className="font-semibold">Letsel:</span> {formData.voorinformatie.letsel || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>🍺</span><span className="font-semibold">Middelengebruik:</span> {formData.voorinformatie.middelengebruik || 'Niet ingevuld'}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>⚠️</span>Klachten
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {formData.klachten.map((klacht, index) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-3 ${getEmojiSizeClass('normal')}`}>{klacht.emoji}</span>
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
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>💊</span><span className="font-semibold">Medicatie:</span> {formData.beinvloedendeFactoren.medicatie || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>📊</span><span className="font-semibold">SCL uitkomsten:</span> {formData.beinvloedendeFactoren.sclUitkomsten || 'Niet ingevuld'}</p>
                    <p><span className={`font-semibold ${getEmojiSizeClass('subheader')} mr-2`}>✋</span><span className="font-semibold">Motorische snelheid:</span> {formData.beinvloedendeFactoren.motorischeSnelheid || 'Niet ingevuld'}</p>
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
                            <span className={`${getEmojiSizeClass('header')} mr-3`}>{categorie.emoji}</span>
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
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>🎯</span>Conclusie
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <span className={`mr-2 ${getEmojiSizeClass('subheader')}`}>🔍</span>Belangrijkste bevindingen:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {formData.conclusie.belangrijksteBevindingen.map((bevinding, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <span className={`mr-3 ${getEmojiSizeClass('normal')}`}>{bevinding.emoji}</span>
                            {bevinding.tekst}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1 flex items-center">
                        <span className={`mr-2 ${getEmojiSizeClass('subheader')}`}>📋</span>DSM Classificatie:
                      </h4>
                      <p className="text-sm bg-white p-2 rounded border">
                        {formData.conclusie.dsmClassificatie || 'Niet ingevuld'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className={`mr-2 ${getEmojiSizeClass('header')}`}>🤝</span>Behandeling
                  </h3>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <span className={`mr-2 ${getEmojiSizeClass('subheader')}`}>💡</span>Praktische adviezen:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {formData.behandeling.praktischeAdviezen.map((advies, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className={`mr-3 ${getEmojiSizeClass('normal')}`}>{advies.emoji}</span>
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
                  formData={{ ...formData.voorinformatie, klachten: formData.klachten }}
                  updateFormData={updateFormData}
                  addKlacht={addKlacht}
                  removeKlacht={removeKlacht}
                  updateKlacht={updateKlacht}
                  emojiOptions={emojiOptions}
                />
              )}

              {activeSection === 'beinvloedendeFactoren' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="text-3xl mr-3">⚖️</span>
                      Beïnvloedende factoren
                    </h2>
                    <div className="text-sm text-gray-500">Stap 3 van 7</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        💊 Medicatie
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Beschrijf huidige medicatie die mogelijk de testresultaten kan beïnvloeden"
                        value={formData.beinvloedendeFactoren.medicatie}
                        onChange={(e) => updateFormData('beinvloedendeFactoren', 'medicatie', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        📊 SCL uitkomsten
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Relevante uitkomsten van de SCL-90 of andere symptoom checklists"
                        value={formData.beinvloedendeFactoren.sclUitkomsten}
                        onChange={(e) => updateFormData('beinvloedendeFactoren', 'sclUitkomsten', e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ✋ Motorische snelheid
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Observaties over motorische vaardigheden die de testprestaties kunnen beïnvloeden"
                        value={formData.beinvloedendeFactoren.motorischeSnelheid}
                        onChange={(e) => updateFormData('beinvloedendeFactoren', 'motorischeSnelheid', e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-md mt-4 flex items-start">
                    <HelpCircle className="text-purple-500 mr-2 flex-shrink-0 mt-1" size={18} />
                    <p className="text-sm text-purple-700">
                      Deze factoren kunnen de interpretatie van testresultaten beïnvloeden. Vul in wat relevant is voor de testprestaties en interpretatie.
                    </p>
                  </div>
                </div>
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
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="text-3xl mr-3">🎯</span>
                      Conclusie
                    </h2>
                    <div className="text-sm text-gray-500">Stap 6 van 7</div>
                  </div>

                  {/* Belangrijkste bevindingen sectie */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">🔍 Belangrijkste bevindingen</h3>
                      <button
                        className="text-blue-600 flex items-center text-sm"
                        onClick={addBevinding}
                      >
                        <Plus size={16} className="mr-1" />
                        Bevinding toevoegen
                      </button>
                    </div>

                    {formData.conclusie.belangrijksteBevindingen.map((bevinding, index) => (
                      <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
                        <div className="flex-grow-0">
                          <select
                            className="p-2 border rounded-md"
                            value={bevinding.emoji}
                            onChange={(e) => updateBevinding(index, 'emoji', e.target.value)}
                          >
                            {emojiOptions.bevindingen.map(option => (
                              <option key={option.emoji} value={option.emoji}>
                                {option.emoji} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          type="text"
                          className="flex-grow p-2 border rounded-md"
                          placeholder="Beschrijf de belangrijkste bevinding"
                          value={bevinding.tekst}
                          onChange={(e) => updateBevinding(index, 'tekst', e.target.value)}
                        ></input>

                        <button
                          className="p-2 text-red-500"
                          onClick={() => removeBevinding(index)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}

                    <div className="bg-green-50 p-3 rounded-md mt-2 flex items-start">
                      <HelpCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                      <p className="text-sm text-green-700">
                        Formuleer de belangrijkste conclusies uit het neuropsychologisch onderzoek. Focus op klinisch relevante bevindingen die van belang zijn voor behandeling en begeleiding.
                      </p>
                    </div>
                  </div>

                  {/* DSM Classificatie sectie */}
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">📋 DSM Classificatie</h3>
                    <textarea
                      className="w-full p-3 border rounded-md"
                      rows="4"
                      placeholder="Voer de DSM-5-TR classificatie in, inclusief code en beschrijving (bijv. F06.7 Lichte neurocognitieve stoornis)"
                      value={formData.conclusie.dsmClassificatie}
                      onChange={(e) => updateFormData('conclusie', 'dsmClassificatie', e.target.value)}
                    ></textarea>

                    <div className="bg-blue-50 p-3 rounded-md mt-2 flex items-start">
                      <HelpCircle className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={18} />
                      <p className="text-sm text-blue-700">
                        Specificeer de DSM-5-TR classificatie op basis van de neuropsychologische bevindingen. Vermeld zowel de diagnostische code als de volledige beschrijving.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'behandeling' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="text-3xl mr-3">🤝</span>
                      Behandeling
                    </h2>
                    <div className="text-sm text-gray-500">Stap 7 van 7</div>
                  </div>

                  {/* Praktische adviezen sectie */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">💡 Praktische adviezen voor de behandeling</h3>
                      <button
                        className="text-blue-600 flex items-center text-sm"
                        onClick={addAdvies}
                      >
                        <Plus size={16} className="mr-1" />
                        Advies toevoegen
                      </button>
                    </div>

                    {formData.behandeling.praktischeAdviezen.map((advies, index) => (
                      <div key={index} className="flex items-start space-x-2 mb-2 p-2 border rounded bg-gray-50">
                        <div className="flex-grow-0">
                          <select
                            className="p-2 border rounded-md"
                            value={advies.emoji}
                            onChange={(e) => updateAdvies(index, 'emoji', e.target.value)}
                          >
                            {emojiOptions.adviezen.map(option => (
                              <option key={option.emoji} value={option.emoji}>
                                {option.emoji} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          type="text"
                          className="flex-grow p-2 border rounded-md"
                          placeholder="Beschrijf het praktische advies voor behandeling/begeleiding"
                          value={advies.tekst}
                          onChange={(e) => updateAdvies(index, 'tekst', e.target.value)}
                        />

                        <button
                          className="p-2 text-red-500"
                          onClick={() => removeAdvies(index)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}

                    <div className="bg-teal-50 p-3 rounded-md mt-2 flex items-start">
                      <HelpCircle className="text-teal-500 mr-2 flex-shrink-0 mt-1" size={18} />
                      <p className="text-sm text-teal-700">
                        Formuleer concrete, uitvoerbare adviezen die aansluiten bij de neuropsychologische bevindingen.
                        Focus op praktische interventies die de patiënt, familie en behandelteam kunnen implementeren.
                      </p>
                    </div>
                  </div>
                </div>
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
