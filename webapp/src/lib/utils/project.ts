import { nanoid } from 'nanoid'

export type Project = {
  id: string
  name: string
  createdAt: Date
}

// Generate a random project ID using nanoid
const generateProjectId = () => nanoid(16)

export const mockRecentProjects: Project[] = [
  {
    id: generateProjectId(),
    name: "Protein Kinase Analysis",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: generateProjectId(),
    name: "COVID-19 Spike Protein",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: generateProjectId(),
    name: "Cancer Drug Discovery",
    createdAt: new Date("2024-01-13"),
  },
  {
    id: generateProjectId(),
    name: "Antibody Design",
    createdAt: new Date("2024-01-12"),
  },
]
