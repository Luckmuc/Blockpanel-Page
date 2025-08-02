import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Fade, Card, CardContent, CardHeader, Tooltip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import ExtensionIcon from '@mui/icons-material/Extension';
import TuneIcon from '@mui/icons-material/Tune';
import TerminalIcon from '@mui/icons-material/Terminal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';

import projectIcon from '../project-icon-bg.png';
import { useRef, useEffect } from 'react';


const features = [
  { icon: <StorageIcon color="primary" />, text: 'Multi-server management (start, stop, kill, restart, status, properties, logs, plugins, worlds, EULA, auth)' },
  { icon: <ExtensionIcon color="primary" />, text: 'Upload & manage plugins (.jar, max. 10MB, secure)' },
  { icon: <TuneIcon color="primary" />, text: 'Edit server.properties & create worlds' },
  { icon: <TerminalIcon color="primary" />, text: 'tmux process handling' },
  { icon: <SecurityIcon color="primary" />, text: 'JWT auth, secure uploads, directory traversal protection' },
  { icon: <CheckCircleIcon color="primary" />, text: 'Docker & docker-compose ready' },
];

const installSteps = [
  {
    label: '1. Build & Start',
    code: 'docker compose up --build',
    description: 'Start the panel and backend with Docker Compose.'
  },
  {
    label: '2. Open the Web Panel',
    code: 'http://localhost or http://<server-ip>:1105',
    description: 'Open the web panel in your browser at localhost or your server IP on port 1105.'
  },
  {
    label: '3. Login',
    code: 'Username: admin\nPassword: admin',
    description: 'Default login for the web panel.'
  },
];

const troubleshooting = [
  'Make sure all shell scripts (e.g. entrypoint.sh) use Unix line endings (LF).',
  'If you get errors like Exec format error: dos2unix backend/entrypoint.sh && chmod +x backend/entrypoint.sh',
  'Dockerfiles and compose files work on Linux and Windows.'
];

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
        {/* Header */}
        <Box sx={{ width: '100%', mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Fade in timeout={1200}>
            <img
              src={projectIcon}
              alt="Blockpanel Logo"
              style={{ width: 220, borderRadius: 32, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
            />
          </Fade>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <RocketLaunchIcon sx={{ color: '#5bc0be', fontSize: 40 }} />
            <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', letterSpacing: 2, textShadow: '0 2px 16px #0f2027' }}>
              Blockpanel
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#b0bec5', mt: 1, fontWeight: 500, textShadow: '0 1px 8px #2c5364', maxWidth: 700 }}>
            The modern, private web panel for Minecraft server hosting – fast, secure, and beautiful.
          </Typography>
        </Box>
        {/* Main Cards */}
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', mb: 4 }}>
          <Card elevation={8} sx={{ minWidth: 320, maxWidth: 400, flex: 1, background: 'rgba(44,83,100,0.18)', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(44,83,100,0.10)', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 32px 0 #5bc0be33' } }}>
          <CardHeader avatar={<RocketLaunchIcon sx={{ color: '#5bc0be' }} />} title={<Typography variant="h4" sx={{ color: '#5bc0be', fontWeight: 700 }}>Installation</Typography>} sx={{ pb: 0, textAlign: 'center' }} />
            <CardContent>
              <List>
                {installSteps.map((step, i) => (
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemIcon sx={{ color: '#5bc0be', mt: 0.5 }}>
                      <TerminalIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>{step.label}</Typography>}
                      secondary={
                        <>
                          <Typography component="span" sx={{ color: '#b0bec5', fontSize: 15 }}>{step.description}</Typography>
                          <Paper sx={{ mt: 1, p: 1.2, background: '#232526', color: '#fff', fontFamily: 'monospace', fontSize: 15, borderRadius: 2, overflowX: 'auto' }}>
                            {step.code.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                          </Paper>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card elevation={8} sx={{ minWidth: 320, maxWidth: 400, flex: 1, background: 'rgba(44,83,100,0.18)', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(44,83,100,0.10)', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 32px 0 #5bc0be33' } }}>
            <CardHeader avatar={<StorageIcon sx={{ color: '#5bc0be' }} />} title={<Typography variant="h4" sx={{ color: '#5bc0be', fontWeight: 700 }}>Features</Typography>} sx={{ pb: 0, textAlign: 'center' }} />
            <CardContent>
              <List>
                {features.map((f, i) => (
                  <ListItem key={i}>
                    <ListItemIcon sx={{ color: '#5bc0be' }}>{f.icon}</ListItemIcon>
                    <ListItemText primary={f.text} primaryTypographyProps={{ color: '#fff' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card elevation={8} sx={{ minWidth: 320, maxWidth: 400, flex: 1, background: 'rgba(44,83,100,0.18)', borderRadius: 4, boxShadow: '0 2px 12px 0 rgba(44,83,100,0.10)', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 32px 0 #5bc0be33' } }}>
            <CardHeader avatar={<InfoOutlinedIcon sx={{ color: '#5bc0be' }} />} title={<Typography variant="h4" sx={{ color: '#5bc0be', fontWeight: 700 }}>Troubleshooting</Typography>} sx={{ pb: 0, textAlign: 'center' }} />
            <CardContent>
              <List>
                {troubleshooting.map((t, i) => (
                  <ListItem key={i}>
                    <ListItemIcon sx={{ color: '#5bc0be' }}><InfoIcon /></ListItemIcon>
                    <ListItemText primary={t} primaryTypographyProps={{ color: '#fff' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
        <Divider sx={{ width: '100%', my: 4, bgcolor: '#3a506b' }} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, fontWeight: 700, borderRadius: 3, px: 6, py: 2, fontSize: 22, boxShadow: '0 4px 24px 0 #5bc0be55', letterSpacing: 1, transition: 'background 0.2s', '&:hover': { background: '#388087' } }}
          href="https://github.com/Luckmuc/Blockpanel"
          target="_blank"
          startIcon={<RocketLaunchIcon />}
        >
          GitHub Repository
        </Button>
        <Typography variant="caption" sx={{ color: '#b0bec5', mt: 4, mb: 1, opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Luckmuc &mdash; Made with <span style={{ color: '#5bc0be' }}>Blockpanel</span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default DemoSitePage;
