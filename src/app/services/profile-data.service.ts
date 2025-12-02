import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  TechSkill,
  LanguageSkill,
  ApplicationKonwledge,
  ITDisciplines,
  IndustryKnowledge,
  Education,
  Certification,
  SkillAreaCharacteristic,
  Experience,
  TechStacksData,
  LanguageSkillsData,
  ApplicationKnowledgeData,
  ITDisciplinesData,
  IndustryKnowledgeData,
  EducationData,
  CertificationData,
  SkillAreasData,
  ExperiencesData
} from '../models/profile.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private http = inject(HttpClient);

  private readonly levelOrder: Record<string, number> = {
    'Extensive Experience and Knowledge': 3,
    'Solid Experience and Knowledge': 2,
    'Basic Experience and Knowledge': 1
  };

  getTechStacks(): Observable<TechSkill[]> {
    return this.http.get<TechStacksData>('data/tech-stacks.json').pipe(
      map(data => this.sortSkills(data.TechnicalSkills))
    );
  }

  getApplicationKnowledge(): Observable<ApplicationKonwledge[]> {
    return this.http.get<ApplicationKnowledgeData>('data/application-knowledge.json').pipe(
      map(data => this.sortSkills(data.ApplicationKnowledge))
    );
  }

  getITDisciplines(): Observable<ITDisciplines[]> {
    return this.http.get<ITDisciplinesData>('data/it-disciplines.json').pipe(
      map(data => this.sortSkills(data.ITDisciplines))
    );
  }

  getLanguageSkills(): Observable<LanguageSkill[]> {
    return this.http.get<LanguageSkillsData>('data/language-skills.json').pipe(
      map(data => data.LanguageSkills)
    );
  }

  getIndustryKnowledge(): Observable<IndustryKnowledge[]> {
    return this.http.get<IndustryKnowledgeData>('data/industry-knowledge.json').pipe(
      map(data => this.sortSkills(data.IndustryKnowledge))
    );
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<EducationData>('data/education.json').pipe(
      map(data => data.Education)
    );
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<CertificationData>('data/certifications.json').pipe(
      map(data => data.Certifications)
    );
  }

  getSkillAreas(): Observable<SkillAreaCharacteristic[]> {
    return this.http.get<SkillAreasData>('data/skill-areas-and-characteristics.json').pipe(
      map(data => data.SkillAreasAndCharacteristics)
    );
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<ExperiencesData>('data/experiences.json').pipe(
      map(data => this.sortExperiences(data.Experiences))
    );
  }

  private sortExperiences(experiences: Experience[]): Experience[] {
    return experiences.sort((a, b) => {
      const dateA = new Date(a.To === 'Present' ? new Date().toISOString() : a.To);
      const dateB = new Date(b.To === 'Present' ? new Date().toISOString() : b.To);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private sortSkills<T extends { Level: string; Years: number; Domain?: string }>(skills: T[]): T[] {
    return skills.sort((a, b) => {
      // First, group by domain if it exists
      if (a.Domain && b.Domain) {
        const domainCompare = a.Domain.localeCompare(b.Domain);
        if (domainCompare !== 0) return domainCompare;
      }

      // Then sort by level
      const levelDiff = this.levelOrder[b.Level] - this.levelOrder[a.Level];
      if (levelDiff !== 0) return levelDiff;

      // Finally sort by years
      return b.Years - a.Years;
    });
  }
}
