import React, { useState } from 'react';

const Swatch: React.FC<{ label: string; varName: string }> = ({ label, varName }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-10 h-10 rounded-md border"
      style={{
        background: `var(${varName})`,
        borderColor: 'var(--border)'
      }}
    />
    <div className="text-sm">
      <div className="font-medium" style={{ color: 'var(--foreground)' }}>{label}</div>
      <div className="text-muted">{varName}</div>
    </div>
  </div>
);

const StyleGuide: React.FC = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className="min-h-screen" data-theme={dark ? 'dark' : undefined} style={{ background: 'var(--bg)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Enai Style Guide</h1>
          <button
            onClick={() => setDark(v => !v)}
            className="btn-primary px-4 py-2"
            aria-pressed={dark}
          >
            Toggle {dark ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Typography</h2>
            <div className="space-y-4">
              <div>
                <div className="text-4xl" style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>Heading Display H1</div>
                <div className="text-muted text-sm">56–64px, 1.05–1.1 leading</div>
              </div>
              <div className="text-2xl" style={{ fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>Heading H2</div>
              <div className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>Heading H3</div>
              <p className="text-base" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.6 }}>Body text 16–18px with comfortable line-height.</p>
              <p className="text-muted text-sm" style={{ fontFamily: 'var(--font-sans)' }}>Meta/caption 14px with muted color.</p>
              <pre className="text-sm p-3 rounded-md" style={{ fontFamily: 'var(--font-mono)', background: 'var(--muted)' }}>const code = 'system mono stack'</pre>
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Colors</h2>
            <div className="grid grid-cols-2 gap-4">
              <Swatch label="Brand 400" varName="--brand-400" />
              <Swatch label="Brand 500" varName="--brand-500" />
              <Swatch label="Brand 600" varName="--brand-600" />
              <Swatch label="Brand 700" varName="--brand-700" />
              <Swatch label="Brand Ink" varName="--brand-ink" />
              <Swatch label="Background" varName="--bg" />
              <Swatch label="Surface" varName="--surface" />
              <Swatch label="Foreground" varName="--foreground" />
              <Swatch label="Muted" varName="--muted" />
              <Swatch label="Muted FG" varName="--muted-fg" />
              <Swatch label="Border" varName="--border" />
              <Swatch label="Success" varName="--success" />
              <Swatch label="Warning" varName="--warning" />
              <Swatch label="Danger" varName="--danger" />
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Buttons</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="btn-primary px-4 py-2">Primary</button>
              <button
                className="px-4 py-2"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--brand-500)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Secondary
              </button>
              <button
                className="px-4 py-2 text-white"
                style={{
                  background: 'var(--danger)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Destructive
              </button>
              <a href="#" className="underline" style={{ color: 'var(--brand-500)' }}>Link</a>
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Inputs</h2>
            <div className="grid gap-3">
              <input
                placeholder="Your email"
                className="px-3 py-2"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in oklch, white 30%, var(--brand-500))'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              />
              <input
                placeholder="Error state"
                className="px-3 py-2"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--danger)',
                  borderRadius: 'var(--radius)'
                }}
              />
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Cards</h2>
            <div className="grid gap-4">
              <div className="p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)' }}>
                <div className="font-semibold mb-1">Surface Card</div>
                <div className="text-muted">Use for elevated content.</div>
              </div>
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Badges</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-sm rounded-full" style={{ background: 'var(--muted)', color: 'var(--brand-500)' }}>Brand</span>
              <span className="px-2 py-1 text-sm rounded-full" style={{ background: 'var(--muted)', color: 'var(--muted-fg)' }}>Muted</span>
              <span className="px-2 py-1 text-sm rounded-full text-white" style={{ background: 'var(--success)' }}>Success</span>
              <span className="px-2 py-1 text-sm rounded-full text-black" style={{ background: 'var(--warning)' }}>Warning</span>
              <span className="px-2 py-1 text-sm rounded-full text-white" style={{ background: 'var(--danger)' }}>Danger</span>
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Hero Gradient</h2>
            <div className="rounded-lg h-24" style={{ backgroundImage: 'var(--brand-hero-grad)' }} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;


