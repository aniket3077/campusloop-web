import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Repeat,
  ShieldCheck,
  Leaf,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  QrCode,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  DollarSign,
  Layers,
  Smartphone,
  BookOpen,
  Award,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Lock,
  Globe2,
  Zap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BUY_SELL' | 'BORROW' | 'EXCHANGE' | 'DONATE' | 'DIGITAL'>('BUY_SELL');

  const circularActions = [
    {
      id: 'BUY_SELL',
      title: 'Buy & Sell',
      badge: 'Zero Markup',
      desc: 'Affordable peer-to-peer textbook and gadget resale within your campus perimeter. No third-party commissions.',
      stat: '65% Avg. Savings',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'BORROW',
      title: 'Borrow & Lend',
      badge: 'Micro-Rental',
      desc: 'Short-term borrowing of scientific calculators, drafting kits, lab coats, and semester project components.',
      stat: '4,200+ Days Loaned',
      icon: Layers,
      color: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'EXCHANGE',
      title: 'Exchange & Swap',
      badge: 'Zero Cash Needed',
      desc: 'Barter academic resources directly. Swap your semester 3 electronics kit for semester 4 thermodynamics textbooks.',
      stat: 'Direct 1-to-1 Match',
      icon: Repeat,
      color: 'from-purple-500 to-pink-600',
      bgLight: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'DONATE',
      title: 'Donate & Gift',
      badge: 'Pay It Forward',
      desc: 'Graduating seniors donate reference notes and dorm gear directly to incoming freshmen and library book banks.',
      stat: '100% Impact Driven',
      icon: Leaf,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'DIGITAL',
      title: 'Digital Courseware',
      badge: 'Instant Delivery',
      desc: 'Verified transfer of digital vouchers, course access keys, and lecture study material securely on campus.',
      stat: 'Instant Verification',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
  ];

  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay',
      code: 'IITB',
      location: 'Mumbai, India',
      students: '12,500+ Verified',
      score: '88.5 Circularity',
      hubs: 'Main Gate • Central Library • Hostel 12',
      badge: 'Top Engineering Partner',
    },
    {
      name: 'Stanford University',
      code: 'STANFORD',
      location: 'California, USA',
      students: '17,000+ Verified',
      score: '92.0 Circularity',
      hubs: 'Engineering Quad • Green Library',
      badge: 'Global Sustainability Hub',
    },
    {
      name: 'University of Delhi',
      code: 'DU',
      location: 'New Delhi, India',
      students: '35,000+ Enrolled',
      score: '76.5 Circularity',
      hubs: 'North Campus Hub • Arts Faculty',
      badge: 'Metropolitan Network',
    },
  ];

  const businessPillars = [
    {
      title: 'Zero-Waste Campus Compliance (ESG & NAAC)',
      desc: 'Institutions automatically track Scope 3 greenhouse gas avoidance and landfill tonnage diversion to satisfy green campus accreditations (NAAC, NIRF, AASHE STARS).',
      icon: Award,
    },
    {
      title: 'Institutional Enterprise Subscriptions',
      desc: 'Universities pay an annual SaaS licensing fee for custom perimeter geofencing, co-branded mobile apps, and dedicated campus pickup hub analytics.',
      icon: Building2,
    },
    {
      title: 'Student Financial Accessibility',
      desc: 'Lowers the barrier to education by cutting textbook and equipment expenses by up to 70%, boosting retention for low-income and scholarship students.',
      icon: TrendingUp,
    },
    {
      title: 'Safe Physical QR Hub Lockers',
      desc: 'Cryptographic HMAC QR handoffs stationed at campus security checkposts and libraries guarantee zero scamming and zero meetups with strangers off-campus.',
      icon: QrCode,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-primary-500 selection:text-slate-950 font-sans">
      {/* Top Floating Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-primary-600 to-teal-700 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Enterprise Circular Economy Network: IIT Bombay, Stanford & Delhi University Now Live</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Cloud Run Active</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-500/20">
              <Repeat className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  CampusLoop
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20">
                  Circular Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Campus Resource-Sharing Platform</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#circular-economy" className="hover:text-emerald-400 transition-colors">
              How It Works
            </a>
            <a href="#business-model" className="hover:text-emerald-400 transition-colors">
              Institutional ESG
            </a>
            <a href="#universities" className="hover:text-emerald-400 transition-colors">
              Campus Partners
            </a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">
              Role Architecture
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all shadow-sm"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Admin Login</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-600/20 via-primary-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 mb-8 backdrop-blur shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400">Next-Gen Circular Economy:</span>
            <span>Zero Waste &bull; Student Affordability &bull; Safe Handoffs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            The Circular Resource Sharing Network for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              College Campuses.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed font-normal">
            CampusLoop connects verified college students inside their university ecosystem to{' '}
            <strong className="text-white font-semibold">Buy, Sell, Borrow, Exchange & Donate</strong> textbooks, lab equipment, and tech gear with zero risk, cryptographic QR verification, and automated ESG carbon savings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Building2 className="w-5 h-5 text-slate-950" />
              <span>Admin Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href="#circular-economy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 transition-all backdrop-blur"
            >
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span>Explore The Platform</span>
            </a>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl">
            <div className="p-4 border-r border-slate-800 last:border-r-0">
              <div className="text-3xl font-black text-white mb-1">3 Top Tier</div>
              <div className="text-xs text-slate-400 font-medium">Universities Live</div>
            </div>
            <div className="p-4 border-r border-slate-800 last:border-r-0">
              <div className="text-3xl font-black text-emerald-400 mb-1">1,420+ kg</div>
              <div className="text-xs text-slate-400 font-medium">CO₂ Diverted</div>
            </div>
            <div className="p-4 border-r border-slate-800 last:border-r-0">
              <div className="text-3xl font-black text-teal-400 mb-1">94.8%</div>
              <div className="text-xs text-slate-400 font-medium">Hub Pick-up Rate</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black text-cyan-400 mb-1">\$42,000+</div>
              <div className="text-xs text-slate-400 font-medium">Student Cash Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Circular Actions Section */}
      <section id="circular-economy" className="py-24 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
              One Unified Circular Ecosystem
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Five Ways Students Keep Resources Circulating
            </h3>
            <p className="text-slate-400 text-base">
              Say goodbye to expensive university bookstores, Craigslist scams, and discarded semester notes.
            </p>
          </div>

          {/* Action Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {circularActions.map((action) => {
              const Icon = action.icon;
              const isActive = activeTab === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/40 scale-105'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Showcase */}
          {circularActions
            .filter((a) => a.id === activeTab)
            .map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/40 border border-slate-800 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                        {action.badge}
                      </div>
                      <h4 className="text-3xl font-extrabold text-white mb-4">{action.title}</h4>
                      <p className="text-slate-300 text-base leading-relaxed mb-6">{action.desc}</p>

                      <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                        <div>
                          <div className="text-2xl font-black text-emerald-400">{action.stat}</div>
                          <div className="text-xs text-slate-500 font-medium">Verified Platform Impact</div>
                        </div>
                        <div className="ml-auto">
                          <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                          >
                            <span>Inspect Marketplace</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Trust & Verification</div>
                          <div className="text-xs text-slate-400">Institutional campus email authentication required</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                          <QrCode className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Safe Hub Hand-off</div>
                          <div className="text-xs text-slate-400">Official pickup points inside campus security gates</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">LCA Impact Calculator</div>
                          <div className="text-xs text-slate-400">Automated CO₂ and landfill diversion tracking</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Institutional Business Model & ESG Compliance */}
      <section id="business-model" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
            Business Model & Enterprise Value
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Why Universities Partner with CampusLoop
          </h3>
          <p className="text-slate-400 text-base">
            CampusLoop isn't just a classifieds board; it's enterprise circularity infrastructure built for university sustainability officers, provosts, and campus safety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{pillar.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Participating Colleges Showcase */}
      <section id="universities" className="py-24 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                Live Ecosystem
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Participating Campus Partners
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
              Each university operates an isolated, geofenced micro-economy where only registered institutional members can interact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {colleges.map((col, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                      {col.code}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {col.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {col.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">{col.location}</p>

                  <div className="space-y-2 py-3 border-t border-slate-800/80 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Community:</span>
                      <span className="font-semibold text-white">{col.students}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>ESG Score:</span>
                      <span className="font-semibold text-emerald-400">{col.score}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Official Hubs:</span>
                      <span className="font-medium text-slate-300">{col.hubs}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
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

      {/* Role-Based System Architecture */}
      <section id="architecture" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
            System Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Built for Three Key Roles
          </h3>
          <p className="text-slate-400 text-base">
            CampusLoop provides distinct, tailored interfaces powered by a single high-performance REST backend and PostgreSQL database.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Role 1: Student */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Role 1: Student</div>
              <h4 className="text-2xl font-bold text-white mb-3">Flutter Mobile App</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Students search categories, negotiate prices via live counteroffers, message peer students, and conduct QR verification at campus security desks.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Bargaining Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Encrypted QR Handoff Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Personal LCA CO₂ Savings Tracker</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role 2: College Admin */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Role 2: College Admin</div>
              <h4 className="text-2xl font-bold text-white mb-3">Campus Operations Panel</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Designated campus officials review student ID verification submissions, resolve peer trade disputes, broadcast campus alerts, and manage pickup locations.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Strict College Data Isolation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Student ID & Disciplinary Controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Campus Safe Hub Station Setup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role 3: Super Admin */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Role 3: Super Admin</div>
              <h4 className="text-2xl font-bold text-white mb-3">Global Institutional Suite</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Network administrators onboard new colleges, assign institutional administrators, track subscription plans and revenue, and audit immutable security logs.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Multi-College Governance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Revenue & Subscription Invoicing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Comprehensive Security Audit Trails</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to bring Circular Economy to your University?
            </h3>
            <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Join leading academic institutions driving zero waste, verified campus trust, and student financial resilience.
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-300 font-bold text-sm">CampusLoop Enterprise</span>
              <p className="text-[11px] text-slate-600">Circular Resource-Sharing Network for Higher Education</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#circular-economy" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#business-model" className="hover:text-white transition-colors">
              ESG & Accreditations
            </a>
            <a href="#universities" className="hover:text-white transition-colors">
              Colleges
            </a>
            <Link to="/login" className="hover:text-white transition-colors">
              Admin Login
            </Link>
          </div>

          <div className="text-center md:text-right text-slate-600">
            &copy; {new Date().getFullYear()} CampusLoop Inc. All rights reserved. &bull; Deployed on Google Cloud Run
          </div>
        </div>
      </footer>
    </div>
  );
};
