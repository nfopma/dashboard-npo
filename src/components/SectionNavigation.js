import React from 'react';

const SectionNavigation = ({ sections, activeSection, setActiveSection }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {sections.map(section => (
          <button
            key={section.id}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionNavigation;
