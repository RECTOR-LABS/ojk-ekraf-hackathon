import { Button } from '../ui';
import Link from 'next/link';

const painPoints = [
  {
    question: 'Karya dicuri di Instagram tanpa izin?',
    questionEn: 'Work stolen on Instagram without permission?',
    solution: 'Blockchain copyright proves you are the original creator. Immutable timestamp protects your rights.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    question: 'Royalti musik tidak jelas?',
    questionEn: 'Music royalties unclear?',
    solution: 'Smart contracts automatically distribute royalties on every sale. Transparent, instant, and guaranteed.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    question: 'Foto dipakai komersial tanpa bayar?',
    questionEn: 'Photos used commercially without payment?',
    solution: 'NFT ownership with embedded royalties ensures you get paid for commercial use, now and forever.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function ForIndonesianCreatorsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Indonesian Batik Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #DC2626 0px, #DC2626 10px, transparent 10px, transparent 20px)`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Indonesian Flag Colors */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              <div className="w-12 h-8 bg-error-600 rounded"></div>
              <div className="w-12 h-8 bg-white border-2 border-neutral-300 rounded"></div>
            </div>
            <span className="text-2xl font-bold text-neutral-900">🇮🇩</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Untuk Kreator Indonesia
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Solusi blockchain untuk melindungi karya kreatif Anda dari pencurian dan memastikan penghasilan yang adil
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-neutral-200 hover:border-primary-500 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                  {point.icon}
                </div>
              </div>

              {/* Question (Bahasa) */}
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {point.question}
              </h3>

              {/* Question (English) */}
              <p className="text-sm text-neutral-500 italic mb-4">
                {point.questionEn}
              </p>

              {/* Solution */}
              <div className="border-t-2 border-primary-100 pt-4">
                <p className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">
                  Solusi Karya Chain:
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  {point.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Asset Type Showcase */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-neutral-200">
          <h3 className="text-3xl font-bold font-display text-center text-neutral-900 mb-12">
            Lindungi Semua Jenis Karya Kreatif Anda
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {[
              { name: 'Seni / Art', icon: '🎨', examples: 'Digital art, lukisan, ilustrasi' },
              { name: 'Musik / Music', icon: '🎵', examples: 'Lagu, beat, soundtrack' },
              { name: 'Fotografi / Photo', icon: '📸', examples: 'Foto komersial, editorial' },
              { name: 'Tulisan / Writing', icon: '📝', examples: 'Artikel, puisi, naskah' },
              { name: 'Desain / Design', icon: '✏️', examples: 'Logo, UI/UX, grafis' },
            ].map((type, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-3">{type.icon}</div>
                <h4 className="font-bold text-neutral-900 mb-1">{type.name}</h4>
                <p className="text-xs text-neutral-500">{type.examples}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/register">
              <Button variant="primary" size="large" className="shadow-xl">
                Lindungi Karya Anda Sekarang
              </Button>
            </Link>
            <p className="text-sm text-neutral-500 mt-4">
              Gratis untuk mendaftar • Biaya gas ~$2-5 (testnet gratis) • Royalti 5-20%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
