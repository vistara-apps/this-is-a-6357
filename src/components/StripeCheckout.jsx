import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

function CheckoutForm({ planId, onSuccess, onCancel }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }
    
    setProcessing(true)
    
    try {
      // In a real implementation, you would call your backend to create a payment intent
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId }),
      // })
      // const data = await response.json()
      
      // For demo purposes, we'll simulate a successful payment
      setTimeout(async () => {
        // const result = await stripe.confirmCardPayment(data.clientSecret, {
        //   payment_method: {
        //     card: elements.getElement(CardElement),
        //     billing_details: {
        //       name: event.target.name.value,
        //     },
        //   },
        // })
        
        // if (result.error) {
        //   setError(result.error.message)
        //   setProcessing(false)
        // } else {
        //   setError(null)
        //   setSucceeded(true)
        //   onSuccess()
        // }
        
        // Simulate success for demo
        setError(null)
        setSucceeded(true)
        setProcessing(false)
        onSuccess()
      }, 2000)
    } catch (err) {
      console.error('Payment error:', err)
      setError('An unexpected error occurred. Please try again.')
      setProcessing(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Test card: 4242 4242 4242 4242, any future date, any CVC
          </p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {succeeded && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-600">Payment successful! Redirecting...</p>
        </div>
      )}
      
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className="btn-primary flex-1 flex justify-center items-center"
        >
          {processing ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function StripeCheckout({ planId, planName, amount, onSuccess, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Subscribe to {planName}
        </h2>
        <p className="text-text-secondary">
          You will be charged ${amount} per month
        </p>
      </div>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm 
          planId={planId} 
          onSuccess={onSuccess} 
          onCancel={onCancel} 
        />
      </Elements>
      
      <div className="mt-6 pt-4 border-t text-center">
        <p className="text-xs text-gray-500">
          Your subscription will automatically renew each month.
          You can cancel anytime from your account settings.
        </p>
      </div>
    </div>
  )
}

export default StripeCheckout

