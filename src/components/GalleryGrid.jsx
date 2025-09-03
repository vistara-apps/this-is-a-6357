import React, { useState } from 'react'
import { X, ZoomIn, Heart } from 'lucide-react'

function GalleryGrid({ photos, variant = 'masonry' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const renderMasonryLayout = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.photoId} 
          className="break-inside-avoid mb-4 group"
          style={{ 
            gridRow: `span ${Math.floor(Math.random() * 2) + 1}`,
          }}
        >
          <div 
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.imageUrl} 
              alt={photo.caption || 'Gallery photo'} 
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          {photo.caption && (
            <p className="mt-2 text-sm text-white/80">{photo.caption}</p>
          )}
        </div>
      ))}
    </div>
  )

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.photoId} 
          className="group"
        >
          <div 
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.imageUrl} 
              alt={photo.caption || 'Gallery photo'} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          {photo.caption && (
            <p className="mt-2 text-sm text-white/80">{photo.caption}</p>
          )}
        </div>
      ))}
    </div>
  )

  const renderSlideshowLayout = () => (
    <div className="space-y-8">
      {photos.map((photo) => (
        <div 
          key={photo.photoId} 
          className="group"
        >
          <div 
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.imageUrl} 
              alt={photo.caption || 'Gallery photo'} 
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          {photo.caption && (
            <p className="mt-3 text-base text-white/90 text-center">{photo.caption}</p>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {variant === 'masonry' && renderMasonryLayout()}
      {variant === 'grid' && renderGridLayout()}
      {variant === 'slideshow' && renderSlideshowLayout()}

      {/* Photo modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex-1 overflow-hidden flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption || 'Gallery photo'}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            
            {selectedPhoto.caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-lg">{selectedPhoto.caption}</p>
              </div>
            )}
            
            <div className="mt-4 flex justify-center">
              <button className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryGrid

