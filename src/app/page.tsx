export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2d5a4a', marginBottom: '1.5rem' }}>
            Discover Your Body&apos;s Balance
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem' }}>
            Traditional Chinese Medicine (TCM) has understood the body&apos;s energy systems for thousands of years. 
            Get a personalized assessment of your vital energy (Qi) and overall wellness.
          </p>
          <a href="/questionnaire" style={{ backgroundColor: '#2d5a4a', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '500', display: 'inline-block', textDecoration: 'none' }}>
            Start Free Assessment →
          </a>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: '#2d5a4a', marginBottom: '3rem' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Complete Questionnaire</h3>
              <p style={{ color: '#4b5563' }}>Answer questions about your symptoms and health patterns.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. AI Analysis</h3>
              <p style={{ color: '#4b5563' }}>Our AI analyzes your responses using TCM principles.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👨‍⚕️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Expert Review</h3>
              <p style={{ color: '#4b5563' }}>A TCM practitioner provides personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1rem', backgroundColor: '#2d5a4a', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ready to Discover Your Balance?</h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>Take our free 5-minute assessment today.</p>
          <a href="/questionnaire" style={{ backgroundColor: 'white', color: '#2d5a4a', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '500', display: 'inline-block', textDecoration: 'none' }}>
            Start Assessment →
          </a>
        </div>
      </section>
    </main>
  )
}
