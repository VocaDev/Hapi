import { useState, useEffect, useRef } from 'react';
import {
  Baby, Heart, FileText, GraduationCap, Bell, MapPin, AlertCircle, CheckCircle2,
  Clock, ChevronRight, ChevronDown, Stethoscope, Phone, Send, Sparkles, ArrowRight,
  X, LayoutDashboard, PlusCircle, AlertTriangle, User, Wallet, BadgeCheck, Activity,
  Briefcase, RotateCcw, LogOut, Search, Settings, Loader2, Lock, ShieldCheck, Calendar,
  Home as HomeIcon, Eye
} from 'lucide-react';

// ============================================================
// Hapi v2 — Proactive Government MVP for JunctionX ITP Prizren
// Two logins, separated apps, vertical roadmap cascade, AI assistant
// All mock data — built for video recording
// ============================================================

const SERVICES = [
  { id: 'cert',    ministry: 'Regjistri Civil',          name: 'Certifikata e lindjes',   icon: FileText,    time: '09:38', detail: 'Ref: CL-2026-04781' },
  { id: 'idnum',   ministry: 'Regjistri Civil',          name: 'Numri personal i Artës',  icon: BadgeCheck,  time: '09:38', detail: 'NP: 1262060XXXX' },
  { id: 'benefit', ministry: 'Ministria e Punës',        name: 'Pagesa për fëmijë',       icon: Wallet,      time: '09:39', detail: '€20/muaj · fillon 1 qershor 2026' },
  { id: 'leave',   ministry: 'Ministria e Punës',        name: 'Pushimi i lehonisë',      icon: Briefcase,   time: '09:39', detail: '9 muaj me pagesë · formulari i mbushur' },
  { id: 'bcg',     ministry: 'Ministria e Shëndetësisë', name: 'Vaksina BCG',             icon: Stethoscope, time: 'pas 3 ditësh', future: true, detail: 'Spitali Rajonal · Prizren · ora 10:00' },
  { id: 'checkup', ministry: 'Ministria e Shëndetësisë', name: 'Kontrolli i parë',        icon: Heart,       time: 'pas 10 ditësh', future: true, detail: 'Dr. Bislimi · Qendra e Mjekësisë Familjare' },
  { id: 'kinder',  ministry: 'Komuna e Prizrenit',       name: 'Regjistrimi në kopsht',   icon: GraduationCap, time: '21 maj 2028', future: true, detail: 'Kujtesa hapet kur Arta mbush 2 vjeç' },
];

const ASSISTANT_REPLIES = {
  benefits: `Familja juaj, me lindjen e Artës, përfiton automatikisht:

• **Pagesë mujore për fëmijën** — €20/muaj deri Arta të mbushë 18 vjeç. Pagesa e parë mbërrin më 1 qershor 2026 në llogarinë tuaj.

• **Pushim lehonie** — 9 muaj me pagesë të plotë. Formulari është mbushur paraprakisht, mund të aplikoni me një klik.

• **Kujdes shëndetësor falas** për Artën deri në moshën 6 vjeç në të gjitha institucionet publike.

• **Zbritje tatimore** — €240/vit zbritje nga taksa në të ardhura për prindërit me fëmijë nën 18 vjeç.

Të gjitha këto u aktivizuan sot automatikisht. Ju nuk keni nevojë të aplikoni për asgjë.`,

  vaccine: `Kalendari i vaksinave të Artës sipas programit zyrtar të Kosovës:

• **BCG (tuberkulozi)** — 24 maj 2026 (pas 3 ditësh) ✓ termini i rezervuar
• **Hepatiti B** — 21 qershor 2026 (1 muaj)
• **DPT-1 (3-në-1)** — 21 korrik 2026 (2 muaj)
• **Polio + Hib** — 21 gusht 2026 (3 muaj)
• **MMR (fruthi)** — 21 maj 2027 (1 vit)

Çdo termin rezervohet automatikisht në qendrën më të afërt. Ju merrni SMS kujtuese 1 javë dhe 24 orë para terminit.

Nëse humbisni një vaksinë, sistemi cakton një infermiere komunitare që viziton familjen tuaj brenda 48 orësh.`,

  next: `Hapi i ardhshëm i rëndësishëm për ju:

**Vaksina BCG** — 24 maj 2026, ora 10:00, Spitali Rajonal i Prizrenit. Termini është rezervuar, mjeku ju pret.

Çfarë duhet të mbani me vete:
• Letërnjoftimin tuaj
• Certifikatën e lindjes së Artës — ne e kemi gati në mënyrë elektronike, do ta gjeni në linjën tuaj

Do të merrni një SMS kujtuese më 23 maj në orën 16:00.

A keni nevojë për ndihmë me transport ose orarin?`,

  default: `Më vjen mirë t'ju ndihmoj. Mund të pyesni për çdo gjë në lidhje me të drejtat tuaja, hapat e ardhshëm, dokumentet, vaksinat ose shërbimet publike. AI-ja ime është trajnuar mbi ligjet aktuale të Kosovës dhe e di situatën e familjes suaj.`,
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Geist:wght@400;500;600;700&display=swap');
* { font-family: 'Geist', 'Helvetica Neue', system-ui, sans-serif; box-sizing: border-box; }
.font-display { font-family: 'Fraunces', 'Georgia', serif; font-variation-settings: 'opsz' 144, 'SOFT' 30; letter-spacing: -0.02em; }
.grain { background-image: radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px); background-size: 3px 3px; }
.t-9 { font-size: 9px; line-height: 1.4; }
.t-10 { font-size: 10px; line-height: 1.4; }
.t-11 { font-size: 11px; line-height: 1.45; }
.t-13 { font-size: 13px; line-height: 1.55; }
.label-track { letter-spacing: 0.16em; }

@keyframes fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes pulse-dot { 0%,100% { transform: scale(1); opacity: 0.55; } 50% { transform: scale(1.4); opacity: 1; } }
@keyframes spinner { to { transform: rotate(360deg); } }
@keyframes typing-dot { 0%,80%,100% { opacity: 0.3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
@keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(201,116,86,0.4); } 70% { box-shadow: 0 0 0 12px rgba(201,116,86,0); } 100% { box-shadow: 0 0 0 0 rgba(201,116,86,0); } }
@keyframes slide-down { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

.fade-up { animation: fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
.scale-in { animation: scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
.slide-down { animation: slide-down 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
.pulse-dot { animation: pulse-dot 1.4s ease-in-out infinite; }
.spinner { animation: spinner 0.8s linear infinite; }
.pulse-ring { animation: pulse-ring 1.8s ease-out infinite; }
.typing-dot { animation: typing-dot 1.4s ease-in-out infinite; }
.typing-dot-2 { animation-delay: 0.2s; }
.typing-dot-3 { animation-delay: 0.4s; }

.app-shell { min-height: 100vh; }
.citizen-canvas { max-width: 720px; margin: 0 auto; padding: 0 16px; }
.gov-layout { display: grid; grid-template-columns: 1fr; min-height: 100vh; }
@media (min-width: 1024px) { .gov-layout { grid-template-columns: 240px 1fr; } }
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 16px; }
.login-cards { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 720px) { .login-cards { grid-template-columns: 1fr 1fr; } }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; cursor: pointer; transition: opacity 0.15s, transform 0.1s; border: none; outline: none; }
.btn:hover:not(:disabled) { opacity: 0.92; }
.btn:active:not(:disabled) { transform: scale(0.98); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.hover-lift:hover { transform: translateY(-1px); box-shadow: 0 8px 20px -8px rgba(31,61,45,0.18); }
.hover-lift { transition: transform 0.15s, box-shadow 0.15s; }
`;

// ============================================================
// Root App — login routing + shared state
// ============================================================

export default function App() {
  const [user, setUser] = useState(null);

  // Shared mock backend state
  const [registered, setRegistered] = useState(false);
  const [cascadeProgress, setCascadeProgress] = useState(0);
  const [cascading, setCascading] = useState(false);
  const [timeSkipped, setTimeSkipped] = useState(false);
  const [nurseDispatched, setNurseDispatched] = useState(false);
  const timersRef = useRef([]);

  const registerBirth = () => {
    if (registered) return;
    setRegistered(true);
    setCascading(true);
    setCascadeProgress(0);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    SERVICES.forEach((_, i) => {
      const t = setTimeout(() => {
        setCascadeProgress(i + 1);
        if (i === SERVICES.length - 1) setCascading(false);
      }, 1100 + i * 1300);
      timersRef.current.push(t);
    });
  };

  const skipSixMonths = () => setTimeSkipped(true);
  const dispatchNurse = () => setNurseDispatched(true);

  const resetAll = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setRegistered(false);
    setCascadeProgress(0);
    setCascading(false);
    setTimeSkipped(false);
    setNurseDispatched(false);
    setUser(null);
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const sharedProps = {
    registered, cascadeProgress, cascading, timeSkipped, nurseDispatched,
    onRegister: registerBirth,
    onDispatchNurse: dispatchNurse,
    onLogout: () => setUser(null),
  };

  return (
    <div className="app-shell relative" style={{ background: '#f6f1e8', color: '#1a1a17' }}>
      <style>{STYLES}</style>
      <div className="fixed inset-0 pointer-events-none grain" style={{ opacity: 0.5, zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 1 }}>
        {!user && <LoginScreen onLogin={setUser} />}
        {user === 'citizen' && <CitizenApp {...sharedProps} />}
        {user === 'gov' && <GovApp {...sharedProps} />}
      </div>

      <TestModePanel
        visible={!!user}
        currentRole={user}
        registered={registered}
        timeSkipped={timeSkipped}
        onSkipTime={skipSixMonths}
        onReset={resetAll}
      />
    </div>
  );
}

// ============================================================
// LoginScreen
// ============================================================

function LoginScreen({ onLogin }) {
  return (
    <div className="login-wrap">
      <div className="w-full" style={{ maxWidth: '720px' }}>
        <div className="text-center mb-10 fade-up">
          <div className="inline-flex mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#1f3d2d' }}>
              <Sparkles className="w-8 h-8" style={{ color: '#f6f1e8' }} />
            </div>
          </div>
          <div className="font-display font-semibold" style={{ fontSize: '56px', color: '#1f3d2d', lineHeight: 1 }}>Hapi</div>
          <div className="text-sm mt-3" style={{ color: '#6b665e' }}>Qeverisja proaktive për Kosovën · Demonstrim</div>
        </div>

        <div className="login-cards">
          <UserCard
            name="Lirie Krasniqi" role="Qytetare" location="Prizren · 28 vjeç"
            description="Nënë e re. Sapo ka lindur vajzën Arta dhe pret çfarë shteti do të bëjë për familjen e saj."
            accent="#c97456" initials="LK" buttonLabel="Hyr si qytetare"
            onClick={() => onLogin('citizen')} delay={0.1}
          />
          <UserCard
            name="Erza Aliu" role="Klerku" location="Regjistri Civil · Prizren"
            description="Përgjegjëse për regjistrimin e ngjarjeve të reja dhe monitorimin e familjeve në rrjetin e shtetit."
            accent="#1f3d2d" initials="EA" buttonLabel="Hyr si klerku"
            onClick={() => onLogin('gov')} delay={0.2}
          />
        </div>

        <div className="text-center mt-10 fade-up" style={{ animationDelay: '0.35s' }}>
          <div className="t-11 mb-2 flex items-center justify-center gap-1.5" style={{ color: '#9c958a' }}>
            <Lock className="w-3 h-3" /> Të dy llogaritë janë demo · të dhënat janë të rreme
          </div>
          <div className="t-10 uppercase label-track" style={{ color: '#9c958a' }}>
            JunctionX ITP Prizren · 2026
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCard({ name, role, location, description, accent, initials, buttonLabel, onClick, delay }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border p-6 fade-up hover-lift"
      style={{ background: '#fffaf2', borderColor: '#e8dfd0', animationDelay: `${delay}s`, cursor: 'pointer' }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-semibold" style={{ background: accent, color: '#fffaf2', fontSize: '20px' }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold leading-tight" style={{ fontSize: '20px', color: '#1a1a17' }}>{name}</div>
          <div className="t-11 mt-1" style={{ color: accent, fontWeight: 600 }}>{role}</div>
          <div className="t-11" style={{ color: '#6b665e' }}>{location}</div>
        </div>
      </div>
      <div className="t-13 mb-5" style={{ color: '#6b665e' }}>{description}</div>
      <div className="flex items-center justify-between">
        <div className="t-10 uppercase label-track" style={{ color: '#9c958a' }}>Llogaria demo</div>
        <div className="btn px-4 py-2 rounded-lg text-sm" style={{ background: accent, color: '#fffaf2' }}>
          {buttonLabel} <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}

// ============================================================
// TestModePanel — demo controls, clearly marked as test-only
// ============================================================

function TestModePanel({ visible, currentRole, registered, timeSkipped, onSkipTime, onReset }) {
  const [open, setOpen] = useState(false);
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4" style={{ zIndex: 50 }}>
      {open ? (
        <div className="rounded-xl shadow-2xl p-3 scale-in" style={{ background: '#1a1a17', color: '#f6f1e8', minWidth: '260px' }}>
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b" style={{ borderColor: '#3a3a36' }}>
            <div className="t-10 uppercase label-track font-bold flex items-center gap-1.5" style={{ color: '#c97456' }}>
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#c97456' }} />
              Modaliteti i testit
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', color: '#9c958a', border: 'none', cursor: 'pointer' }}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2 mb-3">
            <Kv label="Rol" value={currentRole === 'citizen' ? 'Lirie · Qytetare' : 'Erza · Klerku'} />
            <Kv label="Lindja" value={registered ? 'regjistruar ✓' : 'jo ende'} valColor={registered ? '#7bc77f' : '#9c958a'} />
            <Kv label="Koha" value={timeSkipped ? '+6 muaj' : 'sot'} />
          </div>
          <div className="space-y-2">
            <button
              onClick={onSkipTime}
              disabled={timeSkipped || !registered}
              className="btn w-full px-3 py-2 rounded-md text-xs"
              style={{ background: timeSkipped || !registered ? '#3a3a36' : '#c97456', color: '#f6f1e8' }}
            >
              <Clock className="w-3.5 h-3.5" /> Kalo 6 muaj para
            </button>
            <button
              onClick={onReset}
              className="btn w-full px-3 py-2 rounded-md text-xs"
              style={{ background: '#3a3a36', color: '#f6f1e8' }}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Rifillo demonstrimin
            </button>
          </div>
          <div className="t-9 mt-3 pt-2 border-t" style={{ borderColor: '#3a3a36', color: '#6b665e' }}>
            Ky panel është për demonstrim. Fshihet në videon e gatshme.
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="btn rounded-full shadow-lg px-3 py-2 text-xs"
          style={{ background: '#1a1a17', color: '#f6f1e8' }}
        >
          <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#c97456' }} />
          Test
        </button>
      )}
    </div>
  );
}

function Kv({ label, value, valColor }) {
  return (
    <div className="flex items-center justify-between t-11">
      <span style={{ color: '#9c958a' }}>{label}:</span>
      <span style={{ color: valColor || '#f6f1e8' }}>{value}</span>
    </div>
  );
}

// ============================================================
// CITIZEN APP — Lirie's experience
// ============================================================

function CitizenApp({ registered, cascadeProgress, cascading, timeSkipped, onLogout }) {
  const [tab, setTab] = useState('linja');

  return (
    <div>
      <CitizenTopBar onLogout={onLogout} />
      <CitizenTabs tab={tab} setTab={setTab} />
      <div className="citizen-canvas py-6 pb-24">
        {tab === 'linja' && <CitizenLinja registered={registered} cascadeProgress={cascadeProgress} cascading={cascading} timeSkipped={timeSkipped} />}
        {tab === 'asistenti' && <CitizenAsistenti registered={registered} />}
        {tab === 'njoftime' && <CitizenNjoftime registered={registered} cascadeProgress={cascadeProgress} timeSkipped={timeSkipped} />}
        {tab === 'profili' && <CitizenProfili />}
      </div>
    </div>
  );
}

function CitizenTopBar({ onLogout }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="sticky top-0 border-b backdrop-blur" style={{ background: 'rgba(246,241,232,0.88)', borderColor: '#e8dfd0', zIndex: 40 }}>
      <div className="citizen-canvas flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#1f3d2d' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#f6f1e8' }} />
          </div>
          <span className="font-display font-semibold text-xl" style={{ color: '#1f3d2d' }}>Hapi</span>
        </div>
        <div className="relative">
          <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: '#c97456', color: '#fffaf2' }}>LK</div>
            <span className="hidden sm:block text-sm font-semibold" style={{ color: '#1a1a17' }}>Lirie K.</span>
            <ChevronDown className="w-4 h-4" style={{ color: '#6b665e' }} />
          </button>
          {menu && (
            <div className="absolute right-0 top-full mt-2 rounded-xl border shadow-lg scale-in" style={{ background: '#fffaf2', borderColor: '#e8dfd0', minWidth: '220px', zIndex: 50 }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#e8dfd0' }}>
                <div className="text-sm font-semibold" style={{ color: '#1a1a17' }}>Lirie Krasniqi</div>
                <div className="t-11" style={{ color: '#6b665e' }}>NP: 1182976234</div>
              </div>
              <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2" style={{ color: '#1a1a17', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Settings className="w-4 h-4" /> Cilësimet
              </button>
              <button onClick={onLogout} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2" style={{ color: '#a8453a', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <LogOut className="w-4 h-4" /> Dilni nga llogaria
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CitizenTabs({ tab, setTab }) {
  const tabs = [
    { id: 'linja', label: 'Linja', Icon: Activity },
    { id: 'asistenti', label: 'Asistenti', Icon: Sparkles, badge: 'AI' },
    { id: 'njoftime', label: 'Njoftime', Icon: Bell },
    { id: 'profili', label: 'Profili', Icon: User },
  ];
  return (
    <div className="sticky border-b" style={{ background: '#f6f1e8', borderColor: '#e8dfd0', top: '57px', zIndex: 30 }}>
      <div className="citizen-canvas flex items-center gap-1 overflow-x-auto">
        {tabs.map(({ id, label, Icon, badge }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium relative whitespace-nowrap"
              style={{ color: active ? '#1f3d2d' : '#6b665e', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge && (
                <span className="t-9 uppercase font-bold px-1.5 py-0.5 rounded" style={{ background: active ? '#c97456' : '#e8dfd0', color: active ? '#fffaf2' : '#6b665e' }}>{badge}</span>
              )}
              {active && <div className="absolute" style={{ bottom: 0, left: '8px', right: '8px', height: '2px', background: '#1f3d2d', borderRadius: '2px' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Citizen LINJA — vertical roadmap ----

function CitizenLinja({ registered, cascadeProgress, cascading, timeSkipped }) {
  if (!registered) {
    return (
      <div className="text-center py-16 fade-up">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: '#fffaf2', border: '2px solid #e8dfd0' }}>
          <Baby className="w-9 h-9" style={{ color: '#9c958a' }} />
        </div>
        <div className="font-display font-semibold mb-2" style={{ fontSize: '24px', color: '#1f3d2d' }}>Mirë se erdhët, Lirie</div>
        <div className="text-sm" style={{ color: '#6b665e', maxWidth: '400px', margin: '0 auto' }}>
          Familja juaj nuk ka ngjarje aktive për momentin. Kur shteti regjistron një ngjarje për familjen tuaj, gjithçka shfaqet këtu automatikisht.
        </div>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full t-11" style={{ background: '#fff4ea', color: '#c97456' }}>
          <Sparkles className="w-3.5 h-3.5" /> Hapi po pret që shteti të veprojë
        </div>
      </div>
    );
  }

  const immediate = SERVICES.filter(s => !s.future);
  const future = SERVICES.filter(s => s.future);

  return (
    <div>
      <HeroCard cascadeProgress={cascadeProgress} />

      <div className="mt-6">
        <SectionLabel label="U bë sot" icon={CheckCircle2} color="#1f3d2d" />
        <div className="mt-1">
          {immediate.map((s, i) => {
            const idx = SERVICES.indexOf(s);
            const status = idx < cascadeProgress ? 'done' : (idx === cascadeProgress && cascading ? 'processing' : 'upcoming');
            return <RoadmapStep key={s.id} service={s} status={status} position={i} isLast={i === immediate.length - 1} />;
          })}
        </div>
      </div>

      <div className="mt-8">
        <SectionLabel label="Vjen më vonë" icon={Calendar} color="#c97456" />
        <div className="mt-1">
          {future.map((s, i) => {
            const idx = SERVICES.indexOf(s);
            const status = idx < cascadeProgress ? 'scheduled' : (idx === cascadeProgress && cascading ? 'processing' : 'upcoming');
            return <RoadmapStep key={s.id} service={s} status={status} position={i + immediate.length} isLast={i === future.length - 1} />;
          })}
        </div>
      </div>

      {cascadeProgress >= 7 && (
        <div className="mt-6 rounded-2xl p-5 fade-up flex items-start gap-3" style={{ background: '#fffaf2', border: '1px solid #d6e2d8' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#1f3d2d' }}>
            <ShieldCheck className="w-5 h-5" style={{ color: '#f6f1e8' }} />
          </div>
          <div>
            <div className="font-display font-semibold" style={{ fontSize: '17px', color: '#1f3d2d' }}>Të gjitha të rregulluara</div>
            <div className="t-13 mt-1" style={{ color: '#6b665e' }}>
              Shteti aktivizoi 7 shërbime për familjen tuaj sot. Nëse ndonjë vaksinë ose kontroll humbet në të ardhmen, ne ju kontaktojmë.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HeroCard({ cascadeProgress }) {
  const completedNow = Math.min(cascadeProgress, 4);
  const upcoming = Math.max(0, cascadeProgress - 4);
  return (
    <div className="rounded-3xl p-6 relative overflow-hidden fade-up" style={{ background: 'linear-gradient(135deg, #1f3d2d 0%, #2d5a3f 100%)', color: '#f6f1e8' }}>
      <div className="absolute" style={{ right: '-32px', top: '-32px', width: '160px', height: '160px', borderRadius: '50%', background: '#c97456', opacity: 0.15 }} />
      <div className="relative">
        <div className="t-10 uppercase label-track mb-2" style={{ color: '#c97456', fontWeight: 700 }}>Familja Krasniqi</div>
        <div className="font-display font-semibold mb-1" style={{ fontSize: '32px', lineHeight: 1.1 }}>Urime për Artën!</div>
        <div className="text-sm mb-5" style={{ opacity: 0.85 }}>Lindur më 21 maj 2026 · Prizren · Shteti po vepron për ju</div>
        <div className="flex items-center gap-6 pt-4 border-t" style={{ borderColor: 'rgba(246,241,232,0.18)' }}>
          <Stat number={completedNow} label="kryer sot" />
          <Stat number={upcoming} label="planifikuara" />
          <Stat number={0} label="forma të mbushura" />
        </div>
      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="font-display font-semibold leading-none" style={{ fontSize: '26px' }}>{number}</div>
      <div className="t-10 uppercase label-track mt-1.5" style={{ opacity: 0.7 }}>{label}</div>
    </div>
  );
}

function SectionLabel({ label, icon: Icon, color }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4" style={{ color }} />
      <span className="t-10 uppercase label-track font-bold" style={{ color }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: '#e8dfd0' }} />
    </div>
  );
}

// ============================================================
// RoadmapStep — the vertical journey node (citizen + gov)
// ============================================================

function RoadmapStep({ service, status, position, isLast }) {
  const Icon = service.icon;
  const styles = {
    done:       { dotBg: '#1f3d2d', dotFg: '#f6f1e8', lineBg: '#1f3d2d', cardBg: '#fffaf2', cardBorder: '#d6e2d8', accent: '#1f3d2d', label: 'I përfunduar' },
    processing: { dotBg: '#c97456', dotFg: '#fffaf2', lineBg: '#e8dfd0', cardBg: '#fff4ea', cardBorder: '#f0d9c5', accent: '#c97456', label: 'Po procesohet' },
    scheduled:  { dotBg: '#fffaf2', dotFg: '#c97456', lineBg: '#e8dfd0', cardBg: '#fffaf2', cardBorder: '#f0d9c5', accent: '#c97456', label: 'I planifikuar' },
    upcoming:   { dotBg: '#fffaf2', dotFg: '#9c958a', lineBg: '#e8dfd0', cardBg: '#fffaf2', cardBorder: '#e8dfd0', accent: '#9c958a', label: 'Në pritje' },
    missed:     { dotBg: '#a8453a', dotFg: '#f6f1e8', lineBg: '#e8b8b0', cardBg: '#fdf0ee', cardBorder: '#e8b8b0', accent: '#a8453a', label: 'E humbur' },
  }[status];

  const titleColor = status === 'upcoming' ? '#6b665e' : status === 'missed' ? '#a8453a' : '#1a1a17';

  return (
    <div className="relative pl-14 pb-4 fade-up" style={{ animationDelay: `${position * 0.07}s` }}>
      {!isLast && <div className="absolute" style={{ left: '19px', top: '44px', bottom: '-4px', width: '2px', background: styles.lineBg }} />}

      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          left: 0, top: '4px', width: '40px', height: '40px',
          background: styles.dotBg, color: styles.dotFg,
          border: (status === 'scheduled' || status === 'upcoming') ? `2px solid ${styles.accent}` : 'none',
          zIndex: 2,
        }}
      >
        {status === 'done' && <CheckCircle2 className="w-5 h-5" />}
        {status === 'processing' && <Loader2 className="w-5 h-5 spinner" />}
        {status === 'scheduled' && <Clock className="w-4 h-4" />}
        {status === 'upcoming' && <Clock className="w-4 h-4" />}
        {status === 'missed' && <AlertCircle className="w-5 h-5" />}
      </div>

      <div
        className="rounded-xl border p-4 flex items-start gap-3"
        style={{
          background: styles.cardBg,
          borderColor: styles.cardBorder,
          boxShadow: status === 'processing' ? '0 0 0 3px rgba(201,116,86,0.10)' : 'none'
        }}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: styles.accent + '18' }}>
          <Icon className="w-4 h-4" style={{ color: styles.accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
            <div className="min-w-0">
              <div className="t-10 uppercase label-track font-bold" style={{ color: styles.accent }}>{service.ministry}</div>
              <div className="text-sm font-semibold mt-0.5" style={{ color: titleColor }}>{service.name}</div>
            </div>
            <span className="t-10 uppercase label-track font-bold whitespace-nowrap flex items-center gap-1 px-2 py-1 rounded" style={{ background: styles.accent + '18', color: styles.accent }}>
              {status === 'processing' && <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: styles.accent }} />}
              {styles.label}
            </span>
          </div>
          {service.detail && (
            <div className="t-11 mt-1.5" style={{ color: '#6b665e' }}>{service.detail}</div>
          )}
          <div className="t-11 mt-1.5 font-medium" style={{ color: '#9c958a' }}>
            {status === 'done' && `Sot · ${service.time}`}
            {status === 'processing' && 'Tani'}
            {status === 'scheduled' && service.time}
            {status === 'upcoming' && (service.future ? service.time : 'do të fillojë së shpejti')}
            {status === 'missed' && 'Termini u kalua'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Citizen ASISTENTI — AI chat ----

function CitizenAsistenti({ registered }) {
  const initial = registered
    ? "Mirëdita Lirie! Unë jam asistenti juaj AI në Hapi. Shoh që Arta sapo ka lindur — urime familjes! Mund t'ju ndihmoj me të drejtat tuaja, hapat e ardhshëm, vaksinat ose dokumentet. Çfarë doni të dini?"
    : "Mirëdita Lirie! Unë jam asistenti juaj AI. Pyetuni për çdo gjë në lidhje me shërbimet publike në Kosovë.";
  const [messages, setMessages] = useState([{ role: 'assistant', content: initial }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const sendMsg = (text, replyKey) => {
    setMessages(m => [...m, { role: 'user', content: text }]);
    setTyping(true);
    setInput('');
    setTimeout(() => {
      setTyping(false);
      const reply = ASSISTANT_REPLIES[replyKey] || ASSISTANT_REPLIES.default;
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    }, 1400 + Math.random() * 500);
  };

  const submit = () => {
    if (!input.trim() || typing) return;
    const text = input.trim();
    const lower = text.toLowerCase();
    let key = 'default';
    if (/përfit|të drejt|pages|leho|përfitoj/i.test(lower)) key = 'benefits';
    else if (/vaksin|kalend/i.test(lower)) key = 'vaccine';
    else if (/tjet|hap|tani|duhet/i.test(lower)) key = 'next';
    sendMsg(text, key);
  };

  return (
    <div>
      <div className="rounded-2xl p-5 mb-5 fade-up flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #1f3d2d 0%, #2d5a3f 100%)', color: '#f6f1e8' }}>
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(246,241,232,0.15)' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="absolute inset-0 rounded-2xl pulse-ring" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="font-display font-semibold" style={{ fontSize: '20px' }}>Asistenti AI</div>
            <span className="t-9 uppercase font-bold px-1.5 py-0.5 rounded" style={{ background: '#c97456', color: '#fffaf2' }}>AI</span>
          </div>
          <div className="t-11" style={{ opacity: 0.85 }}>Përgjigje të personalizuara për familjen tuaj · në shqip</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 t-10 uppercase label-track px-2 py-1 rounded-full" style={{ background: 'rgba(123,199,127,0.18)', color: '#a8e6ad' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7bc77f' }} />
          aktive
        </div>
      </div>

      <div ref={scrollRef} className="rounded-2xl border p-4 mb-3 overflow-y-auto" style={{ background: '#fffaf2', borderColor: '#e8dfd0', minHeight: '380px', maxHeight: '480px' }}>
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex fade-up ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line"
                style={{
                  background: m.role === 'user' ? '#1f3d2d' : '#f6f1e8',
                  color: m.role === 'user' ? '#f6f1e8' : '#1a1a17',
                  maxWidth: '88%',
                  lineHeight: 1.55,
                  borderTopRightRadius: m.role === 'user' ? '4px' : '16px',
                  borderTopLeftRadius: m.role === 'user' ? '16px' : '4px',
                }}
              >
                {formatMessage(m.content)}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start fade-up">
              <div className="rounded-2xl px-4 py-3 flex items-center gap-1.5" style={{ background: '#f6f1e8', borderTopLeftRadius: '4px' }}>
                <span className="w-2 h-2 rounded-full typing-dot" style={{ background: '#6b665e' }} />
                <span className="w-2 h-2 rounded-full typing-dot typing-dot-2" style={{ background: '#6b665e' }} />
                <span className="w-2 h-2 rounded-full typing-dot typing-dot-3" style={{ background: '#6b665e' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <Chip text="Çfarë përfitoj si nënë e re?" onClick={() => sendMsg("Çfarë përfitoj si nënë e re?", 'benefits')} disabled={typing} />
        <Chip text="Kur është vaksina tjetër e Artës?" onClick={() => sendMsg("Kur është vaksina tjetër e Artës?", 'vaccine')} disabled={typing} />
        <Chip text="Çfarë duhet të bëj tani?" onClick={() => sendMsg("Çfarë duhet të bëj tani?", 'next')} disabled={typing} />
      </div>

      <div className="flex items-center gap-2 p-2 rounded-2xl border" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Shkruani pyetjen tuaj..."
          className="flex-1 text-sm px-3 py-2"
          style={{ background: 'transparent', color: '#1a1a17', border: 'none', outline: 'none' }}
        />
        <button onClick={submit} disabled={!input.trim() || typing} className="btn rounded-full" style={{ width: '36px', height: '36px', background: input.trim() && !typing ? '#c97456' : '#e8dfd0', color: '#fffaf2' }}>
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="t-10 mt-3 text-center" style={{ color: '#9c958a' }}>
        Hapi AI nuk zëvendëson këshillën e mjekut ose avokatit · Përgjigjet bazuar në ligjet aktuale të Kosovës
      </div>
    </div>
  );
}

function Chip({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="btn px-3 py-2 rounded-full t-11 border" style={{ background: '#fffaf2', borderColor: '#e8dfd0', color: '#1f3d2d', fontWeight: 500 }}>
      <Sparkles className="w-3 h-3" style={{ color: '#c97456' }} /> {text}
    </button>
  );
}

function formatMessage(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => p.startsWith('**') && p.endsWith('**')
    ? <strong key={i} style={{ fontWeight: 700 }}>{p.slice(2, -2)}</strong>
    : <span key={i}>{p}</span>
  );
}

// ---- Citizen NJOFTIME ----

function CitizenNjoftime({ registered, cascadeProgress, timeSkipped }) {
  if (!registered) {
    return <EmptyTab title="Pa njoftime" body="Kur shteti vepron për familjen tuaj, njoftimet shfaqen këtu." icon={Bell} />;
  }

  const items = [];
  if (cascadeProgress > 0) items.push({ icon: Baby, title: 'Lindja u regjistrua', body: 'Arta Krasniqi u regjistrua zyrtarisht. 7 shërbime u nisën automatikisht për familjen tuaj.', time: 'Sot, 09:38', color: '#1f3d2d' });
  if (cascadeProgress >= 2) items.push({ icon: BadgeCheck, title: 'Numri personal i Artës u krijua', body: 'NP: 1262060XXXX · gjeneruar nga Regjistri Civil. I disponueshëm në mënyrë elektronike.', time: 'Sot, 09:38', color: '#1f3d2d' });
  if (cascadeProgress >= 3) items.push({ icon: Wallet, title: 'Pagesa për fëmijë u aprovua', body: '€20/muaj deri Arta të mbushë 18 vjeç. Pagesa e parë mbërrin më 1 qershor 2026.', time: 'Sot, 09:39', color: '#1f3d2d' });
  if (cascadeProgress >= 5) items.push({ icon: Stethoscope, title: 'Vaksina BCG u rezervua', body: 'Termini: 24 maj 2026, ora 10:00. Spitali Rajonal i Prizrenit. Mjeku ju pret.', time: 'Sot, 09:39', color: '#c97456' });
  if (timeSkipped) items.unshift({ icon: AlertCircle, title: 'Vaksina BCG — kujtesë', body: 'Mos harroni: vaksina BCG është nesër në orën 10:00. Spitali Rajonal i Prizrenit.', time: 'sot, 14:30', color: '#c97456', urgent: true });

  return (
    <div>
      <div className="font-display font-semibold mb-5 fade-up" style={{ fontSize: '28px', color: '#1f3d2d' }}>Njoftime</div>
      <div className="space-y-3">
        {items.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} className="rounded-xl border p-4 flex gap-3 fade-up" style={{ background: n.urgent ? '#fff4ea' : '#fffaf2', borderColor: n.urgent ? '#f0d9c5' : '#e8dfd0', animationDelay: `${i * 0.05}s` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: n.color + '18' }}>
                <Icon className="w-5 h-5" style={{ color: n.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: '#1a1a17' }}>{n.title}</div>
                <div className="t-13 mt-0.5" style={{ color: '#6b665e' }}>{n.body}</div>
                <div className="t-10 uppercase label-track mt-2" style={{ color: '#9c958a' }}>{n.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CitizenProfili() {
  return (
    <div>
      <div className="font-display font-semibold mb-5 fade-up" style={{ fontSize: '28px', color: '#1f3d2d' }}>Profili</div>
      <div className="rounded-2xl border p-6 mb-4 fade-up" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
        <div className="flex items-center gap-4 mb-5 pb-5 border-b" style={{ borderColor: '#e8dfd0' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-semibold" style={{ background: '#c97456', color: '#fffaf2', fontSize: '22px' }}>LK</div>
          <div>
            <div className="font-display font-semibold" style={{ fontSize: '22px', color: '#1a1a17' }}>Lirie Krasniqi</div>
            <div className="t-11" style={{ color: '#6b665e' }}>Qytetare · 28 vjeç · Prizren</div>
          </div>
        </div>
        <div className="space-y-2">
          <Field label="Numri personal">1182976234</Field>
          <Field label="Email">lirie.krasniqi@gmail.com</Field>
          <Field label="Telefoni">+383 44 123 456</Field>
          <Field label="Adresa">Rr. Adem Jashari nr. 47, Prizren</Field>
          <Field label="Familja">Arta Krasniqi · vajzë · 0 ditë</Field>
        </div>
      </div>

      <div className="rounded-2xl border p-5 fade-up" style={{ background: '#fffaf2', borderColor: '#e8dfd0', animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4" style={{ color: '#1f3d2d' }} />
          <div className="text-sm font-semibold" style={{ color: '#1a1a17' }}>Privatësia</div>
        </div>
        <div className="t-13" style={{ color: '#6b665e' }}>
          Të dhënat tuaja janë të sigurta. Hapi nuk i ndan me asnjë palë të tretë. Vetëm institucionet zyrtare të Republikës së Kosovës kanë qasje, sipas ligjit.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b" style={{ borderColor: '#e8dfd0' }}>
      <div className="t-10 uppercase label-track font-bold" style={{ color: '#9c958a' }}>{label}</div>
      <div className="text-sm text-right" style={{ color: '#1a1a17' }}>{children}</div>
    </div>
  );
}

function EmptyTab({ title, body, icon: Icon }) {
  return (
    <div className="text-center py-16 fade-up">
      <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: '#fffaf2', border: '2px solid #e8dfd0' }}>
        <Icon className="w-9 h-9" style={{ color: '#9c958a' }} />
      </div>
      <div className="font-display font-semibold mb-2" style={{ fontSize: '22px', color: '#1f3d2d' }}>{title}</div>
      <div className="text-sm" style={{ color: '#6b665e', maxWidth: '400px', margin: '0 auto' }}>{body}</div>
    </div>
  );
}

// ============================================================
// GOV APP — Erza's experience
// ============================================================

function GovApp({ registered, cascadeProgress, cascading, timeSkipped, nurseDispatched, onRegister, onDispatchNurse, onLogout }) {
  const [screen, setScreen] = useState('paneli');

  // Auto-route on key state changes
  useEffect(() => { if (cascading) setScreen('kaskada'); }, [cascading]);
  useEffect(() => { if (timeSkipped && !nurseDispatched) setScreen('alarmet'); }, [timeSkipped, nurseDispatched]);

  return (
    <div className="gov-layout">
      <GovSidebar screen={screen} setScreen={setScreen} timeSkipped={timeSkipped} nurseDispatched={nurseDispatched} onLogout={onLogout} />
      <div style={{ minWidth: 0, overflowY: 'auto' }}>
        <GovTopBar />
        <div className="p-6" style={{ maxWidth: '1100px' }}>
          {screen === 'paneli' && <GovPaneli registered={registered} cascadeProgress={cascadeProgress} timeSkipped={timeSkipped} nurseDispatched={nurseDispatched} setScreen={setScreen} />}
          {screen === 'regjistro' && <GovRegjistro registered={registered} onRegister={onRegister} />}
          {screen === 'kaskada' && <GovKaskada registered={registered} cascadeProgress={cascadeProgress} cascading={cascading} setScreen={setScreen} />}
          {screen === 'alarmet' && <GovAlarmet timeSkipped={timeSkipped} nurseDispatched={nurseDispatched} onDispatchNurse={onDispatchNurse} />}
        </div>
      </div>
    </div>
  );
}

function GovSidebar({ screen, setScreen, timeSkipped, nurseDispatched, onLogout }) {
  const items = [
    { id: 'paneli', label: 'Paneli', Icon: LayoutDashboard },
    { id: 'regjistro', label: 'Regjistro ngjarje', Icon: PlusCircle },
    { id: 'kaskada', label: 'Kaskada', Icon: Activity },
    { id: 'alarmet', label: 'Alarmet', Icon: AlertTriangle, badge: timeSkipped && !nurseDispatched ? 1 : 0 },
  ];
  return (
    <aside className="border-r flex flex-col" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
      <div className="p-5 border-b" style={{ borderColor: '#e8dfd0' }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1f3d2d' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#f6f1e8' }} />
          </div>
          <div>
            <div className="font-display font-semibold leading-none" style={{ fontSize: '20px', color: '#1f3d2d' }}>Hapi</div>
            <div className="t-9 uppercase label-track mt-1" style={{ color: '#6b665e' }}>Konsola e Shtetit</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            className="btn w-full px-3 py-2.5 rounded-lg text-sm justify-start"
            style={{ background: screen === id ? '#1f3d2d' : 'transparent', color: screen === id ? '#f6f1e8' : '#1a1a17' }}
          >
            <Icon className="w-4 h-4" />
            <span className="flex-1 text-left">{label}</span>
            {badge > 0 && (
              <span className="t-9 font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#a8453a', color: '#fffaf2' }}>{badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t" style={{ borderColor: '#e8dfd0' }}>
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: '#1f3d2d', color: '#f6f1e8' }}>EA</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold" style={{ color: '#1a1a17' }}>Erza Aliu</div>
            <div className="t-10" style={{ color: '#6b665e' }}>Regjistri Civil</div>
          </div>
          <button onClick={onLogout} className="btn p-1.5 rounded-md" style={{ background: 'transparent', color: '#6b665e' }}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function GovTopBar() {
  return (
    <div className="border-b px-6 py-4 flex items-center justify-between gap-4" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
      <div className="flex items-center gap-2 flex-1 min-w-0" style={{ maxWidth: '420px' }}>
        <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#9c958a' }} />
        <input placeholder="Kërko qytetarë, ngjarje, alarme..." className="flex-1 text-sm" style={{ background: 'transparent', color: '#1a1a17', border: 'none', outline: 'none' }} />
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 t-10 uppercase label-track px-2.5 py-1.5 rounded-full" style={{ background: '#f6f1e8', color: '#6b665e' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7bc77f' }} />
          Sistemi · në linjë
        </div>
        <Bell className="w-5 h-5" style={{ color: '#6b665e' }} />
      </div>
    </div>
  );
}

function GovPaneli({ registered, cascadeProgress, timeSkipped, nurseDispatched, setScreen }) {
  const stats = [
    { label: 'Ngjarje aktive sot', value: registered ? 13 : 12, delta: registered ? '+1' : '0', icon: Activity },
    { label: 'Veprime në pritje', value: cascadeProgress === 0 ? 47 : Math.max(40, 47 - cascadeProgress), delta: cascadeProgress > 0 ? `−${cascadeProgress}` : '0', icon: Clock },
    { label: 'Alarme aktive', value: timeSkipped && !nurseDispatched ? 3 : 2, delta: timeSkipped && !nurseDispatched ? '+1' : '0', icon: AlertTriangle, danger: timeSkipped && !nurseDispatched },
  ];
  const events = [
    { type: 'Lindje', family: 'Familja Krasniqi · Arta', time: registered ? 'Sapo · 09:38' : 'pa regjistruar', actions: registered ? cascadeProgress : 0, isNew: registered, target: 'kaskada' },
    { type: 'Lindje', family: 'Familja Berisha · Drini', time: '6 muaj më parë', actions: 7, missed: timeSkipped, dispatched: nurseDispatched, target: timeSkipped ? 'alarmet' : null },
    { type: 'Punësim', family: 'Familja Gashi · Blerim', time: '2 ditë më parë', actions: 4 },
    { type: 'Martesë', family: 'Familja Hoxha', time: '3 ditë më parë', actions: 5 },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="font-display font-semibold" style={{ fontSize: '32px', color: '#1f3d2d', lineHeight: 1.1 }}>Mirëdita, Erza</div>
        <div className="text-sm mt-1.5" style={{ color: '#6b665e' }}>Pasqyrë e ngjarjeve dhe veprimeve të sotme · Komuna e Prizrenit · 21 maj 2026</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border p-5 fade-up" style={{ background: s.danger ? '#fdf0ee' : '#fffaf2', borderColor: s.danger ? '#e8b8b0' : '#e8dfd0', animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4" style={{ color: s.danger ? '#a8453a' : '#6b665e' }} />
                <span className="t-10 uppercase label-track font-bold" style={{ color: s.danger ? '#a8453a' : '#1f3d2d' }}>{s.delta}</span>
              </div>
              <div className="font-display font-semibold leading-none" style={{ fontSize: '36px', color: s.danger ? '#a8453a' : '#1f3d2d' }}>{s.value}</div>
              <div className="t-11 mt-2" style={{ color: '#6b665e' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="t-10 uppercase label-track font-bold" style={{ color: '#1f3d2d' }}>Ngjarjet e fundit</div>
        <button onClick={() => setScreen('regjistro')} className="btn t-11" style={{ background: 'transparent', color: '#c97456' }}>
          <PlusCircle className="w-3.5 h-3.5" /> Ngjarje e re
        </button>
      </div>

      <div className="space-y-2">
        {events.map((e, i) => (
          <button
            key={i}
            onClick={() => e.target && setScreen(e.target)}
            className="w-full text-left rounded-xl border p-4 flex items-center gap-4 fade-up hover-lift"
            style={{ background: '#fffaf2', borderColor: e.missed && !e.dispatched ? '#e8b8b0' : '#e8dfd0', animationDelay: `${i * 0.05}s`, cursor: e.target ? 'pointer' : 'default' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: e.missed && !e.dispatched ? '#a8453a18' : '#1f3d2d18' }}>
              <Baby className="w-5 h-5" style={{ color: e.missed && !e.dispatched ? '#a8453a' : '#1f3d2d' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold flex items-center gap-2 flex-wrap" style={{ color: '#1a1a17' }}>
                {e.type} · {e.family}
                {e.isNew && <Badge color="#1f3d2d" label="E RE" />}
                {e.missed && !e.dispatched && <Badge color="#a8453a" label="VAKSINË E HUMBUR" />}
                {e.missed && e.dispatched && <Badge color="#1f3d2d" label="INFERMIERE U DËRGUA" />}
              </div>
              <div className="t-11 mt-0.5" style={{ color: '#6b665e' }}>{e.time} · {e.actions} veprime në rrjet</div>
            </div>
            {e.target && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#9c958a' }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Badge({ color, label }) {
  return <span className="t-9 font-bold uppercase label-track px-1.5 py-0.5 rounded" style={{ background: color, color: '#fffaf2' }}>{label}</span>;
}

function GovRegjistro({ registered, onRegister }) {
  return (
    <div style={{ maxWidth: '720px' }}>
      <div className="mb-6">
        <div className="font-display font-semibold" style={{ fontSize: '32px', color: '#1f3d2d', lineHeight: 1.1 }}>Regjistro ngjarje të re</div>
        <div className="text-sm mt-1.5" style={{ color: '#6b665e' }}>Një ngjarje brenda — kaskada e shërbimeve niset automatikisht.</div>
      </div>

      <div className="rounded-xl border p-6 space-y-5 fade-up" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
        <FormField label="Lloji i ngjarjes">
          <div className="flex gap-2 flex-wrap">
            {['Lindje', 'Martesë', 'Punësim', 'Pension'].map((t, i) => (
              <button key={t} disabled={i !== 0} className="btn px-4 py-2 rounded-lg text-sm" style={i === 0 ? { background: '#1f3d2d', color: '#f6f1e8' } : { background: 'transparent', color: '#9c958a', border: '1px solid #e8dfd0' }}>
                {t}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Prindi (qytetar)">
          <div className="px-4 py-3 rounded-lg border flex items-center gap-3" style={{ background: '#f6f1e8', borderColor: '#e8dfd0' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: '#c97456', color: '#fffaf2' }}>LK</div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: '#1a1a17' }}>Krasniqi, Lirie</div>
              <div className="t-11" style={{ color: '#6b665e' }}>NP: 1182976234 · Prizren · 28 vjeç</div>
            </div>
            <CheckCircle2 className="w-4 h-4" style={{ color: '#1f3d2d' }} />
          </div>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Emri i fëmijës">
            <div className="px-4 py-3 rounded-lg border text-sm" style={{ background: '#fffaf2', borderColor: '#e8dfd0', color: '#1a1a17' }}>Arta</div>
          </FormField>
          <FormField label="Datëlindja">
            <div className="px-4 py-3 rounded-lg border text-sm" style={{ background: '#fffaf2', borderColor: '#e8dfd0', color: '#1a1a17' }}>21 maj 2026</div>
          </FormField>
        </div>

        <div className="pt-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 t-11" style={{ color: '#6b665e' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#c97456' }} />
            <span><b style={{ color: '#1f3d2d' }}>7 shërbime</b> nga 4 ministri do të nisen automatikisht</span>
          </div>
          <button onClick={onRegister} disabled={registered} className="btn px-6 py-3 rounded-lg text-sm" style={{ background: registered ? '#9c958a' : '#c97456', color: '#fffaf2' }}>
            {registered ? 'Regjistruar ✓' : 'Regjistro ngjarjen'} {!registered && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!registered && (
        <div className="mt-4 rounded-xl p-4 flex items-start gap-3 t-11" style={{ background: '#fff4ea', color: '#c97456' }}>
          <Eye className="w-4 h-4 flex-shrink-0" style={{ marginTop: '2px' }} />
          <span>Pasi të klikoni "Regjistro", do të kaloni automatikisht në panelin e Kaskadës ku do të shihni shërbimet duke u nisur një nga një.</span>
        </div>
      )}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <div className="t-10 uppercase label-track font-bold mb-2" style={{ color: '#6b665e' }}>{label}</div>
      {children}
    </div>
  );
}

function GovKaskada({ registered, cascadeProgress, cascading, setScreen }) {
  if (!registered) {
    return (
      <div className="text-center py-16 fade-up">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: '#fffaf2', border: '2px solid #e8dfd0' }}>
          <Activity className="w-9 h-9" style={{ color: '#9c958a' }} />
        </div>
        <div className="font-display font-semibold mb-2" style={{ fontSize: '22px', color: '#1f3d2d' }}>Asnjë kaskadë aktive</div>
        <div className="text-sm mb-5" style={{ color: '#6b665e', maxWidth: '420px', margin: '0 auto' }}>
          Regjistroni një ngjarje të re për të parë sistemin në veprim.
        </div>
        <button onClick={() => setScreen('regjistro')} className="btn px-5 py-2.5 rounded-lg text-sm" style={{ background: '#c97456', color: '#fffaf2' }}>
          <PlusCircle className="w-4 h-4" /> Regjistro ngjarje
        </button>
      </div>
    );
  }

  const done = Math.min(cascadeProgress, SERVICES.length);
  const total = SERVICES.length;

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <div className="font-display font-semibold" style={{ fontSize: '32px', color: '#1f3d2d', lineHeight: 1.1 }}>Kaskada e shërbimeve</div>
          <div className="text-sm mt-1.5" style={{ color: '#6b665e' }}>Ngjarja: Lindje · Familja Krasniqi · Arta · 21 maj 2026</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: '#fffaf2', border: '1px solid #e8dfd0', minWidth: '140px' }}>
          <div className="font-display font-semibold leading-none" style={{ fontSize: '36px', color: '#1f3d2d' }}>
            {done}<span style={{ fontSize: '20px', color: '#9c958a' }}>/{total}</span>
          </div>
          <div className="t-10 uppercase label-track mt-1.5" style={{ color: '#6b665e' }}>Veprime të kryera</div>
        </div>
      </div>

      {cascading && (
        <div className="rounded-xl p-4 flex items-center gap-3 mb-6 slide-down" style={{ background: '#fff4ea', border: '1px solid #f0d9c5' }}>
          <Loader2 className="w-5 h-5 spinner" style={{ color: '#c97456' }} />
          <div className="flex-1">
            <div className="text-sm font-semibold" style={{ color: '#c97456' }}>Shërbimet po nisen automatikisht</div>
            <div className="t-11" style={{ color: '#6b665e' }}>Çdo shërbim procesohet nga ministria përkatëse. Kjo ndodh në kohë reale.</div>
          </div>
        </div>
      )}

      <div>
        {SERVICES.map((s, i) => {
          let status;
          if (i < cascadeProgress) status = s.future ? 'scheduled' : 'done';
          else if (i === cascadeProgress && cascading) status = 'processing';
          else status = 'upcoming';
          return <RoadmapStep key={s.id} service={s} status={status} position={i} isLast={i === SERVICES.length - 1} />;
        })}
      </div>

      {cascadeProgress >= total && (
        <div className="mt-6 rounded-2xl p-5 fade-up flex items-center gap-4" style={{ background: '#1f3d2d', color: '#f6f1e8' }}>
          <CheckCircle2 className="w-7 h-7 flex-shrink-0" />
          <div>
            <div className="font-display font-semibold" style={{ fontSize: '20px' }}>Kaskada përfundoi</div>
            <div className="text-sm mt-1" style={{ opacity: 0.9 }}>Familja u njoftua automatikisht. 7 shërbime · 4 ministri · 0 forma të mbushura nga qytetari.</div>
          </div>
        </div>
      )}
    </div>
  );
}

function GovAlarmet({ timeSkipped, nurseDispatched, onDispatchNurse }) {
  return (
    <div>
      <div className="mb-6">
        <div className="font-display font-semibold" style={{ fontSize: '32px', color: '#1f3d2d', lineHeight: 1.1 }}>Alarmet · Rrjeti i sigurisë</div>
        <div className="text-sm mt-1.5" style={{ color: '#6b665e' }}>Familjet që humbën një hap të rëndësishëm — sistemi vepron përsëri.</div>
      </div>

      {!timeSkipped && (
        <div className="rounded-2xl border p-8 text-center fade-up" style={{ background: '#fffaf2', borderColor: '#e8dfd0' }}>
          <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: '#1f3d2d18' }}>
            <CheckCircle2 className="w-7 h-7" style={{ color: '#1f3d2d' }} />
          </div>
          <div className="font-display font-semibold" style={{ fontSize: '20px', color: '#1f3d2d' }}>Asnjë alarm aktiv</div>
          <div className="text-sm mt-1.5" style={{ color: '#6b665e' }}>Të gjitha familjet janë në rrugën e duhur.</div>
        </div>
      )}

      {timeSkipped && (
        <div className="space-y-4">
          <div className="rounded-2xl border p-5 fade-up" style={{ background: nurseDispatched ? '#fffaf2' : '#fdf0ee', borderColor: nurseDispatched ? '#d6e2d8' : '#e8b8b0' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: nurseDispatched ? '#1f3d2d' : '#a8453a' }}>
                {nurseDispatched ? <CheckCircle2 className="w-6 h-6" style={{ color: '#f6f1e8' }} /> : <AlertCircle className="w-6 h-6" style={{ color: '#f6f1e8' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <div className="font-display font-semibold" style={{ fontSize: '22px', color: nurseDispatched ? '#1f3d2d' : '#a8453a', lineHeight: 1.1 }}>Familja Berisha</div>
                  <Badge color={nurseDispatched ? '#1f3d2d' : '#a8453a'} label={nurseDispatched ? 'INFERMIERE U DËRGUA' : 'URGJENT'} />
                </div>
                <div className="text-sm" style={{ color: '#1a1a17' }}>Vaksina BCG e humbur · Drini Berisha, 6 muajsh</div>
                <div className="t-11 mt-0.5" style={{ color: '#6b665e' }}>Termini ishte 24 nëntor 2025 · familja nuk u përgjigj në 3 kujtesa</div>

                {!nurseDispatched && (
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <button onClick={onDispatchNurse} className="btn px-4 py-2.5 rounded-lg text-sm" style={{ background: '#a8453a', color: '#fffaf2' }}>
                      <Stethoscope className="w-4 h-4" /> Dërgo infermieren
                    </button>
                    <button className="btn px-4 py-2.5 rounded-lg text-sm" style={{ background: 'transparent', color: '#1a1a17', border: '1px solid #e8dfd0' }}>
                      Shiko detajet
                    </button>
                  </div>
                )}

                {nurseDispatched && (
                  <div className="mt-4 p-4 rounded-lg slide-down flex items-center gap-4" style={{ background: '#f6f1e8', border: '1px solid #d6e2d8' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1f3d2d' }}>
                      <Stethoscope className="w-5 h-5" style={{ color: '#f6f1e8' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold" style={{ color: '#1a1a17' }}>Mimoza Hyseni · Infermiere komunitare</div>
                      <div className="t-11 mt-1 flex items-center gap-3 flex-wrap" style={{ color: '#6b665e' }}>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 1.2 km larg</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Mbërrin 14:00</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +383 44 567 890</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-5 fade-up" style={{ background: '#fffaf2', borderColor: '#f0d9c5', animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#c97456' }}>
                <AlertCircle className="w-6 h-6" style={{ color: '#fffaf2' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <div className="font-display font-semibold" style={{ fontSize: '20px', color: '#c97456', lineHeight: 1.1 }}>Familja Hoxha</div>
                  <Badge color="#c97456" label="MESATAR" />
                </div>
                <div className="text-sm" style={{ color: '#1a1a17' }}>Kontrolli mjekësor i munguar · Era Hoxha, 9 muajsh</div>
                <div className="t-11 mt-0.5" style={{ color: '#6b665e' }}>Termini ishte 18 nëntor 2025 · ridërgo SMS automatikisht</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
