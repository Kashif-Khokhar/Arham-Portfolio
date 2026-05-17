import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import Toast from '../components/Toast';

const Tools = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
  };

  // Password Generator State
  const [pwLength, setPwLength] = useState(16);
  const [pwUpper, setPwUpper] = useState(true);
  const [pwLower, setPwLower] = useState(true);
  const [pwNumbers, setPwNumbers] = useState(true);
  const [pwSymbols, setPwSymbols] = useState(true);
  const [pwOutput, setPwOutput] = useState('—');
  const [pwStrength, setPwStrength] = useState({ label: '—', pct: 0, color: '#555570', entropy: 0 });
  const [pwGenerating, setPwGenerating] = useState(false);
  const [pwCopied, setPwCopied] = useState(false);

  const generatePassword = async () => {
    setPwGenerating(true);
    try {
      const data = await apiFetch('/tools/password', {
        method: 'POST',
        body: JSON.stringify({
          length: pwLength,
          uppercase: pwUpper,
          lowercase: pwLower,
          numbers: pwNumbers,
          symbols: pwSymbols
        })
      });
      setPwOutput(data.password);
      
      const strengthMap = { 
        'Weak': { pct: 20, color: '#ff4444' }, 
        'Moderate': { pct: 50, color: '#ffaa00' }, 
        'Strong': { pct: 75, color: '#00d4ff' }, 
        'Very Strong': { pct: 100, color: '#00ff88' } 
      };
      const s = strengthMap[data.strength] || strengthMap['Moderate'];
      setPwStrength({ label: data.strength, pct: s.pct, color: s.color, entropy: data.entropyBits });
    } catch (err) {
      showToast('Error: ' + err.message);
    } finally {
      setPwGenerating(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyPassword = () => {
    if (!pwOutput || pwOutput === '—') return showToast('Generate a password first');
    navigator.clipboard.writeText(pwOutput).then(() => {
      setPwCopied(true);
      setTimeout(() => setPwCopied(false), 2000);
    });
  };

  // QR Code Generator State
  const [qrInput, setQrInput] = useState('');
  const [qrSize, setQrSize] = useState(300);
  const [qrImage, setQrImage] = useState('');
  const [qrGenerating, setQrGenerating] = useState(false);

  const generateQR = async () => {
    const text = qrInput.trim();
    if (!text) return showToast('Please enter text or URL');
    setQrGenerating(true);
    try {
      const data = await apiFetch('/tools/qr', {
        method: 'POST',
        body: JSON.stringify({ text, size: qrSize })
      });
      setQrImage(data.qrCode);
    } catch (err) {
      showToast('Error: ' + err.message);
    } finally {
      setQrGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrImage) return;
    const a = document.createElement('a');
    a.href = qrImage;
    a.download = 'qrcode.png';
    a.click();
  };

  // Age Calculator State
  const [ageDate, setAgeDate] = useState('');
  const [ageResult, setAgeResult] = useState(null);
  const [ageCalculating, setAgeCalculating] = useState(false);

  const calculateAge = async () => {
    if (!ageDate) return showToast('Please select your birthdate');
    setAgeCalculating(true);
    try {
      const data = await apiFetch('/tools/age', {
        method: 'POST',
        body: JSON.stringify({ birthdate: ageDate })
      });
      setAgeResult(data);
    } catch (err) {
      showToast('Error: ' + err.message);
    } finally {
      setAgeCalculating(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-14 mt-10">
          <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">API-Powered</div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">Developer Tools</h1>
          <p className="text-base text-text-secondary max-w-[560px] mx-auto">Every tool calls a backend API. No logic lives in the frontend.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Password Generator */}
          <div className="bg-card border border-ui-border rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan">
            <div className="p-5 px-6 bg-surface border-b border-ui-border flex items-center gap-3">
              <div className="w-11 h-11 rounded-md flex items-center justify-center text-[1.3rem] shrink-0 bg-cyan/10 border border-cyan-border">🔐</div>
              <div>
                <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em]">Password Generator</div>
                <div className="text-[0.78rem] text-text-muted mt-1 font-mono">POST /api/tools/password</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Password Length</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="4" max="128" value={pwLength} onChange={(e) => setPwLength(Number(e.target.value))} className="flex-1 h-1 bg-elevated rounded appearance-none outline-none accent-cyan" />
                  <span className="font-display text-base text-cyan min-w-[36px] text-center">{pwLength}</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Character Types</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'pw-upper', label: 'Uppercase A-Z', checked: pwUpper, set: setPwUpper },
                    { id: 'pw-lower', label: 'Lowercase a-z', checked: pwLower, set: setPwLower },
                    { id: 'pw-numbers', label: 'Numbers 0-9', checked: pwNumbers, set: setPwNumbers },
                    { id: 'pw-symbols', label: 'Symbols !@#$', checked: pwSymbols, set: setPwSymbols },
                  ].map((chk) => (
                    <label key={chk.id} className="flex items-center gap-2 p-2 px-3 bg-surface border border-ui-border rounded cursor-pointer transition-all hover:border-cyan-border select-none">
                      <input type="checkbox" className="hidden" checked={chk.checked} onChange={(e) => chk.set(e.target.checked)} />
                      <span className={`w-4 h-4 border border-cyan-border rounded-sm flex items-center justify-center text-[0.65rem] shrink-0 ${chk.checked ? 'bg-cyan text-void' : 'bg-transparent text-cyan'}`}>
                        {chk.checked ? '✓' : ''}
                      </span>
                      <span className="font-mono text-[0.75rem] text-text-secondary">{chk.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button 
                onClick={generatePassword} 
                disabled={pwGenerating}
                className="w-full flex justify-center items-center gap-2 px-7 py-3 rounded-md font-mono text-[0.85rem] font-medium tracking-[0.05em] transition-all bg-cyan text-void shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-text-bright mb-3 disabled:opacity-50"
              >
                {pwGenerating ? <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin"></div> : '⚡'} Generate Password
              </button>
              <div className="bg-void border border-cyan-border rounded-md py-3.5 px-4 font-mono text-[0.9rem] text-cyan break-all min-h-[48px] flex items-center justify-between gap-3 mt-2">
                <span className="flex-1">{pwOutput}</span>
                <button 
                  onClick={copyPassword} 
                  className={`bg-transparent border ${pwCopied ? 'border-green text-green' : 'border-cyan-border text-cyan hover:bg-cyan-glow'} px-2.5 py-1 rounded cursor-pointer font-mono text-[0.7rem] transition-all shrink-0 whitespace-nowrap`}
                >
                  {pwCopied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <div className="h-1 bg-elevated rounded-sm overflow-hidden mt-2">
                <div className="h-full rounded-sm transition-all duration-400" style={{ width: `${pwStrength.pct}%`, backgroundColor: pwStrength.color }}></div>
              </div>
              <div className="font-mono text-[0.72rem] mt-1 text-right" style={{ color: pwStrength.color }}>
                {pwStrength.label} · {pwStrength.entropy} bits entropy
              </div>
            </div>
          </div>

          {/* QR Code Generator */}
          <div className="bg-card border border-ui-border rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan">
            <div className="p-5 px-6 bg-surface border-b border-ui-border flex items-center gap-3">
              <div className="w-11 h-11 rounded-md flex items-center justify-center text-[1.3rem] shrink-0 bg-purple-glow border border-purple/30">📱</div>
              <div>
                <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em]">QR Code Generator</div>
                <div className="text-[0.78rem] text-text-muted mt-1 font-mono">POST /api/tools/qr</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Text or URL</label>
                <textarea 
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateQR()}
                  placeholder="https://arhamtechzone.com"
                  className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] transition-colors outline-none focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] resize-y min-h-[70px]"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Size</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="100" max="800" step="50" value={qrSize} onChange={(e) => setQrSize(Number(e.target.value))} className="flex-1 h-1 bg-elevated rounded appearance-none outline-none accent-cyan" />
                  <span className="font-display text-base text-cyan min-w-[60px] text-center text-[0.8rem]">{qrSize}px</span>
                </div>
              </div>
              <button 
                onClick={generateQR} 
                disabled={qrGenerating}
                className="w-full flex justify-center items-center gap-2 px-7 py-3 rounded-md font-mono text-[0.85rem] font-medium tracking-[0.05em] transition-all bg-cyan text-void shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-text-bright mb-3 disabled:opacity-50"
              >
                {qrGenerating ? <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin"></div> : '⚡'} Generate QR Code
              </button>
              
              {qrImage && (
                <div className="flex justify-center mt-4 flex-col items-center gap-3">
                  <img src={qrImage} alt="QR Code" className="rounded-md border-2 border-cyan-border shadow-cyan max-w-[200px] w-full" />
                  <button 
                    onClick={downloadQR}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-[0.78rem] font-medium tracking-[0.05em] transition-all bg-transparent text-cyan border border-cyan-border hover:bg-cyan-glow"
                  >
                    ⬇ Download PNG
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Age Calculator */}
          <div className="bg-card border border-ui-border rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan">
            <div className="p-5 px-6 bg-surface border-b border-ui-border flex items-center gap-3">
              <div className="w-11 h-11 rounded-md flex items-center justify-center text-[1.3rem] shrink-0 bg-green-glow border border-green/30">🎂</div>
              <div>
                <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em]">Age Calculator</div>
                <div className="text-[0.78rem] text-text-muted mt-1 font-mono">POST /api/tools/age</div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block font-mono text-[0.75rem] text-text-secondary tracking-[0.08em] mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  max={new Date().toISOString().split('T')[0]}
                  value={ageDate}
                  onChange={(e) => setAgeDate(e.target.value)}
                  className="w-full bg-surface border border-ui-border rounded-md px-3.5 py-2.5 text-text-primary font-mono text-[0.85rem] transition-colors outline-none focus:border-cyan-dim focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] [color-scheme:dark]"
                />
              </div>
              <button 
                onClick={calculateAge} 
                disabled={ageCalculating}
                className="w-full flex justify-center items-center gap-2 px-7 py-3 rounded-md font-mono text-[0.85rem] font-medium tracking-[0.05em] transition-all bg-cyan text-void shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-text-bright mb-4 disabled:opacity-50"
              >
                {ageCalculating ? <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin"></div> : '⚡'} Calculate Age
              </button>
              
              {ageResult && (
                <div className="animate-fade-in-up">
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[
                      { num: ageResult.years, lbl: 'Years' },
                      { num: ageResult.months, lbl: 'Months' },
                      { num: ageResult.days, lbl: 'Days' }
                    ].map((st, i) => (
                      <div key={i} className="bg-void border border-cyan-border rounded-md p-3 px-2 text-center">
                        <span className="font-display text-[1.4rem] text-cyan block leading-none">{st.num}</span>
                        <span className="text-[0.65rem] text-text-muted font-mono mt-1 block">{st.lbl}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { val: ageResult.totalDays.toLocaleString(), lbl: 'days lived' },
                      { val: ageResult.totalWeeks.toLocaleString(), lbl: 'weeks lived' },
                      { val: ageResult.totalHours.toLocaleString(), lbl: 'hours lived' },
                      { val: ageResult.daysUntilBirthday, lbl: 'days to birthday 🎂' },
                      { val: ageResult.dayOfWeek, lbl: 'born on' },
                      { val: ageResult.zodiacSign, lbl: 'zodiac sign' }
                    ].map((ex, i) => (
                      <div key={i} className="bg-surface rounded-md px-3 py-2.5 font-mono text-[0.72rem]">
                        <strong className="text-purple block text-[0.85rem] mb-0.5">{ex.val}</strong>
                        {ex.lbl}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* API Info */}
        <section className="py-12 mt-12">
          <div className="bg-surface border border-ui-border rounded-xl p-7 transition-all hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan relative overflow-hidden">
            <h3 className="font-display text-[0.9rem] text-cyan tracking-[0.08em] mb-5">⚡ AVAILABLE API ENDPOINTS</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { method: 'POST', path: '/api/tools/password', desc: 'Generate a secure random password' },
                { method: 'POST', path: '/api/tools/qr', desc: 'Generate a QR code as base64 PNG' },
                { method: 'POST', path: '/api/tools/age', desc: 'Calculate age from birthdate' },
                { method: 'GET', path: '/api/blogs', desc: 'Fetch all blog posts (supports ?limit=N)' },
                { method: 'GET', path: '/api/blogs/:id', desc: 'Fetch single blog post by ID' },
                { method: 'GET', path: '/api/health', desc: 'API health check' },
              ].map((api, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-3.5 bg-card border border-ui-border rounded-md flex-wrap">
                  <span className={`font-mono text-[0.7rem] px-2 py-0.5 rounded-sm min-w-[44px] text-center ${api.method === 'GET' ? 'bg-green/10 text-green' : 'bg-cyan/10 text-cyan'}`}>
                    {api.method}
                  </span>
                  <code className="font-mono text-[0.82rem] text-text-bright">{api.path}</code>
                  <span className="text-[0.78rem] text-text-muted ml-auto w-full md:w-auto mt-1 md:mt-0">{api.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Tools;
