# Critter Cards

![Critter Cards Logo](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400)

## Showcase your animal's best moments with beautiful, shareable galleries.

Critter Cards is a simple, template-based website builder for pet owners to create and share customizable photo galleries.

## Features

- **Template-Based Site Builder**: Choose from pre-designed website templates optimized for displaying animal photos.
- **Customizable Photo Galleries**: Various elegant display layouts (masonry, slideshow, grid) for showcasing animal photos.
- **Simple Photo Upload & Organization**: Intuitive drag-and-drop interface for uploading photos with album organization.
- **Social Sharing Integration**: One-click sharing buttons for individual photos or entire gallery pages.

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-6357.git
   cd this-is-a-6357
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Tech Stack

- **Frontend**: React, React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Image Hosting**: Cloudinary
- **Payments**: Stripe
- **Deployment**: Vercel

## Project Structure

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

## Business Model

Critter Cards uses a subscription-based business model:
- **Basic Plan**: $5/month for basic features
- **Premium Plan**: $10/month for premium layouts and social sharing

## Documentation

- [Technical Documentation](./TECHNICAL_DOCS.md)
- [API Documentation](./src/api/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pet photos from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI inspiration from various pet websites and photo galleries

