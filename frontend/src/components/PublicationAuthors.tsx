import React, { useState, useEffect } from 'react';

const PublicationAuthorForm = () => {
  const [formData, setFormData] = useState({
    publicationId: '',
    authorName: '',
    authorOrder: '',
    affiliation: '',
    orcid: '',
    email: '',
    phone: '',
    researchInterests: ''
  });

  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);

  // Fetch authors on component mount
  useEffect(() => {
    fetchAuthors();
  }, []);

  // Fetch authors from backend
  const fetchAuthors = async () => {
    try {
      const response = await fetch('/authors');
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
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
      const url = editingAuthor 
        ? `/authors/${editingAuthor.id}` 
        : '/authors';
      const method = editingAuthor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Refresh authors list
        fetchAuthors();
        
        // Reset form and editing state
        setFormData({
          publicationId: '',
          authorName: '',
          authorOrder: '',
          affiliation: '',
          orcid: '',
          email: '',
          phone: '',
          researchInterests: ''
        });
        setEditingAuthor(null);
      }
    } catch (error) {
      console.error('Error submitting author:', error);
    }
  };

  // Handle Edit Author
  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    // Populate form with selected author data
    setFormData({
      publicationId: author.publicationId || '',
      authorName: author.authorName || '',
      authorOrder: author.authorOrder || '',
      affiliation: author.affiliation || '',
      orcid: author.orcid || '',
      email: author.email || '',
      phone: author.phone || '',
      researchInterests: author.researchInterests || ''
    });
  };

  // Handle Delete Author
  const handleDeleteAuthor = async (id) => {
    try {
      const response = await fetch(`/authors/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh authors list
        fetchAuthors();
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-6">
        {/* Author Form */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
            <h2 className="text-2xl font-bold text-center">
              Publication Author Details
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Publication ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication ID
                </label>
                <input 
                  type="text"
                  name="publicationId"
                  value={formData.publicationId}
                  onChange={handleChange}
                  placeholder="Enter Publication ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input 
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="Full Name of Author"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Author Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Order
              </label>
              <select 
                name="authorOrder"
                value={formData.authorOrder}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Author Order</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Author Details (Optional) */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Affiliation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliation (Optional)
                </label>
                <input 
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  placeholder="Author's Institution/University"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* ORCID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ORCID (Optional)
                </label>
                <input 
                  type="text"
                  name="orcid"
                  value={formData.orcid}
                  onChange={handleChange}
                  placeholder="ORCID Identifier"
                  pattern="^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Contact Information (Optional) */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Author's Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Research Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Interests (Optional)
              </label>
              <textarea 
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleChange}
                placeholder="Brief description of research areas"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
              >
                {editingAuthor ? 'Update Author Details' : 'Submit Author Details'}
              </button>
            </div>
          </form>
        </div>

        {/* Authors Table */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
            <h2 className="text-2xl font-bold text-center">
              Published Authors
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Publication ID</th>
                  <th className="px-4 py-3 text-left">Author Order</th>
                  <th className="px-4 py-3 text-left">Affiliation</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{author.authorName}</td>
                    <td className="px-4 py-3">{author.publicationId}</td>
                    <td className="px-4 py-3">{author.authorOrder}</td>
                    <td className="px-4 py-3">{author.affiliation}</td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <button 
                        onClick={() => handleEditAuthor(author)}
                        className="text-green-600 hover:text-green-800 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteAuthor(author.id)}
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

export default PublicationAuthorForm;