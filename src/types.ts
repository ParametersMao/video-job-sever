import type { FetchFn } from 'chatgpt'

export interface RequestProps {
  prompt: string
  options?: ChatContext
  model?: string
  systemMessage: string
  temperature?: number
  top_p?: number
  auth?: { token: string; sign: string }
}

export interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

export interface ChatGPTUnofficialProxyAPIOptions {
  accessToken: string
  apiReverseProxyUrl?: string
  model?: string
  debug?: boolean
  headers?: Record<string, string>
  fetch?: FetchFn
}

export interface ModelConfig {
  apiModel?: ApiModel
  reverseProxy?: string
  timeoutMs?: number
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

export interface CardProps {
  id?: number
  cardCode?: string
  phoneCode?: string
  cardType?: number
  cardValue?: number
  cardNumber?: number
  cardStatus?: number
  auth?: { token: string; sign: string }
}

export interface CardConditionProps {
  cardCode?: string
  cardPhone?: string
  cardType?: string
  cardValue?: string
  cardNumber?: string
  cardStatus?: string
  auth?: { token: string; sign: string }
  from?: string
}

export interface InviteProps {
  code?: string
  from?: string
  auth?: { token: string; sign: string }
}

export type ApiModel = 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI' | undefined
