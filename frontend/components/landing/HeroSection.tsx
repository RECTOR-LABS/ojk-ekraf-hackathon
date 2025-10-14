'use client';

import { Button } from '../ui';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 animate-gradient"></div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>

      {/* Animated Geometric Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Orb 1 */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-float-slow"></div>
        {/* Large Orb 2 */}
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-primary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        {/* Medium Orb */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-secondary-400/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left: Text Content */}
          <div className="flex flex-col space-y-8 animate-fade-in">

            {/* Badge with Glassmorphism */}
            <div className="inline-flex items-center gap-2 px-5 py-3 glass-strong rounded-full text-sm font-semibold text-white shadow-lg w-fit animate-scale-in">
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              OJK-Compliant • Sepolia Testnet
            </div>

            {/* Massive Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-display text-white leading-[1.1] tracking-tight animate-fade-in animate-delay-100">
                Lindungi{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent-200">
                    Karya Kreatif
                  </span>
                  <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-accent-400 to-secondary-400 opacity-50"></span>
                </span>
                {' '}Anda
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed font-medium animate-fade-in animate-delay-200">
                Indonesia's first platform for blockchain copyright registration and <span className="text-accent-200 font-bold">automated royalties</span>
              </p>
            </div>

            {/* CTAs with Premium Design */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
              <Link href="/register" className="group">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-white text-primary-600 hover:bg-accent-50 shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 rounded-2xl">
                  <span className="flex items-center gap-3">
                    Protect Your Work Now
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>

              <Link href="#how-it-works">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg font-bold glass-strong text-white border-2 border-white/30 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl backdrop-blur-md">
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Metrics with Glassmorphism */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in animate-delay-500">
              {[
                { value: '1,000+', label: 'Creators' },
                { value: '5,000+', label: 'Protected' },
                { value: '$50K+', label: 'Royalties' },
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className="glass-strong rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300 cursor-default"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{metric.value}</div>
                  <div className="text-sm sm:text-base text-white/80 font-medium mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Floating Illustration */}
          <div className="relative lg:order-last order-first animate-fade-in animate-delay-200">
            <div className="relative w-full aspect-square max-w-2xl mx-auto">

              {/* Main Center Circle with Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  {/* Glow Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-accent-300 to-secondary-300 rounded-full blur-3xl opacity-50 animate-glow-pulse"></div>

                  {/* Main Shield */}
                  <div className="relative glass-strong rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer group">
                    <svg className="w-40 h-40 sm:w-48 sm:h-48 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Card Icons */}
              <div className="absolute top-0 right-0 glass-card rounded-3xl p-6 shadow-2xl animate-float hover:scale-110 transition-transform duration-300 cursor-pointer group">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="absolute bottom-8 left-0 glass-card rounded-3xl p-6 shadow-2xl animate-float-slow hover:scale-110 transition-transform duration-300 cursor-pointer group" style={{ animationDelay: '1s' }}>
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-secondary-600 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="absolute top-1/2 right-4 glass-card rounded-3xl p-5 shadow-2xl animate-float hover:scale-110 transition-transform duration-300 cursor-pointer group" style={{ animationDelay: '1.5s' }}>
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-accent-600 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="absolute bottom-1/3 left-8 glass-card rounded-3xl p-5 shadow-2xl animate-float-slow hover:scale-110 transition-transform duration-300 cursor-pointer group" style={{ animationDelay: '2.5s' }}>
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-success-600 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass-strong rounded-full p-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
