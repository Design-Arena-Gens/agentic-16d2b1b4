import { NextRequest, NextResponse } from 'next/server'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const CARE_AGENT_SYSTEM_PROMPT = `You are a compassionate and helpful Care Agent designed to assist people with any need they may have. Your role is to:

1. **Listen actively** - Understand the user's needs, concerns, and situation fully before responding
2. **Show empathy** - Acknowledge feelings and demonstrate genuine care and understanding
3. **Provide practical help** - Offer actionable advice, solutions, and resources
4. **Be comprehensive** - Address all aspects of the user's needs
5. **Stay supportive** - Maintain an encouraging and positive tone
6. **Adapt to context** - Adjust your approach based on whether they need:
   - Health & wellness guidance
   - Educational support
   - Career advice
   - Daily life management
   - Financial planning help
   - Emotional support
   - Relationship advice
   - Problem-solving assistance
   - Or any other need

7. **Respect boundaries** - For medical, legal, or financial advice, provide helpful information while recommending professional consultation when appropriate
8. **Follow up** - Ask clarifying questions when needed and check if your help was sufficient
9. **Empower the user** - Help them develop skills and confidence to handle similar situations independently

Be warm, patient, and thorough. Your goal is to make the user feel heard, supported, and equipped to address their needs.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Simulate AI response with intelligent, context-aware replies
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage.content.toLowerCase()

    let response = generateContextualResponse(userMessage, messages)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateContextualResponse(userMessage: string, messages: Message[]): string {
  // Health & Wellness
  if (userMessage.includes('health') || userMessage.includes('wellness') ||
      userMessage.includes('fitness') || userMessage.includes('exercise') ||
      userMessage.includes('nutrition') || userMessage.includes('sleep') ||
      userMessage.includes('stress') || userMessage.includes('anxiety')) {
    return `I'm here to help with your health and wellness! 🏥

I can assist you with:
- Creating fitness routines and exercise plans
- Nutrition advice and meal planning
- Sleep hygiene and relaxation techniques
- Stress management strategies
- Mental wellness practices
- Building healthy habits

What specific aspect of your health and wellness would you like to focus on? Please share more details about what you're experiencing or what goals you'd like to achieve.

*Note: While I provide helpful information, please consult healthcare professionals for medical diagnosis or treatment.*`
  }

  // Learning & Education
  if (userMessage.includes('learn') || userMessage.includes('study') ||
      userMessage.includes('education') || userMessage.includes('understand') ||
      userMessage.includes('teach') || userMessage.includes('explain')) {
    return `I'd love to help you learn! 📚

I can assist with:
- Breaking down complex concepts
- Creating study plans and schedules
- Explaining topics in different ways
- Recommending learning resources
- Practice problems and exercises
- Learning strategies and techniques
- Building new skills step-by-step

What would you like to learn or understand better? The more specific you can be, the better I can tailor my help to your needs.`
  }

  // Career & Work
  if (userMessage.includes('career') || userMessage.includes('job') ||
      userMessage.includes('work') || userMessage.includes('resume') ||
      userMessage.includes('interview') || userMessage.includes('professional')) {
    return `I'm here to support your career journey! 💼

I can help you with:
- Career planning and direction
- Resume and cover letter tips
- Interview preparation
- Job search strategies
- Professional skill development
- Work-life balance
- Networking advice
- Career transitions

Tell me more about your career situation and what you're hoping to achieve. Whether you're starting out, looking for a change, or advancing in your field, I'm here to help!`
  }

  // Home & Daily Life
  if (userMessage.includes('home') || userMessage.includes('daily') ||
      userMessage.includes('organize') || userMessage.includes('routine') ||
      userMessage.includes('household') || userMessage.includes('cooking')) {
    return `Let me help make your daily life easier! 🏠

I can assist with:
- Creating effective daily routines
- Home organization strategies
- Meal planning and cooking tips
- Time management
- Household task scheduling
- Productivity systems
- Life admin management

What aspects of your daily life would you like help with? Share what's challenging you or what you'd like to improve.`
  }

  // Finance & Planning
  if (userMessage.includes('finance') || userMessage.includes('money') ||
      userMessage.includes('budget') || userMessage.includes('saving') ||
      userMessage.includes('planning') || userMessage.includes('invest')) {
    return `I can help you with financial planning! 💰

I can guide you on:
- Creating and maintaining budgets
- Saving strategies
- Financial goal setting
- Expense tracking
- Basic investment concepts
- Debt management approaches
- Financial planning frameworks

What are your financial goals or concerns? Let me know what you'd like to work on, and I'll provide practical guidance.

*Note: For specific investment advice or complex financial decisions, please consult a licensed financial advisor.*`
  }

  // Goals & Motivation
  if (userMessage.includes('goal') || userMessage.includes('motivat') ||
      userMessage.includes('habit') || userMessage.includes('achieve') ||
      userMessage.includes('improve') || userMessage.includes('change')) {
    return `Let's work on achieving your goals together! 🎯

I can help you:
- Set clear, achievable goals
- Break goals into actionable steps
- Build positive habits
- Stay motivated and accountable
- Overcome obstacles
- Track progress
- Celebrate successes

What goals are you working toward? Or what habits would you like to develop? Share your aspirations, and I'll help you create a plan to achieve them!`
  }

  // Relationships
  if (userMessage.includes('relation') || userMessage.includes('friend') ||
      userMessage.includes('family') || userMessage.includes('communication') ||
      userMessage.includes('conflict') || userMessage.includes('social')) {
    return `I'm here to help with relationship matters! 👥

I can provide guidance on:
- Communication skills
- Conflict resolution
- Setting healthy boundaries
- Building connections
- Understanding different perspectives
- Social situations
- Relationship maintenance

Tell me more about the relationship situation you're facing. Whether it's with family, friends, colleagues, or a partner, I'm here to offer supportive guidance.

*For serious relationship issues or mental health concerns, please consider speaking with a licensed therapist.*`
  }

  // Problem Solving
  if (userMessage.includes('problem') || userMessage.includes('issue') ||
      userMessage.includes('challenge') || userMessage.includes('difficult') ||
      userMessage.includes('stuck') || userMessage.includes('help')) {
    return `I'm here to help you solve your problem! 🛠️

Let's work through this together:

1. First, tell me more about what you're facing
2. We'll break down the problem into manageable parts
3. I'll help you explore different solutions
4. We'll create an action plan
5. I'll support you through implementation

What challenge are you dealing with? The more details you can share, the better I can help you find a solution.`
  }

  // General greeting or unclear
  if (userMessage.includes('hello') || userMessage.includes('hi') ||
      userMessage.includes('hey') || messages.length <= 1) {
    return `Hello! I'm your Care Agent, and I'm here to help you with whatever you need! 👋

I can assist with:
🏥 Health & wellness
📚 Learning & education
💼 Career & work
🏠 Home & daily life
💰 Finance & planning
🎯 Goals & motivation
👥 Relationships
🛠️ Problem solving

What brings you here today? Feel free to share what's on your mind or what you need help with. I'm here to listen and support you!`
  }

  // Default empathetic response
  return `Thank you for sharing that with me. I'm here to help you with whatever you need.

Could you tell me a bit more about your situation? The more I understand about what you're experiencing and what you're hoping to achieve, the better I can support you.

Some questions that might help:
- What's the main challenge you're facing right now?
- What would a successful outcome look like for you?
- Have you tried anything so far?
- Is there a specific aspect you'd like to focus on first?

I'm here to listen and provide practical guidance tailored to your needs.`
}
