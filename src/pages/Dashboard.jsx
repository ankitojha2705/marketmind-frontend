import { useState } from 'react';
import { format } from 'date-fns';

// Helper function for navigation
const navigate = (path) => {
  window.location.hash = `#${path}`;
};

// Icons
import { 
  CalendarIcon, 
  ClockIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Format date to a nice readable format
const nice = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy h:mm a');
};

// Format time left for scheduled posts
const formatTimeLeft = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.ceil((date - now) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.ceil((date - now) / (1000 * 60));
    return `in ${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'}`;
  } else if (diffInHours < 24) {
    return `in ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`;
  } else {
    const diffInDays = Math.ceil(diffInHours / 24);
    return `in ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
  }
};

// Get platform info
const getPlatformInfo = (platform) => {
  const platforms = {
    instagram: { 
      name: 'Instagram', 
      color: 'bg-pink-600',
      icon: '📸',
      bgColor: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200'
    },
    facebook: { 
      name: 'Facebook', 
      color: 'bg-blue-600',
      icon: '👍',
      bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
    },
    twitter: { 
      name: 'Twitter', 
      color: 'bg-sky-500',
      icon: '🐦',
      bgColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200'
    },
    tiktok: { 
      name: 'TikTok', 
      color: 'bg-black',
      icon: '🎵',
      bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    },
    linkedin: { 
      name: 'LinkedIn', 
      color: 'bg-blue-700',
      icon: '💼',
      bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
    }
  };
  
  return platforms[platform] || { 
    name: platform.charAt(0).toUpperCase() + platform.slice(1), 
    color: 'bg-gray-600',
    icon: '🌐',
    bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };
};

// Sample data
const sampleCampaigns = [
  {
    id: '1',
    name: 'Summer Sale 2023',
    status: 'active',
    platform: 'instagram',
    platforms: ['instagram', 'facebook'],
    budget: 1000,
    spent: 450,
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
    impressions: 15000,
    engagements: 1200,
    ctr: 8.0,
    reach: 8500
  },
  {
    id: '2',
    name: 'Product Launch',
    status: 'draft',
    platform: 'tiktok',
    platforms: ['tiktok', 'instagram'],
    budget: 3000,
    spent: 0,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    impressions: 0,
    engagements: 0,
    ctr: 0,
    reach: 0
  }
];

const sampleDrafts = [
  {
    id: 'd1',
    title: 'Product Teaser',
    content: 'Get ready for something amazing! Our new product is coming soon...',
    platform: 'instagram',
    status: 'draft',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    media: []
  },
  {
    id: 'd2',
    title: 'Feature Highlight',
    content: 'Check out our latest feature that will change the game!',
    platform: 'twitter',
    status: 'draft',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    media: ['https://example.com/teaser.jpg']
  }
];

const sampleScheduled = [
  {
    id: 's1',
    platform: 'instagram',
    caption: 'Summer sale is live! Get 30% off on all products. #SummerSale #Discount',
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    campaignId: '1',
    media: ['https://example.com/image1.jpg']
  },
  {
    id: 's2',
    platform: 'facebook',
    caption: 'Check out our latest blog post about social media strategies!',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    campaignId: '1',
    media: ['https://example.com/image2.jpg']
  }
];

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [drafts, setDrafts] = useState(sampleDrafts);
  const [scheduled, setScheduled] = useState(sampleScheduled);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState(null);
  const [schedulingDraftId, setSchedulingDraftId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');

  // Handle scheduling a draft
  const handleSchedule = (draftId) => {
    if (!scheduleDate) {
      alert('Please select a date and time');
      return;
    }
    
    setDrafts(drafts.map(draft => 
      draft.id === draftId 
        ? { ...draft, status: 'scheduled', scheduledAt: scheduleDate }
        : draft
    ));
    
    // Move to scheduled
    const scheduledDraft = drafts.find(d => d.id === draftId);
    if (scheduledDraft) {
      setScheduled([...scheduled, { ...scheduledDraft, status: 'scheduled', scheduledAt: scheduleDate }]);
    }
    
    setSchedulingDraftId(null);
    setScheduleDate('');
  };

  // Handle editing a draft
  const handleEditDraft = (draftId) => {
    setEditingDraftId(draftId);
    // Here you would typically navigate to an edit page or show a modal
    alert(`Editing draft ${draftId} - Implement your edit functionality here`);
  };

  // Handle canceling a scheduled post
  const handleCancelScheduled = (scheduledId) => {
    if (window.confirm('Are you sure you want to cancel this scheduled post?')) {
      setScheduled(scheduled.filter(post => post.id !== scheduledId));
    }
  };

  // Handle deleting a draft
  const handleDeleteDraft = (draftId) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      setDrafts(drafts.filter(draft => draft.id !== draftId));
    }
  };

  // Handle creating a new campaign
  const handleCreateCampaign = () => {
    window.location.hash = '#/campaigns/new';
  };

  // Handle editing a campaign
  const handleEditCampaign = (campaignId) => {
    window.location.hash = `#/campaigns/${campaignId}/edit`;
  };

  // Handle deleting a campaign
  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  // Tab navigation component
  const TabNavigation = () => (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="-mb-px flex space-x-8">
        {[
          { name: 'Overview', id: 'overview' },
          { name: 'Scheduled', id: 'scheduled' },
          { name: 'Analytics', id: 'analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );

  // Render the overview tab
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Campaigns</h2>
            <button
              onClick={handleCreateCampaign}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              New Campaign
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map(campaign => {
              const platform = getPlatformInfo(campaign.platform);
              return (
                <div key={campaign.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${platform.bgColor} mr-3`}>
                          {platform.icon} {platform.name}
                        </span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {campaign.name}
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCampaign(campaign.id)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                          }`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          ${campaign.budget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Spent</p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          ${campaign.spent.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Posts Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Posts</h2>
          <div className="space-y-4">
            {scheduled.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming posts scheduled.</p>
            ) : (
              scheduled.map(post => {
                const platform = getPlatformInfo(post.platform);
                const campaign = campaigns.find(c => c.id === post.campaignId);
                
                return (
                  <div key={post.id} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${platform.bgColor} mr-3`}>
                            {platform.icon} {platform.name}
                          </span>
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {campaign?.name || 'No Campaign'}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                            {formatTimeLeft(post.scheduledAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            {post.caption.length > 100 ? `${post.caption.substring(0, 100)}...` : post.caption}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <p>{nice(post.scheduledAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render the scheduled tab
  const renderScheduledTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Scheduled Posts</h2>
        <div className="space-y-4">
          {scheduled.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No posts scheduled.</p>
          ) : (
            scheduled.map(post => {
              const platform = getPlatformInfo(post.platform);
              const campaign = campaigns.find(c => c.id === post.campaignId);
              
              return (
                <div key={post.id} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${platform.bgColor} mr-3`}>
                          {platform.icon} {platform.name}
                        </span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {campaign?.name || 'No Campaign'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {}}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleCancelScheduled(post.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.caption}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <p>Scheduled for {nice(post.scheduledAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  // Render the analytics tab
  const renderAnalyticsTab = () => (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Analytics</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Total Reach', value: '24.5K', change: '+12.5%', changeType: 'increase' },
            { name: 'Engagement', value: '1.2K', change: '+4.3%', changeType: 'increase' },
            { name: 'Impressions', value: '45.7K', change: '-2.1%', changeType: 'decrease' },
            { name: 'Click-through Rate', value: '3.2%', change: '+0.8%', changeType: 'increase' }
          ].map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
                <div className={`mt-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                  <span className="sr-only">
                    {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'scheduled':
        return renderScheduledTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <TabNavigation />
            </div>
          </div>

          {renderContent()}

          {activeTab === 'overview' && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
                  <button
                    onClick={() => navigate('/activity')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
