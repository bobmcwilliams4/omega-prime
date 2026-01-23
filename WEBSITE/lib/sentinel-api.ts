/**
 * SENTINEL PRIME V2 API Client
 * Authority: 11.0 SOVEREIGN | Commander: Bobby Don McWilliams II
 *
 * Cloud Run API: https://sentinel-prime-v2-249995513427.us-central1.run.app
 */

const SENTINEL_API_URL = process.env.NEXT_PUBLIC_SENTINEL_API_URL ||
  'https://sentinel-prime-v2-249995513427.us-central1.run.app';

// Trust Levels (0-11)
export enum TrustLevel {
  UNKNOWN = 0,
  SUSPICIOUS = 1,
  STRANGER = 2,
  ACQUAINTANCE = 3,
  CONTACT = 4,
  FRIEND = 5,
  TRUSTED = 6,
  CONFIDANT = 7,
  INNER_CIRCLE = 8,
  FAMILY = 9,
  COMMANDER = 10,
  SOVEREIGN = 11,
}

// Personalities available in SENTINEL PRIME
export type Personality =
  | 'SENTINEL'
  | 'ECHO_PRIME'
  | 'CLAUDE'
  | 'SAGE'
  | 'NYX'
  | 'PROMETHEUS'
  | 'GS343'
  | 'R2D2'
  | 'RAISTLIN'
  | 'PHOENIX'
  | 'EPCP3O'
  | 'THORNE'
  | 'BREE';

export interface ChatRequest {
  message: string;
  user_id?: string;
  platform?: string;
  trust_level?: TrustLevel;
  session_id?: string;
  personality?: Personality;
  enable_memory?: boolean;
  enable_emotion?: boolean;
}

export interface EmotionState {
  primary: string;
  intensity: number;
  secondary?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  emotion_state?: EmotionState;
  memory_context?: string[];
  personality: Personality;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  version: string;
  uptime?: number;
}

export interface MemorySearchResult {
  content: string;
  timestamp: string;
  relevance: number;
}

// Generate a unique session ID
export function generateSessionId(): string {
  return `web-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Generate a user ID (stored in localStorage)
export function getUserId(): string {
  if (typeof window === 'undefined') return 'anonymous';

  let userId = localStorage.getItem('echo_user_id');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('echo_user_id', userId);
  }
  return userId;
}

/**
 * Check SENTINEL PRIME V2 health
 */
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${SENTINEL_API_URL}/api/v2/health`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Send a chat message to SENTINEL PRIME V2
 */
export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const payload = {
    message: request.message,
    user_id: request.user_id || getUserId(),
    platform: request.platform || 'echo-op.com',
    trust_level: request.trust_level ?? TrustLevel.STRANGER,
    session_id: request.session_id || generateSessionId(),
    personality: request.personality || 'SENTINEL',
    enable_memory: request.enable_memory ?? true,
    enable_emotion: request.enable_emotion ?? true,
  };

  const response = await fetch(`${SENTINEL_API_URL}/api/v2/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Chat request failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Get current emotion state
 */
export async function getEmotionState(sessionId?: string): Promise<EmotionState> {
  const url = sessionId
    ? `${SENTINEL_API_URL}/api/v2/emotion/state?session_id=${sessionId}`
    : `${SENTINEL_API_URL}/api/v2/emotion/state`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Emotion state request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Search memory
 */
export async function searchMemory(query: string, limit: number = 10): Promise<MemorySearchResult[]> {
  const response = await fetch(
    `${SENTINEL_API_URL}/api/v2/memory/search?query=${encodeURIComponent(query)}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Memory search failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Create WebSocket connection for real-time chat
 */
export function createWebSocket(sessionId: string): WebSocket {
  const wsUrl = SENTINEL_API_URL.replace('https://', 'wss://').replace('http://', 'ws://');
  return new WebSocket(`${wsUrl}/api/v2/ws/${sessionId}`);
}

// Default export for convenience
const SentinelAPI = {
  checkHealth,
  sendMessage,
  getEmotionState,
  searchMemory,
  createWebSocket,
  generateSessionId,
  getUserId,
  TrustLevel,
};

export default SentinelAPI;
