'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  {
    icon: '🏥',
    title: 'Health & Wellness',
    description: 'Get advice on health, fitness, nutrition, and mental well-being',
    prompt: 'I need help with my health and wellness'
  },
  {
    icon: '📚',
    title: 'Learning & Education',
    description: 'Assistance with studying, understanding concepts, or learning new skills',
    prompt: 'I want to learn something new'
  },
  {
    icon: '💼',
    title: 'Career & Work',
    description: 'Career advice, job search help, resume tips, and work-life balance',
    prompt: 'I need career guidance'
  },
  {
    icon: '🏠',
    title: 'Home & Daily Life',
    description: 'Help with household tasks, organization, cooking, and daily routines',
    prompt: 'I need help managing my daily life'
  },
  {
    icon: '💰',
    title: 'Finance & Planning',
    description: 'Budgeting advice, financial planning, and money management tips',
    prompt: 'I need help with financial planning'
  },
  {
    icon: '🎯',
    title: 'Goals & Motivation',
    description: 'Set goals, stay motivated, and develop better habits',
    prompt: 'Help me achieve my goals'
  },
  {
    icon: '👥',
    title: 'Relationships',
    description: 'Advice on communication, conflict resolution, and relationships',
    prompt: 'I need relationship advice'
  },
  {
    icon: '🛠️',
    title: 'Problem Solving',
    description: 'Get help solving any problem or challenge you\'re facing',
    prompt: 'I have a problem I need to solve'
  }
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestionClick = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🤖 Care Agent</h1>
        <p>Your personal AI assistant for any need</p>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="icon">💬</div>
              <h2>How can I help you today?</h2>
              <p>I'm here to assist you with any need - just start a conversation!</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="avatar">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="avatar">🤖</div>
                  <div className="message-content">
                    <div className="loading">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>

      {messages.length === 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-card"
              onClick={() => handleSuggestionClick(suggestion.prompt)}
            >
              <div className="icon">{suggestion.icon}</div>
              <h3>{suggestion.title}</h3>
              <p>{suggestion.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
