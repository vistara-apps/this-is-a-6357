import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, Share2, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Dashboard() {
  const { galleries, deleteGallery } = useApp()

  const handleDeleteGallery = (galleryId) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      deleteGallery(galleryId)
    }
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
            <div className="text-center">
              <h1 className="text-3xl lg:text-5xl font-extrabold text-text-primary mb-4">
                Welcome to Critter Cards
              </h1>
              <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
                Showcase your animal's best moments with beautiful, shareable galleries
              </p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Gallery</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Galleries grid */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Your Galleries</h2>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 btn-secondary bg-white/90 backdrop-blur-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Gallery</span>
            </Link>
          </div>

          {galleries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-card p-8 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  No galleries yet
                </h3>
                <p className="text-text-secondary mb-4">
                  Create your first gallery to start showcasing your pet's photos
                </p>
                <Link to="/create" className="btn-primary">
                  Create Gallery
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <div key={gallery.galleryId} className="bg-white rounded-lg shadow-card overflow-hidden group hover:shadow-xl transition-shadow duration-200">
                  {/* Gallery preview */}
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {gallery.photos && gallery.photos.length > 0 ? (
                      <img
                        src={gallery.photos[0].imageUrl}
                        alt={gallery.photos[0].caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Add photos</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Photo count badge */}
                    {gallery.photos && gallery.photos.length > 0 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
                        {gallery.photos.length} photo{gallery.photos.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Gallery info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary mb-1 truncate">
                      {gallery.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {gallery.description}
                    </p>
                    
                    {/* Template badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {gallery.templateType}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {new Date(gallery.creationDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Link
                          to={`/gallery/${gallery.galleryId}`}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="View Gallery"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/gallery/${gallery.galleryId}/edit`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Gallery"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => navigator.share?.({ url: `/gallery/${gallery.galleryId}` }) || alert('Share link copied!')}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Share Gallery"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(gallery.galleryId)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Gallery"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard