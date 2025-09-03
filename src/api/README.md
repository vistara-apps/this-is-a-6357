# Critter Cards API Documentation

This document outlines the API integrations used in the Critter Cards application.

## Table of Contents

1. [Cloudinary API](#cloudinary-api)
2. [Stripe API](#stripe-api)
3. [Open Graph Protocol](#open-graph-protocol)

## Cloudinary API

Cloudinary is used for image uploading, storage, optimization, and CDN delivery for galleries.

### Configuration

```javascript
// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
```

### Upload Process

1. Create a FormData object with the image file and upload preset
2. Send a POST request to the Cloudinary upload endpoint
3. Receive the response with the uploaded image URL and other metadata
4. Store the Cloudinary URL in the application state

### Example Usage

```javascript
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

### Image Transformations

Cloudinary allows for on-the-fly image transformations through URL parameters:

- Resize: `w_300,h_200,c_fill`
- Crop: `c_crop,g_face`
- Format conversion: `f_auto`
- Quality optimization: `q_auto`

Example URL with transformations:
```
https://res.cloudinary.com/demo/image/upload/w_300,h_200,c_fill/sample.jpg
```

## Stripe API

Stripe is used for handling subscription payments securely.

### Configuration

```javascript
// Stripe configuration
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('your_publishable_key');
```

### Payment Flow

1. Customer selects a subscription plan
2. Application creates a payment intent on the server
3. Customer enters payment details in the Stripe Elements form
4. Stripe validates and processes the payment
5. Application updates the user's subscription status

### Example Usage

```javascript
// Client-side code
const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!stripe || !elements) {
    return;
  }
  
  setProcessing(true);
  
  try {
    // Call your backend to create a payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId }),
    });
    
    const data = await response.json();
    
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.target.name.value,
        },
      },
    });
    
    if (result.error) {
      setError(result.error.message);
    } else {
      setSucceeded(true);
      onSuccess();
    }
  } catch (err) {
    setError('An unexpected error occurred');
  } finally {
    setProcessing(false);
  }
};
```

### Server-side Implementation (Node.js)

```javascript
// Server-side code (not included in this frontend-only demo)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  const { planId } = req.body;
  
  // Get plan details from database
  const plan = await getPlanFromDatabase(planId);
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price * 100, // Stripe uses cents
      currency: 'usd',
      metadata: {
        planId: planId,
      },
    });
    
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
```

## Open Graph Protocol

Open Graph Protocol is implemented to enable rich previews when sharing gallery links on social media.

### Implementation

Open Graph meta tags are added to the `<head>` of each gallery page using React Helmet:

```javascript
<Helmet>
  <meta property="og:title" content={gallery.title} />
  <meta property="og:description" content={gallery.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:image" content={galleryFirstImageUrl} />
  <meta property="og:site_name" content="Critter Cards" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={gallery.title} />
  <meta name="twitter:description" content={gallery.description} />
  <meta name="twitter:image" content={galleryFirstImageUrl} />
</Helmet>
```

### Testing Open Graph Tags

You can test your Open Graph implementation using these tools:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Security Considerations

- Cloudinary upload presets should be properly configured to prevent abuse
- Stripe payments should always be processed server-side
- API keys should be stored securely and never exposed in client-side code
- Rate limiting should be implemented to prevent abuse

## Error Handling

All API integrations include proper error handling to provide a smooth user experience:

- Graceful fallbacks when APIs are unavailable
- Clear error messages for users
- Logging for debugging purposes
- Retry mechanisms for transient failures

