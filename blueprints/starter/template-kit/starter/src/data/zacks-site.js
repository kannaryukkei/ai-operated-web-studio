// ZACKS Starter demo content.
// Business facts and catalog values are based on the audited ZACKS fallback catalog.
// Reconcile with the live Laravel catalog and owner approval before production launch.

export const site = {
  name: 'ZACKS Detailing',
  descriptor: 'HOME SERVICE DETAILING',
  contentMode: 'portfolio-demo',
  whatsappNumber: '6282359713072',
  whatsappMessage: 'Halo ZACKS Detailing, saya ingin konsultasi tentang layanan home service detailing.',
  baseLocation: 'Wonorejo, Surabaya',
  serviceAreas: ['Surabaya', 'Sidoarjo', 'Gresik'],
  instagram: 'https://www.instagram.com/zacksdetailing.id/',
  tiktok: 'https://www.tiktok.com/@zacksdetailing.id',
  heroImage: 'https://images.unsplash.com/photo-1769641156620-48f014424c4f?auto=format&fit=crop&w=2400&q=90',
  approachImage: 'https://images.unsplash.com/photo-1771491237209-b89bc7290588?auto=format&fit=crop&w=1500&q=88',
};

export const vehicleClasses = {
  MOBIL: [
    { size: 'S', name: 'City car', examples: 'Agya · Brio · Jazz' },
    { size: 'M', name: 'Sedan & MPV kecil', examples: 'Avanza · Xenia · Vios' },
    { size: 'L', name: 'SUV & MPV menengah', examples: 'Innova · Xpander · CR-V' },
    { size: 'XL', name: 'SUV & MPV besar', examples: 'Fortuner · Pajero · Alphard' },
  ],
  MOTOR: [
    { size: 'S', name: 'Motor harian', examples: 'Beat · Mio · Vario' },
    { size: 'M', name: 'Matic besar', examples: 'NMAX · PCX · Aerox' },
    { size: 'L', name: 'Sport / besar', examples: 'XMAX · Ninja 250' },
    { size: 'XL', name: 'Kapasitas besar', examples: 'Harley-Davidson · moge' },
  ],
};

export const packages = [
  {
    id: 'mobil-express', vehicle: 'MOBIL', name: 'Express', subtitle: 'Perawatan rutin',
    description: 'Menjaga mobil tetap bersih dan terawat untuk menemani aktivitas sehari-hari.',
    features: ['Pembersihan eksterior', 'Interior ringan', 'Velg & ban', 'Wax'],
    prices: { S: 150000, M: 175000, L: 200000, XL: 225000 },
  },
  {
    id: 'mobil-signature', vehicle: 'MOBIL', name: 'Signature', subtitle: 'Full detailing',
    description: 'Pembersihan eksterior dan interior yang lebih menyeluruh.',
    features: ['Eksterior & interior menyeluruh', 'Velg & ban', 'Ruang mesin', 'Wax hingga 3 bulan'],
    prices: { S: 375000, M: 425000, L: 475000, XL: 525000 },
    featured: true,
  },
  {
    id: 'mobil-deep-detail', vehicle: 'MOBIL', name: 'Deep Detail', subtitle: 'Pembersihan mendalam',
    description: 'Pembersihan mendalam sampai ke detail yang jarang terjangkau, termasuk area di balik jok.',
    features: ['Eksterior & interior mendalam', 'Bongkar jok', 'Velg & ban', 'Ruang mesin', 'Wax'],
    prices: { S: 650000, M: 750000, L: 850000, XL: 950000 },
  },
  {
    id: 'motor-express', vehicle: 'MOTOR', name: 'Express', subtitle: 'Quick refresh',
    description: 'Pembersihan untuk perawatan rutin motor Anda.',
    features: ['Pembersihan bodi', 'Jok', 'Roda & ban', 'Area mesin terjangkau', 'Wax'],
    prices: { S: 145000, M: 165000, L: 195000, XL: 225000 },
  },
  {
    id: 'motor-signature', vehicle: 'MOTOR', name: 'Signature', subtitle: 'Full detailing',
    description: 'Pembersihan lebih menyeluruh, termasuk pembongkaran jok.',
    features: ['Pembersihan bodi', 'Jok dengan pembongkaran', 'Roda & ban', 'Area mesin terjangkau'],
    prices: { S: 225000, M: 265000, L: 315000, XL: 375000 },
  },
  {
    id: 'motor-deep-detail', vehicle: 'MOTOR', name: 'Deep Detail', subtitle: 'Deep clean + polish',
    description: 'Pembersihan mendalam dengan poles 1-step dan finishing untuk membantu meningkatkan kilap cat serta mengurangi swirl atau baret ringan.',
    features: ['Detailing menyeluruh', 'Poles 1-step', 'Finishing', 'Wax'],
    prices: { S: 345000, M: 395000, L: 495000, XL: 595000 },
    featured: true,
  },
];

export const additionalTreatments = [
  {
    id: 'interior-only', category: 'MOBIL', name: 'Interior Only', label: 'Fokus interior',
    description: 'Pilihan untuk kebutuhan yang berfokus pada jok dan area kabin tanpa mengambil paket lengkap.',
    startingPrice: 350000, priceNote: 'Harga mengikuti kelas ukuran mobil.',
  },
  {
    id: 'poles', category: 'MOBIL & MOTOR', name: 'Paint polishing', label: 'Restore the gloss',
    description: 'Tahapan poles 1-step, 2-step, atau 3-step menyesuaikan kondisi cat dan target hasil. Baret dalam belum tentu dapat dihilangkan.',
    startingPrice: 150000, priceNote: 'Mulai dari poles motor 1-step; harga bergantung kendaraan dan tahapan.',
  },
  {
    id: 'coating', category: 'MOBIL & MOTOR', name: 'Paint coating', label: 'Surface protection',
    description: 'Lapisan perlindungan pada permukaan cat. Persiapan, produk, dan kondisi kendaraan menentukan estimasi akhir.',
    startingPrice: 400000, priceNote: 'Estimasi awal coating motor; harga final dikonfirmasi admin.',
  },
  {
    id: 'odor-removal', category: 'MOBIL', name: 'Odor removal', label: 'Cabin refresh',
    description: 'Penanganan bau tidak sedap pada interior mobil, disesuaikan dengan sumber dan kondisi bau.',
    startingPrice: 100000, priceNote: 'Harga acuan mulai; sumber bau perlu dikonsultasikan.',
  },
];

export const benefits = [
  {
    number: '01',
    title: 'Dinilai dari kebutuhan',
    text: 'Kebutuhan dan kondisi kendaraan dibicarakan lebih dulu agar pilihan perawatan tidak berlebihan.',
  },
  {
    number: '02',
    title: 'Lingkup lebih jelas',
    text: 'Cakupan pekerjaan, estimasi, dan biaya perjalanan bila ada dijelaskan sebelum jadwal disepakati.',
  },
  {
    number: '03',
    title: 'Dicek sebelum selesai',
    text: 'Anda dapat memeriksa hasil pengerjaan sebelum pembayaran dilakukan sesuai kesepakatan.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Ceritakan kebutuhan',
    text: 'Kirim jenis kendaraan, model, kebutuhan, dan area umum melalui WhatsApp. Alamat lengkap belum perlu dikirim di awal.',
  },
  {
    number: '02',
    title: 'Bahas treatment & jadwal',
    text: 'Admin membantu mencocokkan kebutuhan, kelas kendaraan, cakupan pekerjaan, estimasi biaya perjalanan, dan ketersediaan.',
  },
  {
    number: '03',
    title: 'Periksa dan setujui harga',
    text: 'Kondisi kendaraan diperiksa. Lingkup dan harga final dijelaskan, lalu pekerjaan hanya dimulai setelah Anda setuju.',
  },
  {
    number: '04',
    title: 'Pengerjaan & cek hasil',
    text: 'Setelah pekerjaan selesai, Anda memeriksa hasilnya. Pembayaran dilakukan sesuai kesepakatan.',
  },
];

export const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1761312834150-4beefff097a7?auto=format&fit=crop&w=1700&q=88',
    alt: 'Mobil hitam dengan busa pembersih pada proses pencucian eksterior',
    title: 'Exterior care',
    category: '01 / EXTERIOR',
    caption: 'Visual referensi untuk demo',
    credit: 'Willian Cittadin',
    creditUrl: 'https://unsplash.com/photos/black-car-covered-in-soap-suds-during-wash-bCQSrcYghJI',
  },
  {
    src: 'https://images.unsplash.com/photo-1771491237209-b89bc7290588?auto=format&fit=crop&w=1300&q=88',
    alt: 'Proses pembersihan detail pada dashboard interior kendaraan',
    title: 'Interior detailing',
    category: '02 / INTERIOR',
    caption: 'Visual referensi untuk demo',
    credit: 'Luay Barani',
    creditUrl: 'https://unsplash.com/photos/man-cleaning-car-dashboard-with-brush-pdMgepnEapo',
  },
  {
    src: 'https://images.unsplash.com/photo-1759825045061-ac853e131f60?auto=format&fit=crop&w=1300&q=88',
    alt: 'Skuter sedang dicuci di area layanan kendaraan',
    title: 'Motorcycle care',
    category: '03 / MOTORCYCLE',
    caption: 'Visual referensi untuk demo',
    credit: 'Matt Johnson',
    creditUrl: 'https://unsplash.com/photos/man-washing-a-motorcycle-under-a-green-roof-t_q2HUUMQMs',
  },
];

export const photoCredits = [
  { name: 'Avenir Visuals', url: 'https://unsplash.com/photos/man-washing-a-car-covered-in-foam-8s9GAPUMimY' },
  ...gallery.map(({ credit, creditUrl }) => ({ name: credit, url: creditUrl })),
];

export const faqs = [
  {
    question: 'Apakah ZACKS datang ke lokasi pelanggan?',
    answer: 'Ya. ZACKS menyediakan layanan home service di Surabaya, Sidoarjo, dan Gresik. Sebutkan kota serta area umum terlebih dahulu agar admin dapat memeriksa ketersediaan.',
  },
  {
    question: 'Apakah mengirim form konsultasi berarti sudah booking?',
    answer: 'Belum. Form konsultasi hanya menyusun pesan WhatsApp untuk admin; data tidak disimpan oleh website. Jadwal baru terkonfirmasi setelah admin membalas dan menyepakatinya bersama Anda.',
  },
  {
    question: 'Bagaimana menentukan kelas kendaraan saya?',
    answer: 'Gunakan contoh model pada panduan kelas sebagai acuan. Jika masih ragu, sebutkan merek dan model kendaraan saat konsultasi; admin membantu menentukan kelasnya dan kelas final dikonfirmasi saat pemeriksaan.',
  },
  {
    question: 'Apakah harga di website sudah final?',
    answer: 'Harga yang ditampilkan merupakan acuan awal per kelas kendaraan. Harga final, lingkup pekerjaan, dan biaya perjalanan bila ada dikonfirmasi sebelum pengerjaan dimulai.',
  },
  {
    question: 'Apa perbedaan Signature dan Deep Detail untuk mobil?',
    answer: 'Signature berfokus pada pembersihan eksterior dan interior menyeluruh tanpa bongkar jok. Deep Detail mencakup bongkar jok agar area tersembunyi seperti sela dan bagian bawah jok dapat dijangkau.',
  },
  {
    question: 'Apa perbedaan Signature dan Deep Detail untuk motor?',
    answer: 'Signature mencakup pembongkaran jok untuk menjangkau area yang sulit dibersihkan. Deep Detail tidak mencakup bongkar jok, tetapi dilengkapi poles 1-step sebagai finishing untuk membantu mengurangi swirl ringan.',
  },
  {
    question: 'Apakah poles bisa menghilangkan baret?',
    answer: 'Poles membantu meningkatkan kilap dan mengurangi swirl atau baret ringan. Baret dalam belum tentu hilang sepenuhnya; hasil yang realistis dijelaskan saat pemeriksaan.',
  },
  {
    question: 'Apa yang perlu disiapkan untuk layanan home service?',
    answer: 'Pelanggan perlu menyediakan akses air dan listrik serta area parkir yang aman dan cukup luas untuk kendaraan dan aktivitas pengerjaan.',
  },
  {
    question: 'Kapan sebaiknya saya menghubungi ZACKS untuk booking?',
    answer: 'Kami menyarankan konsultasi minimal H-1 agar jadwal dapat dipersiapkan. Permintaan di hari yang sama tetap bisa dibahas selama slot tersedia dan dikonfirmasi admin.',
  },
  {
    question: 'Apakah ada biaya perjalanan untuk home service?',
    answer: 'Lokasi spesifik dan ketersediaan dikonfirmasi admin. Untuk area Gresik, biaya transportasi tambahan dapat berlaku dan nominalnya dikonfirmasi berdasarkan lokasi serta kebutuhan kunjungan.',
  },
  {
    question: 'Seberapa luas area yang perlu disiapkan?',
    answer: 'Idealnya tersedia area untuk satu mobil dengan ruang gerak sekitar satu meter di setiap sisi kendaraan. Area harus aman dan memungkinkan tim bekerja dengan leluasa.',
  },
  {
    question: 'Kapan pembayaran dilakukan?',
    answer: 'Pembayaran dilakukan setelah pekerjaan selesai dan Anda memeriksa hasilnya, sesuai kesepakatan sebelum pengerjaan.',
  },
];

export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

export const formatWhatsAppLink = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;


export const advisorNeeds = [
  {
    id: 'routine',
    label: 'Perawatan rutin',
    description: 'Kendaraan dipakai setiap hari dan butuh penyegaran berkala.',
  },
  {
    id: 'complete',
    label: 'Pembersihan menyeluruh',
    description: 'Ingin membersihkan lebih banyak area eksterior dan interior.',
  },
  {
    id: 'deep',
    label: 'Detail lebih mendalam',
    description: 'Ada area tersembunyi atau bagian yang perlu perhatian ekstra.',
  },
  {
    id: 'gloss',
    label: 'Kilap dan kondisi cat',
    description: 'Ingin meningkatkan kilap atau menangani swirl dan baret ringan.',
  },
  {
    id: 'cabin',
    label: 'Fokus pada interior',
    description: 'Prioritas utama ada pada jok dan area kabin mobil.',
    vehicle: 'MOBIL',
  },
  {
    id: 'odor',
    label: 'Bau tidak sedap',
    description: 'Ingin mendiskusikan sumber bau pada interior mobil.',
    vehicle: 'MOBIL',
  },
];

export const sampleReviews = [
  {
    id: 'story-01',
    category: 'CAR CARE / DAILY DRIVER',
    quote: 'Saya ingin mobil bersih tanpa harus mengubah jadwal seharian. Yang paling membantu adalah bisa membahas kebutuhan dan estimasi lebih dulu.',
    persona: 'Raka P.',
    vehicle: 'Family SUV',
    tag: 'SIMULATED CUSTOMER STORY',
  },
  {
    id: 'story-02',
    category: 'MOTORCYCLE / WEEKLY RIDE',
    quote: 'Motor dipakai hampir setiap hari. Saya lebih suka perawatan yang sesuai kebutuhan, bukan sekadar mengambil paket paling mahal.',
    persona: 'Dimas A.',
    vehicle: 'Urban scooter',
    tag: 'SIMULATED CUSTOMER STORY',
  },
  {
    id: 'story-03',
    category: 'DETAILING / INTERIOR RESET',
    quote: 'Bagian kabin sering terlewat saat dibersihkan sendiri. Konsultasi membantu saya memahami cakupan pekerjaan sebelum menentukan layanan.',
    persona: 'Nadia K.',
    vehicle: 'Compact crossover',
    tag: 'SIMULATED CUSTOMER STORY',
  },
];

export const demoMetrics = [
  { value: '1,250+', label: 'VEHICLES CARED FOR', detail: 'Portfolio demonstration metric' },
  { value: '4.9/5', label: 'CUSTOMER EXPERIENCE', detail: 'Portfolio demonstration metric' },
  { value: '92%', label: 'RETURNING CUSTOMERS', detail: 'Portfolio demonstration metric' },
  { value: '03', label: 'SERVICE AREAS', detail: 'Surabaya · Sidoarjo · Gresik' },
];
