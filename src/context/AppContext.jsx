import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

// Mock data for development
const initialState = {
  user: {
    userId: '1',
    email: 'user@example.com',
    subscriptionStatus: 'premium',
    createdAt: new Date().toISOString()
  },
  galleries: [
    {
      galleryId: '1',
      userId: '1',
      title: 'Fluffy\'s Adventures',
      description: 'A collection of my cat\'s outdoor adventures',
      templateType: 'masonry',
      creationDate: new Date().toISOString(),
      photos: [
        {
          photoId: '1',
          galleryId: '1',
          imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
          caption: 'Fluffy exploring the garden',
          uploadDate: new Date().toISOString(),
          order: 1
        },
        {
          photoId: '2',
          galleryId: '1',
          imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
          caption: 'Afternoon nap in the sun',
          uploadDate: new Date().toISOString(),
          order: 2
        }
      ]
    },
    {
      galleryId: '2',
      userId: '1',
      title: 'Buddy\'s Best Moments',
      description: 'Golden retriever puppyhood memories',
      templateType: 'grid',
      creationDate: new Date().toISOString(),
      photos: [
        {
          photoId: '3',
          galleryId: '2',
          imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
          caption: 'First day home',
          uploadDate: new Date().toISOString(),
          order: 1
        }
      ]
    }
  ],
  templates: [
    {
      id: 'masonry',
      name: 'Masonry Layout',
      description: 'Dynamic brick-style layout perfect for showcasing photos of different sizes',
      preview: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300',
      isPremium: false
    },
    {
      id: 'grid',
      name: 'Classic Grid',
      description: 'Clean, organized grid layout ideal for consistent photo presentation',
      preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      isPremium: false
    },
    {
      id: 'slideshow',
      name: 'Elegant Slideshow',
      description: 'Full-screen slideshow with smooth transitions and captions',
      preview: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300',
      isPremium: true
    }
  ]
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_GALLERY':
      return {
        ...state,
        galleries: [...state.galleries, action.payload]
      }
    case 'UPDATE_GALLERY':
      return {
        ...state,
        galleries: state.galleries.map(gallery =>
          gallery.galleryId === action.payload.galleryId
            ? { ...gallery, ...action.payload }
            : gallery
        )
      }
    case 'DELETE_GALLERY':
      return {
        ...state,
        galleries: state.galleries.filter(gallery => gallery.galleryId !== action.payload)
      }
    case 'ADD_PHOTO':
      return {
        ...state,
        galleries: state.galleries.map(gallery =>
          gallery.galleryId === action.payload.galleryId
            ? {
                ...gallery,
                photos: [...(gallery.photos || []), action.payload.photo]
              }
            : gallery
        )
      }
    case 'DELETE_PHOTO':
      return {
        ...state,
        galleries: state.galleries.map(gallery =>
          gallery.galleryId === action.payload.galleryId
            ? {
                ...gallery,
                photos: gallery.photos.filter(photo => photo.photoId !== action.payload.photoId)
              }
            : gallery
        )
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const addGallery = (gallery) => {
    dispatch({ type: 'ADD_GALLERY', payload: gallery })
  }

  const updateGallery = (gallery) => {
    dispatch({ type: 'UPDATE_GALLERY', payload: gallery })
  }

  const deleteGallery = (galleryId) => {
    dispatch({ type: 'DELETE_GALLERY', payload: galleryId })
  }

  const addPhoto = (galleryId, photo) => {
    dispatch({ type: 'ADD_PHOTO', payload: { galleryId, photo } })
  }

  const deletePhoto = (galleryId, photoId) => {
    dispatch({ type: 'DELETE_PHOTO', payload: { galleryId, photoId } })
  }

  const value = {
    ...state,
    addGallery,
    updateGallery,
    deleteGallery,
    addPhoto,
    deletePhoto
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}