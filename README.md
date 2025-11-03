## Email Assistant — Full Stack (Browser Extension)

A compact full-stack project that generates emails via a Spring Boot backend, a React frontend, and a small browser extension wrapper.

### What’s included

- `Email-Assistant/` — Spring Boot backend .
- `client/` — Frontend (Using React).
- `Email-Writer-ext/` — Browser extension.

### Quick start (development)

1. Start the backend API

```bash
cd Email-Assistant
# Unix / Git Bash
./mvnw spring-boot:run
# On Windows cmd/powershell
mvnw.cmd spring-boot:run
```

Backend default: http://localhost:8080

2. Start the frontend dev server

```bash
cd client
npm install
npm run dev
```

3. Load the extension in your browser (for quick integration testing)

- Open chrome://extensions (or Edge extensions page)
- Enable Developer mode
- Click "Load unpacked" and select the `Email-Writer-ext/` folder

The extension uses `content.js` and `manifest.json` in the `Email-Writer-ext/` folder.
