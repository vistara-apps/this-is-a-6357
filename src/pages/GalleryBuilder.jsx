import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Save, Upload, X, Plus, Eye } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ImageUpload from '../components/ImageUpload'

function GalleryBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { galleries, addGallery, updateGallery, templates } = useApp()
  
  const isEditing = Boolean(id)
  const templateId = searchParams.get('template')
  const existingGallery = isEditing ? galleries.find(g => g.galleryId === id) : null
  
  const [gallery, setGallery] = useState({
    galleryId: isEditing ? id : Date.now().toString(),
    userId: '1',
    title: '',
    description: '',
    templateType: templateId || 'masonry',
    creationDate: new Date().toISOString(),
    photos: []
  })

  const [showImageUpload, setShowImageUpload] = useState(false)

  useEffect(() => {
    if (existingGallery) {
      setGallery(existingGallery)
    }
  }, [existingGallery])

  const handleSave = () => {
    if (!gallery.title.trim()) {
      alert('Please enter a gallery title')
      return
    }

    if (isEditing) {
      updateGallery(gallery)
    } else {
      addGallery(gallery)
    }
    
    navigate(`/gallery/${gallery.galleryId}`)
  }

  const handleAddPhotos = (newPhotos) => {
    const photosWithIds = newPhotos.map((photo, index) => ({
      photoId: Date.now().toString() + index,
      galleryId: gallery.galleryId,
      imageUrl: photo.url,
      caption: photo.caption || '',
      uploadDate: new Date().toISOString(),
      order: (gallery.photos?.length || 0) + index + 1
    }))

    setGallery(prev => ({
      ...prev,
      photos: [...(prev.photos || []), ...photosWithIds]
    }))
    setShowImageUpload(false)
  }

  const handleRemovePhoto = (photoId) => {
    setGallery(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.photoId !== photoId)
    }))
  }

  const selectedTemplate = templates.find(t => t.id === gallery.templateType)

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {isEditing ? 'Edit Gallery' : 'Create New Gallery'}
              </h1>
              <p className="text-text-secondary">
                {selectedTemplate ? `Using ${selectedTemplate.name} template` : 'Build your pet photo gallery'}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/gallery/${gallery.galleryId}`)}
                className="inline-flex items-center space-x-2 btn-secondary"
                disabled={!gallery.title.trim()}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center space-x-2 btn-primary"
              >
                <Save className="w-4 h-4" />
                <span>Save Gallery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery settings */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Gallery Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Gallery Title *
              </label>
              <input
                type="text"
                value={gallery.title}
                onChange={(e) => setGallery(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter gallery title (e.g., Fluffy's Adventures)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={gallery.description}
                onChange={(e) => setGallery(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your gallery (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Template Layout
              </label>
              <select
                value={gallery.templateType}
                onChange={(e) => setGallery(prev => ({ ...prev, templateType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} {template.isPremium ? '(Premium)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Photos section */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Photos ({gallery.photos?.length || 0})
            </h2>
            <button
              onClick={() => setShowImageUpload(true)}
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photos</span>
            </button>
          </div>

          {gallery.photos?.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No photos yet</h3>
              <p className="text-text-secondary mb-4">
                Add some beautiful photos of your pet to get started
              </p>
              <button
                onClick={() => setShowImageUpload(true)}
                className="btn-primary"
              >
                Upload Photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.photos.map((photo) => (
                <div key={photo.photoId} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(photo.photoId)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {photo.caption && (
                    <p className="mt-2 text-xs text-text-secondary truncate">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image upload modal */}
        {showImageUpload && (
          <ImageUpload
            onUpload={handleAddPhotos}
            onClose={() => setShowImageUpload(false)}
          />
        )}
      </div>
    </div>
  )
}

export default GalleryBuilder