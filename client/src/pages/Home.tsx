// Sonoran Monolith homepage: asymmetric editorial layouts, sharp architectural crops, and copper datum lines.
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  MoveRight,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const heroUrl = "/images/hero-sonoran.webp";

// `stack` is the card's position-in-the-capital-stack tag; it mirrors the hero's capital rail.
const expertise = [
  {
    title: "Construction Finance",
    stack: "Senior debt",
    copy: "Ground-up, adaptive-reuse, and renovation capital aligned with project schedules, draw mechanics, and sponsor objectives.",
  },
  {
    title: "Bridge & Transitional Debt",
    stack: "Senior debt",
    copy: "Flexible capital for acquisitions, lease-up, repositioning, recapitalizations, and other transitional business plans.",
  },
  {
    title: "Permanent Financing",
    stack: "Senior debt",
    copy: "Fixed- and floating-rate financing sourced across banks, agencies, life companies, CMBS platforms, and debt funds.",
  },
  {
    title: "Structured Capital",
    stack: "Mezzanine · Preferred equity",
    copy: "Mezzanine debt, preferred equity, and layered structures that close capital gaps while protecting sponsor priorities.",
  },
  {
    title: "Joint Venture Equity",
    stack: "JV equity",
    copy: "Sponsor-equity positioning and partner selection for development and acquisition opportunities.",
  },
  {
    title: "Special Situations",
    stack: "Across the stack",
    copy: "Independent advice for complex refinancings, recapitalizations, workouts, and time-sensitive executions.",
  },
];

const approach = [
  ["01", "Frame", "Define the business plan, constraints, and decisions before going to market."],
  ["02", "Structure", "Balance proceeds, cost, flexibility, recourse, and execution risk."],
  ["03", "Position", "Present a precise credit and investment case to the right capital sources."],
  ["04", "Execute", "Lead diligence, negotiation, and closing through funding."],
];

const capitalStructures = [
  {
    number: "01",
    title: "Senior stretch",
    leverage: "90% debt",
    equity: "10% sponsor equity",
    description: "One senior facility maximizes proceeds and limits the developer’s upfront equity.",
    layers: [
      { label: "Common Equity", percent: 10, tone: "equity" },
      { label: "Senior Debt", percent: 90, tone: "senior" },
    ],
  },
  {
    number: "02",
    title: "Structured solution",
    leverage: "85% combined capital",
    equity: "15% sponsor equity",
    description: "Preferred equity fills the gap above the senior note while keeping common equity lean.",
    layers: [
      { label: "Common Equity", percent: 15, tone: "equity" },
      { label: "Preferred Equity", percent: 15, tone: "preferred" },
      { label: "Senior Note", percent: 70, tone: "senior" },
    ],
  },
  {
    number: "03",
    title: "Credit-enhanced JV",
    leverage: "99% combined capital",
    equity: "1% sponsor equity",
    description: "Credit enhancement supports the JV layer, reducing the sponsor’s upfront equity requirement to 1%.",
    layers: [
      { label: "Sponsor Equity", percent: 1, tone: "equity" },
      { label: "JV Structuring", percent: 9, tone: "jv" },
      { label: "Mezz Debt", percent: 10, tone: "mezz" },
      { label: "Senior Note", percent: 80, tone: "senior" },
    ],
  },
];

const operatingPrinciples = [
  "Dependable Relationships",
  "Excellence and Integrity",
  "Commitment to Clients",
  "AI Powered Intelligence",
  "Proactive Execution",
];

function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const audience = String(data.get("audience") || "borrowers");
    const message = String(data.get("message") || "");
    const recipient = audience === "lenders"
      ? "Lenders@levelcapitaladvisors.com"
      : "Borrowers@levelcapitaladvisors.com";
    const subject = encodeURIComponent(`${audience === "lenders" ? "Lender" : "Borrower"} inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    toast.success(`Email draft addressed to ${recipient} is ready.`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="top" className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Commercial real estate investment bank</p>
            <h1 id="hero-title">Capital,<br /><em>elevated.</em></h1>
            <p className="hero-deck">
              Independent advice connecting borrowers, lenders, and capital partners around consequential commercial real estate decisions.
            </p>
            <div className="hero-actions">
              <a href="#expertise" className="button button-copper">Explore expertise <ArrowRight size={17} /></a>
              <a href="/team#relationship-contacts" className="text-link text-link-light">Build a relationship <MoveRight size={18} /></a>
            </div>
          </div>

          <div className="hero-visual">
            <img src={heroUrl} alt="Contemporary commercial real estate property in late-afternoon light" />
            <div className="hero-image-veil" />
            <div className="hero-coordinate"><span>33.49° N</span><span>111.93° W</span></div>
            <div className="capital-rail">
              <span className="capital-rail-title">Across the capital stack</span>
              {[
                ["01", "Senior debt"],
                ["02", "Mezzanine"],
                ["03", "Preferred equity"],
                ["04", "JV equity"],
              ].map(([num, label]) => <div key={num}><small>{num}</small><span>{label}</span></div>)}
            </div>
          </div>

          <div className="operating-standard" aria-labelledby="operating-standard-title">
            <div className="standard-intro">
              <span>Operating principles</span>
              <h2 id="operating-standard-title">We are <em>Level.</em></h2>
              <p>We bring creative structuring, informed market judgment, and long-term relationship stewardship to every mandate.</p>
            </div>
            <div className="principles-grid" role="list" aria-label="Level Capital Advisors operating principles">
              {/* The first principle (Dependable Relationships) is featured full-width via .principle-featured. */}
              {operatingPrinciples.map((principle, index) => (
                <div key={principle} role="listitem" className={index === 0 ? "principle-featured" : undefined}>
                  <small>0{index + 1}</small>
                  <span>{principle}</span>
                </div>
              ))}
            </div>
            <div className="standard-close">
              <span>Our measure</span>
              <p>This is the <em>Level standard.</em></p>
            </div>
          </div>
        </section>

        <section id="firm" className="firm-section section-pad">
          <div className="page-grid">
            <div className="label-column"><SectionLabel index="01">Mission Statement</SectionLabel></div>
            <div className="firm-statement">
              <h2>Your capital structure isn’t a financing exercise. <em>It’s a risk allocation we're trained to optimize in any market.</em></h2>
            </div>
            <div className="firm-copy">
              <p className="lead">The best investment banking execution begins before an opportunity reaches the market.</p>
              <p>We start with the operating plan, downside cases, timing, and sponsor priorities—then shape the capital strategy, positioning, and relationships around what the asset actually needs.</p>
              <a href="#advisory-services" className="text-link">How we work <MoveRight size={18} /></a>
            </div>
          </div>
        </section>

        <section id="philosophy" className="philosophy-section section-pad">
          <div className="philosophy-inner">
            <SectionLabel index="02" light>Philosophy</SectionLabel>
            <figure className="philosophy-anchor">
              <blockquote>Relationships are not a byproduct of our work. <em>They are the foundation of it.</em></blockquote>
              <figcaption>The commitment we bring to each engagement.</figcaption>
            </figure>
            <div className="philosophy-tenets">
              <article>
                <h3>The power of weak ties</h3>
                <p>Meg Jay’s <cite>The Defining Decade</cite> shows how our loosest connections often open the most doors. That’s why we treat any introduction as an opportunity worth pursuing.</p>
              </article>
              <article>
                <h3>Add value, make it fun</h3>
                <p>Our team starts with one question: how can we strengthen your business — and make the process more enjoyable along the way?</p>
              </article>
              <article>
                <h3>Build where we do business</h3>
                <p>Principles should cost something. Once a year, all of our advisors join a Habitat for Humanity build in the neighborhoods we serve.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="expertise" className="expertise-section section-pad">
          <div className="page-grid expertise-heading">
            <div className="label-column"><SectionLabel index="03" light>Expertise</SectionLabel></div>
            <div className="expertise-statement">
              <h2>Complex capital.<br /><em>Clearly arranged.</em></h2>
              <p>We structure every mandate around the business plan—from senior debt through sponsor equity—not a predetermined product.</p>
            </div>
          </div>
          <aside className="intelligence-band" aria-labelledby="intelligence-title">
            <div className="intelligence-heading">
              <span>AI-powered program</span>
              <h3 id="intelligence-title">Faster intelligence.<br /><em>Accountable judgment.</em></h3>
              <p>We pair AI with rigorous research to identify what matters before others see it. Experienced judgment drives every recommendation.</p>
            </div>
            <div className="intelligence-points">
              <div><ScanSearch size={22} strokeWidth={1.4} /><span>Market signals</span><p>Find relevant movements, precedents, and risks sooner.</p></div>
              <div><Database size={22} strokeWidth={1.4} /><span>Capital mapping</span><p>Organize lender and investor intelligence around the mandate.</p></div>
              <div><ShieldCheck size={22} strokeWidth={1.4} /><span>Human oversight</span><p>Use technology to accelerate analysis—not outsource accountability.</p></div>
            </div>
          </aside>
          <div className="expertise-grid" role="list" aria-label="Level Capital Advisors expertise">
            {expertise.map((item, index) => (
              <article key={item.title} className="expertise-card" role="listitem">
                <header>
                  <span className="expertise-index">0{index + 1}</span>
                  <span className="expertise-stack">{item.stack}</span>
                </header>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="advisory-services" className="approach-section section-pad">
          <div className="approach-intro page-grid">
            <div className="label-column"><SectionLabel index="04">Advisory Services</SectionLabel></div>
            <div className="approach-heading">
              <h2>One mandate.<br />One accountable team.</h2>
              <div className="approach-summary">
                <p>We design high-leverage structures that reduce upfront developer equity without sacrificing execution certainty.</p>
                <p>Strategy and execution stay connected from the first underwriting conversation through closing.</p>
              </div>
            </div>
          </div>
          <div className="approach-layout">
            <div className="capital-structures">
              <div className="capital-structures-heading">
                <span>Illustrative capital structures</span>
                <small>Proportional to total capitalization</small>
              </div>
              <div className="capital-structures-grid">
                {capitalStructures.map((structure) => (
                  <article className="capital-structure" key={structure.title}>
                    <header>
                      <div>
                        <span>{structure.number}</span>
                        <h3>{structure.title}</h3>
                      </div>
                      <strong>{structure.leverage}</strong>
                    </header>
                    <div className="capital-stack-annotation" aria-hidden="true">
                      {structure.layers.some((layer) => layer.percent < 5) && (
                        <span>1% sponsor equity</span>
                      )}
                    </div>
                    <div
                      className="capital-stack"
                      role="img"
                      aria-label={`${structure.title}: ${structure.layers.map((layer) => `${layer.percent}% ${layer.label}`).join(", ")}`}
                    >
                      {structure.layers.map((layer) => (
                        <div
                          key={layer.label}
                          className={`capital-stack-layer capital-stack-layer-${layer.tone} ${layer.percent < 5 ? "capital-stack-layer-micro" : ""}`}
                          style={{ flexBasis: `${layer.percent}%` }}
                        >
                          <span>{layer.label}</span>
                          <strong>{layer.percent}%</strong>
                        </div>
                      ))}
                    </div>
                    <footer>
                      <span>{structure.equity}</span>
                      <p>{structure.description}</p>
                    </footer>
                  </article>
                ))}
              </div>
              <p className="capital-structures-note">Every business plan is different. We solve for proceeds, cost, control, and certainty together.</p>
            </div>
            <div className="approach-steps">
              {approach.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="contact-grid">
            <div className="contact-copy">
              <SectionLabel index="05" light>Contact Us</SectionLabel>
              <h2>Bring us the<br /><em>next decision.</em></h2>
              <p>Choose the team that fits your inquiry. We’ll respond with the right next step.</p>
              <div className="contact-channels" aria-label="Level Capital Advisors contact channels">
                <a href="mailto:Borrowers@levelcapitaladvisors.com">
                  <span>Borrowers</span>
                  <strong>Borrowers@levelcapitaladvisors.com</strong>
                </a>
                <a href="mailto:Lenders@levelcapitaladvisors.com">
                  <span>Lenders</span>
                  <strong>Lenders@levelcapitaladvisors.com</strong>
                </a>
                <a href="/team#team-directory">
                  <span>Team</span>
                  <strong>Direct advisor contacts <ArrowUpRight size={16} aria-hidden="true" /></strong>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContact}>
              <label>
                <span>Name</span>
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="you@company.com" required />
              </label>
              <label>
                <span>I’m reaching out as</span>
                <select name="audience" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  <option value="borrowers">A borrower or sponsor</option>
                  <option value="lenders">A lender or capital partner</option>
                </select>
              </label>
              <label>
                <span>How can we help?</span>
                <textarea name="message" placeholder="Asset, capital need, timing, or relationship context" rows={4} required />
              </label>
              <button type="submit" className="button button-copper">Prepare email <ArrowUpRight size={17} /></button>
              <small>Your message opens in your email app and is addressed to the selected team.</small>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
