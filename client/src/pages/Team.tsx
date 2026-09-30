// Sonoran Monolith leadership page: selectable portraits, focused profiles, and precise contact architecture.
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Clock3, Linkedin, Mail, Phone } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  portrait?: string;
  portraitAlt?: string;
  portraitPosition?: string;
  email?: string;
  phone?: {
    display: string;
    href: string;
  };
  linkedin?: string;
  biography: string[];
  profileStatus: "complete" | "forthcoming";
};

const teamMembers: TeamMember[] = [
  {
    id: "jack-corrigan",
    name: "Jack Corrigan",
    title: "Managing Partner",
    portrait: "/images/jack-corrigan.webp",
    portraitAlt: "Jack Corrigan, Managing Partner of Level Capital Advisors",
    portraitPosition: "53% center",
    email: "Jack@levelcapitaladvisors.com",
    phone: {
      display: "917-554-9286",
      href: "+19175549286",
    },
    linkedin: "https://www.linkedin.com/in/jack-corrigan1/",
    biography: [
      "Mr. Corrigan has coordinated and been involved in over $200M across a variety of property types, including ground-up construction, industrial, retail, health care facilities, multifamily, and hospitality assets. His transactional experience, capital markets expertise, and ability to structure complex capital stacks in commercial real estate allow him to be one of the most sought-after intermediaries in the market today.",
      "Before founding Level, Jack held senior and analyst roles at Stablewood and Red Leaf Investments. Across both platforms, he advised on, acquired, managed, entitled, and developed more than $100 million in commercial real estate, giving him an operator-informed perspective on how capital decisions affect an asset from strategy through execution.",
      "With an uncompromising work ethic, competitive drive, and investor-first approach, Mr. Corrigan has built a reputation for delivering results in complex and competitive markets. His ability to structure complex financing solutions, coupled with a deep network of capital relationships, has made him a sought-after partner for developers, operators, and institutional investors nationwide.",
      "Beyond his professional endeavors, Mr. Corrigan is an active community contributor, supporting multiple charities in the Texas area like Austin Texas Exes, Habitat for Humanity, and his local Church. He is a pickleball instructor, football official, and family man, committed to balancing entrepreneurial pursuits with meaningful personal connections.",
      "Mr. Corrigan holds a Bachelor of Business Administration in Finance with an emphasis in Real Estate Finance from the University of Texas at Austin (UT).",
    ],
    profileStatus: "complete",
  },
  {
    id: "nick-yanoti",
    name: "Nick Yanoti",
    title: "Analyst",
    portrait: "/images/nick-yanoti.webp",
    portraitAlt: "Nick Yanoti, Analyst at Level Capital Advisors",
    portraitPosition: "50% center",
    email: "Nick@levelcapitaladvisors.com",
    linkedin: "https://www.linkedin.com/in/nicholasyanoti/",
    biography: [
      "Nick is a senior at SMU majoring in Economics with a minor in Business and grew up in Riverside, Connecticut. He joined Level eager to grow his network, learn deal origination, and underwrite complex capital stacks. On campus, he leads education for SMU's Private Banking & Asset Management Club.",
      "Before Level, Nick worked with the Capital Markets team at Avison Young, where he put his passion for data centers and industrial real estate to work on live transactions. He also spent a summer at Goldman Sachs in Asset & Wealth Management in Dallas, where he will return full-time after graduating in May 2027.",
      "Outside of work, Nick is passionate about classic cars, whether that's going to shows or working on them in the garage with his dad.",
    ],
    profileStatus: "complete",
  },
];

function BiographyParagraph({ copy }: { copy: string }) {
  const proof = "$200M";
  const proofIndex = copy.indexOf(proof);

  if (proofIndex === -1) return <>{copy}</>;

  return (
    <>
      {copy.slice(0, proofIndex)}
      <strong>{proof}</strong>
      {copy.slice(proofIndex + proof.length)}
    </>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span>{children}</span>
    </div>
  );
}

export default function Team() {
  const [selectedMemberId, setSelectedMemberId] = useState(teamMembers[0].id);
  const selectedMember = teamMembers.find((member) => member.id === selectedMemberId) ?? teamMembers[0];

  useEffect(() => {
    const priorTitle = document.title;
    const profileDescription = selectedMember.profileStatus === "complete"
      ? `Meet ${selectedMember.name}, ${selectedMember.title} of Level Capital Advisors, and explore the firm's leadership experience.`
      : `${selectedMember.name} is an ${selectedMember.title} at Level Capital Advisors. Full profile forthcoming.`;
    const metadata = [
      ["meta[name='description']", "content", profileDescription],
      ["link[rel='canonical']", "href", "https://www.levelcapitaladvisors.com/team"],
      ["meta[property='og:title']", "content", `${selectedMember.name} | ${selectedMember.title} | Level Capital Advisors`],
      ["meta[property='og:description']", "content", profileDescription],
      ["meta[property='og:url']", "content", "https://www.levelcapitaladvisors.com/team"],
    ] as const;
    const priorMetadata = metadata.map(([selector, attribute]) => {
      const element = document.querySelector(selector);
      return [element, attribute, element?.getAttribute(attribute)] as const;
    });

    document.title = `${selectedMember.name} | ${selectedMember.title} | Level Capital Advisors`;
    metadata.forEach(([selector, attribute, value]) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    });

    return () => {
      document.title = priorTitle;
      priorMetadata.forEach(([element, attribute, value]) => {
        if (element && value !== null && value !== undefined) element.setAttribute(attribute, value);
      });
    };
  }, [selectedMember]);

  const selectMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    window.setTimeout(() => {
      document.getElementById("profile")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }, 0);
  };

  return (
    <div id="top" className="site-shell team-page" data-selected-member={selectedMember.id}>
      <SiteHeader />

      <main>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing profile for {selectedMember.name}, {selectedMember.title}.
        </p>
        <section id="relationship-contacts" className="team-intro" aria-labelledby="team-title">
          <div className="team-hero-copy">
            <span className="team-kicker">Team</span>
            <h1 id="team-title">The people behind<br />the <em>mandate.</em></h1>
            <p>
              Level is built on accountable advice, disciplined execution, and relationships that compound over time.
            </p>
            <a href="#team-directory" className="text-link text-link-light">
              Meet all our advisors <ArrowDownRight size={18} />
            </a>
          </div>
          <div className="team-relationship-copy" aria-labelledby="team-relationship-title">
            <SectionLabel light>Relationships</SectionLabel>
            <h2 id="team-relationship-title">Start with the<br /><em>right conversation.</em></h2>
            <p>Borrowers and capital partners can reach the right Level team directly.</p>
            <div className="team-inquiry-channels" aria-label="Level Capital Advisors relationship contacts">
              <a href="mailto:Borrowers@levelcapitaladvisors.com">
                <span>Borrowers</span>
                <strong>Borrowers@levelcapitaladvisors.com <ArrowUpRight size={16} aria-hidden="true" /></strong>
              </a>
              <a href="mailto:Lenders@levelcapitaladvisors.com">
                <span>Lenders</span>
                <strong>Lenders@levelcapitaladvisors.com <ArrowUpRight size={16} aria-hidden="true" /></strong>
              </a>
            </div>
          </div>
        </section>

        <section id="team-directory" className="team-directory" aria-labelledby="team-directory-title">
          <header className="team-directory-label">
            <div>
              <span>Team directory</span>
              <h2 id="team-directory-title">Meet our advisors.</h2>
            </div>
            <small>Team members are listed by role</small>
          </header>
          <div className="team-member-grid">
            {teamMembers.map((member) => {
              const selected = member.id === selectedMember.id;
              return (
                <button
                  type="button"
                  key={member.id}
                  className={`team-member-card ${selected ? "team-member-card-active" : ""}`}
                  data-member-id={member.id}
                  aria-label={`View ${member.name} profile`}
                  aria-pressed={selected}
                  aria-controls="selected-profile"
                  onClick={() => selectMember(member.id)}
                >
                  <span className="team-member-image">
                    {member.portrait ? (
                      <img
                        src={member.portrait}
                        alt={member.portraitAlt ?? `${member.name}, ${member.title} at Level Capital Advisors`}
                        loading="eager"
                        decoding="async"
                        style={{ objectPosition: member.portraitPosition }}
                      />
                    ) : (
                      <span className="team-member-placeholder" role="img" aria-label={`${member.name} portrait forthcoming`}>
                        <span>{member.name.split(" ").map((part) => part[0]).join("")}</span>
                        <small>Portrait forthcoming</small>
                      </span>
                    )}
                  </span>
                  <span className="team-member-caption">
                    <span className="team-member-name">{member.name}</span>
                    <small>{member.title}</small>
                    <span className="team-member-action">
                      {selected ? "Selected profile" : member.profileStatus === "forthcoming" ? "Preview profile" : "View profile"}
                      <ArrowDownRight size={17} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section
          id="profile"
          className="team-profile-detail section-pad"
          aria-label={`${selectedMember.name} professional profile`}
        >
          <div id="selected-profile" className="selected-profile">
            <header className="selected-profile-heading">
              <p className="profile-eyebrow">Selected profile</p>
              <div>
                <h2>{selectedMember.name}</h2>
                <p>{selectedMember.title}</p>
              </div>
            </header>

            <div className="profile-connect">
              <aside className="profile-proof" aria-label="Relationship focus">
                <div>
                  <span>Always</span>
                  <p>Expanding relationships and the expertise behind every opportunity</p>
                </div>
              </aside>

              <div className="profile-contact-panel">
                <p className="profile-eyebrow">Direct contact</p>
                <div className="profile-contact" aria-label={`${selectedMember.name} contact details`}>
                  {selectedMember.profileStatus === "complete" ? (
                    <>
                      {selectedMember.email && (
                        <a href={`mailto:${selectedMember.email}`}>
                          <Mail size={18} aria-hidden="true" />
                          <span className="profile-contact-copy">
                            <small>Email</small>
                            <strong>{selectedMember.email}</strong>
                          </span>
                        </a>
                      )}
                      {selectedMember.phone && (
                        <a href={`tel:${selectedMember.phone.href}`}>
                          <Phone size={18} aria-hidden="true" />
                          <span className="profile-contact-copy">
                            <small>Phone</small>
                            <strong>{selectedMember.phone.display}</strong>
                          </span>
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={18} aria-hidden="true" />
                          <span className="profile-contact-copy">
                            <small>Profile</small>
                            <strong>LinkedIn</strong>
                          </span>
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      )}
                    </>
                  ) : (
                    <span className="profile-contact-item profile-contact-pending">
                      <Clock3 size={18} aria-hidden="true" />
                      <span className="profile-contact-copy">
                        <small>Profile status</small>
                        <strong>Contact details forthcoming</strong>
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-body profile-body-primary">
              {selectedMember.biography.length > 0 ? (
                <>
                  {selectedMember.biography.map((paragraph) => (
                    <p key={paragraph}>
                      <BiographyParagraph copy={paragraph} />
                    </p>
                  ))}
                  <a href="/#contact" className="text-link">
                    Start a conversation <ArrowUpRight size={17} />
                  </a>
                </>
              ) : (
                <div className="profile-forthcoming">
                  <span>Profile in preparation</span>
                  <p>Nick Yanoti’s biography and direct contact information will be added once approved.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
