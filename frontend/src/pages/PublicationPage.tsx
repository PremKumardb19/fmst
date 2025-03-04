import React, { useState } from 'react';
import { Book, User, FileText, PlusCircle, Upload, X } from 'lucide-react';
import PublicationForm from '../components/PublicationForm';
import PublicationAuthorForm from '../components/PublicationAuthors';

const PublicationPage = () => {
  const [activeTab, setActiveTab] = useState('publication');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isCreatePublicationDialogOpen, setIsCreatePublicationDialogOpen] = useState(false);

  const tabs = [
    {
      id: 'publication',
      label: 'Publication Details',
      icon: <Book className="mr-2 h-5 w-5" />,
      component: <PublicationForm />
    },
    {
      id: 'author',
      label: 'Publication Author',
      icon: <User className="mr-2 h-5 w-5" />,
      component: <PublicationAuthorForm />
    }
  ];

  const QuickActionCard = ({ title, description, icon, onClick }) => {
    return (
      <div 
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex items-center space-x-4 cursor-pointer"
      >
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    );
  };

  const ImportDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold mb-4">Import Publications</h2>
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-500 mb-3" />
                <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">CSV, Excel, or JSON files</p>
              </div>
              <input type="file" className="hidden" />
            </label>
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload Publications
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CreatePublicationDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold mb-4">Create New Publication</h2>
          <PublicationForm />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Publication Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your research publications and author details
          </p>
        </div>

        {/* Tabs Container */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center w-full py-4 px-6 text-sm font-semibold
                  transition-all duration-300 ease-in-out
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-2">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Import Publications"
            description="Bulk upload your research publications"
            icon={<FileText className="h-10 w-10 text-blue-500" />}
            onClick={() => setIsImportDialogOpen(true)}
          />
          <QuickActionCard
            title="Create New Publication"
            description="Add a new research publication manually"
            icon={<PlusCircle className="h-10 w-10 text-green-500" />}
            onClick={() => setIsCreatePublicationDialogOpen(true)}
          />
          <QuickActionCard
            title="Author Management"
            description="Manage and update author profiles"
            icon={<User className="h-10 w-10 text-purple-500" />}
            onClick={() => setActiveTab('author')}
          />
        </div>

        {/* Dialogs */}
        <ImportDialog 
          isOpen={isImportDialogOpen} 
          onClose={() => setIsImportDialogOpen(false)} 
        />
        <CreatePublicationDialog 
          isOpen={isCreatePublicationDialogOpen} 
          onClose={() => setIsCreatePublicationDialogOpen(false)} 
        />
      </div>
    </div>
  );
};

export default PublicationPage;