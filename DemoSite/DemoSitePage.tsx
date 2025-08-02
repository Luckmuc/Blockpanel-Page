import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Tooltip, Fade } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import ExtensionIcon from '@mui/icons-material/Extension';
import TuneIcon from '@mui/icons-material/Tune';
import TerminalIcon from '@mui/icons-material/Terminal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';

const features = [
  { icon: <StorageIcon color="primary" />, text: 'Multi-Server Management (Start, Stop, Kill, Restart, Status, Properties, Logs, Plugins, Worlds, EULA, Auth)' },
  { icon: <ExtensionIcon color="primary" />, text: 'Upload & Manage Plugins (.jar, max. 10MB, secure)' },
  { icon: <TuneIcon color="primary" />, text: 'Edit server.properties & Create Worlds' },
  { icon: <TerminalIcon color="primary" />, text: 'tmux Process Handling' },
  { icon: <SecurityIcon color="primary" />, text: 'JWT Auth, Secure Uploads, Directory Traversal Protection' },
  { icon: <CheckCircleIcon color="primary" />, text: 'Docker & docker-compose ready' },
];

const installSteps = [
  {
    label: '1. Build & Start',
    code: 'docker compose up --build',
    description: 'Starte das Panel und Backend mit Docker Compose.'
  },
  {
    label: '2. Test API',
    code: 'http://localhost:8000/docs',
    description: 'Öffne die API-Dokumentation im Browser.'
  },
  {
    label: '3. Login',
    code: 'Username: admin\nPassword: admin',
    description: 'Standard-Login für das Webpanel.'
  },
];

const troubleshooting = [
  'Stelle sicher, dass alle Shell-Skripte (z.B. entrypoint.sh) mit Unix-Zeilenenden (LF) gespeichert sind.',
  'Bei Fehlern wie Exec format error: dos2unix backend/entrypoint.sh && chmod +x backend/entrypoint.sh',
  'Dockerfiles und Compose-File funktionieren auf Linux und Windows.'
];

import { useRef, useEffect } from 'react';

const DemoSitePage: React.FC = () => {
  // Animated background canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    let t = 0;
    const draw = () => {
      if (!ctx) return;
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2 + t * 0.2;
        const r = 180 + 60 * Math.sin(t * 0.5 + i);
        const x = w / 2 + Math.cos(angle) * r;
        const y = h / 2 + Math.sin(angle) * r * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 32 + 12 * Math.sin(t + i), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${120 + 80 * Math.sin(i)},${180 + 60 * Math.cos(i)},255,0.08)`;
        ctx.fill();
      }
      t += 0.012;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #0f2027 0%, #2c5364 100%)',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'fixed', zIndex: 0, top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }} />
      <Paper
        elevation={16}
        sx={{
          p: { xs: 2, md: 10 },
          borderRadius: 6,
          background: 'rgba(30,40,60,0.97)',
          boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.45)',
          textAlign: 'center',
          maxWidth: 1200,
          width: '98vw',
          minHeight: 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <Box sx={{ width: '100%', mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Fade in timeout={1200}>
            <img
              src={require('../project-icon-bg.png')}
              alt="Blockpanel Logo"
              style={{ width: 260, borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
            />
          </Fade>
          <Typography variant="h2" sx={{ mt: 2, fontWeight: 900, color: '#fff', letterSpacing: 2, textShadow: '0 2px 16px #0f2027' }}>
            Blockpanel
          </Typography>
          <Typography variant="h5" sx={{ color: '#b0bec5', mt: 1, fontWeight: 500, textShadow: '0 1px 8px #2c5364' }}>
            Private Webpanel für Minecraft Server Hosting
          </Typography>
        </Box>
        <Divider sx={{ width: '100%', mb: 3, bgcolor: '#3a506b' }} />
        <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 600 }}>
          Features
        </Typography>
        <List sx={{ width: '100%', maxWidth: 700, mx: 'auto', mb: 3 }}>
          {features.map((f, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ color: '#5bc0be' }}>{f.icon}</ListItemIcon>
              <ListItemText primary={f.text} primaryTypographyProps={{ color: '#fff' }} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ width: '100%', mb: 4, bgcolor: '#3a506b' }} />
        <Typography variant="h4" sx={{ color: '#fff', mb: 2, fontWeight: 700, letterSpacing: 1 }}>
          Installation & Quickstart
        </Typography>
        <List sx={{ width: '100%', maxWidth: 900, mx: 'auto', mb: 4, gap: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {installSteps.map((step, i) => (
            <Fade in timeout={800 + i * 300} key={i}>
              <ListItem alignItems="flex-start" sx={{ width: { xs: '100%', md: 320 }, m: 1, borderRadius: 3, background: 'rgba(44,83,100,0.18)', boxShadow: '0 2px 12px 0 rgba(44,83,100,0.10)' }}>
                <ListItemIcon sx={{ color: '#5bc0be', mt: 0.5 }}>
                  <TerminalIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>{step.label}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" sx={{ color: '#b0bec5', fontSize: 16 }}>{step.description}</Typography>
                      <Paper sx={{ mt: 1, p: 1.5, background: '#232526', color: '#fff', fontFamily: 'monospace', fontSize: 16, borderRadius: 2, overflowX: 'auto' }}>
                        {step.code.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                      </Paper>
                    </>
                  }
                />
              </ListItem>
            </Fade>
          ))}
        </List>
        <Typography variant="body2" sx={{ color: '#ffb300', mb: 2, fontWeight: 500, letterSpacing: 0.5 }}>
          Hinweis: Die API auf Port 8000 ist aus Sicherheitsgründen im Web nicht erreichbar.<br />
          Teste die API lokal oder in deinem eigenen Netzwerk.
        </Typography>
        <Divider sx={{ width: '100%', mb: 3, bgcolor: '#3a506b' }} />
        <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 600 }}>
          Troubleshooting
        </Typography>
        <List sx={{ width: '100%', maxWidth: 700, mx: 'auto', mb: 3 }}>
          {troubleshooting.map((t, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ color: '#5bc0be' }}><InfoIcon /></ListItemIcon>
              <ListItemText primary={t} primaryTypographyProps={{ color: '#fff' }} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ width: '100%', mb: 4, bgcolor: '#3a506b' }} />
        <Typography variant="body2" sx={{ color: '#b0bec5', mt: 2, fontSize: 18, letterSpacing: 1 }}>
          MIT License &nbsp;|&nbsp; <span style={{ color: '#5bc0be' }}>Luckmuc 2025</span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, fontWeight: 700, borderRadius: 3, px: 6, py: 2, fontSize: 22, boxShadow: '0 4px 24px 0 #5bc0be55', letterSpacing: 1 }}
          href="https://github.com/Luckmuc/Blockpanel-Page"
          target="_blank"
        >
          GitHub Repository
        </Button>
      </Paper>
    </Box>
  );
};

export default DemoSitePage;
