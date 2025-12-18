export interface System {
  name: string
  slug: string
  tagline: string
  description: string
  icon: string
  category: SystemCategory
  technologies: string[]
  features: string[]
  status: 'Active' | 'Development' | 'Planned'
  version: string
  links?: {
    docs?: string
    github?: string
  }
}

export type SystemCategory =
  | 'Core Systems'
  | 'MCP Servers'
  | 'Electron Apps'
  | 'AI Agents'
  | 'Security'
  | 'Integration'
  | 'Memory'
  | 'Voice'

export interface Technology {
  name: string
  icon: string
  category: TechCategory
  proficiency: number
  description: string
}

export type TechCategory =
  | 'Languages'
  | 'Frameworks'
  | 'AI & ML'
  | 'Databases'
  | 'Infrastructure'
  | 'Tools'

export interface TimelineEvent {
  date: string
  title: string
  description: string
  milestone: boolean
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
