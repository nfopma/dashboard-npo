UPDATE public.patients
SET
    name = 'Jan Jansen',
    data = '{
      "basisgegevens": {
        "naam": "Jan Jansen",
        "geboortedatum": "20-03-1995",
        "onderzoeksdatum": "15-05-2024",
        "onderzoeker": "Drs. E. de Vries (Psycholoog)",
        "afdeling": "Klinische Psychologie"
      },
      "voorinformatie": {
        "opleidingsniveau": "Vmbo, mbo1, avo onderbouw",
        "letsel": "Er is geen bekend letsel bij jou vastgesteld.",
        "middelengebruik": "Je gebruikt geen bekende middelen."
      },
      "beinvloedendeFactoren": {
        "medicatie": "Je gebruikt geen medicatie die invloed heeft op je functioneren.",
        "sclUitkomsten": "Je ervaart soms wat spanning, maar je kunt dit met hulp hanteren. Er zijn geen ernstige klachten die je dagelijks leven sterk beïnvloeden.",
        "motorischeSnelheid": "Je motorische snelheid is gemiddeld, er zijn geen opvallende beperkingen in hoe snel je beweegt of taken uitvoert."
      },
      "conclusie": {
        "dsmClassificatie": "Je hebt een lichte verstandelijke beperking (LVB), wat betekent dat je soms extra ondersteuning nodig hebt bij complexe taken en beslissingen."
      },
      "intelligentie": {
        "verbaalBegrip": {
          "iqScore": "75",
          "betrouwbaarheidsLinks": "70",
          "betrouwbaarheidsRechts": "80",
          "emoji": "💬",
          "beschrijving": "Het begrijpen van taal en het kunnen uitleggen van woorden is voor jou soms wat lastiger. Je hebt moeite met ingewikkelde zinnen en abstracte begrippen. Het helpt jou als mensen simpele, duidelijke taal gebruiken."
        },
        "perceptueelRedeneren": {
          "iqScore": "78",
          "betrouwbaarheidsLinks": "73",
          "betrouwbaarheidsRechts": "83",
          "emoji": "👁️",
          "beschrijving": "Het oplossen van puzzels en het zien van verbanden in plaatjes gaat bij jou wat langzamer. Je hebt meer tijd nodig om dingen te overzien en een plan te maken. Visuele voorbeelden en stap-voor-stap uitleg zijn voor jou belangrijk."
        },
        "werkgeheugen": {
          "iqScore": "72",
          "betrouwbaarheidsLinks": "67",
          "betrouwbaarheidsRechts": "77",
          "emoji": "🧩",
          "beschrijving": "Het onthouden van informatie voor korte tijd en er iets mee doen, is voor jou een uitdaging. Je vergeet soms snel wat net is gezegd of wat de volgende stap is. Korte instructies en herhaling zijn voor jou nodig."
        },
        "verwerkingssnelheid": {
          "iqScore": "70",
          "betrouwbaarheidsLinks": "65",
          "betrouwbaarheidsRechts": "75",
          "emoji": "⚡",
          "beschrijving": "Het snel verwerken van informatie en reageren op taken gaat bij jou langzamer. Je hebt meer tijd nodig om te reageren en taken af te maken. Het is belangrijk dat je voldoende tijd krijgt en dat er geen tijdsdruk is."
        },
        "totaalIQ": {
          "iqScore": "74",
          "betrouwbaarheidsLinks": "69",
          "betrouwbaarheidsRechts": "79",
          "emoji": "🧠",
          "beschrijving": "Jouw totale IQ ligt in het bereik van een lichte verstandelijke beperking. Dit betekent dat je moeite hebt met complexe taken en abstract denken. Je functioneert het beste met duidelijke structuren en concrete voorbeelden.",
          "disharmonisch": "Nee"
        }
      },
      "behandeling": {
        "behandelplan": "Het behandelplan richt zich op het versterken van jouw praktische vaardigheden en het aanleren van manieren om met dagelijkse uitdagingen om te gaan. We werken met concrete doelen en veel herhaling. Het is belangrijk dat mensen in jouw omgeving actief betrokken zijn bij de behandeling."
      }
    }'::jsonb,
    klachten = '[
      {
        "tekst": "Je geeft aan dat je soms moeite hebt met het begrijpen van nieuwe informatie, vooral als het snel gaat of ingewikkeld is. Dit kan frustrerend zijn voor je.",
        "emoji": "🤔"
      },
      {
        "tekst": "Je merkt dat je dingen snel vergeet, zoals afspraken of wat je moet doen. Dit maakt het lastig om alles bij te houden.",
        "emoji": "🗓️"
      },
      {
        "tekst": "Het overzien van situaties en het maken van eigen keuzes vind je moeilijk. Je hebt vaak hulp nodig om te bepalen wat de beste stap is.",
        "emoji": "🤷"
      },
      {
        "tekst": "Je vindt het lastig om je te concentreren op één taak, vooral als er veel afleiding is. Dit maakt leren en werken soms zwaar.",
        "emoji": " 집중"
      },
      {
        "tekst": "Soms voel je je onzeker in sociale situaties, vooral als je niet goed weet wat er van je verwacht wordt. Dit kan leiden tot teruggetrokken gedrag.",
        "emoji": "😟"
      }
    ]'::jsonb,
    belangrijkste_bevindingen = '[
      {
        "tekst": "Uit het onderzoek blijkt dat jouw IQ-score in het licht verstandelijk beperkte bereik ligt (Totaal IQ: 74). Dit is een belangrijke bevinding die helpt om te begrijpen waar je tegenaan loopt.",
        "emoji": "📊"
      },
      {
        "tekst": "Je hebt moeite met abstract denken en het oplossen van complexe problemen. Dit betekent dat je het beste leert en functioneert met concrete voorbeelden en duidelijke stappen.",
        "emoji": "🧩"
      },
      {
        "tekst": "Jouw sterke punten liggen in concrete, praktische taken en in sociale interactie, vooral als de situatie duidelijk is. Je bent goed in dingen die je kunt zien en aanraken.",
        "emoji": "💪"
      },
      {
        "tekst": "Je werkgeheugen en verwerkingssnelheid zijn beperkt. Dit draagt bij aan de moeite die je hebt met het snel oppakken en verwerken van nieuwe informatie.",
        "emoji": "🧠"
      },
      {
        "tekst": "Je hebt een voorkeur voor routine en voorspelbaarheid. Veranderingen kunnen voor jou stressvol zijn, omdat je dan opnieuw moet wennen aan een situatie.",
        "emoji": "🔄"
      }
    ]'::jsonb,
    praktische_adviezen = '[
      {
        "tekst": "Gebruik korte, duidelijke zinnen en vermijd ingewikkelde woorden. Spreek in concrete termen die je direct kunt begrijpen.",
        "emoji": "🗣️"
      },
      {
        "tekst": "Laat instructies stap voor stap zien en controleer of je het hebt begrepen door het te laten herhalen of voordoen. Dit helpt je om de informatie beter op te nemen.",
        "emoji": "🚶"
      },
      {
        "tekst": "Maak gebruik van visuele hulpmiddelen, zoals plaatjes, schema''s of pictogrammen. Wat je ziet, onthoud je vaak beter.",
        "emoji": "🖼️"
      },
      {
        "tekst": "Zorg voor structuur en voorspelbaarheid in je dagelijkse routine en bij nieuwe taken. Dit geeft je rust en overzicht.",
        "emoji": "🗓️"
      },
      {
        "tekst": "Krijg voldoende tijd om informatie te verwerken en te reageren. Het is belangrijk dat er geen tijdsdruk is, zodat je rustig kunt nadenken.",
        "emoji": "⏳"
      },
      {
        "tekst": "Herhaal belangrijke informatie regelmatig en gebruik geheugensteuntjes. Dit helpt je om dingen beter te onthouden op de lange termijn.",
        "emoji": "🔁"
      }
    ]'::jsonb
WHERE id = 'YOUR_TEST_PATIENT_UUID_HERE'; -- VERVANG DEZE MET DE ECHTE UUID VAN JE TESTPATIËNT
