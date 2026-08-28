'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const links = [
  { label: 'Email', value: 'lishankithulgoda@gmail.com', href: 'mailto:lishankithulgoda@gmail.com' },
  { label: 'GitHub', value: 'github.com/Cap1ee', href: 'https://github.com/Cap1ee' },
  { label: 'LinkedIn', value: 'linkedin.com/in/lishan-chamod', href: 'https://www.linkedin.com/in/lishan-chamod-345a64235/' },
];

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--p-line)',
  background: 'transparent',
  color: 'var(--p-text)',
  borderRadius: 6,
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '0.95rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s ease',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorMsg('Email service is not configured yet.');
      return;
    }

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            time: new Date().toLocaleString(),
            title: 'New message from portfolio site',
          },
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong — try emailing me directly instead.');
    }
  };

  return (
    <section id="contact" className="portfolio-section pb-8">
      <div className="portfolio-container">
        <p className="eyebrow">Contact</p>
        <h2
          className="font-semibold leading-[1.1] tracking-tight mt-3 mb-14"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--p-text)', maxWidth: 520 }}
        >
          Open to internships, collaborations, and interesting problems.
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-8 mb-14 items-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 flex-1"
          style={{ maxWidth: 480, width: '100%' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--p-solder)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--p-line)')}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--p-solder)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--p-line)')}
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--p-solder)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--p-line)')}
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="eyebrow rounded-md px-6 py-4 transition-all duration-200"
            style={{
              border: '1px solid var(--p-solder)',
              color: status === 'sending' ? 'var(--p-text-dim)' : 'var(--p-text)',
              background: 'transparent',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (status !== 'sending') e.currentTarget.style.background = 'var(--p-bg-raised)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p style={{ color: 'var(--p-solder)', fontSize: '0.85rem' }}>
              Message sent — I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#E85A4F', fontSize: '0.85rem' }}>{errorMsg}</p>
          )}
        </form>

        <div className="flex flex-col gap-4 flex-1" style={{ maxWidth: 480, width: '100%' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex justify-between items-center rounded-md px-6 py-5 transition-all duration-200"
              style={{
                border: '1px solid var(--p-line)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--p-solder)';
                e.currentTarget.style.background = 'var(--p-bg-raised)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--p-line)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span className="eyebrow" style={{ color: 'var(--p-text-dim)' }}>{l.label}</span>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.9rem', color: 'var(--p-text-dim)' }}>{l.value}</span>
            </a>
          ))}
        </div>
        </div>

        <footer
          className="mt-auto pt-16 pb-2"
          style={{ fontSize: '0.8rem', fontFamily: 'var(--font-geist-mono)', color: 'var(--p-text-dim)' }}
        >
          © {new Date().getFullYear()} Lishan Chamod
        </footer>
      </div>
    </section>
  );
}