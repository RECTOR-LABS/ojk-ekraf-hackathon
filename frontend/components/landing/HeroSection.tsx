'use client';

import { Button } from '../ui';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-neutral-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content (60%) */}
          <div className="flex flex-col space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium w-fit">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              OJK-Compliant | Sepolia Testnet
            </div>

            {/* Headline - Bahasa Indonesia */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-neutral-900 leading-tight">
                Lindungi <span className="text-primary-600">Karya Kreatif</span> Anda dengan Blockchain
              </h1>

              {/* Subheadline - English */}
              <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed">
                Indonesia's first platform for blockchain copyright registration and automated royalties
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button variant="primary" size="large" className="w-full sm:w-auto">
                  Protect Your Work Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>

              <Link href="#how-it-works">
                <Button variant="outline" size="large" className="w-full sm:w-auto">
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-primary-600">1,000+</div>
                <div className="text-xs sm:text-sm text-neutral-600 mt-1">Creators</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-display text-primary-600">5,000+</div>
                <div className="text-xs sm:text-sm text-neutral-600 mt-1">Works Protected</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold font-display text-primary-600">$50K+</div>
                <div className="text-xs sm:text-sm text-neutral-600 mt-1">In Royalties</div>
              </div>
            </div>
          </div>

          {/* Right: Visual (40%) */}
          <div className="relative lg:order-last order-first">
            {/* Animated Illustration Placeholder */}
            <div className="relative w-full aspect-square">
              {/* Main Circle - Copyright Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-2xl flex items-center justify-center animate-pulse">
                  <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400 rounded-lg shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                <div className="flex items-center justify-center h-full">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
                <div className="flex items-center justify-center h-full">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-1/2 right-8 w-16 h-16 bg-success-400 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
                <div className="flex items-center justify-center h-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
