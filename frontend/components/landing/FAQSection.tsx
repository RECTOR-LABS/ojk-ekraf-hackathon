'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Apa itu blockchain copyright?',
    questionEn: 'What is blockchain copyright?',
    answer: 'Blockchain copyright is a method of registering your creative work on the blockchain network, creating an immutable and timestamped proof of ownership. Unlike traditional copyright registration which can take weeks, blockchain registration happens in seconds and cannot be altered or deleted.',
    answerBi: 'Hak cipta blockchain adalah metode mendaftarkan karya kreatif Anda di jaringan blockchain, menciptakan bukti kepemilikan yang permanen dan bertanda waktu. Berbeda dengan pendaftaran hak cipta tradisional yang memakan waktu berminggu-minggu, pendaftaran blockchain terjadi dalam hitungan detik dan tidak dapat diubah atau dihapus.',
  },
  {
    question: 'Berapa biaya yang diperlukan?',
    questionEn: 'How much does it cost?',
    answer: 'Registration is free - you only pay network gas fees (approximately $2-5 on mainnet, FREE on Sepolia testnet). Our platform fee is only 2.5% on sales, which is significantly lower than traditional platforms (10-15%). There are no monthly subscriptions or hidden fees.',
    answerBi: 'Pendaftaran gratis - Anda hanya membayar biaya gas jaringan (sekitar $2-5 di mainnet, GRATIS di testnet Sepolia). Biaya platform kami hanya 2.5% dari penjualan, jauh lebih rendah dari platform tradisional (10-15%). Tidak ada biaya berlangganan bulanan atau biaya tersembunyi.',
  },
  {
    question: 'Apakah legal di Indonesia?',
    questionEn: 'Is it legal in Indonesia?',
    answer: 'Yes! Karya Chain is built to be compliant with Indonesian regulations, specifically designed to support EKRAF (Ekonomi Kreatif) initiatives. Blockchain-based copyright registration is recognized as valid proof of ownership. We work within the regulatory framework set by OJK and support the acceleration of Indonesia\'s creative economy.',
    answerBi: 'Ya! Karya Chain dibangun untuk mematuhi regulasi Indonesia, khususnya dirancang untuk mendukung inisiatif EKRAF (Ekonomi Kreatif). Pendaftaran hak cipta berbasis blockchain diakui sebagai bukti kepemilikan yang sah. Kami bekerja dalam kerangka regulasi yang ditetapkan oleh OJK dan mendukung akselerasi ekonomi kreatif Indonesia.',
  },
  {
    question: 'Bagaimana cara kerja royalti?',
    questionEn: 'How do royalties work?',
    answer: 'When you mint an NFT, you set a royalty percentage (5-20%). Every time your NFT is resold in the future, you automatically receive that percentage. This is powered by the ERC-2981 royalty standard, which is built into the smart contract. Payments are instant and transparent - no intermediaries needed.',
    answerBi: 'Ketika Anda mint NFT, Anda menetapkan persentase royalti (5-20%). Setiap kali NFT Anda dijual kembali di masa depan, Anda secara otomatis menerima persentase tersebut. Ini didukung oleh standar royalti ERC-2981, yang dibangun ke dalam smart contract. Pembayaran instan dan transparan - tidak perlu perantara.',
  },
  {
    question: 'Bagaimana jika saya tidak punya crypto?',
    questionEn: 'What if I don\'t have crypto?',
    answer: 'You\'ll need a small amount of ETH to pay for gas fees (transaction costs on the blockchain). For the Sepolia testnet, you can get free test ETH from faucets. We provide links and instructions to help you get started. In the future, we plan to add fiat on-ramp options to make it even easier.',
    answerBi: 'Anda akan membutuhkan sejumlah kecil ETH untuk membayar biaya gas (biaya transaksi di blockchain). Untuk testnet Sepolia, Anda bisa mendapatkan ETH test gratis dari faucet. Kami menyediakan tautan dan instruksi untuk membantu Anda memulai. Di masa depan, kami berencana menambahkan opsi fiat on-ramp untuk membuatnya lebih mudah.',
  },
  {
    question: 'Apakah karya saya aman?',
    questionEn: 'Is my work safe?',
    answer: 'Yes! Your actual files are stored on IPFS (InterPlanetary File System), a decentralized storage network. The blockchain only stores the proof of ownership and metadata. Your files are encrypted and distributed across multiple nodes, making them highly resistant to censorship or loss. You always retain full ownership and control.',
    answerBi: 'Ya! File asli Anda disimpan di IPFS (InterPlanetary File System), jaringan penyimpanan terdesentralisasi. Blockchain hanya menyimpan bukti kepemilikan dan metadata. File Anda dienkripsi dan didistribusikan ke beberapa node, membuatnya sangat tahan terhadap sensor atau kehilangan. Anda selalu mempertahankan kepemilikan dan kontrol penuh.',
  },
  {
    question: 'Berapa lama proses registrasi?',
    questionEn: 'How long does registration take?',
    answer: 'Registration typically takes 30 seconds to 2 minutes. The process involves: (1) Uploading your file to IPFS (~10-30 seconds), (2) Signing the transaction in your wallet (~5 seconds), and (3) Blockchain confirmation (~15-30 seconds). Once confirmed, your copyright is permanently registered and you can download your certificate immediately.',
    answerBi: 'Registrasi biasanya memakan waktu 30 detik hingga 2 menit. Prosesnya meliputi: (1) Mengunggah file Anda ke IPFS (~10-30 detik), (2) Menandatangani transaksi di wallet Anda (~5 detik), dan (3) Konfirmasi blockchain (~15-30 detik). Setelah dikonfirmasi, hak cipta Anda terdaftar secara permanen dan Anda dapat mengunduh sertifikat Anda segera.',
  },
  {
    question: 'Apa perbedaan dengan platform NFT lain?',
    questionEn: 'What\'s different from other NFT platforms?',
    answer: 'Karya Chain is specifically built for Indonesian creators with copyright protection as the primary focus. Unlike OpenSea or Rarible which are general NFT marketplaces, we integrate copyright registration BEFORE minting, ensuring legal protection. We also have lower fees (2.5% vs 10-15%), built-in royalty enforcement, and support for Indonesian language and local regulations.',
    answerBi: 'Karya Chain dibangun khusus untuk kreator Indonesia dengan perlindungan hak cipta sebagai fokus utama. Tidak seperti OpenSea atau Rarible yang merupakan marketplace NFT umum, kami mengintegrasikan pendaftaran hak cipta SEBELUM minting, memastikan perlindungan hukum. Kami juga memiliki biaya lebih rendah (2.5% vs 10-15%), penegakan royalti bawaan, dan dukungan untuk bahasa Indonesia dan regulasi lokal.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600">
            Pertanyaan yang Sering Diajukan
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-primary-500 transition-colors duration-200"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-neutral-500 italic">
                    {faq.questionEn}
                  </p>
                </div>

                {/* Toggle Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer Panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 space-y-4">
                  {/* English Answer */}
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">
                      English:
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Bahasa Indonesia Answer */}
                  <div className="border-l-4 border-secondary-500 pl-4">
                    <p className="text-sm font-semibold text-secondary-600 mb-2 uppercase tracking-wide">
                      Bahasa Indonesia:
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      {faq.answerBi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-neutral-600 mb-4">
            Masih ada pertanyaan? Hubungi tim support kami
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@karyachain.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
