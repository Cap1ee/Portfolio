import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
