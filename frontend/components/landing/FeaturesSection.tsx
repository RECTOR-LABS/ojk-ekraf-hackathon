const features = [
  {
    title: 'Instant Blockchain Copyright',
    titleId: 'Hak Cipta Blockchain Instan',
    description: 'Tamper-proof registration in seconds. Immutable proof of ownership stored on Ethereum blockchain.',
    descriptionId: 'Pendaftaran anti-manipulasi dalam hitungan detik. Bukti kepemilikan permanen tersimpan di blockchain Ethereum.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-primary-500 to-primary-600',
  },
  {
    title: 'Lifetime Royalties',
    titleId: 'Royalti Seumur Hidup',
    description: 'Earn automatically on every future sale. Built-in ERC-2981 royalty standard ensures perpetual income.',
    descriptionId: 'Dapatkan penghasilan otomatis di setiap penjualan berikutnya. Standar royalti ERC-2981 menjamin pendapatan berkelanjutan.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    title: 'OJK-Compliant',
    titleId: 'Sesuai Regulasi OJK',
    description: "Indonesia's first regulatory-compliant platform. Built for EKRAF creative economy acceleration.",
    descriptionId: 'Platform pertama di Indonesia yang sesuai regulasi. Dibangun untuk akselerasi ekonomi kreatif EKRAF.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    color: 'from-error-500 to-error-600',
  },
  {
    title: 'Low Fees',
    titleId: 'Biaya Rendah',
    description: 'Only 2.5% platform fee vs 10-15% elsewhere. More money in your pocket, fair for creators.',
    descriptionId: 'Hanya 2.5% biaya platform vs 10-15% di tempat lain. Lebih banyak uang untuk Anda, adil untuk kreator.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-accent-500 to-accent-600',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Why Choose Karya Chain?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Built for Indonesian creators with blockchain technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200 hover:border-transparent hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`
                  inline-flex items-center justify-center w-16 h-16 rounded-xl
                  bg-gradient-to-br ${feature.color} text-white
                  shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300
                `}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 mb-3 font-medium">
                {feature.titleId}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold font-display mb-2">30s</div>
              <div className="text-sm lg:text-base opacity-90">Registration Time</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold font-display mb-2">2.5%</div>
              <div className="text-sm lg:text-base opacity-90">Platform Fee</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold font-display mb-2">100%</div>
              <div className="text-sm lg:text-base opacity-90">Ownership Proof</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold font-display mb-2">∞</div>
              <div className="text-sm lg:text-base opacity-90">Lifetime Royalties</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
