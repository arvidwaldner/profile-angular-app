import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import AOS from 'aos';

interface LanguageSkill {
  Skill: string;
  Writing: string;
  Speaking: string;
}

interface TechSkill {
  Skill: string;
  Years: number;
  Level: string;
}

interface ApplicationKonwledge {
  Skill: string;
  Years: number;
  Level: string;
}

interface ITDisciplines {
  Skill: string;
  Years: number;
  Level: string;
}

interface IndustryKnowledge {
  Skill: string;
  Years: number;
  Level: string;
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
  
  skills: TechSkill[] = [];
  languageSkills: LanguageSkill[] = [];
  applicationKnowledgeSkills: ApplicationKonwledge[] = [];
  itDisciplinesSkills: ITDisciplines[] = [];
  industryKnowledgeSkills: IndustryKnowledge[] = [];

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
        this.skills = this.sortSkills(data.TechnicalSkills);
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
  }

  private sortSkills(skills: TechSkill[]): TechSkill[] {
    const levelOrder: Record<string, number> = {
      'Extensive Experience and Knowledge': 3,
      'Solid Experience and Knowledge': 2,
      'Basic Experience and Knowledge': 1
    };

    return skills.sort((a, b) => {
      const levelDiff = levelOrder[b.Level] - levelOrder[a.Level];
      if (levelDiff !== 0) return levelDiff;
      return b.Years - a.Years;
    });
  }
}
