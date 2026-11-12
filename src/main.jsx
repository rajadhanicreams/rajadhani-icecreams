import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const whatsappUrl = 'https://wa.me/918217816199?text=Hi%20Rajadhani%2C%20I%27d%20like%20to%20know%20more.';
const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query=Rajadhani+Ice+Creams+Thrippunithura+Google+reviews';
const instagramUrl = 'https://www.instagram.com/rajadhaniicecream/';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

const flavors = [
  { name: 'Death By Chocolate', note: 'A rich sundae for chocolate lovers', image: '/products/death-by-chocolate.webp', color: '#6f3c23', accent: '#d49a69', theme: { background: '#332019', text: '#f9e8d5', muted: '#c6a58e', line: '#d49a6933', glow: '#d49a6933' } },
  { name: 'Karibean Cocktail', note: 'A chocolate sundae topped with cherry', image: '/products/karibean-cocktail.webp', color: '#93634e', accent: '#e2b28f', theme: { background: '#342923', text: '#f5e8dc', muted: '#c8b6a7', line: '#e2b28f33', glow: '#e2b28f33' } },
  { name: 'Rajadhani Special', note: 'Three scoops with a crunchy topping', image: '/products/rajadhani-special.webp', color: '#c78d36', accent: '#f0ce84', theme: { background: '#3b3020', text: '#fff2d6', muted: '#d2bd94', line: '#f0ce8433', glow: '#f0ce8433' } },
  { name: 'Berry Falooda', note: 'A fruity falooda layered with berries', image: '/products/berry-falooda.webp', color: '#d8818d', accent: '#f2b3bd', theme: { background: '#47282c', text: '#ffe8e5', muted: '#d5a9a7', line: '#f2b3bd33', glow: '#f2b3bd33' } },
  { name: 'Screwdriver', note: 'A tall, indulgent sundae', image: '/products/screwdriver.webp', color: '#7b492c', accent: '#d99c6b', theme: { background: '#332319', text: '#f9e8d5', muted: '#c5a58e', line: '#d99c6b33', glow: '#d99c6b33' } },
  { name: 'Watermelon Candy', note: 'A cool watermelon treat', image: '/products/watermelon-candy.webp', color: '#d75a69', accent: '#f4a0a5', theme: { background: '#3d2026', text: '#ffe8e5', muted: '#d5a6a7', line: '#f4a0a533', glow: '#f4a0a533' } },
  { name: 'Magic Lime', note: 'A refreshing lime ice pop', image: '/products/magic-lime.webp', color: '#4eb8d7', accent: '#9de6ef', theme: { background: '#173443', text: '#e3f7fa', muted: '#a4cbd2', line: '#9de6ef33', glow: '#9de6ef33' } },
  { name: 'Choco Crunch', note: 'Chocolate crunch to enjoy at home', image: '/products/choco-crunch.webp', color: '#2359bd', accent: '#8bb6ff', theme: { background: '#18223d', text: '#e8eeff', muted: '#a8b8d5', line: '#8bb6ff33', glow: '#8bb6ff33' } },
];

function Arrow({ direction = 'up-right', className = '' }) {
  return (
    <svg className={`arrow arrow-${direction} ${className}`.trim()} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 12 8-8M6.5 4H12v5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [storesOpen, setStoresOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const productRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll('.section-video');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          void target.play().catch(() => undefined);
        } else {
          target.pause();
        }
      });
    }, { threshold: 0.2 });
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [activeFlavor]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setStoresOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = storesOpen || menuOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen, storesOpen]);

  const scrollToProducts = () => productRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <header className={`nav-wrap ${menuOpen ? 'is-menu-open' : ''}`}>
        <nav className="nav container">
          <a className="wordmark" href="#top" aria-label="Rajadhani home">
            <img className="logo-image" src="/rajadhani-logo.png" alt="Rajadhani — The Ice Cream Capital" />
          </a>
          <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#flavors" onClick={() => setMenuOpen(false)}>Menu</a>
            <a href="#offers" onClick={() => setMenuOpen(false)}>What we do</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Find us</a>
            <a className="nav-order" href="#visit" onClick={() => setMenuOpen(false)}>Order a scoop <Arrow /></a>
          </div>
          <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-navigation">
            <span /><span />
          </button>
        </nav>
      </header>

      <section id="top" className="hero">
        <video className="section-video hero-video" autoPlay muted loop playsInline poster="/rajadhani-logo.jpeg">
          <source src="/sample-1.mp4" type="video/mp4" />
        </video>
        <div className="video-tint" />
        <div className="hero-snow" aria-hidden="true">
          <i style={{ '--snow-left': '7%', '--snow-size': '3px', '--snow-opacity': '.72', '--snow-duration': '11s', '--snow-delay': '-3s', '--snow-drift': '34px' }} />
          <i style={{ '--snow-left': '16%', '--snow-size': '5px', '--snow-opacity': '.9', '--snow-duration': '15s', '--snow-delay': '-10s', '--snow-drift': '-28px' }} />
          <i style={{ '--snow-left': '25%', '--snow-size': '4px', '--snow-opacity': '.65', '--snow-duration': '13s', '--snow-delay': '-6s', '--snow-drift': '42px' }} />
          <i style={{ '--snow-left': '34%', '--snow-size': '3px', '--snow-opacity': '.8', '--snow-duration': '17s', '--snow-delay': '-14s', '--snow-drift': '-36px' }} />
          <i style={{ '--snow-left': '43%', '--snow-size': '6px', '--snow-opacity': '.88', '--snow-duration': '12s', '--snow-delay': '-4s', '--snow-drift': '24px' }} />
          <i style={{ '--snow-left': '52%', '--snow-size': '4px', '--snow-opacity': '.7', '--snow-duration': '16s', '--snow-delay': '-12s', '--snow-drift': '-46px' }} />
          <i style={{ '--snow-left': '61%', '--snow-size': '3px', '--snow-opacity': '.82', '--snow-duration': '14s', '--snow-delay': '-8s', '--snow-drift': '38px' }} />
          <i style={{ '--snow-left': '70%', '--snow-size': '5px', '--snow-opacity': '.76', '--snow-duration': '18s', '--snow-delay': '-16s', '--snow-drift': '-30px' }} />
          <i style={{ '--snow-left': '78%', '--snow-size': '4px', '--snow-opacity': '.9', '--snow-duration': '13s', '--snow-delay': '-2s', '--snow-drift': '44px' }} />
          <i style={{ '--snow-left': '85%', '--snow-size': '3px', '--snow-opacity': '.68', '--snow-duration': '15s', '--snow-delay': '-11s', '--snow-drift': '-24px' }} />
          <i style={{ '--snow-left': '91%', '--snow-size': '5px', '--snow-opacity': '.8', '--snow-duration': '19s', '--snow-delay': '-7s', '--snow-drift': '32px' }} />
          <i style={{ '--snow-left': '97%', '--snow-size': '3px', '--snow-opacity': '.72', '--snow-duration': '12s', '--snow-delay': '-15s', '--snow-drift': '-40px' }} />
        </div>
        <div className="hud-corner hud-corner-left"><span>RJD / 01</span><i /></div>
        <div className="hud-corner hud-corner-right"><span>−08°C</span><i /></div>
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy container">
          <p className="eyebrow reveal">Crafting sweet moments since 1993</p>
          <h1 className="hero-title reveal reveal-delay-1">A little<br /><em>joy</em> in<br />every <span className="hero-scoop-word">scoop.</span></h1>
          <p className="hero-intro reveal reveal-delay-2">A neighbourhood favourite from Thrippunithura, serving scoops, sips and celebrations for over 30 years.</p>
          <button className="pill-button reveal reveal-delay-3" onClick={scrollToProducts}>Explore our menu <Arrow /></button>
          <div className="scroll-cue"><span>Scroll to wander</span><i /></div>
        </div>
        <div className="hero-product" style={{ transform: `translateY(${scrollY * 0.12}px) rotateY(${scrollY * 0.018}deg) scale(var(--hero-product-scale, 1))` }}>
          <div className="product-aura" />
          <span className="float-dot dot-a">✦</span><span className="float-dot dot-b">•</span><span className="float-dot dot-c">✦</span>
          <div className="scoop-shadow" />
          <div className="scoop-cone"><span>R</span></div>
          <div className="scoop scoop-pink" />
          <div className="scoop scoop-mint" />
          <div className="scoop scoop-yellow" />
          <div className="cherry">✦</div>
          <div className="product-label"><span>01</span><strong>Rajadhani<br />signature</strong><small>serving smiles / 1993</small></div>
        </div>
        <div className="hero-sticker"><span>EST.</span><strong>1993</strong><span>MADE WITH<br />HEART</span></div>
      </section>

      <section id="story" className="story section-pad">
        <div className="ice-grid" />
        <div className="frost-ring frost-ring-story" />
        <div className="container story-grid">
          <p className="eyebrow">The good stuff</p>
          <div className="story-content">
            <h2>A local favourite,<br /><em>made with care.</em></h2>
            <p>Since 1993, Rajadhani has been a favourite gathering place in Thrippunithura. Our ice creams are made at our own production facility in Kureekad, and everything we serve is 100% vegetarian.</p>
            <a className="text-link" href="#flavors">Explore our favourites <Arrow /></a>
          </div>
          <div className="story-product">
            <video className="story-product-video" autoPlay muted loop playsInline>
              <source src="/sample-2.mp4" type="video/mp4" />
            </video>
            <div className="story-product-copy"><span>MADE IN KUREEKAD</span><strong>Local roots.<br /><em>Sweet moments.</em></strong><small>Serving Thrippunithura since 1993</small></div>
            <div className="story-orb"><span>100%</span><small>vegetarian<br />offerings</small></div>
          </div>
        </div>
      </section>

      <section id="offers" className="offers-section section-pad">
        <div className="offers-grid" />
        <div className="container">
          <div className="offers-heading">
            <div>
              <p className="eyebrow">Beyond the scoop</p>
              <h2>What we <em>offer.</em></h2>
            </div>
            <p>From private-label production and reliable supply to joyful experiences at your next celebration.</p>
          </div>
          <div className="offers-list">
            <article className="offer-card">
              <div className="offer-card-number">01</div>
              <div className="offer-card-content">
                <span>For your brand</span>
                <h3>Private<br /><em>Label</em></h3>
                <p>White-label and private-label ice cream manufacturing from Rajadhani’s in-house production facility.</p>
                <a className="text-link" href="mailto:rajadhanicreams@gmail.com?subject=Private%20label%20enquiry">Start a conversation <Arrow /></a>
              </div>
              <div className="offer-orbit" />
            </article>
            <article className="offer-card offer-card-supply">
              <div className="offer-card-number">02</div>
              <div className="offer-card-content">
                <span>For your business</span>
                <h3>Supply<br /><em>&amp; distribution</em></h3>
                <p>Reliable ice cream supply and distribution for retailers, supermarkets and business partners.</p>
                <a className="text-link" href="mailto:rajadhanicreams@gmail.com?subject=Supply%20and%20distribution%20enquiry">Partner with us <Arrow /></a>
              </div>
              <div className="offer-orbit" />
            </article>
            <article className="offer-card offer-card-catering">
              <div className="offer-card-number">03</div>
              <div className="offer-card-content">
                <span>For every occasion</span>
                <h3>Bring the<br /><em>joy to you.</em></h3>
                <p>Make weddings, birthdays, school events, festivals and corporate gatherings extra sweet.</p>
                <ul>
                  <li>Ice cream &amp; dessert catering</li>
                  <li>Pop-up stalls</li>
                  <li>Live juice counters</li>
                </ul>
                <a className="text-link" href="mailto:rajadhanicreams@gmail.com?subject=Events%20and%20catering%20enquiry">Plan your event <Arrow /></a>
              </div>
              <div className="offer-orbit" />
            </article>
          </div>
        </div>
      </section>

      <section id="flavors" className="flavors-section section-pad" ref={productRef} style={{
        '--section-bg': flavors[activeFlavor].theme.background,
        '--section-text': flavors[activeFlavor].theme.text,
        '--section-muted': flavors[activeFlavor].theme.muted,
        '--section-line': flavors[activeFlavor].theme.line,
        '--section-glow': flavors[activeFlavor].theme.glow,
      }}>
        <div className="frost-cloud frost-cloud-three" />
        <div className="ice-grid" />
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sundaes, sips &amp; more</p>
              <h2>Favourites for<br /><em>every mood.</em></h2>
            </div>
            <p className="heading-note">Meet eight Rajadhani favourites, from rich chocolate sundaes to refreshing fruit treats.</p>
          </div>
          <div className="flavor-layout">
            <div className="flavor-list">
              {flavors.map((flavor, index) => (
                <button key={flavor.name} className={`flavor-row ${activeFlavor === index ? 'active' : ''}`} style={{ '--flavor-accent': flavor.accent }} onClick={() => setActiveFlavor(index)}>
                  <span className="flavor-index">0{index + 1}</span><span>{flavor.name}</span><Arrow className="flavor-arrow" />
                </button>
              ))}
            </div>
            <div className="flavor-feature" style={{ '--flavor-color': flavors[activeFlavor].color, '--flavor-accent': flavors[activeFlavor].accent }}>
              <img className="feature-image" src={flavors[activeFlavor].image} alt={flavors[activeFlavor].name} />
              <div className="feature-text"><span>RAJADHANI FAVOURITE</span><h3>{flavors[activeFlavor].name}</h3><p>{flavors[activeFlavor].note}</p></div>
              <span className="feature-number">0{activeFlavor + 1}</span>
            </div>
          </div>
          <div className="product-rail">
            <div><span>01</span><strong>Made in-house</strong><small>produced at Kureekad</small></div>
            <div><span>02</span><strong>100% vegetarian</strong><small>something for everyone</small></div>
            <div><span>03</span><strong>At your doorstep</strong><small>also on Swiggy &amp; Zomato</small></div>
          </div>
        </div>
      </section>

      <section id="visit" className="visit section-pad">
        <div className="frost-ring frost-ring-visit" />
        <div className="hud-corner hud-corner-visit"><span>COOL SYSTEM / ONLINE</span><i /></div>
        <div className="container visit-inner">
          <div className="visit-circle">
            <div className="visit-orbit visit-orbit-one" />
            <div className="visit-orbit visit-orbit-two" />
            <span>Drop by / 01</span>
            <strong>for a<br /><em>happy</em><br />little<br />break.</strong>
            <small>RJD / COOL POINT</small>
          </div>
          <div className="visit-details">
            <p className="eyebrow">Since 1993 / Thrippunithura, Kochi</p>
            <h2>Your corner<br />of <em>cool.</em></h2>
            <p>Drop by at Statue Junction, Kureekad or Mulanthuruthy. Or find us on Swiggy and Zomato.</p>
            <div className="visit-status"><span><i />OPEN FOR GOOD TIMES</span><span>9°N / 76°E</span></div>
            <a className="google-rating" href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="See Rajadhani Ice Creams' Google rating of 4.3 out of 5 from 10 reviews">
              <span className="google-rating-mark" aria-hidden="true">G</span>
              <span className="google-rating-score">4.3<span>/5</span></span>
              <span className="google-rating-copy"><strong>Google rating</strong><small>Based on 10 reviews · See reviews <Arrow /></small></span>
            </a>
            <button className="pill-button dark-button" type="button" onClick={() => setStoresOpen(true)}>Find a store <Arrow /></button>
          </div>
        </div>
      </section>

      <section className="instagram-feature">
        <div className="instagram-feature-orbit" aria-hidden="true" />
        <div className="container instagram-feature-inner">
          <div className="instagram-feature-mark"><InstagramIcon /></div>
          <div className="instagram-feature-copy">
            <p className="eyebrow">A little more Rajadhani</p>
            <h2>Follow the<br /><em>sweet moments.</em></h2>
            <p>New scoops, familiar favourites and happy days around Thrippunithura—come say hello on Instagram.</p>
          </div>
          <a className="instagram-feature-link" href={instagramUrl} target="_blank" rel="noreferrer">
            <span><small>FOLLOW US ON INSTAGRAM</small><strong>@rajadhaniicecream</strong></span>
            <Arrow className="instagram-feature-arrow" />
          </a>
        </div>
      </section>

      {storesOpen && (
        <div className="store-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setStoresOpen(false);
        }}>
          <section className="store-modal" role="dialog" aria-modal="true" aria-labelledby="store-modal-title">
            <button className="store-modal-close" type="button" onClick={() => setStoresOpen(false)} aria-label="Close store locations">×</button>
            <p className="eyebrow">RJD / LOCATIONS</p>
            <h2 id="store-modal-title">Find your<br /><em>nearest scoop.</em></h2>
            <p className="store-modal-intro">Visit us at Statue Junction in Thrippunithura, Kureekad or Mulanthuruthy. Open a map search for directions and current location details.</p>
            <div className="store-map-grid">
              <article className="store-map-card">
                <div className="store-map-heading"><span>01</span><h3>Statue Junction</h3></div>
                <p className="store-location-note">Thrippunithura, Kochi</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Rajadhani+Ice+Creams+Statue+Junction+Thrippunithura" target="_blank" rel="noreferrer">Open map search <Arrow /></a>
              </article>
              <article className="store-map-card">
                <div className="store-map-heading"><span>02</span><h3>Kureekad</h3></div>
                <p className="store-location-note">Home of our in-house production</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Rajadhani+Ice+Creams+Kureekad" target="_blank" rel="noreferrer">Open map search <Arrow /></a>
              </article>
              <article className="store-map-card">
                <div className="store-map-heading"><span>03</span><h3>Mulanthuruthy</h3></div>
                <p className="store-location-note">A Rajadhani stop in the region</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Rajadhani+Ice+Creams+Mulanthuruthy" target="_blank" rel="noreferrer">Open map search <Arrow /></a>
              </article>
            </div>
          </section>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-top"><div className="footer-logo">Rajadhani<span>✦</span></div><div className="footer-links"><a href="#story">Our story</a><a href="#flavors">Menu</a><a href="#offers">What we do</a><a href="#visit">Find us</a></div><div className="socials"><a className="social-link social-instagram" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Follow Rajadhani Ice Creams on Instagram"><InstagramIcon /><span>Instagram</span></a><a className="social-link social-email" href="mailto:rajadhanicreams@gmail.com" aria-label="Email Rajadhani Ice Creams"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Email us</span></a></div></div>
        <div className="container footer-bottom"><span>© 2026 Rajadhani Ice Creams</span><span>Crafting sweet moments. Serving every occasion. Since 1993.</span></div>
      </footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Rajadhani Ice Creams on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3.2A12.6 12.6 0 0 0 5.2 22.3L3.5 28.5l6.3-1.7A12.6 12.6 0 1 0 16 3.2Zm0 22.9c-2 0-3.9-.5-5.6-1.6l-.4-.2-3.7 1 1-3.6-.3-.4A10.4 10.4 0 1 1 16 26.1Zm5.7-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.7 9.7 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a11.8 11.8 0 0 0 4.5 4c.6.2 1 .4 1.4.5.6.2 1.1.2 1.6.1.5-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.3-.3-.6-.4Z" />
        </svg>
        <span>Chat with us</span>
      </a>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
