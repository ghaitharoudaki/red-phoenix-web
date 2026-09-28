'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SECTORS = ['sports', 'fitness', 'commercial', 'industrial'] as const;

const COUNTRIES = [
  { name: 'Syria', code: '+963' },
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Belgium', code: '+32' },
  { name: 'Brazil', code: '+55' },
  { name: 'Canada', code: '+1' },
  { name: 'China', code: '+86' },
  { name: 'Egypt', code: '+20' },
  { name: 'France', code: '+33' },
  { name: 'Germany', code: '+49' },
  { name: 'India', code: '+91' },
  { name: 'Iraq', code: '+964' },
  { name: 'Italy', code: '+39' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Oman', code: '+968' },
  { name: 'Qatar', code: '+974' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Spain', code: '+34' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Turkey', code: '+90' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Yemen', code: '+967' },
] as const;

const field = 'mt-1 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2.5 outline-none transition-colors focus:border-phoenix text-ink text-sm';

export default function ContactForm() {
  const t = useTranslations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('+963');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sector, setSector] = useState('');
  const [message, setMessage] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (/^[0-9\s+\-()]*$/.test(value)) {
      setPhoneNumber(value);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      alert(t('pages.contact.invalidEmail') || 'Please enter a valid email address.');
      return;
    }

    const currentCountry = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];
    const fullPhone = `${currentCountry.code} ${phoneNumber.trim()}`;

    const recipient = 'info@khales.ae';
    const subject = encodeURIComponent(`New Project Inquiry: ${sector || 'General'} — from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${fullPhone}\nProject Sector: ${sector}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2 w-full pt-16">
      
      {/* Left Dark Branding Panel */}
      <div className="relative bg-ink text-paper p-8 sm:p-12 lg:p-16 flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-lg">
          <span className="text-xs font-semibold uppercase tracking-widest text-phoenix">
            {t('pages.contact.eyebrow')}
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {t('pages.contact.title')}
          </h1>
          <p className="mt-6 text-paper/75 font-light text-base sm:text-lg leading-relaxed">
            {t('pages.contact.intro')}
          </p>
        </div>
      </div>

      {/* Right Form Panel - Made smaller and compact */}
      <div className="bg-paper p-6 sm:p-8 lg:p-10 flex items-center justify-center">
        <form onSubmit={onSubmit} className="w-full max-w-xl space-y-4">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
              {t('pages.contact.name')}
            </label>
            <input 
              required 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('pages.contact.namePlaceholder') || 'Your full name'}
              className={field} 
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                {t('pages.contact.email')}
              </label>
              <input 
                required 
                type="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={field} 
                dir="ltr" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                {t('pages.contact.phone')}
              </label>
              <div className="mt-1 flex gap-2">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="mt-1 rounded-lg border border-black/15 bg-white px-2 py-2.5 outline-none transition-colors focus:border-phoenix text-ink text-sm shrink-0 cursor-pointer w-[85px]"
                  dir="ltr"
                >
                  {COUNTRIES.map((c) => (
                    <option key={`${c.code}-${c.name}`} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
                <input 
                  required
                  type="text" 
                  inputMode="numeric"
                  name="phone" 
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="931234567"
                  className={field} 
                  dir="ltr" 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
              {t('pages.contact.vertical')}
            </label>
            <select 
              required
              name="vertical" 
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className={field}
            >
              <option value="" disabled>{t('pages.contact.select')}</option>
              {SECTORS.map((v) => (
                <option key={v} value={v}>{t(`hero.verticals.${v}`)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
              {t('pages.contact.message')}
            </label>
            <textarea 
              required 
              name="message" 
              rows={3} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('pages.contact.messagePlaceholder') || 'Tell us about your project...'}
              className={field} 
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-full bg-ink text-paper py-3 font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-phoenix hover:text-white shadow-sm cursor-pointer mt-2"
          >
            {t('pages.contact.submit')}
          </button>
        </form>
      </div>

    </div>
  );
}