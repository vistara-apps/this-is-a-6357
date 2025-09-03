# Critter Cards Technical Documentation

## Overview

Critter Cards is a template-based website builder for pet owners to create and share customizable photo galleries. This document provides technical details about the application architecture, data model, and implementation.

## Table of Contents

1. [Architecture](#architecture)
2. [Data Model](#data-model)
3. [User Flows](#user-flows)
4. [Design System](#design-system)
5. [API Integrations](#api-integrations)
6. [Deployment](#deployment)
7. [Security Considerations](#security-considerations)

## Architecture

Critter Cards is built as a single-page application (SPA) using React and follows a component-based architecture.

### Technology Stack

- **Frontend Framework**: React with functional components and hooks
- **Routing**: React Router v6
- **State Management**: React Context API with useReducer
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API Integrations**: Cloudinary, Stripe
- **SEO & Social Sharing**: React Helmet Async, Open Graph Protocol

### Directory Structure

```
src/
├── api/                  # API documentation and utilities
├── components/           # Reusable UI components
├── context/              # Application state management
├── pages/                # Page components
├── App.jsx               # Main application component
├── index.css             # Global styles
└── main.jsx              # Application entry point
```

## Data Model

The application uses the following data model:

### User

```javascript
{
  userId: String,
  email: String,
  subscriptionStatus: String, // 'basic' or 'premium'
  createdAt: String // ISO date
}
```

### Gallery

```javascript
{
  galleryId: String,
  userId: String,
  title: String,
  description: String,
  templateType: String, // 'masonry', 'grid', or 'slideshow'
  creationDate: String, // ISO date
  photos: [Photo]
}
```

### Photo

```javascript
{
  photoId: String,
  galleryId: String,
  imageUrl: String,
  caption: String,
  uploadDate: String, // ISO date
  order: Number
}
```

### Template

```javascript
{
  id: String,
  name: String,
  description: String,
  preview: String, // URL to preview image
  isPremium: Boolean
}
```

## User Flows

### User Onboarding and Gallery Creation

1. User signs up/logs in
2. User is prompted to choose a website template
3. User uploads photos and organizes them into galleries/albums
4. User customizes gallery appearance (layout, colors)
5. User publishes their gallery
6. User can initiate social sharing from their published gallery

### Subscription Management

1. User navigates to account settings
2. User views current plan and options to upgrade/downgrade
3. User initiates subscription payment via Stripe
4. User's account status is updated upon successful payment

## Design System

### Layout

- **Grid**: 12-column fluid grid with 24px gutters
- **Container**: max-width-7xl with px-6 padding

### Motion

- **Easing**: cubic-bezier(0.22,1,0.36,1)
- **Duration**:
  - Base: 250ms
  - Fast: 150ms

### Design Tokens

#### Colors

- **Background**: hsl(0, 0%, 98%)
- **Accent**: hsl(210, 85%, 50%)
- **Primary**: hsl(19, 85%, 50%)
- **Surface**: hsl(0, 0%, 100%)
- **Text Primary**: hsl(220, 7%, 15%)
- **Text Secondary**: hsl(220, 7%, 35%)

#### Border Radius

- **Large**: 16px
- **Medium**: 10px
- **Small**: 6px

#### Spacing

- **Large**: 20px
- **Medium**: 12px
- **Small**: 8px

#### Typography

- **Body**: text-base font-normal leading-7
- **Display**: text-5xl font-extrabold
- **Heading**: text-2xl font-bold

#### Shadows

- **Card**: 0 8px 24px hsla(210, 50%, 10%, 0.12)

### Components

The application includes the following key components:

- **AppShell**: Main layout component with navigation
- **GalleryGrid**: Displays photos in different layouts (masonry, grid, slideshow)
- **ImageUpload**: Handles photo uploads with drag-and-drop functionality
- **SocialShareButton**: Enables sharing to various social platforms
- **StripeCheckout**: Handles subscription payments
- **SEOHelmet**: Manages SEO and social sharing metadata

## API Integrations

### Cloudinary

Used for image uploading, storage, optimization, and CDN delivery.

- **Upload Widget**: Allows users to upload images directly to Cloudinary
- **Image Transformations**: Enables resizing, cropping, and optimization
- **CDN Delivery**: Provides fast image loading worldwide

### Stripe

Used for subscription payment processing.

- **Elements**: Secure payment form components
- **Payment Intents**: Server-side payment processing
- **Subscriptions**: Recurring billing management

### Open Graph Protocol

Implemented for rich social sharing previews.

- **Meta Tags**: Dynamic meta tags for each gallery
- **Preview Images**: First gallery image used as preview
- **Social Platforms**: Support for Facebook, Twitter, LinkedIn

## Deployment

The application is deployed using Vercel with the following configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CLOUDINARY_UPLOAD_PRESET`
  - `VITE_STRIPE_PUBLISHABLE_KEY`

## Security Considerations

- **API Keys**: All sensitive keys are stored as environment variables
- **Authentication**: JWT-based authentication (to be implemented)
- **Image Uploads**: Cloudinary upload presets configured to prevent abuse
- **Payment Processing**: All payment data handled by Stripe, never stored in our application
- **Content Security Policy**: Implemented to prevent XSS attacks
- **HTTPS**: All traffic encrypted using HTTPS

