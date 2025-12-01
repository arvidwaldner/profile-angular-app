import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import AOS from 'aos';

interface LanguageSkill {
  Skill: string;
  Writing: string;
  Speaking: string;
  Domain?: string;
  DomainIcon?: string;
}

interface TechSkill {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

interface ApplicationKonwledge {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

interface ITDisciplines {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

interface IndustryKnowledge {
  Skill: string;
  Years: number;
  Level: string;
  Domain?: string;
  DomainIcon?: string;
}

interface Education {
  Degree: string;
  Institution: string;
  Year: string;
  Description: string;
  Icon: string;
}

interface Certification {
  Name: string;
  IssuingOrganization: string;
  IssueDate: string;
  Icon?: string;
  Description?: string;
}

interface Experience {
  Company: string;
  Type: string;
  Role: string;
  Country: string;
  City: string;
  From: string;
  To: string;
  Icon: string;
  Description: string;
}

interface ExperiencesData {
  Experiences: Experience[];
}

interface EducationData {
  Education: Education[];
}

interface CertificationData {
  Certifications: Certification[];
}

interface SkillAreaCharacteristic {
  Title: string;
  Icon: string;
  Description: string;
}

interface SkillAreasData {
  SkillAreasAndCharacteristics: SkillAreaCharacteristic[];
}

interface IndustryKnowledgeData {
  IndustryKnowledge: IndustryKnowledge[];
}

interface LanguageSkillsData {
  LanguageSkills: LanguageSkill[];
}

interface TechStacksData {
  TechnicalSkills: TechSkill[];
}

interface ApplicationKnowledgeData {
  ApplicationKnowledge: ApplicationKonwledge[];
}

interface ITDisciplinesData {
  ITDisciplines: ITDisciplines[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Profile - Arvid Waldner');
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  
  techStackSkills: TechSkill[] = [];
  languageSkills: LanguageSkill[] = [];
  applicationKnowledgeSkills: ApplicationKonwledge[] = [];
  itDisciplinesSkills: ITDisciplines[] = [];
  industryKnowledgeSkills: IndustryKnowledge[] = [];
  educationData: Education[] = [];
  certificationData: Certification[] = [];
  skillAreasData: SkillAreaCharacteristic[] = [];
  experiencesData: Experience[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        mirror: true,
        easing: 'ease-out-cubic'
      });
    }
    
    this.http.get<TechStacksData>('data/tech-stacks.json').subscribe({
      next: (data) => {
        this.techStackSkills = this.sortSkills(data.TechnicalSkills);
      },
      error: (err) => console.error('Error loading tech stacks:', err)
    });

    this.http.get<ApplicationKnowledgeData>('data/application-knowledge.json').subscribe({
      next: (data) => {
        this.applicationKnowledgeSkills = this.sortSkills(data.ApplicationKnowledge);
      },
      error: (err) => console.error('Error loading application knowledge:', err)
    });

    this.http.get<ITDisciplinesData>('data/it-disciplines.json').subscribe({
      next: (data) => {
        this.itDisciplinesSkills = this.sortSkills(data.ITDisciplines);
      },
      error: (err) => console.error('Error loading IT disciplines:', err)
    });

    this.http.get<LanguageSkillsData>('data/language-skills.json').subscribe({
      next: (data) => {
        this.languageSkills = data.LanguageSkills;
      },
      error: (err) => console.error('Error loading language skills:', err)
    });

    this.http.get<IndustryKnowledgeData>('data/industry-knowledge.json').subscribe({
      next: (data) => {
        this.industryKnowledgeSkills = this.sortSkills(data.IndustryKnowledge);
      },
      error: (err) => console.error('Error loading industry knowledge:', err)
    });

    this.http.get<EducationData>('data/education.json').subscribe({
      next: (data) => {
        this.educationData = data.Education;
      },
      error: (err) => console.error('Error loading education data:', err)
    });

    this.http.get<CertificationData>('data/certifications.json').subscribe({    
      next: (data) => {
        this.certificationData = data.Certifications;
      },
      error: (err) => console.error('Error loading certification data:', err)
    });

    this.http.get<SkillAreasData>('data/skill-areas-and-characteristics.json').subscribe({
      next: (data) => {
        this.skillAreasData = data.SkillAreasAndCharacteristics;
      },
      error: (err) => console.error('Error loading skill areas data:', err)
    });

    this.http.get<ExperiencesData>('data/experiences.json').subscribe({
      next: (data) => {
        this.experiencesData = this.sortExperiences(data.Experiences);
      },
      error: (err) => console.error('Error loading experiences data:', err)
    });
  }

  private sortExperiences(experiences: Experience[]): Experience[] {
    return experiences.sort((a, b) => {
      const dateA = new Date(a.To === 'Present' ? new Date().toISOString() : a.To);  
      const dateB = new Date(b.To === 'Present' ? new Date().toISOString() : b.To);  
      return dateB.getTime() - dateA.getTime();
    });
  }

  private sortSkills(skills: TechSkill[]): TechSkill[] {
    const levelOrder: Record<string, number> = {
      'Extensive Experience and Knowledge': 3,
      'Solid Experience and Knowledge': 2,
      'Basic Experience and Knowledge': 1
    };

    return skills.sort((a, b) => {
      // First, group by domain if it exists
      if (a.Domain && b.Domain) {
        const domainCompare = a.Domain.localeCompare(b.Domain);
        if (domainCompare !== 0) return domainCompare;
      }
      
      // Then sort by level
      const levelDiff = levelOrder[b.Level] - levelOrder[a.Level];
      if (levelDiff !== 0) return levelDiff;
      
      // Finally sort by years
      return b.Years - a.Years;
    });
  }
}
