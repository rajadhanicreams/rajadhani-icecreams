import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const flavors = [
  { name: 'Tender Coconut', note: 'Pure, cool & coastal', color: '#b5e3d6', accent: '#5aa798', emoji: '🥥', video: '/sample-1.mp4', videoPosition: 'center 38%', theme: { background: '#173b3b', text: '#e4f6ed', muted: '#a5c9c0', line: '#b5e3d633', glow: '#72d4c733' } },
  { name: 'Mango Malai', note: 'Summer in every scoop', color: '#f6c871', accent: '#e89142', emoji: '🥭', video: '/sample-1.mp4', videoPosition: 'center 55%', theme: { background: '#593619', text: '#fff2d6', muted: '#dfb982', line: '#f6c87140', glow: '#f6ad4d33' } },
  { name: 'Belgian Chocolate', note: 'Deep, dark & dreamy', color: '#d8b0a0', accent: '#845345', emoji: '🍫', video: '/sample-2.mp4', videoPosition: 'center 50%', theme: { background: '#271719', text: '#f9e6d9', muted: '#c19c91', line: '#d8b0a033', glow: '#c17b6333' } },
  { name: 'Strawberry Cloud', note: 'A berry soft daydream', color: '#f2b3b3', accent: '#d86672', emoji: '🍓', video: '/sample-1.mp4', videoPosition: 'center 68%', theme: { background: '#4d202d', text: '#ffe9e8', muted: '#d8a8ad', line: '#f2b3b340', glow: '#ed7e9233' } },
];

function Arrow({ direction = 'right' }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">↗</span>;
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
      if (event.key === 'Escape') setStoresOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = storesOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [storesOpen]);

  const scrollToProducts = () => productRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="wordmark" href="#top" aria-label="Rajadhani home">
            <img className="logo-image" src="/rajadhani-logo.png" alt="Rajadhani — The Ice Cream Capital" />
          </a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
            <a href="#flavors" onClick={() => setMenuOpen(false)}>Flavours</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Find us</a>
            <a className="nav-order" href="#visit" onClick={() => setMenuOpen(false)}>Order a scoop <Arrow /></a>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
          <p className="eyebrow reveal">Made slow. Loved fast.</p>
          <h1 className="hero-title reveal reveal-delay-1">A little<br /><em>joy</em> in<br />every scoop.</h1>
          <p className="hero-intro reveal reveal-delay-2">Small-batch ice creams inspired by the flavours, warmth and little wonders of South India.</p>
          <button className="pill-button reveal reveal-delay-3" onClick={scrollToProducts}>Explore our flavours <Arrow /></button>
        </div>
        <div className="hero-product" style={{ transform: `translateY(${scrollY * 0.12}px) rotateY(${scrollY * 0.018}deg)` }}>
          <div className="product-aura" />
          <span className="float-dot dot-a">✦</span><span className="float-dot dot-b">•</span><span className="float-dot dot-c">✦</span>
          <div className="scoop-shadow" />
          <div className="scoop-cone"><span>R</span></div>
          <div className="scoop scoop-pink" />
          <div className="scoop scoop-mint" />
          <div className="scoop scoop-yellow" />
          <div className="cherry">✦</div>
          <div className="product-label"><span>01</span><strong>Rajadhani<br />signature</strong><small>slow churned / 1984</small></div>
        </div>
        <div className="hero-sticker"><span>EST.</span><strong>1984</strong><span>MADE WITH<br />HEART</span></div>
        <div className="scroll-cue"><span>Scroll to wander</span><i /></div>
      </section>

      <section id="story" className="story section-pad">
        <div className="ice-grid" />
        <div className="frost-ring frost-ring-story" />
        <div className="container story-grid">
          <p className="eyebrow">The good stuff</p>
          <div className="story-content">
            <h2>There’s magic<br />in <em>keeping it simple.</em></h2>
            <p>We believe the best things take a little time. Fresh ingredients, honest recipes and a whole lot of churning come together in every tub we make.</p>
            <a className="text-link" href="#flavors">Meet the Rajadhani way <Arrow /></a>
          </div>
          <div className="story-product">
            <video className="story-product-video" autoPlay muted loop playsInline>
              <source src="/sample-2.mp4" type="video/mp4" />
            </video>
            <div className="story-product-copy"><span>THE RAJADHANI WAY</span><strong>Real scoops.<br /><em>Real slow.</em></strong><small>Freshly churned / every day</small></div>
            <div className="story-orb"><span>100%</span><small>real milk<br />& real joy</small></div>
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
            <p>Made for brands, celebrations and every gathering worth making sweeter.</p>
          </div>
          <div className="offers-list">
            <article className="offer-card">
              <div className="offer-card-number">01</div>
              <div className="offer-card-content">
                <span>For your brand</span>
                <h3>Private<br /><em>Label</em></h3>
                <p>Bring your vision to life with Rajadhani-made ice creams created for your brand, menu or special concept.</p>
                <a className="text-link" href="mailto:hello@rajadhaniicecreams.com?subject=Private%20label%20enquiry">Start a conversation <Arrow /></a>
              </div>
              <div className="offer-orbit" />
            </article>
            <article className="offer-card offer-card-catering">
              <div className="offer-card-number">02</div>
              <div className="offer-card-content">
                <span>For every celebration</span>
                <h3>Catering<br /><em>made cool.</em></h3>
                <p>From intimate moments to big celebrations, bring the Rajadhani experience to your event.</p>
                <ul>
                  <li>Weddings</li>
                  <li>Birthday parties</li>
                  <li>Live juice counters</li>
                  <li>Corporate parties</li>
                  <li>Ice cream &amp; dessert catering</li>
                </ul>
                <a className="text-link" href="mailto:hello@rajadhaniicecreams.com?subject=Catering%20enquiry">Plan your event <Arrow /></a>
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
            <div><p className="eyebrow">Pick your happy</p><h2>Flavours for<br /><em>every mood.</em></h2></div>
            <p className="heading-note">From familiar favourites<br />to unexpected little crushes.</p>
          </div>
          <div className="flavor-layout">
            <div className="flavor-list">
              {flavors.map((flavor, index) => (
                <button key={flavor.name} className={`flavor-row ${activeFlavor === index ? 'active' : ''}`} onClick={() => setActiveFlavor(index)}>
                  <span className="flavor-index">0{index + 1}</span><span>{flavor.name}</span><span className="flavor-arrow">↗</span>
                </button>
              ))}
            </div>
            <div className="flavor-feature" style={{ '--flavor-color': flavors[activeFlavor].color, '--flavor-accent': flavors[activeFlavor].accent }}>
              <video key={flavors[activeFlavor].name} className="section-video feature-video" autoPlay muted loop playsInline style={{ objectPosition: flavors[activeFlavor].videoPosition }}>
                <source src={flavors[activeFlavor].video} type="video/mp4" />
              </video>
              <div className="feature-text"><span>NOW SCOOPING</span><h3>{flavors[activeFlavor].name}</h3><p>{flavors[activeFlavor].note}</p></div>
              <div className="feature-icecream"><div className="feature-scoop">{flavors[activeFlavor].emoji}</div><div className="feature-cup">R</div></div>
              <div className="feature-shadow" />
              <span className="feature-number">0{activeFlavor + 1}</span>
            </div>
          </div>
          <div className="product-rail">
            <div><span>01</span><strong>Small batch</strong><small>churned with patience</small></div>
            <div><span>02</span><strong>Big flavour</strong><small>made from real ingredients</small></div>
            <div><span>03</span><strong>Zero rush</strong><small>best enjoyed slowly</small></div>
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
            <p className="eyebrow">Come say hello</p>
            <h2>Your corner<br />of <em>cool.</em></h2>
            <p>Find us in Tripunithura, Kochi. Walk in for a cone, stay for the stories.</p>
            <div className="visit-status"><span><i />OPEN FOR GOOD TIMES</span><span>9°N / 76°E</span></div>
            <button className="pill-button dark-button" type="button" onClick={() => setStoresOpen(true)}>Find a store <Arrow /></button>
          </div>
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
            <p className="store-modal-intro">Two Rajadhani stops in and around Kochi. Explore the map or open directions for your nearest scoop.</p>
            <div className="store-map-grid">
              <article className="store-map-card">
                <div className="store-map-heading"><span>01</span><h3>Tripunithura</h3></div>
                <div className="store-map-viewport">
                  <iframe className="store-map-embed" title="Rajadhani Ice Creams Tripunithura map" src="https://www.openstreetmap.org/export/embed.html?bbox=76.335%2C9.936%2C76.357%2C9.953&layer=mapnik&marker=9.9448403%2C76.3456737" loading="lazy" />
                  <div className="map-mist" aria-hidden="true"><i /><i /><i /></div>
                </div>
                <a href="https://www.google.com/maps/place/Rajadhani+Ice+Cream+Parlour/@9.9448403,76.3456737,17z" target="_blank" rel="noreferrer">Open directions <Arrow /></a>
              </article>
              <article className="store-map-card">
                <div className="store-map-heading"><span>02</span><h3>Kandanad</h3></div>
                <div className="store-map-viewport">
                  <iframe className="store-map-embed" title="Rajadhani Ice Creams Kandanad map" src="https://www.openstreetmap.org/export/embed.html?bbox=76.364%2C9.914%2C76.384%2C9.929&layer=mapnik&marker=9.9218492%2C76.3743403" loading="lazy" />
                  <div className="map-mist" aria-hidden="true"><i /><i /><i /></div>
                </div>
                <a href="https://www.google.com/maps/place/RAJADHANI+ICE+CREAM+PARLOR/@9.9218492,76.3743403,17z" target="_blank" rel="noreferrer">Open directions <Arrow /></a>
              </article>
            </div>
          </section>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-top"><div className="footer-logo">Rajadhani<span>✦</span></div><div className="footer-links"><a href="#story">Our story</a><a href="#flavors">Flavours</a><a href="#visit">Find us</a></div><div className="socials"><a href="#instagram">ig</a><a href="#contact">✉</a></div></div>
        <div className="container footer-bottom"><span>© 2026 Rajadhani Ice Creams</span><span>Made for slow days & sweet people.</span></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
