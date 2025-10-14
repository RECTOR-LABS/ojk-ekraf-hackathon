import { Button } from '../ui';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Register Copyright',
    titleId: 'Daftarkan Hak Cipta',
    description: 'Upload your work and register it on the blockchain. Get tamper-proof verification in just 30 seconds.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    estimatedTime: '~30 seconds',
    gradient: 'from-primary-500 to-secondary-500',
    glowColor: 'shadow-primary-500/20',
  },
  {
    number: 2,
    title: 'Mint NFT',
    titleId: 'Mint NFT',
    description: 'Convert your registered copyright to an NFT with embedded royalties (5-20%). Set your terms and ownership proof.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    estimatedTime: '~2 minutes',
    gradient: 'from-secondary-500 to-accent-500',
    glowColor: 'shadow-secondary-500/20',
  },
  {
    number: 3,
    title: 'Earn Forever',
    titleId: 'Hasilkan Selamanya',
    description: 'Sell on marketplace and receive automatic royalty payments on every future resale. Your work, your income, forever.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    estimatedTime: 'Lifetime royalties',
    gradient: 'from-accent-500 to-success-500',
    glowColor: 'shadow-accent-500/20',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05)_0%,transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Animation */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Simple & Fast Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-neutral-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to <span className="text-primary-600 font-bold">protect your creative work</span> and earn <span className="text-accent-600 font-bold">lifetime royalties</span>
          </p>
          <p className="text-lg text-neutral-500 mt-3">
            Tiga langkah sederhana untuk melindungi karya kreatif Anda
          </p>
        </div>

        {/* Steps with Modern Design */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200 rounded-full transform -translate-y-1/2" style={{ top: '120px' }}></div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glassmorphic Card with Hover Effect */}
                <div className="relative glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-default">
                  {/* Gradient Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5 rounded-3xl`}></div>

                  {/* Floating Number Badge */}
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl ${step.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  {/* Icon with Glassmorphism */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className={`w-24 h-24 glass-strong rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${step.gradient} shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-4 font-semibold">
                      {step.titleId}
                    </p>
                    <p className="text-neutral-600 mb-6 leading-relaxed text-base">
                      {step.description}
                    </p>

                    {/* Time Badge with Glassmorphism */}
                    <div className="inline-flex items-center gap-2 px-5 py-3 glass-strong rounded-full text-sm font-bold text-neutral-800 shadow-lg">
                      <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.estimatedTime}
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary-200 rounded-tr-xl opacity-50"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-secondary-200 rounded-bl-xl opacity-50"></div>
                </div>

                {/* Animated Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-32 -right-6 z-20 items-center justify-center w-12 h-12 glass-strong rounded-full shadow-lg animate-pulse">
                    <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA with Premium Design */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <Link href="/register" className="group inline-block">
            <Button className="px-10 py-6 text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 rounded-2xl">
              <span className="flex items-center gap-3">
                Start Now - Register Your First Work
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </Link>
          <p className="text-sm text-neutral-500 mt-5 font-medium">
            No credit card required • Free to register • Only pay gas fees
          </p>
        </div>
      </div>
    </section>
  );
}
