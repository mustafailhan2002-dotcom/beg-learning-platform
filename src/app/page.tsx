import Link from "next/link";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { Footer } from "@/components/landing/Footer";
import { PlatformNav } from "@/components/landing/PlatformNav";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { SubjectCard } from "@/components/landing/SubjectCard";

const features = [
  {
    title: "Cambridge",
    description: "Structured pathways and assessment-ready resources for Cambridge International programmes.",
    icon: "✦",
    href: "/mathematics/curriculum",
  },
  {
    title: "Pearson Edexcel",
    description: "Teachable, exam-focused content aligned to Pearson Edexcel specifications.",
    icon: "◌",
    href: "/mathematics",
  },
  {
    title: "OxfordAQA",
    description: "Flexible teaching materials designed for OxfordAQA curriculum delivery.",
    icon: "⬢",
    href: "/dashboard",
  },
  {
    title: "UCAS Pathways",
    description: "Guided progression and university readiness support across UK pathways.",
    icon: "↗",
    href: "/dashboard",
  },
  {
    title: "AI Lesson Generator",
    description: "Create adaptive lesson plans, objectives, and classroom activities in minutes.",
    icon: "⚡",
    href: "/ai-studio/lesson-generator",
  },
  {
    title: "AI Question Bank",
    description: "Generate differentiated assessments and instant feedback for every learner.",
    icon: "◍",
    href: "/ai-studio/question-generator",
  },
];

const subjects = [
  {
    name: "Mathematics",
    description: "Precision teaching for algebra, calculus, statistics, and problem solving.",
    href: "/mathematics",
  },
  {
    name: "Biology",
    description: "Engaging content that connects theory, investigation, and scientific inquiry.",
    href: "/biology",
  },
  {
    name: "Chemistry",
    description: "Interactive material for practicals, reactions, and core concepts.",
    href: "/chemistry",
  },
  {
    name: "Physics",
    description: "Conceptual teaching support for mechanics, energy, and modern physics.",
    href: "/physics",
  },
  {
    name: "Computer Science",
    description: "Future-ready programming and computational thinking experiences.",
    href: "/computer-science",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <PlatformNav />

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:mt-24">
            <div>
              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
                Trusted by forward-thinking schools and tutors
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                British Education Gateway
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                AI-Powered British Curriculum Platform
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                Deliver premium British education experiences with intelligent curriculum planning,
                assessment generation, and university pathway guidance in one platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-full bg-amber-500 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Get Started
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur">
              <div className="rounded-[1.5rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                      Live platform
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Curriculum Intelligence
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                    Active
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Adaptive lesson planning",
                    "Instant question generation",
                    "UCAS and progression insights",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Platform capabilities"
          title="Everything your school needs to teach British curricula with confidence"
          description="From curriculum alignment to AI-assisted assessment, BEG brings world-class tools into one elegant experience."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="block">
              <FeatureCard {...feature} />
            </Link>
          ))}
        </div>
      </section>

      <section id="subjects" className="mx-auto max-w-7xl px-6 py-8 pb-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Subject coverage"
          title="Support for the core disciplines shaping modern education"
          description="Build rich lessons and assessments across the most in-demand subjects for British curriculum schools."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {subjects.map((subject) => (
            <Link key={subject.name} href={subject.href} className="block">
              <SubjectCard {...subject} />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
