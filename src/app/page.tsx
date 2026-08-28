'use client';

import Nav from '@/components/portfolio/nav';
import Hero from '@/components/portfolio/hero';
import DeskScene from '@/components/portfolio/desk-scene';
import About from '@/components/portfolio/about';
import Projects from '@/components/portfolio/projects';
import Skills from '@/components/portfolio/skills';
import Contact from '@/components/portfolio/contact';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--p-bg)] transition-colors duration-300">
      <Nav />
      <DeskScene />
      <Hero />
      <main className="flex-1">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
