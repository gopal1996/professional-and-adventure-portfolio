
import { ProfessionalData } from '../types';

const professionalData: ProfessionalData = {
  "name": "Gopalakrishnan C",
  "role": "Frontend Lead Engineer",
  "about": `**Tech Lead** with **{{experienceYears}} years** of building scalable SaaS products, modernizing legacy systems, and mentoring engineering teams.

- **Frontend specialisation**: React, TypeScript, micro-frontends, design systems, high-performance UI.
- **Platform & DevOps**: Docker, Kubernetes, GCP, CI/CD, observability and reliability.
- **AI-driven workflows**: integrating LLMs and automation into engineering, translation, and operational pipelines.`,
  "email": "krishnan.gopal34@gmail.com",
  "linkedin": "https://www.linkedin.com/in/gopal1996/",
  "experienceYears": "8",
  "experience": [
    {
      "title": "Freshworks",
      "location": "Chennai, India",
      "designation": "Frontend Lead Engineer",
      "startDate": "Dec 2024",
      "endDate": "Present",
      "currentlyWorking": true,
      "description": `- Pioneered an **AI-driven development pipeline**: once a PM publishes a feature spec in **Confluence**, the system auto-generates an **API contract** from the doc, scaffolds the implementation code, and converts **Figma designs to UI code** — accuracy varies with UI complexity, but the workflow eliminates most boilerplate and shifts the engineer's role to **review & refinement** rather than authoring.
- Designed and implemented a **Token Optimization Strategy** to reduce LLM inference costs, evaluating multiple approaches: **prompt compression** (removing redundant context), **semantic caching** (reusing responses for similar inputs), **chunked context windows** (feeding only the relevant doc section per request), and **output schema constraints** (structured JSON responses to minimize token bloat). Applied the optimal mix per use-case to balance cost, latency, and accuracy.
- Led the complete migration of the legacy application to **React Router 7** with **server-rendered components**, executing an iterative page-by-page rollout with **zero downtime** and a seamless transition from the legacy app.
- Owned infrastructure and **Docker modernization**, implementing **multi-stage Docker builds** to support both legacy and new applications.
- Set up **end-to-end observability**: error logging, RUM metrics, rate limiting, and reliability improvements across the stack.
- Standardized and modernized the **Crowdin** translation workflow, fixing incorrect **German ITIL** terminology and creating an **ITIL-compliant multilingual glossary**.
- Automated the translation lifecycle (**AI translation → AI approval → AI QA checks**), successfully correcting and deploying **50,000+ words**, earning appreciation from customers and recognition in the community.
- Owned the **Workflow module**, developing key features end-to-end, mentoring teams on feature rollout, and conducting code reviews to maintain engineering quality.`
    },
    {
      "title": "Kissflow",
      "location": "Chennai, India",
      "designation": "Frontend Lead Engineer",
      "startDate": "Jan 2021",
      "endDate": "Dec 2024",
      "currentlyWorking": false,
      "description": `- Core member of **Kissflow's frontend build system**, contributing across **15+ micro-frontends** using **Module Federation** and **PNPM** to improve performance and developer efficiency.
- Led the **frontend release team**, managing cross-dependencies, removing blockers, coordinating with PMs, and mentoring developers to deliver high-quality features.
- Drove **tech-stack modernization**, introducing new tools and practices to enhance developer experience; independently delivered **full-stack features** when required.
- Developed critical modules such as the **PDF generation system**, significantly increasing product revenue and customer acquisition.
- Led **private-cloud development** efforts, self-hosting a **real-time database** module to avoid vendor lock-in.
- Designed scalable **cloud and DevOps** solutions, creating a **CD pipeline** for artifact transfer across **GCP** and **AWS** and collaborating with DevOps teams to build robust cloud architectures.`
    },
    {
      "title": "Infosys",
      "location": "India",
      "designation": "UI Developer",
      "startDate": "Jun 2020",
      "endDate": "Jan 2021",
      "currentlyWorking": false,
      "description": `- Built complex **UI components** under tight timelines and was responsible for producing **high-fidelity** implementations.
- Implemented third-party components like **ngx-treeview** and **AG Grid** in **Angular** and **React** to match exact design specifications from mock-ups.`
    },
    {
      "title": "Capgemini",
      "location": "India",
      "designation": "Associate Consultant",
      "startDate": "Jun 2017",
      "endDate": "May 2020",
      "currentlyWorking": false,
      "description": `- Created and designed a **mashup web application** to gain insights from BI tools like **Tableau**, **Spotfire**, and **OBIEE**.
- Accelerated business analysis by consolidating workflows under a single UI, reducing end-user time by **65%**.
- Automated manual day-to-day tasks using **Python Selenium**, improving reliability and freeing up analyst time.`
    }
  ],
  "schooling": [
    {
      "institution": "Jerusalem College of Engineering",
      "degree": "B.Tech - IT",
      "year": "Apr 2013 - May 2017"
    }
  ],
  "talks": [
    {
      "title": "Event Bubbling and Event Capturing",
      "link": "https://www.youtube.com/watch?v=3k__0LmsdWo",
      "description": "Understanding event propagation in JavaScript",
      "thumbnail": "https://res.cloudinary.com/gopal1996/image/upload/v1772476185/c_mOISn4B_whhyjl.png"
    },
    {
      "title": "Microfrontend - Module Federation",
      "link": "https://www.youtube.com/watch?v=4ot0ca1yBDU&t=3580s",
      "description": "Building scalable micro-frontends using Module Federation",
      "thumbnail": "https://res.cloudinary.com/gopal1996/image/upload/v1772476139/1_GkQnFwdbkwNqdEf9yHhTyw_ef8ez0.jpg"
    },
    {
      "title": "Docker - Under the hood",
      "link": "https://www.youtube.com/watch?v=ryUW-EmRE6E&t=455s",
      "description": "Deep dive into Docker internals and containerization",
      "thumbnail": "https://res.cloudinary.com/gopal1996/image/upload/v1772476085/ab2wz8HlQAmNj1CLloZq_alze88.png"
    }
  ],
  "projects": [
    {
      "title": "Resume Builder",
      "link": "https://e-resume.vercel.app/",
      "description": "Open source resume builder application",
      "thumbnail": "https://e-resume.vercel.app/resume.webp"
    },
    {
      "title": "Pixel Art",
      "link": "https://gopal1996.github.io/PixelArt/",
      "description": "Open source pixel art creation tool",
      "thumbnail": "https://gopalakrishnanc.netlify.app/static/3380726c44fab511f4c86ac4a345c32a/a68d9/PixelArt.png"
    },
    {
      "title": "ClearFrontend",
      "link": "https://clearfrontend.vercel.app/",
      "description": "Open source frontend development resources",
      "thumbnail": "https://clearfrontend.vercel.app/cfe-logo.svg"
    }
  ],
  "blogs": [
    {
      "title": "Reflow and Repaint",
      "link": "https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg",
      "description": "Understanding browser rendering optimization",
      "thumbnail": "https://gopalakrishnanc.netlify.app/static/8b41fe6c2b51602039a831107c012f8d/b82b5/reflow.png"
    }
  ],
  "certifications": [
    {
      "title": "Google Associate Cloud Engineer",
      "link": "https://www.credly.com/badges/5e5cafc1-7854-4509-af96-6e67c897bd8f/public_url",
      "description": "Validation of expertise in Google Cloud Platform",
      "thumbnail": "https://images.credly.com/size/680x680/images/08096465-cbfc-4c3e-93e5-93c5aa61f23e/image.png"
    }
  ]
};

export default professionalData;
