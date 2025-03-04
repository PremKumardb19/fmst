import React, { useState, useEffect } from 'react';

const PublicationForm = () => {
  const [formData, setFormData] = useState({
    publicationType: '',
    title: '',
    sourceName: '',
    volumeNo: '',
    issueNo: '',
    pageNo: '',
    publishedDate: '',
    monthOfPublication: '',
    yearOfPublication: '',
    venue: '',
    levelType: '',
    impactFactor: '',
    doi: '',
    citationCount: '',
    publisher: '',
    certificateLink: '',
    indexedIn: ''
  });

  // New state for publications and editing
  const [publications, setPublications] = useState([]);
  const [editingPublication, setEditingPublication] = useState(null);

  // Fetch publications on component mount
  useEffect(() => {
    fetchPublications();
  }, []);

  // Fetch publications from backend
  const fetchPublications = async () => {
    try {
      const response = await fetch('http://localhost:5000/publications');
      const data = await response.json();
      setPublications(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPublication 
        ? `http://localhost:5000/publications/${editingPublication.id}` 
        : 'http://localhost:5000/publications';
      const method = editingPublication ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Refresh publications list
        fetchPublications();
        
        // Reset form and editing state
        setFormData({
          publicationType: '',
          title: '',
          sourceName: '',
          volumeNo: '',
          issueNo: '',
          pageNo: '',
          publishedDate: '',
          monthOfPublication: '',
          yearOfPublication: '',
          venue: '',
          levelType: '',
          impactFactor: '',
          doi: '',
          citationCount: '',
          publisher: '',
          certificateLink: '',
          indexedIn: ''
        });
        setEditingPublication(null);
      }
    } catch (error) {
      console.error('Error submitting publication:', error);
    }
  };

  // Handle Edit Publication
  const handleEditPublication = (publication) => {
    setEditingPublication(publication);
    // Populate form with selected publication data
    setFormData({
      publicationType: publication.publicationType || '',
      title: publication.title || '',
      sourceName: publication.sourceName || '',
      volumeNo: publication.volumeNo || '',
      issueNo: publication.issueNo || '',
      pageNo: publication.pageNo || '',
      publishedDate: publication.publishedDate || '',
      monthOfPublication: publication.monthOfPublication || '',
      yearOfPublication: publication.yearOfPublication || '',
      venue: publication.venue || '',
      levelType: publication.levelType || '',
      impactFactor: publication.impactFactor || '',
      doi: publication.doi || '',
      citationCount: publication.citationCount || '',
      publisher: publication.publisher || '',
      certificateLink: publication.certificateLink || '',
      indexedIn: publication.indexedIn || ''
    });
  };

  // Handle Delete Publication
  const handleDeletePublication = async (id) => {
    try {
      const response = await fetch(`/publications/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh publications list
        fetchPublications();
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-6">
        {/* Publication Form */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold text-center">
              Publication Details Submission
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Publication Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Type
                </label>
                <select 
                  name="publicationType"
                  value={formData.publicationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Publication Type</option>
                  <option value="Journal">Journal</option>
                  <option value="Conference">Conference</option>
                  <option value="Book Chapter">Book Chapter</option>
                  <option value="Patent">Patent</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Publication Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Title
                </label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter publication title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Source Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Name
                </label>
                <input 
                  type="text"
                  name="sourceName"
                  value={formData.sourceName}
                  onChange={handleChange}
                  placeholder="Journal/Conference name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Volume Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume Number
                </label>
                <input 
                  type="text"
                  name="volumeNo"
                  value={formData.volumeNo}
                  onChange={handleChange}
                  placeholder="Volume number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Issue Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Number
                </label>
                <input 
                  type="text"
                  name="issueNo"
                  value={formData.issueNo}
                  onChange={handleChange}
                  placeholder="Issue number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Published Date, Month, Year */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date
                </label>
                <input 
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month of Publication
                </label>
                <select 
                  name="monthOfPublication"
                  value={formData.monthOfPublication}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Month</option>
                  {['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Publication
                </label>
                <input 
                  type="number"
                  name="yearOfPublication"
                  value={formData.yearOfPublication}
                  onChange={handleChange}
                  min="1900"
                  max="2050"
                  placeholder="Publication year"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Venue and Level Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue
                </label>
                <input 
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Conference/Publication venue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level Type
                </label>
                <select 
                  name="levelType"
                  value={formData.levelType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Level</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
            </div>

            {/* Impact Factor, DOI, Citation Count */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Factor
                </label>
                <input 
                  type="number"
                  name="impactFactor"
                  value={formData.impactFactor}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Impact factor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DOI
                </label>
                <input 
                  type="text"
                  name="doi"
                  value={formData.doi}
                  onChange={handleChange}
                  placeholder="Digital Object Identifier"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Citation Count
                </label>
                <input 
                  type="number"
                  name="citationCount"
                  value={formData.citationCount}
                  onChange={handleChange}
                  placeholder="Number of citations"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Publisher and Certificate Link */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publisher
                </label>
                <input 
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Publication publisher"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Link
                </label>
                <input 
                  type="url"
                  name="certificateLink"
                  value={formData.certificateLink}
                  onChange={handleChange}
                  placeholder="Link to publication certificate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Indexed In */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Indexed In
              </label>
              <textarea 
                name="indexedIn"
                value={formData.indexedIn}
                onChange={handleChange}
                placeholder="Indexing databases (e.g., Scopus, Web of Science)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                {editingPublication ? 'Update Publication' : 'Submit Publication Details' }
              </button>
            </div>
          </form>
        </div>

        {/* Publications Table */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold text-center">
              Published Works
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Publication Type</th>
                  <th className="px-4 py-3 text-left">Source Name</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((publication) => (
                  <tr key={publication.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{publication.title}</td>
                    <td className="px-4 py-3">{publication.publicationType}</td>
                    <td className="px-4 py-3">{publication.sourceName}</td>
                    <td className="px-4 py-3">{publication.yearOfPublication}</td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <button 
                        onClick={() => handleEditPublication(publication)}
                        className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePublication(publication.id)}
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationForm;