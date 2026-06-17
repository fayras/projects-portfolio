import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Github,
  Languages,
  Mail,
  MapPin,
} from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Dimitri',
  role: 'Senior Software-Entwickler,Tech-Streamer,Game-Dev Enthusiast',
  location: 'Deutschland / Remote',
  github: 'https://github.com/fayras',
  intro:
    'Ich verwandle Ideen in digitale Produkte, die funktionieren, im Kopf bleiben und einen Blick f\u00fcrs Spielerische haben.',
};

const contactEmailCodes = [
  112, 111, 114, 116, 102, 111, 108, 105, 111, 46, 107, 110, 97, 112, 115, 97,
  99, 107, 54, 55, 52, 64, 112, 97, 115, 115, 105, 110, 98, 111, 120, 46, 99,
  111, 109,
];

const projects = [
  {
    title: 'Simple New File',
    type: 'Visual Studio Code Extension',
    image: '/assets/preview.gif',
    summary:
      'Eine produktive VSCode-Erweiterung, mit der Entwickler Dateien und Ordner direkt ueber die Command Palette anlegen koennen.',
    stack: ['TypeScript', 'Node.js', 'VSCode API'],
    impact: '11.646 Marketplace-Installationen und 15 GitHub-Sterne',
    links: {
      demo: {
        url: 'https://marketplace.visualstudio.com/items?itemName=fayras.simple-new-file',
        label: 'VSCode Marketplace',
      },
      code: 'https://github.com/fayras/vscode-simple-new-file',
    },
  },
  {
    title: 'Break It',
    type: 'C++ Desktop Spiel',
    image: '/assets/break-it-small.png',
    summary:
      'Ein in der Freizeit entwickelter Breakout-Klon mit SFML, Levelsystem, Sound, Partikeleffekten und freischaltbaren Skills.',
    stack: ['C++17', 'SFML', 'CMake', 'Game Design'],
    impact: 'Spielbarer Windows-Release',
    links: {
      demo: {
        url: 'https://github.com/fayras/Break-it-Game/releases',
        label: 'Download',
      },
      code: 'https://github.com/fayras/Break-it-Game',
    },
  },
  {
    title: 'Braitenberg Vehicle Simulation',
    type: 'Browserbasierte 2D-Simulation',
    image: '/assets/bbv_preview.PNG',
    summary:
      'Eine interaktive Simulationsumgebung fuer autonomes Verhalten, in der Fahrzeuge ueber Sensoren, Motoren und Reizquellen konfiguriert werden.',
    stack: ['TypeScript', 'Phaser', 'React', 'MobX'],
    impact: 'Live-Demo mit ECS-Architektur, Matter-Physik und editierbarer Komponenten-UI',
    links: {
      demo: 'https://fayras.github.io/braitenberg-vehicle-simulation/',
      code: 'https://github.com/fayras/braitenberg-vehicle-simulation',
    },
  },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue', 'React', 'TypeScript', 'Vuex/Pinia', 'Vite'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Nuxt', 'Next', 'PHP', 'Laravel', 'GraphQL', 'WebSockets', 'RabbitMQ'],
  },
  {
    title: 'Datenbanken',
    items: ['MySQL', 'MariaDB', 'PostgreSQL', 'NoSQL', 'CosmosDB', 'Elasticsearch'],
  },
  {
    title: 'Testing & Monitoring',
    items: ['Jest','PHPUnit','Playwright','Grafana','Prometheus'],
  },
  {
    title: 'Tools & Arbeitsweise',
    items: ['Git/GitHub/Gitlab', 'Docker', 'Code Reviews', 'Agile Arbeit'],
  },
  {
    title: 'Weitere Interessen',
    items: ['C++', 'SFML', 'Game Development', 'Hardwarenahe Entwicklung', 'Three.js', 'Flutter'],
  }
];

const navItems = [
  { href: '#top', label: 'Top' },
  { href: '#projects', label: 'Projekte' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Kontakt' },
];

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].href);

  function handleEmailClick() {
    window.location.href = `mailto:${String.fromCharCode(...contactEmailCodes)}`;
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="top-nav" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <a
              className={activeSection === item.href ? 'active' : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="top">
          <div className="hero-copy">
            <p className="hero-introduction">Hi, ich bin {profile.name}</p>

            <h1 className="alternating-text-shadow">{profile.role.split(",").map(r => <span>{r}<br /></span>)}</h1>
            <p className="intro">{profile.intro}</p>
            <div className="hero-actions" aria-label="Profilaktionen">
              <a className="button primary" href="#projects">
                Projekte ansehen
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button secondary" href={profile.github}>
                GitHub besuchen
                <Github size={18} aria-hidden="true"/>
              </a>
            </div>
          </div>

          <aside className="profile-panel" aria-label="Bewerbungsueberblick">
            <div className="avatar" aria-hidden="true">
              {profile.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <p className="panel-label">Offen für</p>
              <h3>Stellenangebote, Austausch oder einfach mal Kaffee trinken</h3>
            </div>
            <ul>
              <li>
                <MapPin size={18} aria-hidden="true" />
                Deutschland / Remote
              </li>
              <li>
                <Languages size={18} aria-hidden="true"/>
                Deutsch Muttersprache<br/>
                Englisch fliessend<br/>
                Russisch gut<br/>
                Japanisch Grundkenntnisse<br/>
              </li>
              <li>
                <BriefcaseBusiness size={18} aria-hidden="true" />
                Aktuell verfügbar
              </li>
            </ul>
          </aside>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-kicker">Ausgewählte Projekte</p>
            <h2 id="projects-title">
              Showcase
            </h2>
            <p className="section-intro">
              Hier findest Du eine Auswahl meiner Projekte. Es sind nicht alle, aber sie geben einen guten Einblick in
              das, was ich gern baue. Wenn Dich ein Projekt interessiert oder Du mehr über weitere Projekte erfahren
              möchtest, sprich mich gerne darauf an!
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <img src={project.image} alt="" loading="lazy" />
                <div className="project-body">
                  <div>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.summary}</p>
                  <p className="impact">
                    <CheckCircle2 size={17} aria-hidden="true" />
                    {project.impact}
                  </p>
                  <ul className="tag-list" aria-label={`${project.title} Tech-Stack`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <a href={typeof project.links.demo === 'object' ? project.links.demo.url : project.links.demo}>
                      {typeof project.links.demo === 'object' ? project.links.demo.label : 'Live-Demo'}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <a href={project.links.code}>
                      Code
                      <Github size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section about-section" aria-labelledby="about-title">
          <div>
            <p className="section-kicker">Profil</p>
            <h2 id="about-title">Dinge bauen, verstehen und dazulernen</h2>
          </div>
          <p className="profile-note">
            Softwareentwicklung ist für mich nicht nur ein Beruf: Ich streame über
            Technik, baue kleine Games und probiere gern Neues aus. Am liebsten
            arbeite ich Full Stack, also sowohl am Frontend als auch am Backend, und
            würde gern auch mehr in hardwarenahe Entwicklung reinwachsen (C++ ist
            cool!). Mir ist wichtig, eine Codebase wirklich zu verstehen, Fragen zu
            stellen und mit anderen darüber zu reden. KI nutze ich gern als Werkzeug,
            aber Code schreibe ich weiterhin auch bewusst selbst. Denn am Ende müssen
            Menschen damit arbeiten, und ich hoffe, das bleibt auch so.
          </p>
        </section>

        <section className="section two-column skills-section" id="skills" aria-labelledby="skills-title">
          <div>
            <p className="section-kicker">Skills</p>
            <h2 id="skills-title">Mein Werkzeugkasten</h2>
          </div>

          <div className="skill-sticker-sheet" aria-label="Verspielte Skills">
            {skillGroups.map((group) => (
              <article className="skill-sticker-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="skill-list">
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-band" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Kontakt</p>
            <h2 id="contact-title">Wie man mich erreicht?</h2>
          </div>
          <div className="contact-actions" aria-label="Kontaktlinks">
            <p>
              Wenn Du diese Seite siehst, dann hast Du vermutlich eine Bewerbung von mir erhalten. Alle wichtigen
              und offiziellen Kanäle findest Du dort!
              <br/>
              <br/>
              Solltest Du diese Seite nicht durch eine Bewerbung gefunden haben, dann... Freut mich, dass Du Dich
              hierhin verirrt hast! Lass mich gerne wissen wie Du sie gefunden hast oder schreib mir einfach eine
              freundliche Mail zum Quatschen.
            </p>
            <button className="button primary" type="button" onClick={handleEmailClick}>
              E-Mail
              <Mail size={18} aria-hidden="true" />
            </button>
            <a className="button secondary" href={profile.github}>
              GitHub
              <Github size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {profile.name}. Gebaut mit React und Vite.</p>
        <p>Katzen-Sticker bereitgestellt von <a href="https://www.magnific.com">Magnific</a>.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!, {}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
