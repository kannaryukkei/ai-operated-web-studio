import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  additionalTreatments,
  advisorNeeds,
  benefits,
  faqs,
  formatRupiah,
  formatWhatsAppLink,
  gallery,
  packages,
  photoCredits,
  processSteps,
  site,
  vehicleClasses,
} from './data/zacks-site.js';

function getLocalDateISO(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function Brand({ footer = false }) {
  return (
    <a className={`brand ${footer ? 'brand--footer' : ''}`} href="#beranda" aria-label="ZACKS Detailing — beranda">
      <span className="brand-symbol" aria-hidden="true">Z</span>
      <span className="brand-wordmark"><strong>ZACKS</strong><small>DETAILING</small></span>
    </a>
  );
}

function WhatsAppButton({ children = 'Konsultasi via WhatsApp', className = '', message }) {
  return (
    <a className={className} href={formatWhatsAppLink(message)} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={16} strokeWidth={2} />
      <span>{children}</span>
      <ArrowUpRight size={15} />
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, light = false, className = '' }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''} ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['#treatments', 'Treatment'],
    ['#process', 'Cara kerja'],
    ['#coverage', 'Area layanan'],
    ['#faq', 'FAQ'],
    ['#booking', 'Konsultasi'],
  ];
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <WhatsAppButton className="button button--header" />
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Navigasi mobile">
          {nav.map(([href, label]) => <a key={href} href={href} onClick={close}>{label}<ArrowUpRight size={15} /></a>)}
          <WhatsAppButton className="button button--mobile" />
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="beranda">
      <img className="hero-photo" src={site.heroImage} alt="Foto referensi kendaraan dalam proses pencucian dan detailing; bukan dokumentasi pekerjaan pelanggan ZACKS." fetchPriority="high" />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="live-dot" /> HOME SERVICE DETAILING <i /> SURABAYA, INDONESIA</div>
          <h1>Waktu Anda tetap jalan. <em>Kendaraan tetap terawat.</em></h1>
          <p className="hero-description">
            Detailing mobil dan motor yang datang ke lokasi Anda. Dari perawatan rutin
            hingga pembersihan lebih menyeluruh, pilih treatment sesuai kondisi dan kebutuhan kendaraan.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#treatments">Temukan treatment <ArrowRight size={16} /></a>
            <WhatsAppButton className="button button--outline">Konsultasi dulu</WhatsAppButton>
          </div>
          <div className="hero-location"><MapPin size={15} /><span>Surabaya · Sidoarjo · Gresik</span></div>
        </div>
        <div className="hero-aside">
          <span className="hero-aside-eyebrow">THE ZACKS APPROACH</span>
          <div className="hero-aside-card">
            <span className="hero-aside-number">Z / 01</span>
            <div><small>CARE THAT COMES TO YOU</small><strong>Dirawat di tempat Anda.</strong></div>
            <a href="#approach" aria-label="Pelajari pendekatan ZACKS"><ArrowUpRight size={19} /></a>
          </div>
          <div className="hero-image-caption"><span>YOUR PLACE. YOUR TIME.</span><span>VISUAL REFERENCE</span></div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span><b>01</b> HOME SERVICE</span>
        <span><b>02</b> MOBIL & MOTOR</span>
        <span><b>03</b> HARGA DISETUJUI DI AWAL</span>
        <a href="#treatments">EXPLORE TREATMENTS <ArrowDown size={14} /></a>
      </div>
    </section>
  );
}

function VehicleAndTreatments() {
  const [vehicle, setVehicle] = useState('MOBIL');
  const [size, setSize] = useState('S');
  const visiblePackages = packages.filter((item) => item.vehicle === vehicle);
  const selectedClass = vehicleClasses[vehicle].find((item) => item.size === size);

  return (
    <section className="section treatments-section" id="treatments">
      <div className="container">
        <div className="treatments-heading">
          <SectionHeading
            eyebrow="01 / SIGNATURE TREATMENTS"
            title={<>Right care. <em>For every ride.</em></>}
            description="Setiap kendaraan punya karakter dan kebutuhan berbeda. Kenali kelas kendaraan Anda, lalu pilih perawatan yang paling sesuai."
          />
          <div className="vehicle-tabs" role="group" aria-label="Pilih jenis kendaraan">
            {['MOBIL', 'MOTOR'].map((type) => (
              <button
                className={vehicle === type ? 'vehicle-tab is-active' : 'vehicle-tab'}
                key={type}
                type="button"
                aria-pressed={vehicle === type}
                onClick={() => { setVehicle(type); setSize('S'); }}
              >
                <span>{type === 'MOBIL' ? '01' : '02'}</span>{type === 'MOBIL' ? 'Mobil' : 'Motor'}
              </button>
            ))}
          </div>
        </div>

        <div className="vehicle-class-panel">
          <div className="vehicle-class-heading">
            <div><span className="micro-label">KENALI KELAS KENDARAAN</span><strong>{vehicle === 'MOBIL' ? 'Car size guide' : 'Motorcycle size guide'}</strong></div>
            <p>Pilih kelas sebagai acuan harga. Jika ragu, admin akan membantu mencocokkan model kendaraan Anda.</p>
          </div>
          <div className="class-options" role="group" aria-label="Pilih kelas kendaraan">
            {vehicleClasses[vehicle].map((item) => (
              <button
                key={item.size}
                type="button"
                className={size === item.size ? 'class-option is-active' : 'class-option'}
                aria-pressed={size === item.size}
                onClick={() => setSize(item.size)}
              >
                <span>{item.size}</span>
                <strong>{item.name}</strong>
                <small>{item.examples}</small>
              </button>
            ))}
          </div>
          <p className="class-disclaimer">Contoh model adalah panduan visual, bukan patokan mutlak. Kelas akhir dikonfirmasi berdasarkan model dan kondisi kendaraan.</p>
        </div>

        <div className="package-heading-row">
          <div><span className="micro-label">THE TREATMENT MENU</span><h3>Pilih sesuai kebutuhan.</h3></div>
          <span className="active-class-indicator">{vehicle} / CLASS {size} <i /> {selectedClass?.name}</span>
        </div>

        <div className="package-grid">
          {visiblePackages.map((item, index) => (
            <article className={`package-card ${item.featured ? 'package-card--featured' : ''}`} key={item.id}>
              <div className="package-meta"><span>0{index + 1} / {item.subtitle}</span>{item.featured && <span className="recommended"><Sparkles size={11} /> RECOMMENDED</span>}</div>
              <div className="package-title-row"><h4>{item.name}</h4><span>{vehicle === 'MOBIL' ? 'CAR' : 'MOTO'}</span></div>
              <p className="package-description">{item.description}</p>
              <div className="package-price"><small>CLASS {size} · HARGA ACUAN</small><strong>{formatRupiah(item.prices[size])}</strong></div>
              <ul className="package-features">{item.features.map((feature) => <li key={feature}><Check size={13} />{feature}</li>)}</ul>
              <WhatsAppButton
                className="package-link"
                message={`Halo ZACKS Detailing, saya ingin konsultasi paket ${item.name} untuk ${vehicle.toLowerCase()} kelas ${size} (${selectedClass?.name}).`}
              >
                Detail & konsultasi <ArrowUpRight size={15} />
              </WhatsAppButton>
            </article>
          ))}
        </div>
        <div className="price-integrity-note"><ShieldCheck size={17} /><p><strong>Harga transparan, tanpa menebak.</strong> Angka ditampilkan sebagai acuan per kelas kendaraan. Lingkup, harga final, dan biaya perjalanan bila ada akan dikonfirmasi sebelum pengerjaan.</p></div>
      </div>
    </section>
  );
}


function CareFinder() {
  const [vehicle, setVehicle] = useState('MOBIL');
  const [need, setNeed] = useState('routine');
  const needs = advisorNeeds.filter((item) => !item.vehicle || item.vehicle === vehicle);
  const selectedNeed = needs.find((item) => item.id === need) || needs[0];

  const recommendation = (() => {
    if (need === 'cabin') return additionalTreatments.find((item) => item.id === 'interior-only');
    if (need === 'odor') return additionalTreatments.find((item) => item.id === 'odor-removal');
    if (need === 'gloss') return additionalTreatments.find((item) => item.id === 'poles');
    const name = need === 'routine' ? 'Express' : need === 'complete' ? 'Signature' : 'Deep Detail';
    return packages.find((item) => item.vehicle === vehicle && item.name === name);
  })();

  const isPackage = Boolean(recommendation?.prices);
  const price = isPackage ? recommendation.prices.S : recommendation?.startingPrice;
  const message = `Halo ZACKS, saya ingin konsultasi rekomendasi treatment. Kendaraan: ${vehicle.toLowerCase()}. Kebutuhan: ${selectedNeed?.label}. Rekomendasi awal: ${recommendation?.name}. Mohon bantu cek kecocokan treatment dan estimasi final.`;

  return (
    <section className="section care-finder-section" id="care-finder">
      <div className="container care-finder-layout">
        <div className="care-finder-copy">
          <SectionHeading
            eyebrow="02 / FIND YOUR RIGHT CARE"
            title={<>Not sure what to choose? <em>Start here.</em></>}
            description="Jawab dua pertanyaan singkat. Care Finder akan memberi titik awal rekomendasi berdasarkan kebutuhan yang Anda pilih."
          />
          <div className="care-finder-note"><ShieldCheck size={17} /><span>Rekomendasi awal, bukan diagnosis kondisi kendaraan. Lingkup dan harga tetap dikonfirmasi sebelum pengerjaan.</span></div>
        </div>
        <div className="care-finder-panel">
          <div className="finder-topline"><span>PERSONALIZED TREATMENT GUIDE</span><span>01 — 02</span></div>
          <div className="finder-question">
            <span>01 / KENDARAAN ANDA</span>
            <div className="finder-vehicle-tabs">
              {['MOBIL', 'MOTOR'].map((type) => (
                <button key={type} type="button" className={vehicle === type ? 'is-active' : ''} onClick={() => { setVehicle(type); if (need === 'cabin' || need === 'odor') setNeed('routine'); }}>
                  <span>{type === 'MOBIL' ? 'CAR' : 'MOTO'}</span><strong>{type === 'MOBIL' ? 'Mobil' : 'Motor'}</strong>
                </button>
              ))}
            </div>
          </div>
          <div className="finder-question">
            <span>02 / APA YANG PALING ANDA BUTUHKAN?</span>
            <div className="finder-needs">
              {needs.map((item) => (
                <button key={item.id} type="button" className={need === item.id ? 'is-active' : ''} aria-pressed={need === item.id} onClick={() => setNeed(item.id)}>
                  <span>{item.label}</span><small>{item.description}</small><ArrowUpRight size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className="finder-result">
            <div><span>YOUR STARTING POINT</span><small>{recommendation?.label || recommendation?.subtitle}</small><strong>{recommendation?.name}</strong><p>{recommendation?.description}</p></div>
            <div className="finder-price"><small>{isPackage ? 'ACUAN MULAI · KELAS S' : 'ACUAN MULAI'}</small><strong>{formatRupiah(price || 0)}</strong></div>
            <WhatsAppButton className="button button--primary" message={message}>Diskusikan rekomendasi</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="philosophy-section" id="approach">
      <div className="container philosophy-grid">
        <div className="philosophy-photo">
          <img src={site.approachImage} alt="Foto referensi proses pembersihan interior kendaraan; bukan dokumentasi pekerjaan pelanggan ZACKS." loading="lazy" />
          <div className="photo-overlay-caption"><span>THE ZACKS STANDARD</span><strong>Care is intentional.</strong></div>
          <span className="photo-index">02 / OUR APPROACH</span>
        </div>
        <div className="philosophy-copy">
          <SectionHeading
            eyebrow="02 / THE PHILOSOPHY"
            title={<>Good care starts with <em>understanding.</em></>}
            description="Merawat kendaraan bukan sekadar memilih paket paling lengkap. Kondisi kendaraan, area yang perlu ditangani, dan hasil yang diharapkan perlu dipahami lebih dulu."
            light
          />
          <div className="principle-list">
            {benefits.map((item) => (
              <article className="principle" key={item.number}>
                <span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight size={16} />
              </article>
            ))}
          </div>
          <p className="philosophy-footnote">INSPECT THE NEED. AGREE ON THE WORK. CARE FOR THE RESULT.</p>
        </div>
      </div>
    </section>
  );
}

function AdditionalTreatments() {
  return (
    <section className="section additional-section" id="additional">
      <div className="container">
        <div className="additional-heading">
          <SectionHeading
            eyebrow="03 / MORE WAYS TO CARE"
            title={<>More than a wash. <em>Care with a purpose.</em></>}
            description="Ada kebutuhan yang lebih spesifik? Layanan tambahan tersedia untuk kondisi dan area kendaraan tertentu."
          />
          <span className="side-index">ADD-ON MENU<br /><strong>04 SERVICES</strong></span>
        </div>
        <div className="additional-grid">
          {additionalTreatments.map((item, index) => (
            <article className="additional-card" key={item.id}>
              <div className="additional-top"><span>0{index + 1} / {item.category}</span><ArrowUpRight size={17} /></div>
              <small>{item.label}</small>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="additional-price"><span>ACUAN MULAI</span><strong>{formatRupiah(item.startingPrice)}</strong></div>
              <span className="additional-note">{item.priceNote}</span>
              <WhatsAppButton
                className="additional-link"
                message={`Halo ZACKS, saya ingin konsultasi layanan tambahan ${item.name}.`}
              >Tanya layanan <ArrowUpRight size={14} /></WhatsAppButton>
            </article>
          ))}
        </div>
        <p className="additional-disclaimer">Harga layanan tambahan adalah acuan awal dari katalog fallback. Ketersediaan, kondisi permukaan, tahapan, dan harga final dikonfirmasi admin sebelum pengerjaan.</p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-heading">
          <SectionHeading
            eyebrow="04 / VISUAL SHOWCASE"
            title={<>The details make <em>the difference.</em></>}
            description="Lihat suasana dan detail perawatan kendaraan melalui visual referensi. Materi demo ini bukan dokumentasi pekerjaan pelanggan ZACKS."
          />
          <div className="gallery-side-note"><span>SELECTED VISUALS</span><strong>001 — 003</strong></div>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure className={`gallery-item gallery-item--${index + 1}`} key={item.src}>
              <div className="gallery-photo">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="gallery-category">{item.category}</span>
                <span className="gallery-open"><ArrowUpRight size={18} /></span>
              </div>
              <figcaption>
                <div><strong>{item.title}</strong><span>{item.caption}</span></div>
                <a href={item.creditUrl} target="_blank" rel="noopener noreferrer">PHOTO: {item.credit.toUpperCase()}</a>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="gallery-disclaimer">Demo imagery sourced from Unsplash. Visual references only — not a claim of completed ZACKS customer work.</p>
      </div>
    </section>
  );
}


function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="container process-layout">
        <div className="process-intro">
          <SectionHeading
            eyebrow="05 / HOW IT WORKS"
            title={<>Clear from the <em>first message.</em></>}
            description="Dari konsultasi pertama sampai kendaraan selesai dirawat. Anda tahu apa yang akan dikerjakan dan berapa biayanya sebelum pekerjaan dimulai."
          />
          <div className="process-count"><strong>04</strong><span>LANGKAH<br />MENUJU KENDARAAN TERAWAT</span></div>
        </div>
        <ol className="process-list">
          {processSteps.map((step) => (
            <li key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowUpRight size={17} /></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section className="coverage-section" id="coverage">
      <div className="container coverage-inner">
        <div className="coverage-copy">
          <span className="eyebrow eyebrow--light">06 / HOME SERVICE AREA</span>
          <h2>Your place.<br /><em>Our care.</em></h2>
          <p>
            ZACKS berbasis di {site.baseLocation} dan melayani home service di Surabaya,
            Sidoarjo, serta Gresik. Lokasi spesifik, ketersediaan, dan biaya perjalanan dikonfirmasi admin.
          </p>
          <div className="coverage-tags">{site.serviceAreas.map((area, i) => <span key={area}><b>0{i + 1}</b>{area}</span>)}</div>
          <WhatsAppButton className="button button--outline coverage-button" message="Halo ZACKS, saya ingin mengecek ketersediaan layanan home service untuk area saya.">Cek area layanan</WhatsAppButton>
        </div>
        <div className="coverage-art">
          <div className="coverage-rings"><span /><span /><span /></div>
          <div className="coverage-center"><MapPin size={25} /></div>
          <div className="coverage-stamp"><small>BASE LOCATION</small><strong>Wonorejo</strong><span>Surabaya · East Java</span></div>
          <span className="coverage-art-label">WE COME<br />TO YOU.</span>
        </div>
      </div>
      <div className="container readiness-strip">
        <div><span>BEFORE WE ARRIVE</span><strong>Siapkan area pengerjaan.</strong></div>
        <p>Akses air, listrik, dan area parkir yang aman serta cukup luas diperlukan untuk menunjang proses home service.</p>
      </div>
    </section>
  );
}

function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    vehicle: 'MOBIL',
    model: '',
    treatment: '',
    area: 'Surabaya',
    phone: '',
    preferredDate: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(null);

  const treatmentOptions = useMemo(
    () => [
      ...packages.filter((item) => item.vehicle === form.vehicle).map((item) => ({ value: item.name, label: `${item.name} — ${item.subtitle}` })),
      ...additionalTreatments.filter((item) => item.category.includes(form.vehicle) || item.category === 'MOBIL & MOTOR').map((item) => ({ value: item.name, label: item.name })),
      { value: 'Belum yakin', label: 'Belum yakin — minta rekomendasi' },
    ],
    [form.vehicle],
  );

  const update = (key, value) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [key]: value, ...(key === 'vehicle' ? { treatment: '' } : {}) }));
  };

  const submit = (event) => {
    event.preventDefault();
    const message = [
      'Halo ZACKS Detailing, saya ingin konsultasi layanan home service.',
      '',
      `Nama: ${form.name}`,
      `Jenis kendaraan: ${form.vehicle === 'MOBIL' ? 'Mobil' : 'Motor'}`,
      `Nomor WhatsApp: ${form.phone || 'Akan menghubungi dari nomor ini'}`,
      `Merek / model: ${form.model}`,
      `Treatment: ${form.treatment || 'Belum ditentukan'}`,
      `Area: ${form.area}`,
      `Tanggal pilihan: ${form.preferredDate || 'Fleksibel / diskusi dengan admin'}`,
      form.notes ? `Catatan: ${form.notes}` : '',
      '',
      'Mohon bantu cek rekomendasi, estimasi harga, dan ketersediaan. Saya memahami jadwal belum terkonfirmasi sampai admin membalas.',
    ].filter(Boolean).join('\n');
    const whatsappUrl = formatWhatsAppLink(message);
    const popup = window.open(whatsappUrl, '_blank');
    if (popup) popup.opener = null;
    setSubmitted({ opened: Boolean(popup), url: whatsappUrl });
  };

  return (
    <section className="section booking-section" id="booking">
      <div className="container booking-layout">
        <div className="booking-copy">
          <SectionHeading
            eyebrow="07 / LET'S TALK ABOUT YOUR VEHICLE"
            title={<>A better ride starts with <em>a conversation.</em></>}
            description="Belum yakin memilih paket? Ceritakan kendaraan dan kebutuhannya. Tim ZACKS akan membantu menjelaskan pilihan treatment dan estimasi sebelum Anda memutuskan."
          />
          <div className="booking-promises">
            <span><Check size={14} /> Konsultasi tanpa komitmen booking</span>
            <span><Check size={14} /> Harga dikonfirmasi sebelum pengerjaan</span>
            <span><Check size={14} /> Data tidak disimpan oleh website</span>
          </div>
        </div>

        <form className="booking-form" onSubmit={submit}>
          <div className="form-heading"><span>WHATSAPP CONSULTATION</span><strong>Ceritakan kendaraan Anda.</strong><small>01 — 05 / INFORMASI AWAL</small></div>
          <label>Nama<input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Nama Anda" autoComplete="name" /></label>
          <div className="form-row">
            <label>Jenis kendaraan<select value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)}><option value="MOBIL">Mobil</option><option value="MOTOR">Motor</option></select></label>
            <label>Area layanan<select value={form.area} onChange={(e) => update('area', e.target.value)}><option>Surabaya</option><option>Sidoarjo</option><option>Gresik</option></select></label>
          </div>
          <label>Nomor WhatsApp <span className="optional">(opsional)</span><input inputMode="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="08xxxxxxxxxx" autoComplete="tel" /></label>
          <label>Merek / model kendaraan<input required value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="Contoh: Honda HR-V / Yamaha NMAX" /></label>
          <label>Treatment yang diminati<select value={form.treatment} onChange={(e) => update('treatment', e.target.value)}><option value="">Pilih treatment</option>{treatmentOptions.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
          <label>Tanggal yang diinginkan <span className="optional">(opsional)</span><input type="date" min={getLocalDateISO()} value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} /></label>
          <label>Catatan tambahan <span className="optional">(opsional)</span><textarea rows="3" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Ceritakan kondisi kendaraan atau area yang ingin ditangani..." /></label>
          <button className="button button--primary form-submit" type="submit">Lanjutkan ke WhatsApp <ArrowUpRight size={16} /></button>
          {submitted?.opened && <p className="form-feedback" role="status">WhatsApp terbuka dengan pesan konsultasi. Kirim pesan di sana untuk melanjutkan dan menunggu konfirmasi admin.</p>}
          {submitted && !submitted.opened && (
            <div className="form-feedback form-feedback--fallback" role="status">
              <span>Browser memblokir jendela baru. Buka WhatsApp melalui tautan ini untuk melanjutkan:</span>
              <a href={submitted.url} target="_blank" rel="noopener noreferrer">Buka WhatsApp <ArrowUpRight size={14} /></a>
            </div>
          )}
          <p className="form-disclaimer">Form ini hanya menyusun pesan WhatsApp. Informasi tidak disimpan di website dan pengiriman form bukan konfirmasi booking.</p>
        </form>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <SectionHeading
            eyebrow="08 / GOOD TO KNOW"
            title={<>Good care starts with <em>clear answers.</em></>}
            description="Jawaban singkat untuk membantu Anda merasa lebih siap sebelum konsultasi."
          />
          <WhatsAppButton className="button button--dark">Tanya langsung</WhatsAppButton>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary><span><i>0{index + 1}</i>{faq.question}</span><ChevronDown size={18} /></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <div className="contact-orbit"><span /><span /></div>
        <span className="eyebrow eyebrow--light">ZACKS DETAILING / SURABAYA</span>
        <h2>Good care starts<br />with <em>a conversation.</em></h2>
        <p>Mulai dengan cerita singkat tentang kendaraan Anda. Kami bantu temukan perawatan yang masuk akal.</p>
        <WhatsAppButton className="button button--light">Chat ZACKS Detailing</WhatsAppButton>
        <span className="contact-footnote">NO PRESSURE. JUST A CLEAR CONVERSATION.</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block"><Brand footer /><p>Detailing mobil dan motor dengan layanan home service. Surabaya, Sidoarjo, dan Gresik.</p></div>
        <div className="footer-nav"><span>EXPLORE</span><a href="#treatments">Treatment</a><a href="#approach">Our approach</a><a href="#gallery">Gallery</a><a href="#faq">FAQ</a></div>
        <div className="footer-social"><span>CONNECT</span><a href={site.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={14} /> Instagram <ArrowUpRight size={12} /></a><a href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok <ArrowUpRight size={12} /></a><WhatsAppButton className="footer-wa" /></div>
      </div>
      <div className="footer-legal">
        <div className="container footer-legal-inner">
          <span>© {new Date().getFullYear()} ZACKS Detailing. All rights reserved.</span>
          <div className="footer-photo-credits">
            <span>PHOTO CREDITS</span>
            {photoCredits.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>)}
          </div>
          {site.contentMode === 'portfolio-demo' && <span className="footer-demo-note">PORTFOLIO DEMO · SAMPLE DATA</span>}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <Header />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <VehicleAndTreatments />
        <CareFinder />
        <Philosophy />
        <AdditionalTreatments />
        <Gallery />
        <Process />
        <Coverage />
        <BookingForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <a className="floating-whatsapp" href={formatWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="Hubungi ZACKS melalui WhatsApp"><MessageCircle size={20} /></a>
    </>
  );
}
