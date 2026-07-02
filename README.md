# Enterprise E-Pass Hackathon Prototype

A no-backend React/Vite prototype that simulates an iPhone lock screen and an Apple Wallet-style reusable rental pass.

## Included demo flow

- iPhone-sized lock screen with a live E-Pass rental widget
- Lock, unlock, and remote-start simulation from the lock screen
- Wallet opens directly to the reusable E-Pass
- Dynamic vehicle reassignment and upgrade demo
- Enterprise, National, and Alamo theme switching
- Check-in → Manage Rental → Return Rental → key expiration flow
- Digital key sharing mockup
- Remote controls: lock/unlock, start/stop, trunk, alarm
- Expandable Find Vehicle, Preferences, Climate, Vehicle Health, and Help panels
- No backend and no UI/icon dependency

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Git workflow

1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository in Vercel.
3. Vercel should detect Vite automatically.
4. Use the default build command `npm run build` and output directory `dist`.

### Vercel CLI

```bash
npm install -g vercel
vercel
```

Run the command from the project root and follow the prompts.

## Demo controls

- Tap the E-Pass widget on the lock screen to open Wallet.
- Tap the three-dot button in Wallet to simulate a vehicle upgrade or switch rental brands.
- Tap the share icon on the pass to open the secure-key sharing flow.
- The main action button advances the rental lifecycle.

## Structure

```text
src/
  App.jsx      # All React components and demo state
  main.jsx     # React entry point
  styles.css   # Complete iPhone, lock-screen, Wallet, card, and sheet styling
```

## Replacing the placeholder vehicle renders and logos

The UI now looks for local approved assets and falls back automatically when they are missing.

Place transparent 3/4-front vehicle renders here:

```text
public/assets/vehicles/bmw-x3.webp
public/assets/vehicles/audi-q5.webp
public/assets/vehicles/ford-mach-e.webp
```

Place approved SVG brand logos here:

```text
public/assets/logos/enterprise.svg
public/assets/logos/national.svg
public/assets/logos/alamo.svg
```

For a hackathon, the safest source is an internal Enterprise brand library or each brand/manufacturer's official press kit. Local files are preferable to remote image URLs because they are faster, work offline, cannot disappear, and avoid hotlinking or licensing uncertainty.

A light/dark appearance toggle is now available in the Wallet navigation bar. The chosen setting is saved in `localStorage`.
