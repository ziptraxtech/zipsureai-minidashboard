import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Bolt, Play, CheckCircle, ArrowRight, Microscope, Cpu, Flame, Thermometer, Battery } from 'lucide-react';

const SectionLink: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a href={href} className="px-3 py-1.5 rounded-md text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium">
    {label}
  </a>
);

const ZeflashLanding: React.FC = () => {
  const topRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50 text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <Zap className="text-white" size={20} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold">Zeflash</div>
              <div className="text-xs text-gray-500">Rapid AI Diagnostics & Power</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <SectionLink href="#what" label="What" />
            <SectionLink href="#features" label="Features" />
            <SectionLink href="#how" label="How it works" />
            <SectionLink href="#science" label="Science" />
            <SectionLink href="#who" label="Who it’s for" />
            <SectionLink href="#why" label="Why Zeflash" />
          </nav>
          <div className="flex items-center gap-2">
            <a href="#book" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-semibold px-3 py-2 hover:bg-blue-700">
              <Bolt size={16} /> Quick Test
            </a>
            <Link to={"/"} className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium px-3 py-2 hover:bg-gray-50">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={topRef} className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600">Zeflash (Website Landing Page)</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                ⚡ Zeflash: Rapid AI Diagnostics & Power
              </h1>
              <p className="mt-4 text-gray-700 text-lg">
                Quick 15 mins EV & Battery Test, anytime you charge your EV! With Zeflash, get a precise rapid battery health insight report in minutes, not hours.
              </p>
              <p className="mt-2 text-gray-700">
                Zeflash combines flash-based EV testing at Fast Chargers with ZipsureAI’s battery physics-driven AI Deeptech to decode your EV’s true performance, aging, and safety condition on the spot.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#book" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white font-semibold px-4 py-2.5 hover:bg-emerald-700">
                  <CheckCircle size={18} /> Book a Zeflash RapidTest
                </a>
                <a href="#demo" className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium px-4 py-2.5 hover:bg-gray-50">
                  <Play size={18} /> Request a Free Demo
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-xs text-blue-700 font-semibold">Instant Health Report</div>
                    <div className="text-3xl font-extrabold text-blue-700 mt-1">15 min</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="text-xs text-emerald-700 font-semibold">Accuracy</div>
                    <div className="text-3xl font-extrabold text-emerald-700 mt-1">90%+</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 col-span-2">
                    <div className="text-xs text-amber-700 font-semibold">Outputs</div>
                    <div className="mt-2 text-sm text-amber-800">SoP, SoF, Efficiency variance, range loss estimates, and expert recommendations.</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Illustrative metrics. Live values depend on vehicle and session.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Zeflash */}
      <section id="what" className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">What is Zeflash?</h2>
          <p className="mt-4 text-gray-700 max-w-4xl">
            Zeflash Rapid Diagnostics is an advanced EV battery testing platform designed for fast, field-ready health checks. Accurately measuring State of Power (SoP) and State of Function (SoF) at pack levels — helping fleets, garages, and OEMs make instant, confident decisions for servicing, second life repurposing and safe recycling!
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><Bolt size={18} /> Rapid Flash Testing</div>
              <p className="mt-2 text-gray-700">Get real-time diagnostic scans that capture your battery’s true energy output and internal efficiency — all within minutes.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><ActivityIcon /> Multi-Signal Scanning</div>
              <p className="mt-2 text-gray-700">Go beyond surface readings. Integrates current signals, temperature, impedance and multiple parameters to detect early degradation and unsafe charging.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><Cpu size={18} /> AI + Digital Twin Intelligence</div>
              <p className="mt-2 text-gray-700">Physics-based machine learning predicts lifespan, efficiency, and early failure trends with high precision.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><Battery size={18} /> Portable Analysis at EV Chargers</div>
              <p className="mt-2 text-gray-700">Compact, rugged, and easy to use — brings lab-grade diagnostics to the charging station.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><Microscope size={18} /> Benchmark & Traceability</div>
              <p className="mt-2 text-gray-700">Benchmarks across chemistries and manufacturers to enable consistent, traceable results for certification and resale.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2 text-blue-700 font-semibold"><FileIcon /> Instant Health Report</div>
              <p className="mt-2 text-gray-700">Clear, visual reports including SoP, SoF, Accuracy %, Efficiency variance, range loss estimate, and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How It Works</h2>
          <ol className="space-y-4">
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">1. Locate, Connect & Start:</span> Find Zeflash-enabled EV Chargers, book a session, and start charging — no disassembly required.</li>
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">2. Analyze & Detect:</span> Zeflash performs Rapid AI Diagnostics and creates datasets for quick processing.</li>
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">3. Report & Recommend:</span> In minutes, AI models process your EV data and generate a detailed Rapid Health report to download.</li>
          </ol>
        </div>
      </section>

      {/* Science */}
      <section id="science" className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">The Science Inside</h2>
          <p className="text-gray-700 max-w-4xl">
            Zeflash integrates advanced AI Deeptech for electrochemical modeling, impedance testing, multi-parameter dataset analysis, and machine-learning algorithms. By reading subtle internal responses at each charging cycle, it builds a lifecycle profile — predicting degradation, aging, and thermal risks with above 90% accuracy.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section id="who" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Who It’s For</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">EV Fleet Operators:</span> Schedule maintenance, manage warranties, and avoid downtime.</li>
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">Service Centers:</span> Diagnose instantly, verify warranty coverage, and improve TAT.</li>
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">Second-Life & Recyclers:</span> Verify pack health without dismantling; certify for reuse or recycling.</li>
            <li className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="font-semibold">OEMs, Insurance & Manufacturers:</span> On-demand diagnostics and insights for design, passports, insurance and warranties.</li>
          </ul>
        </div>
      </section>

      {/* Why choose */}
      <section id="why" className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Choose Zeflash: Rapid AI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Real-time on-field testing — results in minutes',
              'Lab-grade precision at a nearby EV Charger',
              'Portable and easily accessible for every EV user',
              'Predictive, AI-driven insights for thermal risks',
              'Certified, secure performance reports',
              'See beyond the battery with clear actions'
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 bg-white border border-gray-200 rounded-xl p-4">
                <CheckCircle className="text-emerald-600 mt-0.5" size={18} />
                <span className="text-gray-800 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">🔋 See Beyond the Battery</h2>
          <p className="mt-2 text-gray-700 max-w-3xl mx-auto">
            Zeflash turns complex battery data into clear, confident action — empowering every EV decision with real-time intelligence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href="#book" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white font-semibold px-5 py-3 hover:bg-blue-700">
              <Bolt size={18} /> Book a Zeflash RapidTest
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium px-5 py-3 hover:bg-gray-50">
              <Play size={18} /> Request a Free Demo
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Ziptrax Tech — Zeflash Rapid Diagnostics
        </div>
      </footer>
    </div>
  );
};

const ActivityIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const FileIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

export default ZeflashLanding;
