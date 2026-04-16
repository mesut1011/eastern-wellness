import { NextResponse } from 'next/server'

// 阿里云千问 API 配置
const QWEN_API_KEY = process.env.QWEN_API_KEY || 'sk-1ec5b9b5c27c4ff29b47a70defdc6c73'
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'

// 邮件通知 API (使用 Resend 或其他服务)
const RESEND_API_KEY = process.env.RESEND_API_KEY

interface AssessmentData {
  name: string
  email: string
  answers: Record<string, string>
}

function buildPrompt(data: AssessmentData): string {
  const answersText = Object.entries(data.answers)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n')

  return `You are a Traditional Chinese Medicine (TCM) practitioner with 20 years of experience. 
Analyze the following patient assessment and provide a comprehensive TCM perspective.

Patient Information:
- Name: ${data.name}
- Email: ${data.email}

Assessment Answers:
${answersText}

Please provide a detailed analysis in the following format:

## TCM Constitution Analysis
[Analyze the patient's overall constitution type based on the answers]

## Energy Assessment (Qi, Yang, Kidney Essence)
[Provide detailed analysis of:
1. Kidney Qi (肾气) - Vitality and life force
2. Kidney Yang (肾阳) - Warming energy, fire of life
3. Kidney Yin (肾阴) - Cooling, nourishing essence
4. Overall Qi status
Include severity: Mild / Moderate / Severe deficiency or imbalance]

## Key Symptoms & TCM Patterns
[List the main TCM patterns identified, such as:
- Kidney Yang Deficiency (肾阳虚)
- Kidney Yin Deficiency (肾阴虚)
- Qi Deficiency (气虚)
- Blood Deficiency (血虚)
etc.]

## Lifestyle Recommendations
[Provide specific lifestyle advice including:
- Dietary recommendations
- Sleep hygiene
- Exercise suggestions
- Stress management]

## Recommended Herbs (for reference only)
[List common TCM herbs that may help, with disclaimer]

## Important Disclaimer
This assessment is for educational purposes only and should not replace professional medical advice.

Please write the entire response in English, professional but accessible to Western readers.`
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
        {
          role: 'system',
          content: 'You are an expert Traditional Chinese Medicine practitioner providing health assessments in English.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  })

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`)
  }

  const result = await response.json()
  return result.choices[0].message.content
}

async function sendNotification(data: AssessmentData, analysis: string) {
  // 发送邮件通知到管理员
  // 这里使用 Resend API，也可以用其他邮件服务
  
  if (!RESEND_API_KEY) {
    // 如果没有配置邮件服务，打印到控制台
    console.log('=== New Assessment ===')
    console.log(`Name: ${data.name}`)
    console.log(`Email: ${data.email}`)
    console.log('Analysis:', analysis)
    return
  }

  // 发送通知邮件到管理员
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Eastern Wellness <noreply@easternwellness.com>',
      to: '645386789@qq.com',
      subject: `New Assessment from ${data.name}`,
      html: `
        <h2>New TCM Assessment</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <h3>AI Analysis:</h3>
        <div style="white-space: pre-wrap;">${analysis}</div>
        <hr>
        <p><a href="mailto:${data.email}">Reply to patient</a></p>
      `
    })
  })
}

export async function POST(request: Request) {
  try {
    const data: AssessmentData = await request.json()
    
    // 验证必要字段
    if (!data.name || !data.email || !data.answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // AI 分析
    const analysis = await analyzeWithAI(data)
    
    // 发送通知
    await sendNotification(data, analysis)
    
    // 保存到数据库 (这里可以接入 Supabase)
    // await saveToDatabase(data, analysis)

    return NextResponse.json({ 
      success: true,
      message: 'Assessment submitted successfully'
    })
    
  } catch (error) {
    console.error('Assessment error:', error)
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}
