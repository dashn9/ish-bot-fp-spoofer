# Bot Browser Extension

A Chrome extension designed to enhance browser automation capabilities by providing advanced fingerprint spoofing and browser manipulation features.

## Overview

This extension is primarily used to extend the capabilities of browser automation tools by providing sophisticated fingerprint spoofing and browser environment manipulation. It operates in both the main world and isolated world contexts to ensure comprehensive coverage of browser fingerprinting vectors.

## Features

- **Advanced Fingerprint Spoofing**
  - Canvas fingerprint manipulation
  - WebGL parameter spoofing
  - Audio context modification
  - Font fingerprint randomization
  - Battery status simulation
  - Browser history manipulation

- **Multi-World Execution**
  - Runs in both MAIN and ISOLATED contexts
  - Comprehensive coverage of browser APIs
  - Frame-level injection support

- **Browser Environment Control**
  - Customizable browser parameters
  - Configurable spoofing offsets
  - Dynamic value generation

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory

## Development

- **Watch Mode**: Run `npm run watch` to automatically rebuild on file changes
- **Build**: Run `npm run build` to create a production build

## Project Structure

```
src/
├── background.js         # Background service worker
├── isolated.js          # Isolated world implementation
├── fpSpoofer.js         # Main fingerprint spoofing logic
├── manifest.json        # Extension configuration
├── browsers/            # Browser-specific spoofing implementations
├── fingerprints/        # Fingerprint manipulation modules
└── helpers/             # Utility functions and helpers
```

## Configuration

The extension can be configured through various parameters in the source code:

- Browser type selection
- History count manipulation
- WebGL parameter customization
- Canvas spoofing indexes
- Font offset adjustments
- Audio context modifications

## Security Considerations

This extension requires the following permissions:
- `activeTab`
- `scripting`
- `storage`
- `host_permissions` for all URLs

## License

ISC License - See [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 