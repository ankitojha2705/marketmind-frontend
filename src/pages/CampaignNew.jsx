import { useState } from 'react';
import { createCampaign } from '../store/db';

const allPlatforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'facebook', name: 'Facebook', icon: '👍' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
  { id: 'youtube', name: 'YouTube', icon: '▶️' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌' },
  { id: 'tumblr', name: 'Tumblr', icon: '✏️' },
  { id: 'reddit', name: 'Reddit', icon: '🔴' },
  { id: 'quora', name: 'Quora', icon: '❓' },
  { id: 'medium', name: 'Medium', icon: '✍️' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' }
];

const campaignTypes = [
  { id: 'awareness', name: 'Brand Awareness', description: 'Increase visibility and recognition of your brand' },
  { id: 'engagement', name: 'Engagement', description: 'Boost interactions and engagement with your audience' },
  { id: 'traffic', name: 'Website Traffic', description: 'Drive more visitors to your website' },
  { id: 'leads', name: 'Lead Generation', description: 'Capture potential customer information' },
  { id: 'sales', name: 'Sales', description: 'Drive product or service sales' },
  { id: 'app-installs', name: 'App Installs', description: 'Increase downloads of your mobile app' }
];

export default function CampaignNew() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [objective, setObjective] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [audience, setAudience] = useState({
    location: '',
    ageRange: [18, 65],
    interests: [],
    languages: ['English']
  });
  const [budget, setBudget] = useState(1000);
  const [schedule, setSchedule] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    timezone: 'UTC+0:00'
  });

  const togglePlatform = (platformId) => {
    setPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !brief.trim() || platforms.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      // Clear any existing data
      localStorage.removeItem('mm_state_v02');
      
      // Create campaign with required fields
      const result = createCampaign({
        name: name.trim(),
        brief: brief.trim(),
        platforms: platforms
      });
      
      console.log('Campaign created successfully:', result);
      
      // Force a page reload to ensure the dashboard updates
      window.location.href = '#/dashboard';
      window.location.reload();
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert(`Failed to create campaign: ${error.message}`);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Campaign</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Set up your campaign by filling in the details below. You can always edit these later.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            id="campaign-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Summer Sale 2023"
            required
          />
        </div>

        <div>
          <label htmlFor="campaign-brief" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Campaign Brief <span className="text-red-500">*</span>
          </label>
          <textarea
            id="campaign-brief"
            rows={4}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Describe the purpose and key messages of your campaign..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Campaign Objective <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaignTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setObjective(type.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  objective === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{type.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={nextStep}
            disabled={!name.trim() || !brief.trim() || !objective}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next: Select Platforms
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
        >
          ← Back to Campaign Details
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select Platforms</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose the platforms where you want to run your campaign.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allPlatforms.map((platform) => (
          <button
            key={platform.id}
            type="button"
            onClick={() => togglePlatform(platform.id)}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
              platforms.includes(platform.id)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <span className="text-2xl mb-2">{platform.icon}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between pt-4 space-y-3 sm:space-y-0">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <div className="space-x-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={platforms.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={platforms.length === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next: Audience & Budget
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
        >
          ← Back to Platform Selection
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Audience & Budget</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Define your target audience and set your campaign budget.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Audience</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={audience.location}
                  onChange={(e) => setAudience({...audience, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., United States, Worldwide"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age Range: {audience.ageRange[0]} - {audience.ageRange[1]} years
                </label>
                <div className="px-2">
                  <input
                    type="range"
                    min="13"
                    max="65"
                    value={audience.ageRange[1]}
                    onChange={(e) => setAudience({
                      ...audience,
                      ageRange: [audience.ageRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>13</span>
                    <span>65+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Budget</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="mb-4">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Budget (USD)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={schedule.startDate}
                      onChange={(e) => setSchedule({...schedule, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={schedule.endDate}
                      min={schedule.startDate}
                      onChange={(e) => setSchedule({...schedule, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="timezone" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    value={schedule.timezone}
                    onChange={(e) => setSchedule({...schedule, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="UTC+0:00">UTC+0:00 (London)</option>
                    <option value="UTC-5:00">UTC-5:00 (New York)</option>
                    <option value="UTC-8:00">UTC-8:00 (Los Angeles)</option>
                    <option value="UTC+1:00">UTC+1:00 (Berlin)</option>
                    <option value="UTC+5:30">UTC+5:30 (Mumbai)</option>
                    <option value="UTC+8:00">UTC+8:00 (Singapore)</option>
                    <option value="UTC+9:00">UTC+9:00 (Tokyo)</option>
                    <option value="UTC+10:00">UTC+10:00 (Sydney)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between pt-4 space-y-3 sm:space-y-0">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <div className="space-x-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 md:p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepNum 
                    ? 'bg-blue-600 text-white' 
                    : step > stepNum 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {stepNum}
              </div>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {stepNum === 1 ? 'Details' : stepNum === 2 ? 'Platforms' : 'Audience'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}