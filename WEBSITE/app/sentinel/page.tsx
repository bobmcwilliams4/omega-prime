'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SentinelAPI, {
  ChatResponse,
  Personality,
  TrustLevel,
  generateSessionId,
} from '@/lib/sentinel-api';
import { useVoice } from '@/lib/useVoice';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: {
    primary: string;
    intensity: number;
    secondary?: string;
  };
  personality?: Personality;
}

const PERSONALITIES: { value: Personality; label: string; color: string }[] = [
  { value: 'echo_prime', label: 'Echo Prime', color: 'from-orange-500 to-red-500' },
  { value: 'claude', label: 'Claude', color: 'from-blue-500 to-cyan-500' },
  { value: 'sage', label: 'Sage', color: 'from-green-500 to-emerald-500' },
  { value: 'nyx', label: 'Nyx', color: 'from-violet-500 to-purple-500' },
  { value: 'prometheus', label: 'Prometheus', color: 'from-red-600 to-orange-500' },
  { value: 'gs343', label: 'GS343', color: 'from-yellow-400 to-amber-500' },
  { value: 'phoenix', label: 'Phoenix', color: 'from-red-400 to-yellow-500' },
  { value: 'bree', label: 'Bree', color: 'from-pink-400 to-rose-500' },
  { value: 'raistlin', label: 'Raistlin', color: 'from-purple-600 to-indigo-500' },
  { value: 'thorne', label: 'Thorne', color: 'from-gray-600 to-slate-500' },
  { value: 'r2d2', label: 'R2D2', color: 'from-sky-400 to-blue-500' },
  { value: 'epcp3o', label: 'EPCP3O', color: 'from-amber-400 to-yellow-500' },
];

export default function SentinelPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState<Personality>('echo_prime');
  const [sessionId] = useState(generateSessionId);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Voice hook for TTS
  const { state: voiceState, playVoice, stopVoice } = useVoice();

  // Map personality names to voice API format
  const getVoicePersonality = useCallback((p: Personality): string => {
    const map: Record<string, string> = {
      'echo_prime': 'ECHO PRIME',
      'claude': 'ECHO PRIME', // Use Echo Prime voice for Claude
      'sage': 'SAGE',
      'nyx': 'NYX',
      'prometheus': 'PROMETHEUS',
      'gs343': 'GS343',
      'phoenix': 'PHOENIX',
      'bree': 'BREE',
      'raistlin': 'RAISTLIN',
      'thorne': 'THORNE',
      'r2d2': 'R2D2',
      'epcp3o': 'EPCP3O',
    };
    return map[p] || 'ECHO PRIME';
  }, []);

  // Speak response with TTS
  const speakResponse = useCallback(async (text: string, responsePersonality: Personality) => {
    if (!autoSpeak) return;
    try {
      const voicePersonality = getVoicePersonality(responsePersonality);
      await playVoice(voicePersonality, text);
    } catch (error) {
      console.error('TTS error:', error);
    }
  }, [autoSpeak, playVoice, getVoicePersonality]);

  // Toggle auto-speak
  const toggleAutoSpeak = useCallback(() => {
    if (voiceState.isPlaying) {
      stopVoice();
    }
    setAutoSpeak(prev => !prev);
  }, [voiceState.isPlaying, stopVoice]);

  // Check API health on mount
  useEffect(() => {
    SentinelAPI.checkHealth()
      .then(() => setIsHealthy(true))
      .catch(() => setIsHealthy(false));
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response: ChatResponse = await SentinelAPI.sendMessage({
        message: userMessage.content,
        session_id: sessionId,
        personality,
        trust_level: TrustLevel.STRANGER,
        enable_memory: true,
        enable_emotion: true,
      });

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-response`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(response.timestamp),
        emotion: response.emotion_state,
        personality: response.personality,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response with TTS
      if (autoSpeak && response.response) {
        await speakResponse(response.response, response.personality || personality);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `Connection error: ${error instanceof Error ? error.message : 'Unable to reach SENTINEL PRIME V2'}. Please try again.`,
        timestamp: new Date(),
        personality: 'echo_prime',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentPersonality = PERSONALITIES.find((p) => p.value === personality);

  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
              <span className="text-xl">&#x1F916;</span>
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold text-white">SENTINEL PRIME V2</h1>
              <p className="text-xs text-text-secondary">Conversational AI Interface</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Health Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isHealthy === null
                    ? 'bg-yellow-500 animate-pulse'
                    : isHealthy
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              />
              <span className="text-xs text-text-secondary">
                {isHealthy === null ? 'Connecting...' : isHealthy ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Voice Toggle */}
            <button
              onClick={toggleAutoSpeak}
              className={`p-2 rounded-lg transition ${
                autoSpeak
                  ? 'bg-primary/20 text-primary hover:bg-primary/30'
                  : 'bg-gray-800 text-text-secondary hover:bg-gray-700'
              } ${voiceState.isPlaying ? 'animate-pulse' : ''}`}
              title={autoSpeak ? 'Voice ON - Click to mute' : 'Voice OFF - Click to enable'}
            >
              {autoSpeak ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>

            {/* Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              title="Settings"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t border-gray-800 bg-black/30 px-4 py-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-sm font-medium text-white mb-3">Select Personality</h3>
              <div className="flex flex-wrap gap-2">
                {PERSONALITIES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPersonality(p.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      personality === p.value
                        ? `bg-gradient-to-r ${p.color} text-white`
                        : 'bg-gray-800 text-text-secondary hover:bg-gray-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${currentPersonality?.color || 'from-purple-500 to-pink-500'} flex items-center justify-center mb-6`}>
                <span className="text-4xl">&#x1F916;</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                Welcome to SENTINEL PRIME V2
              </h2>
              <p className="text-text-secondary max-w-md mx-auto">
                Start a conversation with {personality || 'SENTINEL'}. Ask questions, explore ideas,
                or just chat. The AI remembers context within this session.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Tell me about ECHO OMEGA PRIME', 'What can you do?', 'Who is the Commander?'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-sm text-text-secondary hover:bg-gray-800 hover:text-white transition"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.role === 'assistant' && message.personality && (
                      <div className="text-xs text-primary mb-1 font-medium">
                        {message.personality}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.emotion && (
                      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-text-secondary">
                        Feeling: {message.emotion.primary} ({Math.round(message.emotion.intensity * 100)}%)
                        {message.emotion.secondary && ` / ${message.emotion.secondary}`}
                      </div>
                    )}
                    <div className="text-xs text-text-secondary mt-1 opacity-50">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Message ${personality}...`}
                rows={1}
                className="w-full px-4 py-3 bg-gray-800 rounded-xl text-white placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ minHeight: '48px', maxHeight: '200px' }}
                disabled={isLoading || isHealthy === false}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isHealthy === false}
              className="p-3 rounded-xl bg-gradient-to-r from-primary to-cyan text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-text-secondary text-center mt-2 flex items-center justify-center gap-2">
            <span>SENTINEL PRIME V2</span>
            <span>|</span>
            <span className={autoSpeak ? 'text-primary' : 'text-text-secondary'}>
              Voice {autoSpeak ? 'ON' : 'OFF'}
              {voiceState.isPlaying && ' (Speaking...)'}
              {voiceState.isLoading && ' (Loading...)'}
            </span>
            <span>|</span>
            <span>Session: {sessionId.slice(0, 20)}...</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
