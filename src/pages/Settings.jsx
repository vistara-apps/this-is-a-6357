import React, { useState } from 'react'
import { Crown, Check, CreditCard, User, Bell, Shield, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import StripeCheckout from '../components/StripeCheckout'

function Settings() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState('subscription')
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const tabs = [
    { id: 'subscription', name: 'Subscription', icon: Crown },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
  ]

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$5',
      period: 'month',
      features: [
        'Up to 10 galleries',
        'Basic templates',
        '100 photos per gallery',
        'Basic social sharing',
        'Email support'
      ],
      current: user.subscriptionStatus === 'basic'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$10',
      period: 'month',
      features: [
        'Unlimited galleries',
        'Premium templates',
        'Unlimited photos',
        'Advanced social sharing',
        'Priority support',
        'Custom branding',
        'Analytics dashboard'
      ],
      current: user.subscriptionStatus === 'premium',
      popular: true
    }
  ]

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      {/* Current plan */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              Current Plan: {user.subscriptionStatus === 'premium' ? 'Premium' : 'Basic'}
            </h3>
            <p className="text-purple-100">
              {user.subscriptionStatus === 'premium' 
                ? 'You have access to all premium features' 
                : 'Upgrade to unlock premium templates and features'
              }
            </p>
          </div>
          <Crown className="w-8 h-8 text-yellow-300" />
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative bg-white rounded-lg shadow-card p-6 border-2 transition-all duration-200
              ${plan.current ? 'border-purple-500' : 'border-gray-200 hover:border-purple-300'}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            {plan.current && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
                <span className="text-text-secondary ml-1">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`
                w-full py-3 rounded-lg font-medium transition-colors
                ${plan.current
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }
              `}
              disabled={plan.current}
              onClick={() => {
                if (!plan.current) {
                  setSelectedPlan(plan)
                  setShowCheckout(true)
                }
              }}
            >
              {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Billing info */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Billing Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-text-secondary">Next billing date</span>
            <span className="font-medium text-text-primary">January 15, 2024</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-text-secondary">Payment method</span>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-text-primary">•••• 4242</span>
            </div>
          </div>
          <div className="pt-3">
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Update payment method
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Profile Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Display Name
          </label>
          <input
            type="text"
            defaultValue="Pet Lover"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="pt-4">
          <button className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Notification Preferences</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">Email Notifications</h4>
            <p className="text-sm text-text-secondary">Receive updates about your galleries</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">Marketing Emails</h4>
            <p className="text-sm text-text-secondary">Tips and feature updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderPrivacyTab = () => (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Privacy Settings</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">Public Galleries</h4>
            <p className="text-sm text-text-secondary">Allow your galleries to be discovered publicly</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="pt-4 border-t">
          <button className="text-red-600 hover:text-red-700 font-medium">
            Delete Account
          </button>
          <p className="text-sm text-text-secondary mt-1">
            This will permanently delete your account and all galleries
          </p>
        </div>
      </div>
    </div>
  )

  const handleCheckoutSuccess = () => {
    // In a real app, this would update the user's subscription status
    setTimeout(() => {
      setShowCheckout(false)
      // Simulate subscription update
      alert('Subscription updated successfully!')
    }, 1500)
  }

  const handleCheckoutCancel = () => {
    setShowCheckout(false)
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Settings</h1>
            <p className="text-text-secondary">
              Manage your account, subscription, and preferences
            </p>
          </div>
        </div>
        
        {/* Checkout Modal */}
        {showCheckout && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative">
              <button
                onClick={handleCheckoutCancel}
                className="absolute -top-4 -right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-gray-500 hover:text-gray-700 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <StripeCheckout
                planId={selectedPlan.id}
                planName={selectedPlan.name}
                amount={selectedPlan.price.replace('$', '')}
                onSuccess={handleCheckoutSuccess}
                onCancel={handleCheckoutCancel}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'subscription' && renderSubscriptionTab()}
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
