import express from 'express';
import cors from 'cors';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let QRCode = null;
try { 
  QRCode = (await import('qrcode')).default; 
} catch {
  console.warn('⚠️  qrcode not found — install with: npm install\n   (A placeholder SVG will be returned instead)');
}

const app  = express();

app.use(cors());
app.use(express.json());

const getBlogs = () => {
  // Use process.cwd() to resolve path correctly in both local and Vercel environments
  const filePath = path.join(process.cwd(), 'data/blogs.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// ─── Health ───────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({
  status: 'ok', message: 'Arham Tech Zone API running 🚀', qrReady: !!QRCode
}));

// ─── Password ─────────────────────────────────────
app.post('/api/tools/password', (req, res) => {
  try {
    const { length = 16, uppercase = true, lowercase = true, numbers = true, symbols = true } = req.body;
    if (length < 4 || length > 128) return res.status(400).json({ error: true, message: 'Length must be 4–128.' });
    let charset = ''; const sets = [];
    if (uppercase) { const s='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; charset+=s; sets.push(s); }
    if (lowercase) { const s='abcdefghijklmnopqrstuvwxyz'; charset+=s; sets.push(s); }
    if (numbers)   { const s='0123456789'; charset+=s; sets.push(s); }
    if (symbols)   { const s='!@#$%^&*()_+-=[]{}|;:,.<>?'; charset+=s; sets.push(s); }
    if (!charset)  return res.status(400).json({ error: true, message: 'Select at least one character type.' });
    const guaranteed = sets.map(s => s[crypto.randomInt(s.length)]);
    const rest = Array.from({ length: length - guaranteed.length }, () => charset[crypto.randomInt(charset.length)]);
    const all  = [...guaranteed, ...rest];
    for (let i = all.length-1; i > 0; i--) { const j = crypto.randomInt(i+1); [all[i],all[j]]=[all[j],all[i]]; }
    const password   = all.join('');
    const entropyBits = Math.floor(length * Math.log2(charset.length));
    const strength   = entropyBits>=80?'Very Strong':entropyBits>=60?'Strong':entropyBits>=40?'Moderate':'Weak';
    res.json({ password, length, entropyBits, strength });
  } catch { res.status(500).json({ error: true, message: 'Failed to generate password.' }); }
});

// ─── QR Code ──────────────────────────────────────
app.post('/api/tools/qr', async (req, res) => {
  try {
    const { text, size = 300 } = req.body;
    if (!text?.trim()) return res.status(400).json({ error: true, message: 'Text is required.' });
    if (text.length > 2000) return res.status(400).json({ error: true, message: 'Max 2000 chars.' });
    const w = Math.min(Math.max(size, 100), 1000);

    if (QRCode) {
      const dataURL = await QRCode.toDataURL(text.trim(), { type:'image/png', width:w, margin:2, color:{ dark:'#00d4ff', light:'#0a0a12' }});
      return res.json({ qrCode: dataURL, text: text.trim(), size: w });
    }

    // Fallback SVG "QR-like" pattern derived from SHA-256
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    const N = 21; const cell = Math.floor(w / N); const S = cell * N;
    const rect = (x,y,ww,hh,fill) => `<rect x="${x}" y="${y}" width="${ww}" height="${hh}" fill="${fill}"/>`;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">`;
    svg += rect(0,0,S,S,'#0a0a12');
    // Finder corners
    [[0,0],[14,0],[0,14]].forEach(([c,r]) => {
      svg += rect(c*cell,r*cell,7*cell,7*cell,'#00d4ff');
      svg += rect((c+1)*cell,(r+1)*cell,5*cell,5*cell,'#0a0a12');
      svg += rect((c+2)*cell,(r+2)*cell,3*cell,3*cell,'#00d4ff');
    });
    // Data from hash
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) {
      const fin=(r<8&&c<8)||(r<8&&c>=13)||(r>=13&&c<8);
      if (!fin && parseInt(hash[(r*N+c)%64],16)%2) svg+=rect(c*cell,r*cell,cell,cell,'#00d4ff');
    }
    svg+='</svg>';
    res.json({ qrCode:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'), text:text.trim(), size:S, note:'Install qrcode package for real QR codes' });
  } catch { res.status(500).json({ error:true, message:'Failed to generate QR code.' }); }
});

// ─── Age Calculator ───────────────────────────────
app.post('/api/tools/age', (req, res) => {
  try {
    const { birthdate } = req.body;
    if (!birthdate) return res.status(400).json({ error:true, message:'Birthdate required.' });
    const birth = new Date(birthdate); const now = new Date();
    if (isNaN(birth.getTime())) return res.status(400).json({ error:true, message:'Invalid date.' });
    if (birth > now) return res.status(400).json({ error:true, message:'Date cannot be in the future.' });
    let y=now.getFullYear()-birth.getFullYear(), mo=now.getMonth()-birth.getMonth(), d=now.getDate()-birth.getDate();
    if (d<0) { mo--; d+=new Date(now.getFullYear(),now.getMonth(),0).getDate(); }
    if (mo<0) { y--; mo+=12; }
    const td = Math.floor((now-birth)/86400000);
    const nb = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nb<=now) nb.setFullYear(now.getFullYear()+1);
    const zodiac = (m,day) => { const z=[[1,19,'Capricorn ♑'],[2,18,'Aquarius ♒'],[3,20,'Pisces ♓'],[4,19,'Aries ♈'],[5,20,'Taurus ♉'],[6,20,'Gemini ♊'],[7,22,'Cancer ♋'],[8,22,'Leo ♌'],[9,22,'Virgo ♍'],[10,22,'Libra ♎'],[11,21,'Scorpio ♏'],[12,31,'Sagittarius ♐']]; for(const[em,ed,n]of z)if(m<em||(m===em&&day<=ed))return n; return 'Capricorn ♑'; };
    res.json({ years:y, months:mo, days:d, totalDays:td, totalWeeks:Math.floor(td/7), totalMonths:y*12+mo, totalHours:td*24, daysUntilBirthday:Math.ceil((nb-now)/86400000), dayOfWeek:birth.toLocaleDateString('en-US',{weekday:'long'}), zodiacSign:zodiac(birth.getMonth()+1,birth.getDate()), birthdate:birth.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) });
  } catch { res.status(500).json({ error:true, message:'Failed to calculate age.' }); }
});

// ─── Blogs ────────────────────────────────────────
app.get('/api/blogs', (req, res) => {
  try {
    let blogs = getBlogs();
    const { tag, limit } = req.query;
    if (tag) blogs = blogs.filter(b => b.tags.map(t=>t.toLowerCase()).includes(tag.toLowerCase()));
    if (limit) blogs = blogs.slice(0, parseInt(limit));
    res.json({ blogs, total: blogs.length });
  } catch { res.status(500).json({ error:true, message:'Failed to fetch blogs.' }); }
});

app.get('/api/blogs/:id', (req, res) => {
  try {
    const blog = getBlogs().find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).json({ error:true, message:'Blog not found.' });
    res.json(blog);
  } catch { res.status(500).json({ error:true, message:'Failed to fetch blog.' }); }
});

export default app;
