export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2d5a4a] mb-6">
            Discover Your Body's Balance
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Traditional Chinese Medicine (TCM) has understood the body's energy systems for thousands of years. 
            Get a personalized assessment of your vital energy (Qi) and overall wellness.
          </p>
          <a href="/questionnaire" className="btn-primary inline-block">
            Start Free Assessment →
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2d5a4a] mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">1. Complete Questionnaire</h3>
              <p className="text-gray-600">Answer questions about your symptoms, lifestyle, and overall health patterns.</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your responses using TCM principles and patterns.</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-2">3. Expert Review</h3>
              <p className="text-gray-600">A TCM practitioner reviews and provides personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Assess */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2d5a4a] mb-12">
            What We Assess
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2d5a4a] mb-2">Kidney Energy (肾气)</h3>
              <p className="text-gray-600">Essential for vitality, growth, and reproductive health.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2d5a4a] mb-2">Yang Energy (阳气)</h3>
              <p className="text-gray-600">The warming, active principle that powers all bodily functions.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2d5a4a] mb-2">Qi (气)</h3>
              <p className="text-gray-600">The vital life force that flows through your body's meridians.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-[#2d5a4a] mb-2">Blood & Essence (血与精)</h3>
              <p className="text-gray-600">The nourishing substances that sustain health and longevity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Disclaimer:</strong> This assessment is for educational and informational purposes only. 
            It is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified 
            healthcare provider for medical advice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#2d5a4a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Balance?</h2>
          <p className="text-lg opacity-90 mb-8">Take our free 5-minute assessment today.</p>
          <a href="/questionnaire" className="bg-white text-[#2d5a4a] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all">
            Start Assessment →
          </a>
        </div>
      </section>
    </main>
  )
}
