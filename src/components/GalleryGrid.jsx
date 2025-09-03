import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

function GalleryGrid({ photos, variant = 'masonry' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (selectedIndex + 1) % photos.length
    setSelectedIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1
    setSelectedIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex])
  }

  const renderMasonryLayout = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <div 
          key={photo.photoId} 
          className="break-inside-avoid mb-4 cursor-pointer group"
          onClick={() => openLightbox(photo, index)}
        >
          <div className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-xl transition-all duration-200">
            <div className="relative overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
            {photo.caption && (
              <div className="p-3">
                <p className="text-sm text-text-secondary">{photo.caption}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <div 
          key={photo.photoId} 
          className="cursor-pointer group"
          onClick={() => openLightbox(photo, index)}
        >
          <div className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-xl transition-all duration-200">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
            {photo.caption && (
              <div className="p-3">
                <p className="text-sm text-text-secondary truncate">{photo.caption}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderSlideshowLayout = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    return (
      <div className="space-y-6">
        {/* Main slideshow */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={photos[currentSlide].imageUrl}
              alt={photos[currentSlide].caption}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide(currentSlide === 0 ? photos.length - 1 : currentSlide - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((currentSlide + 1) % photos.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Slide counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded-full">
              {currentSlide + 1} / {photos.length}
            </div>
          </div>
          
          {/* Caption */}
          {photos[currentSlide].caption && (
            <div className="p-4">
              <p className="text-text-secondary">{photos[currentSlide].caption}</p>
            </div>
          )}
        </div>

        {/* Thumbnail navigation */}
        {photos.length > 1 && (
          <div className="bg-white rounded-lg shadow-card p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={photo.photoId}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${index === currentSlide ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <Heart className="w-16 h-16 text-white/50 mx-auto mb-4" />
        <p className="text-white/80">No photos to display</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery */}
      <div className="animate-fade-in">
        {variant === 'masonry' && renderMasonryLayout()}
        {variant === 'grid' && renderGridLayout()}
        {variant === 'slideshow' && renderSlideshowLayout()}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center z-10 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center z-10 transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center z-10 transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[calc(100vh-8rem)] object-contain"
              />
              {selectedPhoto.caption && (
                <div className="p-4">
                  <p className="text-text-secondary">{selectedPhoto.caption}</p>
                </div>
              )}
            </div>

            {/* Counter */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-sm px-3 py-1 rounded-full">
                {selectedIndex + 1} / {photos.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryGrid