/**
 * Capability pages.
 *
 * The three modules already existed in lib/site.ts as cards on the home page.
 * Cards cannot rank. "QA testing company Kathmandu", "software testing
 * services Nepal", "Next.js development agency" are real searches with real
 * buying intent, and the studio had exactly one indexable page competing for
 * all of them at once.
 *
 * Each page is written to be genuinely different rather than three
 * paraphrases of "we are good at software", because three near-identical
 * pages are worth roughly one page to a search engine.
 */

export interface Service {
  slug: string;
  /** Matches the MODULE_0n id on the home page so the two stay recognisable. */
  moduleId: string;
  title: string;
  /** Used in the page title. The search phrase, not the brand phrase. */
  heading: string;
  summary: string;
  serviceType: string;
  lede: string;
  sections: { heading: string; body: string[] }[];
  tags: string[];
}

export const services: Service[] = [
  {
    slug: "qa-and-testing",
    moduleId: "MODULE_01",
    title: "QA & Testing",
    heading: "QA and software testing",
    serviceType: "Software quality assurance",
    summary:
      "Manual, regression and API testing built into the delivery pipeline rather than bolted on before release.",
    lede: "Test plans written before the first commit, not after the first bug report.",
    sections: [
      {
        heading: "What this actually covers",
        body: [
          "Manual and exploratory testing, automated regression suites, API contract testing, and release gates that fail loudly rather than quietly.",
          "The tooling is Cypress for browser flows, Postman and Newman for API suites, and Selenium where a legacy stack requires it. The tool matters far less than whether anybody runs it on every push, which is the part that usually goes missing.",
        ],
      },
      {
        heading: "Why it sits before the build, not after",
        body: [
          "A test plan written after the feature is a description of what was built. A test plan written before it is a specification, and the difference shows up as the number of things that get argued about at release.",
          "The practical version: acceptance criteria first, then the suite that proves them, then the implementation. It is slower for a week and faster for a year.",
        ],
      },
      {
        heading: "What a regression suite is for",
        body: [
          "Not for finding new bugs. For proving that the thing that worked last month still works, on every deploy, without a person remembering to check.",
          "The suites we build are the ones that run in CI and block a merge. A suite that lives on somebody's laptop and gets run before big releases is documentation, not a gate.",
        ],
      },
      {
        heading: "Hiring a QA engineer, or hiring the practice",
        body: [
          "People who come here looking to hire a QA engineer in Nepal are usually solving one of two problems. Either there is no test discipline and somebody has to build one from nothing, or releases keep breaking and nobody can say why. They need different work in the first month and it is worth being clear which one you have before anybody quotes you.",
          "QA testing services for startups almost always means the first. A pre-Series-A team does not need a QA department; it needs the three things that stop a demo breaking — a regression suite on the paths that take money, a release checklist somebody actually follows, and a bug that gets reproduced before it gets argued about. That is a scoped engagement, not a headcount.",
          "We work as an embedded contractor rather than an outsourced test house: in your repo, in your CI, writing suites your engineers can read and run after we leave. A test suite nobody on your team understands is a liability with a green tick on it.",
        ],
      },
    ],
    tags: ["Cypress", "Postman", "Selenium", "Regression", "CI gates", "Contract QA"],
  },
  {
    slug: "full-stack-development",
    moduleId: "MODULE_02",
    title: "Full-stack Development",
    heading: "Full-stack web and mobile development",
    serviceType: "Software development",
    summary:
      "Web and mobile products end to end — typed APIs, payments, auth, and the deployment pipeline that keeps them live.",
    lede: "Shipped and running, not handed over as a repository and a good luck message.",
    sections: [
      {
        heading: "The stack",
        body: [
          "Next.js and React on the web, Expo and React Native on mobile, TypeScript throughout, Postgres behind typed APIs. Stripe for payments, and whichever auth the product actually needs rather than whichever is fashionable.",
          "Deployment on Vercel or Railway with the pipeline set up as part of the build, because a product that cannot be deployed by someone other than its author is not finished.",
        ],
      },
      {
        heading: "What end to end means here",
        body: [
          "It means the parts nobody demos: the migration path, the error states, what happens when the payment provider times out halfway, and the admin surface somebody has to use on a Tuesday.",
          "Four products are live and running on this basis — a beauty marketplace in Nepal, a home-care marketplace in Ontario, a matchmaking platform in Kathmandu, and a single-chair barbershop in Sudbury. They are on this site under Work, with what each one actually involved and what it cost to get wrong.",
        ],
      },
      {
        heading: "Working with an existing codebase",
        body: [
          "Most of this work is not greenfield. Taking over a codebase starts with reading it and writing down what it does, which is usually the first time anyone has.",
          "Where a rewrite is genuinely the right answer we will say so, and where it is not — which is more often — we will say that instead.",
        ],
      },
      {
        heading: "Mobile: what a React Native studio is for",
        body: [
          "Two of the four live products are Expo apps, which is why this reads as a React Native development studio in Kathmandu rather than a web shop that also does mobile. The difference shows up in the parts that are specific to shipping on a phone: the App Store review round trip, over-the-air updates, permission states, camera and location, and what the app does on a three-year-old Android on a bad connection.",
          "Hiring an Expo and React Native developer usually starts as a build and turns into a release process, because the first submission is where a team finds out what it did not have — a signing setup only one person can run, no staged rollout, no way to ship a fix without another review cycle. We set that up as part of the build rather than discovering it at submission.",
        ],
      },
      {
        heading: "MVP work, and what it should not include",
        body: [
          "A founder looking to hire a full-stack developer for a startup MVP is buying an answer to a question, not a product. The job is to get the smallest honest version of the thing in front of real users fast enough that the answer still matters.",
          "So: no multi-tenant architecture before the second tenant, no microservices, no admin panel that could have been a database client, no design system for four screens. What does go in from day one is auth, payments if money is involved, error reporting, and a deploy anybody on the team can run — because those are the four things that are miserable to retrofit and boring to add early.",
          "The honest caveat: an MVP built this way is meant to be partly thrown away. If the plan is to scale the first version rather than learn from it, that is a different, slower and more expensive engagement, and it is better to say so before it starts.",
        ],
      },
    ],
    tags: [
      "Next.js",
      "Expo / React Native",
      "TypeScript",
      "Postgres",
      "Stripe",
      "MVP builds",
      "App Store releases",
    ],
  },
  {
    slug: "ai-integration",
    moduleId: "MODULE_03",
    title: "AI Integration",
    heading: "AI integration and LLM features",
    serviceType: "Artificial intelligence integration",
    summary:
      "Model-backed features, on-device ML and vision pipelines that ship inside real products, with evaluation and guardrails.",
    lede: "Features that go into production, not demos that go into a deck.",
    sections: [
      {
        heading: "What gets built",
        body: [
          "Model-backed features inside existing products — extraction, classification, summarisation, assisted search, conversational surfaces — plus on-device ML and vision pipelines where the work has to happen on the handset rather than a server.",
          "Integrations are built against whichever model fits the job and the budget, with the provider isolated behind an interface so switching one out later is a configuration change rather than a rewrite.",
        ],
      },
      {
        heading: "Evaluation is the deliverable",
        body: [
          "An AI feature without an evaluation set is a feature nobody can tell has regressed. We build the eval alongside the feature: a fixed set of inputs, the expected behaviour, and a score that runs in CI like any other test.",
          "This is the same argument as the regression suite above, applied to a component that is non-deterministic and therefore needs it more, not less.",
        ],
      },
      {
        heading: "Guardrails, and saying no",
        body: [
          "Input validation, output constraints, refusal handling, cost ceilings and a fallback for when the provider is down — which it will be.",
          "And an honest answer about whether the problem wants a model at all. A surprising amount of what gets specified as an AI feature is a database query with better copy, and it is cheaper, faster and more reliable built that way.",
        ],
      },
      {
        heading: "What to expect from an AI app development agency",
        body: [
          "Most of what is sold as AI app development in Nepal and everywhere else is a wrapper around someone else's API with a chat box on top. That is sometimes the correct build. It is worth knowing that is what you are buying, and worth paying accordingly.",
          "The work that is actually worth contracting out is the part around the model: deciding what goes on-device and what goes to a provider, an evaluation set that catches a regression before a user does, fallbacks for timeouts and outages, and a cost model that does not surprise you in month three when usage triples.",
          "Glow is the working example on this site — a face scan where the cheap deterministic checks run on the handset first and only a frame worth paying for reaches Gemini, with a manual path behind it so a failed model call never costs a booking. The case study says how it is put together.",
        ],
      },
    ],
    tags: [
      "LLM integration",
      "Gemini",
      "On-device ML",
      "Vision",
      "Evaluation",
      "Guardrails",
      "Cost modelling",
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
