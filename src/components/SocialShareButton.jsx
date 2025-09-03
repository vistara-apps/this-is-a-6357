import React from 'react'
import { Facebook, Twitter, Instagram, Share2 } from 'lucide-react'

function SocialShareButton({ platform, url, title, variant = 'default' }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    instagram: '#', // Instagram doesn't support direct URL sharing
  }

  const icons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
  }

  const colors = {
    facebook: 'bg-blue-600 hover:bg-blue-700',
    twitter: 'bg-blue-400 hover:bg-blue-500',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  }

  const Icon = icons[platform]

  const handleClick = () => {
    if (platform === 'instagram') {
      alert('Copy the link and share it on Instagram!')
      navigator.clipboard?.writeText(url)
      return
    }

    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105
        ${colors[platform]}
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="capitalize">{platform}</span>
    </button>
  )
}

export default SocialShareButton