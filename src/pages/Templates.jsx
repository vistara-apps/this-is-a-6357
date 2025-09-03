import React from 'react'
import { Link } from 'react-router-dom'
import { Crown, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Templates() {
  const { templates, user } = useApp()

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8 text-center">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-text-primary mb-4">
              Choose Your Template
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select from our collection of beautiful templates designed specifically for pet photo galleries
            </p>
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-card overflow-hidden group hover:shadow-xl transition-all duration-200">
              {/* Template preview */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Premium badge */}
                {template.isPremium && (
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    <Crown className="w-3 h-3" />
                    <span>Premium</span>
                  </div>
                )}

                {/* Overlay with action */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <Link
                    to={`/create?template=${template.id}`}
                    className={`
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white
                      ${template.isPremium && user.subscriptionStatus !== 'premium'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }
                    `}
                  >
                    <span>
                      {template.isPremium && user.subscriptionStatus !== 'premium' ? 'Upgrade to Use' : 'Use Template'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Template info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {template.name}
                  </h3>
                  {template.isPremium && (
                    <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Action button */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/create?template=${template.id}`}
                    className={`
                      inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
                      ${template.isPremium && user.subscriptionStatus !== 'premium'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }
                    `}
                  >
                    <span>
                      {template.isPremium && user.subscriptionStatus !== 'premium' ? 'Upgrade Required' : 'Select Template'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {template.isPremium && user.subscriptionStatus !== 'premium' && (
                    <span className="text-xs text-text-secondary">
                      Premium Only
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade prompt for basic users */}
        {user.subscriptionStatus !== 'premium' && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-card p-6 lg:p-8 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-3">
                Unlock Premium Templates
              </h3>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Get access to all premium templates, advanced customization options, and priority support with our Premium plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/settings"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Upgrade to Premium
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Continue with Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Templates