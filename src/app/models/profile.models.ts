export interface LanguageSkill {
  Skill: string;
  Writing: string;
  Speaking: string;
  Domain?: string;
  DomainIcon?: string;
}

export interface TechSkill {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

export interface ApplicationKonwledge {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

export interface ITDisciplines {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

export interface IndustryKnowledge {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

export interface Education {
  Degree: string;
  Institution: string;
  Year: string;
  Description: string;
  Icon: string;
}

export interface Certification {
  Name: string;
  IssuingOrganization: string;
  IssueDate: string;
  Icon?: string;
  Description?: string;
}

export interface Experience {
  Company: string;
  Type: string;
  Role: string;
  Country: string;
  City: string;
  From: string;
  To: string;
  Icon: string;
  Description: string;
  Technologies: string[];
  Languages: string[];
  Databases: string[];
  Frontend: string[];
  DataFormats: string[];
  Tools: string[];
  Practices: string[];
  Messaging: string[];
  Security: string[];
}

export interface SkillAreaCharacteristic {
  Title: string;
  Icon: string;
  Description: string;
}

// Response interfaces for JSON files
export interface ExperiencesData {
  Experiences: Experience[];
}

export interface EducationData {
  Education: Education[];
}

export interface CertificationData {
  Certifications: Certification[];
}

export interface SkillAreasData {
  SkillAreasAndCharacteristics: SkillAreaCharacteristic[];
}

export interface IndustryKnowledgeData {
  IndustryKnowledge: IndustryKnowledge[];
}

export interface LanguageSkillsData {
  LanguageSkills: LanguageSkill[];
}

export interface TechStacksData {
  TechnicalSkills: TechSkill[];
}

export interface ApplicationKnowledgeData {
  ApplicationKnowledge: ApplicationKonwledge[];
}

export interface ITDisciplinesData {
  ITDisciplines: ITDisciplines[];
}
