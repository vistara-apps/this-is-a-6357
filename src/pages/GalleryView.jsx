import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Edit, Share2, ArrowLeft, Heart, ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext'
import GalleryGrid from '../components/GalleryGrid'
import SocialShareButton from '../components/SocialShareButton'

function GalleryView() {
  const { id } = useParams()
  const { galleries } = useApp()
  
  const gallery = galleries.find(g => g.galleryId === id)

  if (!gallery) {
    return (
      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-card p-8 text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Gallery Not Found</h1>
            <p className="text-text-secondary mb-6">
              The gallery you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className="btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gallery.title,
        text: gallery.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Gallery link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  {gallery.title}
                </h1>
                {gallery.description && (
                  <p className="text-white/80 text-sm lg:text-base">
                    {gallery.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <Link
                to={`/gallery/${gallery.galleryId}/edit`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery content */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          {gallery.photos && gallery.photos.length > 0 ? (
            <div className="space-y-8">
              {/* Gallery stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-6 text-white">
                  <div>
                    <div className="text-2xl font-bold">{gallery.photos.length}</div>
                    <div className="text-sm text-white/80">Photos</div>
                  </div>
                  <div className="h-8 w-px bg-white/30" />
                  <div>
                    <div className="text-2xl font-bold">{gallery.templateType}</div>
                    <div className="text-sm text-white/80">Layout</div>
                  </div>
                  <div className="h-8 w-px bg-white/30" />
                  <div>
                    <div className="text-2xl font-bold">
                      {new Date(gallery.creationDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-white/80">Created</div>
                  </div>
                </div>
              </div>

              {/* Photo gallery */}
              <GalleryGrid 
                photos={gallery.photos} 
                variant={gallery.templateType}
              />

              {/* Social sharing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Share this gallery
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <SocialShareButton 
                    platform="facebook" 
                    url={window.location.href}
                    title={gallery.title}
                  />
                  <SocialShareButton 
                    platform="twitter" 
                    url={window.location.href}
                    title={gallery.title}
                  />
                  <SocialShareButton 
                    platform="instagram" 
                    url={window.location.href}
                    title={gallery.title}
                  />
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <Heart className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No photos yet
              </h3>
              <p className="text-white/80 mb-6">
                This gallery is empty. Add some beautiful photos to get started.
              </p>
              <Link
                to={`/gallery/${gallery.galleryId}/edit`}
                className="btn-primary bg-white text-purple-600 hover:bg-gray-50"
              >
                Add Photos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GalleryView