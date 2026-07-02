import { useEffect, useMemo, useState } from 'react';

const vehicles = [
  {
    model: 'BMW X3 xDrive30i',
    shortName: 'BMW X3',
    className: 'Premium SUV',
    plate: 'EPASS 24',
    fuel: 78,
    range: 326,
    miles: 18420,
    location: 'Row B · Space 24',
    color: '#d9dde2',
    image: '/assets/vehicles/bmw-x3.webp',
  },
  {
    model: 'Audi Q5 Premium Plus',
    shortName: 'Audi Q5',
    className: 'Luxury SUV · Upgrade',
    plate: 'EPASS 31',
    fuel: 91,
    range: 402,
    miles: 12106,
    location: 'Row A · Space 08',
    color: '#c9d4db',
    image: '/assets/vehicles/audi-q5.webp',
  },
  {
    model: 'Ford Mustang Mach-E',
    shortName: 'Mach-E',
    className: 'Electric SUV',
    plate: 'EPASS EV',
    fuel: 67,
    range: 211,
    miles: 9860,
    location: 'EV Row · Space 05',
    color: '#bdc7d2',
    image: '/assets/vehicles/ford-mach-e.webp',
  },
];

const brandThemes = {
  Enterprise: {
    accent: '#00a651',
    accentSoft: '#31d47d',
    cardTop: '#0e331f',
    cardBottom: '#071c12',
    logo: '/assets/logos/enterprise.svg',
  },

  National: {
    accent: '#00b388',
    accentSoft: '#48dfbd',
    cardTop: '#07372d',
    cardBottom: '#051c19',
    logo: '/assets/logos/national.svg',
  },

  Alamo: {
    accent: '#1479d1',
    accentSoft: '#65b8ff',
    cardTop: '#0a3159',
    cardBottom: '#071a31',
    logo: '/assets/logos/alamo.svg',
  },
};

function Icon({ name, size = 24, strokeWidth = 1.9, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };

  const paths = {
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
    wallet: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 9h18"/><path d="M15.5 13h3"/></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2"/></>,
    unlock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.2-2.4"/><path d="M12 14v2"/></>,
    power: <><path d="M12 2v10"/><path d="M7.2 4.7a8 8 0 1 0 9.6 0"/></>,
    trunk: <><path d="M4 14h16l-1.6-5.1A3 3 0 0 0 15.5 7h-7a3 3 0 0 0-2.9 1.9L4 14Z"/><path d="M6 14v3h12v-3"/><path d="M9 17v2m6-2v2"/><path d="M8 7V4h8v3"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8"/><path d="M10 20h4"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="11" cy="18" r="2" fill="currentColor" stroke="none"/></>,
    snow: <><path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11"/><path d="m9.5 4.5 2.5 2.2 2.5-2.2M9.5 19.5 12 17.3l2.5 2.2"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    share: <><circle cx="18" cy="5" r="2.3"/><circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="19" r="2.3"/><path d="m8 11 7.8-4.5M8 13l7.8 4.5"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.5 2.5 0 1 1 3.4 2.3c-.8.4-1.2.9-1.2 1.7"/><path d="M12 17h.01"/></>,
    fuel: <><path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/><path d="M3 21h13M7 7h5"/><path d="M15 8h2l2 2v7a2 2 0 0 0 2 2V9l-2-2"/></>,
    key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/></>,
    car: <><path d="m4 15 1.8-5.2A3 3 0 0 1 8.6 8h6.8a3 3 0 0 1 2.8 1.8L20 15"/><path d="M3 15h18v4H3z"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    warning: <><path d="M10.3 3.8 2.5 17.3A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.7L13.7 3.8a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></>,
    thermometer: <><path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0Z"/><path d="M11 7v8"/></>,
    gauge: <><path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 13 4-4"/><path d="M7 17h10"/></>,
    navigation: <><path d="m3 11 18-8-8 18-2-8-8-2Z"/></>,
    camera: <><path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11h18V7a2 2 0 0 0-2-2h-4.5Z"/><circle cx="12" cy="12" r="4"/></>,
    flashlight: <><path d="M8 3h8l-1 5H9L8 3Z"/><path d="M10 8h4v12h-4z"/></>,
    rotate: <><path d="M4 4v6h6"/><path d="M20 20v-6h-6"/><path d="M5.5 15a7 7 0 0 0 11.8 2L20 14M4 10l2.7-3a7 7 0 0 1 11.8 2"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
    moon: <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>,
  };

  return <svg {...common}>{paths[name] ?? paths.help}</svg>;
}

function CarIllustration({ color = '#d9dde2', compact = false }) {
  return (
    <svg className={`car-illustration ${compact ? 'compact' : ''}`} viewBox="0 0 420 190" role="img" aria-label="Rental vehicle">
      <defs>
        <linearGradient id={`body-${color.replace('#', '')}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.34" stopColor={color} />
          <stop offset="1" stopColor="#7e8994" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#283641" />
          <stop offset="1" stopColor="#071016" />
        </linearGradient>
        <filter id="shadow" x="-20%" width="140%" y="-30%" height="180%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="220" cy="158" rx="154" ry="18" fill="rgba(0,0,0,.38)" filter="url(#shadow)" />
      <path d="M58 121c9-26 22-49 45-56l69-17c25-7 59-6 80 4l61 31c18 3 36 10 47 24l9 12-10 27H54l-8-11 12-14Z" fill={`url(#body-${color.replace('#', '')})`} stroke="rgba(255,255,255,.55)" strokeWidth="2" />
      <path d="m121 68 56-14c22-5 48-4 67 4l47 25-179 1 9-16Z" fill="url(#glass)" opacity=".96" />
      <path d="M189 56v28M251 61l-7 23" stroke="rgba(225,240,250,.6)" strokeWidth="3" />
      <path d="M63 118h31M331 104l27 8M99 89l-22 15" stroke="rgba(255,255,255,.85)" strokeWidth="5" strokeLinecap="round" />
      <path d="M120 97h54M202 97h54" stroke="rgba(80,90,100,.5)" strokeWidth="3" strokeLinecap="round" />
      <path d="M61 132c7 2 18 3 29 2M322 134c17 1 29-1 39-4" stroke="#4c5660" strokeWidth="4" />
      <circle cx="117" cy="143" r="31" fill="#101417" stroke="#6d7680" strokeWidth="6" />
      <circle cx="117" cy="143" r="17" fill="#a9b2ba" stroke="#333b42" strokeWidth="5" />
      <circle cx="305" cy="143" r="31" fill="#101417" stroke="#6d7680" strokeWidth="6" />
      <circle cx="305" cy="143" r="17" fill="#a9b2ba" stroke="#333b42" strokeWidth="5" />
      <path d="M147 145h128" stroke="rgba(255,255,255,.28)" strokeWidth="4" />
      <path d="M338 115h21" stroke="#ff605c" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 113h20" stroke="#f5f4d3" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}


function VehicleImage({ vehicle, compact = false }) {
  const [failed, setFailed] = useState(false);

  if (!vehicle.image || failed) {
    return <CarIllustration color={vehicle.color} compact={compact} />;
  }

  return (
    <img
      className={`vehicle-render ${compact ? 'compact' : ''}`}
      src={vehicle.image}
      alt={`${vehicle.model} rental vehicle`}
      onError={() => setFailed(true)}
      draggable="false"
    />
  );
}

function BrandLogo({ theme, brand, compact = false }) {
  const [failed, setFailed] = useState(false);
  if (!theme.logo || failed) {
    return <span className={`${compact ? 'mini-logo' : 'brand-logo'} logo-fallback`}>{theme.mark}</span>;
  }
  return (
    <span className={`${compact ? 'mini-logo' : 'brand-logo'} logo-image-wrap`}>
      <img src={theme.logo} alt={`${brand} logo`} onError={() => setFailed(true)} />
    </span>
  );
}

function StatusBar({ dark = false, time }) {
  return (
    <div className={`status-bar ${dark ? 'dark' : ''}`}>
      <div className="status-time">{time}</div>
      <div className="dynamic-island"><span /></div>
      <div className="status-icons">
        <span className="signal-bars"><i/><i/><i/><i/></span>
        <span className="status-5g">5G</span>
        <span className="battery"><span /></span>
      </div>
    </div>
  );
}

function RoundControl({ icon, label, active = false, onClick, disabled = false }) {
  return (
    <button className={`round-control ${active ? 'active' : ''}`} onClick={onClick} disabled={disabled} aria-label={label}>
      <span className="control-icon"><Icon name={icon} size={23} /></span>
      <span>{label}</span>
    </button>
  );
}

function BottomSheet({ title, onClose, children, wide = false }) {
  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <section className={`bottom-sheet ${wide ? 'wide' : ''}`} onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <h2>{title}</h2>
          <button className="sheet-close" onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function LockScreen({
  now,
  vehicle,
  brand,
  theme,
  locked,
  engine,
  onToggleLock,
  onToggleEngine,
  onOpenWallet,
  onAdvanceStage,
  stage,
  toast,
}) {
  const stageCopy = [
    'Your rental is ready to check in',
    'Digital key active · Return Friday at 10:00 AM',
    'Return started · Follow the in-app steps',
    'Rental complete · Tell us how we did',
  ][stage];

  const rentalActionCopy = [
  'Check In',
  'Manage',
  'Return',
  'Complete',
][stage];

const rentalActionIcon = [
  'check',
  'key',
  'rotate',
  'check',
][stage];

  return (
    <main className="lock-screen">
      <div className="wallpaper-glow glow-one" />
      <div className="wallpaper-glow glow-two" />
      <div className="wallpaper-grid" />
      <StatusBar time={now.time} />

      <section className="lock-date-time" aria-label="Current time">
              <div className="lock-date">{now.longDate}</div>
              <div className="lock-time">{now.time}</div>
            </section>

            <section
        className="lock-widget compact-lock-widget"
        onClick={onOpenWallet}
        role="button"
        tabIndex="0"
        onKeyDown={(event) => event.key === 'Enter' && onOpenWallet()}
        >
        <div className="compact-widget-header">
          <img
            className={`lock-widget-wordmark lock-widget-wordmark-${brand.toLowerCase()}`}
            src={theme.logo}
            alt={`${brand} logo`}
          />

          <span className={`compact-key-status ${stage > 0 && stage < 3 ? 'active' : ''}`}>
            <i />
            {stage > 0 && stage < 3 ? 'Key Active' : 'Ready'}
          </span>
        </div>

        <div className="compact-widget-content-row">
          <div className="compact-widget-content">
            <strong>{vehicle.shortName}</strong>
            <span>{stageCopy}</span>
            <small>{vehicle.location}</small>
          </div>

          <button
            className={`lock-rental-action stage-${stage}`}
            onClick={(event) => {
              event.stopPropagation();
              onAdvanceStage();
            }}
            disabled={stage === 3}
          >
            <Icon name={rentalActionIcon} size={16} />
            <span>{rentalActionCopy}</span>
          </button>
        </div>

        <div
          className="lock-widget-controls compact-controls"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className={locked ? '' : 'selected'}
            onClick={onToggleLock}
          >
            <Icon name={locked ? 'lock' : 'unlock'} size={17} />
            <span>{locked ? 'Unlock' : 'Lock'}</span>
          </button>

          <button
            className={engine ? 'selected' : ''}
            onClick={onToggleEngine}
          >
            <Icon name="power" size={17} />
            <span>{engine ? 'Stop' : 'Start'}</span>
          </button>

          <button onClick={onOpenWallet}>
            <span>Open</span>
            <Icon name="chevron" size={17} />
          </button>
        </div>
      </section>

      {toast && <div className="lock-toast">{toast}</div>}

      <div className="lock-bottom">
        <button className="lock-circle" aria-label="Flashlight"><Icon name="flashlight" size={22} /></button>
        <button className="lock-circle" aria-label="Camera"><Icon name="camera" size={22} /></button>
      </div>
      <div className="home-indicator" />
    </main>
  );
}

function WalletCard({ brand, setBrand, theme, vehicle, vehicleIndex, setVehicleIndex, onShare }) {
  return (
    <section
      className="epass-card"
      style={{
        '--brand-accent': theme.accent,
        '--brand-soft': theme.accentSoft,
        '--card-top': theme.cardTop,
        '--card-bottom': theme.cardBottom,
      }}
    >
      <div className="card-pattern pattern-one" />
      <div className="card-pattern pattern-two" />
      <div className="card-header">
        <div className="brand-lockup">
          <img
            className={`brand-wordmark brand-wordmark-${brand.toLowerCase()}`}
            src={theme.logo}
            alt={`${brand} logo`}
          />
        </div>
        <button className="card-share" onClick={onShare} aria-label="Share digital key"><Icon name="share" size={21} /></button>
      </div>

      <div className="card-car-wrap">
        <VehicleImage vehicle={vehicle} />
      </div>

      <div className="vehicle-picker-row">
        <div className="vehicle-name">
          <strong>{vehicle.model}</strong>
          <span>{vehicle.className}</span>
        </div>
        <label className="vehicle-select-label" aria-label="Choose vehicle">
          <select value={vehicleIndex} onChange={(event) => setVehicleIndex(Number(event.target.value))}>
            {vehicles.map((item, index) => <option key={item.model} value={index}>{item.shortName}</option>)}
          </select>
          <Icon name="chevron" size={14} />
        </label>
      </div>

      <div className="card-footer">
        <span className="key-status"><i /> DIGITAL KEY</span>
        <strong>E-PASS</strong>
      </div>

      <label className="brand-hidden-select" aria-label="Rental brand">
        <select value={brand} onChange={(event) => setBrand(event.target.value)}>
          {Object.keys(brandThemes).map((name) => <option key={name}>{name}</option>)}
        </select>
      </label>
    </section>
  );
}

function WalletScreen({
  now,
  vehicle,
  vehicleIndex,
  setVehicleIndex,
  brand,
  setBrand,
  theme,
  locked,
  engine,
  trunk,
  alarm,
  climate,
  stage,
  toast,
  onBack,
  onToggleLock,
  onToggleEngine,
  onToggleTrunk,
  onToggleAlarm,
  onToggleClimate,
  onOpenPanel,
  onAdvanceStage,
  onShare,
  onMore,
  appearance,
  onToggleAppearance,
}) {
  const primaryCopy = ['Check In', 'Manage Rental', 'Return Rental', 'Rental Complete'][stage];
  const primaryIcon = ['check', 'key', 'rotate', 'check'][stage];

  return (
    <main className={`wallet-screen ${appearance}`}>
      <StatusBar dark={appearance === 'dark'} time={now.time} />
      <header className="wallet-nav">
        <button className="nav-circle" onClick={onBack} aria-label="Close wallet"><Icon name="x" size={27} /></button>
        <div className="nav-actions">
          <button className="nav-circle small theme-toggle" onClick={onToggleAppearance} aria-label={`Switch to ${appearance === 'dark' ? 'light' : 'dark'} mode`}>
            <Icon name={appearance === 'dark' ? 'sun' : 'moon'} size={21} />
          </button>
          <button className="nav-circle small"><Icon name="wallet" size={23} /></button>
          <div className="nav-pill">
            <button aria-label="Search"><Icon name="search" size={23} /></button>
            <button aria-label="More" onClick={onMore}><Icon name="more" size={24} /></button>
          </div>
        </div>
      </header>

      <div className="wallet-scroll">
        <WalletCard
          brand={brand}
          setBrand={setBrand}
          theme={theme}
          vehicle={vehicle}
          vehicleIndex={vehicleIndex}
          setVehicleIndex={setVehicleIndex}
          onShare={onShare}
        />

        <section className="rental-summary glass-panel">
          <div>
            <span>Rental</span>
            <strong>Jun 28 — Jul 3</strong>
          </div>
          <div>
            <span>Fuel / Charge</span>
            <strong>{vehicle.fuel}%</strong>
          </div>
          <div>
            <span>Range</span>
            <strong>{vehicle.range} mi</strong>
          </div>
        </section>

        <section className="vehicle-controls-section">
          <div className="section-title-row">
            <h1>Vehicle Controls</h1>
            <span className={`connection-status ${stage > 0 && stage < 3 ? 'connected' : ''}`}>
              <i /> {stage > 0 && stage < 3 ? 'Key active' : 'Key waiting'}
            </span>
          </div>
          <div className="vehicle-controls-row">
            <RoundControl icon={locked ? 'lock' : 'unlock'} label={locked ? 'Unlock' : 'Lock'} active={!locked} onClick={onToggleLock} />
            <RoundControl icon="power" label={engine ? 'Stop' : 'Start'} active={engine} onClick={onToggleEngine} disabled={stage === 0 || stage === 3} />
            <RoundControl icon="trunk" label={trunk ? 'Close' : 'Trunk'} active={trunk} onClick={onToggleTrunk} disabled={stage === 3} />
            <RoundControl icon="bell" label={alarm ? 'Silence' : 'Alarm'} active={alarm} onClick={onToggleAlarm} disabled={stage === 3} />
          </div>
        </section>

        <section className="smart-widget-grid">
          <button className="smart-tile" onClick={() => onOpenPanel('find')}>
            <span className="tile-icon"><Icon name="location" /></span>
            <span><strong>Find Vehicle</strong><small>{vehicle.location}</small></span>
          </button>
          <button className="smart-tile" onClick={() => onOpenPanel('preferences')}>
            <span className="tile-icon"><Icon name="sliders" /></span>
            <span><strong>Preferences</strong><small>Saved across rentals</small></span>
          </button>
          <button className={`smart-tile ${climate ? 'active' : ''}`} onClick={() => onOpenPanel('climate')}>
            <span className="tile-icon"><Icon name="snow" /></span>
            <span><strong>Climate</strong><small>{climate ? 'Cooling to 70°' : 'Cabin 78°'}</small></span>
          </button>
          <button className="smart-tile" onClick={() => onOpenPanel('health')}>
            <span className="tile-icon"><Icon name="heart" /></span>
            <span><strong>Vehicle Health</strong><small>All systems normal</small></span>
          </button>
        </section>

        <button className={`primary-rental-button stage-${stage}`} onClick={onAdvanceStage} disabled={stage === 3}>
          <span><Icon name={primaryIcon} size={22} /></span>
          <strong>{primaryCopy}</strong>
          {stage < 3 && <Icon name="chevron" size={20} />}
        </button>

        <button className="help-row" onClick={() => onOpenPanel('help')}>
          <span><Icon name="help" size={21} /></span>
          <div><strong>Need help?</strong><small>Roadside support and rental assistance</small></div>
          <Icon name="chevron" size={18} />
        </button>

        <p className="prototype-note">Hackathon prototype · Vehicle commands are simulated</p>
      </div>

      {toast && <div className="wallet-toast">{toast}</div>}
      <div className="home-indicator dark" />
    </main>
  );
}

function DetailPanel({ panel, onClose, vehicle, climate, setClimate, setStage, showToast }) {
  const [temperature, setTemperature] = useState(70);
  const [seat, setSeat] = useState(true);
  const [mirrors, setMirrors] = useState(true);
  const [quiet, setQuiet] = useState(false);

  if (!panel) return null;

  if (panel === 'find') {
    return (
      <BottomSheet title="Find My Vehicle" onClose={onClose}>
        <div className="map-mock">
          <div className="map-road road-one"/><div className="map-road road-two"/><div className="map-road road-three"/>
          <div className="map-label label-one">Terminal</div><div className="map-label label-two">Rental Return</div>
          <span className="vehicle-map-pin"><Icon name="car" size={22}/></span>
          <span className="user-map-dot" />
        </div>
        <div className="sheet-location-row">
          <span><Icon name="location" /></span>
          <div><strong>{vehicle.location}</strong><small>Approximately 240 ft away</small></div>
        </div>
        <button className="sheet-primary" onClick={() => showToast('Vehicle lights flashed and horn sounded')}><Icon name="bell" size={19}/> Honk & Flash</button>
        <button className="sheet-secondary" onClick={() => showToast('Walking directions opened')}><Icon name="navigation" size={19}/> Walking Directions</button>
      </BottomSheet>
    );
  }

  if (panel === 'preferences') {
    return (
      <BottomSheet title="Vehicle Preferences" onClose={onClose}>
        <p className="sheet-intro">Your settings follow you to compatible Enterprise, National, and Alamo vehicles.</p>
        <ToggleRow label="Restore seat position" detail="Driver profile: Roger" value={seat} onChange={setSeat} icon="person" />
        <ToggleRow label="Restore mirror position" detail="Use saved side-mirror angles" value={mirrors} onChange={setMirrors} icon="rotate" />
        <ToggleRow label="Quiet arrival" detail="Disable welcome sounds" value={quiet} onChange={setQuiet} icon="bell" />
        <button className="sheet-primary" onClick={() => showToast('Vehicle preferences saved')}><Icon name="check" size={19}/> Save Preferences</button>
      </BottomSheet>
    );
  }

  if (panel === 'climate') {
    return (
      <BottomSheet title="Climate" onClose={onClose}>
        <div className={`climate-orb ${climate ? 'running' : ''}`}>
          <Icon name="snow" size={34}/>
          <strong>{temperature}°</strong>
          <span>{climate ? 'Cooling cabin' : 'Climate off'}</span>
        </div>
        <div className="temperature-control">
          <button onClick={() => setTemperature((value) => Math.max(60, value - 1))}>−</button>
          <span>Target temperature</span>
          <button onClick={() => setTemperature((value) => Math.min(85, value + 1))}>+</button>
        </div>
        <div className="climate-presets">
          {[66, 70, 74].map((value) => <button key={value} className={temperature === value ? 'selected' : ''} onClick={() => setTemperature(value)}>{value}°</button>)}
        </div>
        <button className="sheet-primary" onClick={() => { setClimate(!climate); showToast(climate ? 'Climate stopped' : `Climate started at ${temperature}°`); }}>
          <Icon name="power" size={19}/> {climate ? 'Stop Climate' : 'Start Climate'}
        </button>
      </BottomSheet>
    );
  }

  if (panel === 'health') {
    return (
      <BottomSheet title="Vehicle Health" onClose={onClose}>
        <div className="health-status"><span><Icon name="check" size={24}/></span><div><strong>Ready to drive</strong><small>No warnings reported</small></div></div>
        <div className="health-grid">
          <Metric icon="fuel" label="Fuel / charge" value={`${vehicle.fuel}%`} />
          <Metric icon="gauge" label="Odometer" value={`${vehicle.miles.toLocaleString()} mi`} />
          <Metric icon="warning" label="Diagnostics" value="Normal" />
          <Metric icon="car" label="Tire pressure" value="Good" />
        </div>
        <div className="maintenance-row"><span><Icon name="clock" /></span><div><strong>Next scheduled service</strong><small>5,420 miles remaining</small></div></div>
      </BottomSheet>
    );
  }

  if (panel === 'manage') {
    return (
      <BottomSheet title="Manage Rental" onClose={onClose}>
        <div className="manage-rental-card">
          <span className="mini-car-box"><Icon name="car" size={30}/></span>
          <div><strong>{vehicle.model}</strong><small>Return Friday · 10:00 AM</small></div>
        </div>
        <button className="menu-row" onClick={() => showToast('Extension options loaded')}><span><Icon name="clock"/></span><div><strong>Extend rental</strong><small>Change return date or time</small></div><Icon name="chevron"/></button>
        <button className="menu-row" onClick={() => showToast('Additional driver flow opened')}><span><Icon name="person"/></span><div><strong>Add approved driver</strong><small>Share access after verification</small></div><Icon name="chevron"/></button>
        <button className="sheet-primary return-action" onClick={() => { setStage(2); onClose(); showToast('Return workflow started'); }}><Icon name="rotate" size={19}/> Start Return</button>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet title="Help & Support" onClose={onClose}>
      <div className="support-hero"><span><Icon name="help" size={28}/></span><div><strong>How can we help?</strong><small>Support is available 24/7 during your rental.</small></div></div>
      <button className="menu-row" onClick={() => showToast('Calling roadside assistance…')}><span><Icon name="car"/></span><div><strong>Roadside assistance</strong><small>Flat tire, battery, lockout, towing</small></div><Icon name="chevron"/></button>
      <button className="menu-row" onClick={() => showToast('Chat support opened')}><span><Icon name="help"/></span><div><strong>Chat with support</strong><small>Average response under 2 minutes</small></div><Icon name="chevron"/></button>
      <button className="menu-row" onClick={() => showToast('Nearest branch displayed')}><span><Icon name="location"/></span><div><strong>Find a branch</strong><small>Hours, directions, and contact details</small></div><Icon name="chevron"/></button>
    </BottomSheet>
  );
}

function ToggleRow({ label, detail, value, onChange, icon }) {
  return (
    <div className="toggle-row">
      <span className="toggle-row-icon"><Icon name={icon} size={21}/></span>
      <div><strong>{label}</strong><small>{detail}</small></div>
      <button className={`switch ${value ? 'on' : ''}`} onClick={() => onChange(!value)} aria-pressed={value}><i /></button>
    </div>
  );
}

function Metric({ icon, label, value }) {
  return <div className="metric"><span><Icon name={icon} size={20}/></span><small>{label}</small><strong>{value}</strong></div>;
}

function ShareSheet({ onClose, vehicle, showToast }) {
  const [duration, setDuration] = useState('Until return');
  return (
    <BottomSheet title="Share Digital Key" onClose={onClose}>
      <div className="share-key-hero"><span><Icon name="key" size={30}/></span><div><strong>{vehicle.shortName}</strong><small>Only approved drivers may operate the vehicle.</small></div></div>
      <label className="sheet-field"><span>Access duration</span><select value={duration} onChange={(event) => setDuration(event.target.value)}><option>Until return</option><option>2 hours</option><option>Today only</option></select></label>
      <label className="sheet-field"><span>Driver email or phone</span><input placeholder="name@example.com" /></label>
      <div className="share-permissions"><span><Icon name="unlock" size={18}/> Unlock & drive</span><span><Icon name="snow" size={18}/> Climate</span></div>
      <button className="sheet-primary" onClick={() => { showToast(`Secure key invitation created · ${duration}`); onClose(); }}><Icon name="share" size={19}/> Send Secure Invite</button>
    </BottomSheet>
  );
}

function MoreSheet({ onClose, brand, setBrand, vehicleIndex, setVehicleIndex, showToast }) {
  return (
    <BottomSheet title="Brand Controls" onClose={onClose}>
      <div className="demo-section-label">Rental brand</div>
      <div className="brand-segmented">
        {Object.keys(brandThemes).map((name) => <button key={name} className={brand === name ? 'selected' : ''} onClick={() => { setBrand(name); showToast(`Pass updated to ${name}`); }}>{name}</button>)}
      </div>
      <div className="demo-section-label">Assigned vehicle</div>
      <div className="vehicle-demo-list">
        {vehicles.map((item, index) => (
          <button key={item.model} className={vehicleIndex === index ? 'selected' : ''} onClick={() => { setVehicleIndex(index); showToast(index === 1 ? 'Complimentary upgrade applied' : 'Vehicle assignment updated'); }}>
            <span><Icon name="car" size={22}/></span>
            <div><strong>{item.shortName}</strong><small>{item.className}</small></div>
            {vehicleIndex === index && <Icon name="check" size={19}/>}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}

function App() {
  const [page, setPage] = useState(() => window.location.hash === '#wallet' ? 'wallet' : 'lock');
  const [now, setNow] = useState(new Date());
  const [brand, setBrand] = useState('Enterprise');
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [locked, setLocked] = useState(true);
  const [engine, setEngine] = useState(false);
  const [trunk, setTrunk] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [climate, setClimate] = useState(false);
  const [stage, setStage] = useState(0);
  const [panel, setPanel] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [appearance, setAppearance] = useState(() => localStorage.getItem('epass-appearance') || 'dark');

  const vehicle = vehicles[vehicleIndex];
  const theme = brandThemes[brand];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash === '#wallet' ? 'wallet' : 'lock');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('epass-appearance', appearance);
  }, [appearance]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const formattedNow = useMemo(() => ({
    time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M/i, ''),
    longDate: now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }),
  }), [now]);

  function navigate(nextPage) {
    window.location.hash = nextPage === 'wallet' ? 'wallet' : 'lock';
    setPage(nextPage);
  }

  function showToast(message) {
    setToast('');
    window.setTimeout(() => setToast(message), 10);
  }

  function toggleLock() {
    setLocked((value) => !value);
    showToast(locked ? 'Vehicle unlocked' : 'Vehicle locked');
  }

  function toggleEngine() {
    if (stage === 0) {
      showToast('Check in to activate the digital key');
      return;
    }
    if (stage === 3) return;
    setEngine((value) => !value);
    showToast(engine ? 'Remote start stopped' : 'Vehicle started remotely');
  }

  function advanceStage() {
    if (stage === 0) {
      setStage(1);
      showToast('Check-in complete · Digital key activated');
      return;
    }
    if (stage === 1) {
      setPanel('manage');
      return;
    }
    if (stage === 2) {
      setStage(3);
      setEngine(false);
      setLocked(true);
      setClimate(false);
      showToast('Rental returned · Digital key expired');
    }
  }

  return (
    <div className={`app-stage ${appearance}`} style={{ '--brand-accent': theme.accent, '--brand-soft': theme.accentSoft }}>
      <div className="phone-frame">
        {page === 'lock' ? (
          <LockScreen
            now={formattedNow}
            vehicle={vehicle}
            brand={brand}
            theme={theme}
            locked={locked}
            engine={engine}
            onToggleLock={toggleLock}
            onToggleEngine={toggleEngine}
            onOpenWallet={() => navigate('wallet')}
            onAdvanceStage={advanceStage}
            stage={stage}
            toast={toast}
          />
        ) : (
          <WalletScreen
            now={formattedNow}
            vehicle={vehicle}
            vehicleIndex={vehicleIndex}
            setVehicleIndex={(index) => { setVehicleIndex(index); showToast('E-Pass updated with new vehicle'); }}
            brand={brand}
            setBrand={setBrand}
            theme={theme}
            locked={locked}
            engine={engine}
            trunk={trunk}
            alarm={alarm}
            climate={climate}
            stage={stage}
            toast={toast}
            onBack={() => navigate('lock')}
            onToggleLock={toggleLock}
            onToggleEngine={toggleEngine}
            onToggleTrunk={() => { setTrunk((value) => !value); showToast(trunk ? 'Trunk closed' : 'Trunk opened'); }}
            onToggleAlarm={() => { setAlarm((value) => !value); showToast(alarm ? 'Alarm silenced' : 'Alarm activated'); }}
            onToggleClimate={() => setClimate((value) => !value)}
            onOpenPanel={setPanel}
            onAdvanceStage={advanceStage}
            onShare={() => setShareOpen(true)}
            onMore={() => setMoreOpen(true)}
            appearance={appearance}
            onToggleAppearance={() => setAppearance((value) => value === 'dark' ? 'light' : 'dark')}
          />
        )}

        <DetailPanel panel={panel} onClose={() => setPanel(null)} vehicle={vehicle} climate={climate} setClimate={setClimate} setStage={setStage} showToast={showToast} />
        {shareOpen && <ShareSheet onClose={() => setShareOpen(false)} vehicle={vehicle} showToast={showToast} />}
        {moreOpen && <MoreSheet onClose={() => setMoreOpen(false)} brand={brand} setBrand={setBrand} vehicleIndex={vehicleIndex} setVehicleIndex={setVehicleIndex} showToast={showToast} />}
      </div>
    </div>
  );
}

export default App;
