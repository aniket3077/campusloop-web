import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Leaf,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  QrCode,
  Sparkles,
  Building2,
  CheckCircle2,
  DollarSign,
  Layers,
  Smartphone,
  BookOpen,
  Award,
  ChevronRight,
  Lock,
  Repeat,
  HeartHandshake,
  ArrowLeftRight,
  BookMarked,
  Calculator,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL' | 'BORROW' | 'EXCHANGE' | 'DONATE'>('BUY');

  const circularActions = [
    {
      id: 'BUY',
      title: 'BUY',
      sub: 'Affordable Textbooks & Tech',
      badge: 'Zero Markup',
      desc: 'Purchase verified textbooks, graphing calculators, lab coats, and electronics from fellow students at up to 70% off retail prices with zero third-party commissions.',
      stat: '65% Avg. Savings',
      icon: DollarSign,
      color: 'from-sky-500 to-blue-600',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/20 text-sky-600 bg-sky-50/70',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-200',
      buttonBg: 'bg-sky-600 hover:bg-sky-700 text-white',
    },
    {
      id: 'SELL',
      title: 'SELL',
      sub: 'Direct Peer Cash In Hand',
      badge: 'Immediate Payout',
      desc: 'List your past-semester books and project components in under 60 seconds. Negotiate in real time and get paid immediately upon safe QR handoff.',
      stat: '\$42,000+ Reclaimed',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 text-amber-600 bg-amber-50/70',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      id: 'BORROW',
      title: 'BORROW',
      sub: 'Short-Term Micro Loans',
      badge: 'Rent & Return',
      desc: 'Borrow expensive TI-84 calculators, architectural drafting boards, and lab gear for an exam week or single semester without having to buy them outright.',
      stat: '4,200+ Loan Days',
      icon: Layers,
      color: 'from-purple-500 to-indigo-600',
      activeBorder: 'border-purple-500 ring-2 ring-purple-500/20 text-purple-600 bg-purple-50/70',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    {
      id: 'EXCHANGE',
      title: 'EXCHANGE',
      sub: 'Direct 1:1 Resource Swap',
      badge: 'Zero Cash Needed',
      desc: 'Barter academic essentials directly. Swap your semester 3 mechanical engineering kit for semester 4 thermodynamics and fluid mechanics texts.',
      stat: '100% Cashless',
      icon: ArrowLeftRight,
      color: 'from-emerald-500 to-teal-600',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-600 bg-emerald-50/70',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      id: 'DONATE',
      title: 'DONATE',
      sub: 'Pay-It-Forward Impact',
      badge: 'Community Gift',
      desc: 'Graduating seniors and alumni gift reference textbooks, prep manuals, and dorm essentials directly to incoming freshmen and library book banks.',
      stat: '1,420 kg CO₂ Saved',
      icon: HeartHandshake,
      color: 'from-pink-500 to-rose-600',
      activeBorder: 'border-pink-500 ring-2 ring-pink-500/20 text-pink-600 bg-pink-50/70',
      tagColor: 'bg-pink-100 text-pink-800 border-pink-200',
      buttonBg: 'bg-pink-600 hover:bg-pink-700 text-white',
    },
  ];

  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay',
      code: 'IITB',
      location: 'Powai, Mumbai',
      students: '12,500+ Students',
      score: '88.5 Circularity',
      hubs: 'Main Gate Security • Central Library Lounge • Hostel 12',
      badge: 'Premier Technology Hub',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Stanford University',
      code: 'STANFORD',
      location: 'California, USA',
      students: '17,000+ Students',
      score: '92.0 Circularity',
      hubs: 'Engineering Quad Bench A • Green Library Hub',
      badge: 'Global Sustainability Leader',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'University of Delhi',
      code: 'DU',
      location: 'New Delhi, India',
      students: '35,000+ Students',
      score: '76.5 Circularity',
      hubs: 'North Campus Hub • Arts Faculty Concourse',
      badge: 'Metropolitan Network',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  const businessPillars = [
    {
      title: 'Institutional ESG & Sustainability Audits',
      desc: 'Universities receive automated Scope 3 carbon avoidance and landfill waste diversion metrics to satisfy green campus accreditations (NAAC, NIRF, AASHE STARS).',
      icon: Award,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Verified Campus Trust Network',
      desc: 'Exclusive geofenced perimeter. Only registered students with official .edu or institutional email IDs can browse, negotiate, and transact.',
      icon: ShieldCheck,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      title: 'Cryptographic Safe Hub Handoffs',
      desc: 'Physical exchange happens only at designated campus security gates or library hubs via cryptographic HMAC QR verification. Zero off-campus danger.',
      icon: QrCode,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      title: 'Enterprise Subscription & Monetization',
      desc: 'Universities pay an annual SaaS subscription for institutional dashboards, custom locker pickup hub integration, and automated student safety controls.',
      icon: Building2,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Top Floating Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2.5 border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Official Circular Network</span>
        </span>
        <span className="text-slate-300">
          Live across IIT Bombay, Stanford University & Delhi University
        </span>
        <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-bold ml-1">
          &bull; Cloud Run Active
        </span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="CampusLoop Logo"
              className="w-12 h-12 rounded-2xl object-contain shadow-md bg-white p-0.5 ring-1 ring-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Campus<span className="text-emerald-600">Loop</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Enterprise
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-wider flex items-center gap-1.5 text-slate-500 mt-0.5">
                <span className="text-sky-600">BUY</span>
                <span>&bull;</span>
                <span className="text-amber-500">SELL</span>
                <span>&bull;</span>
                <span className="text-purple-600">BORROW</span>
                <span>&bull;</span>
                <span className="text-emerald-600">EXCHANGE</span>
                <span>&bull;</span>
                <span className="text-pink-600">DONATE</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#circular-actions" className="hover:text-emerald-600 transition-colors">
              The 5 Actions
            </a>
            <a href="#business-model" className="hover:text-emerald-600 transition-colors">
              Institutional ESG
            </a>
            <a href="#universities" className="hover:text-emerald-600 transition-colors">
              Campus Partners
            </a>
            <a href="#roles" className="hover:text-emerald-600 transition-colors">
              System Roles
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-all shadow-sm"
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Admin Login</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-slate-50">
        {/* Soft background ambient gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-sky-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Main Logo Centerpiece */}
          <div className="inline-flex flex-col items-center justify-center mb-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-2.5 shadow-xl shadow-slate-200/80 border border-slate-100 ring-4 ring-emerald-500/10 mb-4 transform hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="CampusLoop Official Logo" className="w-full h-full object-contain" />
            </div>

            {/* Tagline Ribbon matching Logo */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-extrabold tracking-wider">
              <span className="text-sky-600">BUY</span>
              <span className="text-emerald-500">&bull;</span>
              <span className="text-amber-500">SELL</span>
              <span className="text-emerald-500">&bull;</span>
              <span className="text-purple-600">BORROW</span>
              <span className="text-emerald-500">&bull;</span>
              <span className="text-emerald-600">EXCHANGE</span>
              <span className="text-emerald-500">&bull;</span>
              <span className="text-pink-600">DONATE</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15] mb-6">
            Circular Resource Sharing for{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              College Students.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-normal">
            The safe, verified peer-to-peer campus platform connecting university students to share textbooks, lab kits, calculators, and electronics — eliminating financial strain and diverting tons of landfill waste.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all transform hover:-translate-y-0.5"
            >
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>Enter Admin Console</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href="#circular-actions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-all shadow-sm"
            >
              <Repeat className="w-5 h-5 text-emerald-600" />
              <span>Explore The 5 Actions</span>
            </a>
          </div>

          {/* Live Verified Campus Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60">
            <div className="p-4 border-r border-slate-100 last:border-r-0 text-center">
              <div className="text-3xl font-black text-slate-900 mb-1">3 Live</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Top Universities</div>
            </div>
            <div className="p-4 border-r border-slate-100 last:border-r-0 text-center">
              <div className="text-3xl font-black text-emerald-600 mb-1">1,420+ kg</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">CO₂ Diverted</div>
            </div>
            <div className="p-4 border-r border-slate-100 last:border-r-0 text-center">
              <div className="text-3xl font-black text-sky-600 mb-1">94.8%</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Hub Handoffs</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-3xl font-black text-purple-600 mb-1">\$42,000+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Student Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Actions Section */}
      <section id="circular-actions" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Circular Economy Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              The Five Ways Campus Resources Circulate
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Every action in CampusLoop prevents resource waste, reduces student expenses, and verifies physical safety inside campus security checkposts.
            </p>
          </div>

          {/* Action Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-12">
            {circularActions.map((action) => {
              const Icon = action.icon;
              const isActive = activeTab === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.id as any)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                    isActive
                      ? action.activeBorder
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div className="text-sm font-black tracking-wide">{action.title}</div>
                  <div className="text-[10px] text-slate-500 font-medium hidden sm:block mt-0.5">{action.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Active Action Feature Card */}
          {circularActions
            .filter((a) => a.id === activeTab)
            .map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
                        {action.badge}
                      </div>
                      <h3 className="text-3xl font-extrabold mb-3">Action: {action.title}</h3>
                      <p className="text-slate-300 text-base leading-relaxed mb-6">{action.desc}</p>

                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-black text-emerald-400">{action.stat}</div>
                          <div className="text-xs text-slate-400 font-medium">Verified Campus Metric</div>
                        </div>
                        <Link
                          to="/login"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${action.buttonBg}`}
                        >
                          <span>Explore in Console</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Infographic Card */}
                    <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 text-sm">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">Student ID Verification</div>
                          <div className="text-xs text-slate-300 mt-0.5">Institutions verify each member via official campus email or uploaded student ID card.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                          <QrCode className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">Cryptographic QR Verification</div>
                          <div className="text-xs text-slate-300 mt-0.5">Physical exchanges require HMAC QR confirmation between buyer and seller at official hubs.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white">Direct LCA Impact Logging</div>
                          <div className="text-xs text-slate-300 mt-0.5">Avoided production emissions are logged and attributed to the college ESG dashboard.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Business Model & Institutional ESG Section */}
      <section id="business-model" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Institutional Partnership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Built for Campus Sustainability & Governance
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            CampusLoop provides institutions with real infrastructure to eliminate waste, improve student affordability, and meet zero-waste campus mandates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Participating Colleges Showcase */}
      <section id="universities" className="py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">
                Live Geofenced Campuses
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Participating Universities
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md mt-4 md:mt-0">
              Each university operates an isolated, geofenced circular economy where only verified institutional students can participate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {colleges.map((col, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-900 text-white">
                      {col.code}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${col.badgeColor}`}>
                      {col.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">{col.location}</p>

                  <div className="space-y-3 py-4 border-t border-slate-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Student Community:</span>
                      <span className="font-bold text-slate-900">{col.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Circularity Index:</span>
                      <span className="font-bold text-emerald-600">{col.score}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-500 block mb-1">Official Safe Hubs:</span>
                      <span className="font-semibold text-slate-800 bg-slate-50 p-2 rounded-lg block border border-slate-100">
                        {col.hubs}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                  >
                    <span>Inspect Campus Panel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Architecture */}
      <section id="roles" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Architecture & Roles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Three Distinct Roles. One Database.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Powered by a single Node.js REST backend, PostgreSQL relational database, and strict college-level access control.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Role 1: Student */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6 border border-sky-100">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-sky-600 mb-1">Role 1: Student</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Flutter Mobile App</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Students browse verified listings, make counter-offers in the interactive bargaining engine, chat with peer students, and execute QR handoffs.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Real-time Bargaining Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Cryptographic QR Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Student Eco-Impact Badges</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role 2: College Admin */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-1">Role 2: College Admin</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Campus Admin Panel</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                College staff verify student ID submissions, mediate trade disputes, issue disciplinary strikes, and manage campus safe pickup hubs.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strict College Data Isolation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Student ID Verification Queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Physical Pickup Station Controls</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role 3: Super Admin */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 border border-purple-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-purple-600 mb-1">Role 3: Super Admin</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Global Platform Suite</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Platform leaders onboard universities, assign college admins, manage enterprise subscription invoicing, and monitor immutable security audit logs.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Multi-College Governance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Subscription & Revenue Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>Security & Audit Trails</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-14 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-white p-1 shadow-lg" />
            <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
              Bring CampusLoop to Your University
            </h2>
            <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Join leading academic institutions creating sustainable, zero-waste campuses and saving students thousands every academic year.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Institutional Console</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CampusLoop" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 ring-1 ring-slate-200" />
            <div>
              <div className="text-slate-900 font-bold text-sm">
                Campus<span className="text-emerald-600">Loop</span>
              </div>
              <p className="text-[11px] text-slate-500">The Circular Resource Sharing Platform for Higher Education</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-600 font-semibold">
            <a href="#circular-actions" className="hover:text-emerald-600 transition-colors">
              The 5 Actions
            </a>
            <a href="#business-model" className="hover:text-emerald-600 transition-colors">
              ESG Audits
            </a>
            <a href="#universities" className="hover:text-emerald-600 transition-colors">
              Universities
            </a>
            <Link to="/login" className="hover:text-emerald-600 transition-colors">
              Admin Login
            </Link>
          </div>

          <div className="text-center md:text-right text-slate-500">
            &copy; {new Date().getFullYear()} CampusLoop Inc. All rights reserved. &bull; Deployed on Google Cloud Run
          </div>
        </div>
      </footer>
    </div>
  );
};
