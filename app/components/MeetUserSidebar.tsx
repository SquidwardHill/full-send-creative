import { useState } from "react";
import { FaUser, FaTimes, FaLightbulb, FaBullseye, FaExclamationTriangle } from "react-icons/fa";

interface MeetUserSidebarProps {
  persona?: {
    name: string;
    role: string;
    company?: string;
    industry?: string;
    painPoints: string[];
    goals: string[];
    frustrations: string[];
    avatar?: string;
    demographics?: {
      age?: string;
      experience?: string;
      teamSize?: string;
    };
  };
  // Fallback to generate persona from case study data
  caseStudyData?: {
    title: string;
    challenge: string;
    task: string;
    result: string;
  };
}

const MeetUserSidebar = ({ persona, caseStudyData }: MeetUserSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Generate persona from case study data if no persona is provided
  const finalPersona =
    persona ||
    (caseStudyData
      ? {
          name: "Primary User",
          role: "Business Owner/Manager",
          company: "Client Company",
          industry: "Technology/Finance",
          painPoints: [
            "Manual processes are time-consuming",
            "Risk of errors in critical operations",
            "Lack of real-time visibility",
          ],
          goals: [
            "Automate repetitive tasks",
            "Improve accuracy and efficiency",
            "Enhance user experience",
          ],
          frustrations: [
            "Complex workflows are confusing",
            "Limited automation capabilities",
            "Poor user interface design",
          ],
          demographics: {
            experience: "5+ years in business",
            teamSize: "10-50 person team",
          },
        }
      : {
          name: "Sarah Chen",
          role: "Tax Manager",
          company: "ComplYant",
          industry: "Tax Technology",
          painPoints: [
            "Manual form processing takes hours",
            "Risk of filing errors and penalties",
            "Difficulty tracking submission statuses",
          ],
          goals: [
            "Streamline tax extension filing process",
            "Reduce manual data entry errors",
            "Improve user experience for clients",
          ],
          frustrations: [
            "Complex IRS forms are user-unfriendly",
            "Lack of real-time status updates",
            "Time-consuming compliance processes",
          ],
          demographics: {
            age: "32",
            experience: "8 years in tax management",
            teamSize: "15-person tax team",
          },
        });

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-bubblegum-400 to-bubblegum-600 hover:from-bubblegum-500 hover:to-bubblegum-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "rotate-180" : ""
        }`}
        aria-label="Meet the User"
      >
        {isOpen ? <FaTimes size={20} /> : <FaUser size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cream-100">User Persona</h2>
              <button
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-cream-100 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* User Avatar and Basic Info */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-bubblegum-400 to-bubblegum-600 flex items-center justify-center text-white text-2xl font-bold">
                {finalPersona.avatar ? (
                  <img
                    src={finalPersona.avatar}
                    alt={finalPersona.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  finalPersona.name.charAt(0).toUpperCase()
                )}
              </div>
              <h3 className="text-xl font-semibold text-cream-100 mb-1">{finalPersona.name}</h3>
              <p className="text-bubblegum-400 font-medium">{finalPersona.role}</p>
              {finalPersona.company && (
                <p className="text-cream-200 text-sm mt-1">{finalPersona.company}</p>
              )}
              {finalPersona.industry && (
                <p className="text-cream-200 text-sm">{finalPersona.industry}</p>
              )}
            </div>
          </div>

          {/* User Persona Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Pain Points */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-cream-100 mb-3 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-400" />
                Pain Points
              </h4>
              <ul className="space-y-2">
                {finalPersona.painPoints.map((point, index) => (
                  <li key={index} className="text-cream-200 text-sm flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Goals */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-cream-100 mb-3 flex items-center">
                <FaBullseye className="mr-2 text-green-400" />
                Goals
              </h4>
              <ul className="space-y-2">
                {finalPersona.goals.map((goal, index) => (
                  <li key={index} className="text-cream-200 text-sm flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Frustrations */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-cream-100 mb-3 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-400" />
                Frustrations
              </h4>
              <ul className="space-y-2">
                {finalPersona.frustrations.map((frustration, index) => (
                  <li key={index} className="text-cream-200 text-sm flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {frustration}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demographics */}
            {finalPersona.demographics && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-cream-100 mb-3">Demographics</h4>
                <div className="grid grid-cols-2 gap-3">
                  {finalPersona.demographics.age && (
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-bubblegum-400">
                        {finalPersona.demographics.age}
                      </div>
                      <div className="text-xs text-cream-200">Age</div>
                    </div>
                  )}
                  {finalPersona.demographics.experience && (
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-bubblegum-400">
                        {finalPersona.demographics.experience}
                      </div>
                      <div className="text-xs text-cream-200">Experience</div>
                    </div>
                  )}
                  {finalPersona.demographics.teamSize && (
                    <div className="bg-gray-800 rounded-lg p-3 text-center col-span-2">
                      <div className="text-lg font-bold text-bubblegum-400">
                        {finalPersona.demographics.teamSize}
                      </div>
                      <div className="text-xs text-cream-200">Team Size</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400">User Research & Persona</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetUserSidebar;
