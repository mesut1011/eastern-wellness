import { NextResponse } from 'next/server'

const QWEN_API_KEY = process.env.QWEN_API_KEY || 'sk-1ec5b9b5c27c4ff29b47a70defdc6c73'
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

interface AssessmentData {
  answers: Record<string, string>
}

function buildPrompt(data: AssessmentData): string {
  const answersText = Object.entries(data.answers)
    .map(([key, value]) => `- ${key.replace(/_/g, ' ')}: ${value}`)
    .join('\n')

  return `You are a Traditional Chinese Medicine (TCM) practitioner. Analyze the following health assessment and provide a concise, professional analysis.

Patient Assessment:
${answersText}

Please provide your analysis in this exact format:

## 🏥 TCM Constitution Analysis
[One paragraph summarizing the patient's overall constitution]

## ⚡ Energy Assessment
**Kidney Qi (肾气):** [Status: Deficient/Balanced/Strong] - [Brief explanation]
**Kidney Yang (肾阳):** [Status] - [Brief explanation]
**Kidney Yin (肾阴):** [Status] - [Brief explanation]

## 🔍 Key Patterns Identified
[List 2-4 main TCM patterns, e.g. Kidney Yang Deficiency, Qi Deficiency, etc.]

## 💡 Lifestyle Recommendations
1. [Diet recommendation]
2. [Lifestyle recommendation]
3. [Exercise recommendation]

## 🌿 Suggested Herbs (Reference Only)
[List 3-5 common TCM herbs that may help, with disclaimer]

---
⚠️ This assessment is for educational purposes only. Consult a licensed TCM practitioner for personalized treatment.

Keep the response concise and professional. Write in English.`
}

async function analyzeWithAI(data: AssessmentData): Promise<string> {
  const prompt = buildPrompt(data)
  
  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${QWEN_API_KEY}`
    },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: [
        { role: 'system', content: 'You are an expert TCM practitioner providing health assessments in English.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  })

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`)
  }

  const result = await response.json()
  return result.choices[0].message.content
}

export async function POST(request: Request) {
  try {
    const data: AssessmentData = await request.json()
    
    if (!data.answers) {
      return NextResponse.json({ error: 'Missing answers' }, { status: 400 })
    }

    const analysis = await analyzeWithAI(data)
    
    return NextResponse.json({ success: true, analysis })
    
  } catch (error) {
    console.error('Assessment error:', error)
    return NextResponse.json({ error: 'Failed to process assessment' }, { status: 500 })
  }
}
