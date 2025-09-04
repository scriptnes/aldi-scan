const path = require('path');
const express = require('express');
const app = express();

// Забраняваме кеширане – да виждаш промените веднага
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Статично сервира текущата папка (без отделен public/)
app.use(express.static(__dirname, {
  index: 'index.html',
  extensions: ['html']
}));

// Ако поискат директно /, връщаме index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// (По желание) SPA fallback – ако имаш други маршрути, разкоментирай:
// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
