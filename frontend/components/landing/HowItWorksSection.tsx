import { Button } from '../ui';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Register Copyright',
    titleId: 'Daftarkan Hak Cipta',
    description: 'Upload your work and register it on the blockchain. Get tamper-proof verification in just 30 seconds.',
    descriptionId: 'Unggah karya Anda dan daftarkan di blockchain. Dapatkan verifikasi yang tidak dapat diubah dalam 30 detik.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    estimatedTime: '~30 seconds',
  },
  {
    number: 2,
    title: 'Mint NFT',
    titleId: 'Mint NFT',
    description: 'Convert your registered copyright to an NFT with embedded royalties (5-20%). Set your terms and ownership proof.',
    descriptionId: 'Ubah hak cipta terdaftar menjadi NFT dengan royalti tersemat (5-20%). Tetapkan syarat dan bukti kepemilikan Anda.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    estimatedTime: '~2 minutes',
  },
  {
    number: 3,
    title: 'Earn Forever',
    titleId: 'Hasilkan Selamanya',
    description: 'Sell on marketplace and receive automatic royalty payments on every future resale. Your work, your income, forever.',
    descriptionId: 'Jual di marketplace dan terima pembayaran royalti otomatis di setiap penjualan berikutnya. Karya Anda, penghasilan Anda, selamanya.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    estimatedTime: 'Lifetime royalties',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Three simple steps to protect your creative work and earn lifetime royalties
          </p>
          <p className="text-lg text-neutral-500 mt-2">
            Tiga langkah sederhana untuk melindungi karya kreatif Anda
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200" style={{ top: '8rem' }}></div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Card */}
                <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center text-white
                      ${index === 0 ? 'bg-gradient-to-br from-primary-500 to-primary-600' : ''}
                      ${index === 1 ? 'bg-gradient-to-br from-secondary-500 to-secondary-600' : ''}
                      ${index === 2 ? 'bg-gradient-to-br from-accent-500 to-accent-600' : ''}
                    `}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold font-display text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-3 font-medium">
                      {step.titleId}
                    </p>
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Estimated Time Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.estimatedTime}
                    </div>
                  </div>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-6 text-neutral-300 z-0">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/register">
            <Button variant="primary" size="large">
              Start Now - Register Your First Work
            </Button>
          </Link>
          <p className="text-sm text-neutral-500 mt-4">
            No credit card required • Free to register • Only pay gas fees
          </p>
        </div>
      </div>
    </section>
  );
}
