import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Observable, map } from 'rxjs';
import {
  TechSkill,
  LanguageSkill,
  ApplicationKonwledge,
  TechDomain,  
  Education,
  Certification,
  SkillAreaCharacteristic,
  WorkExperience,
  IndustryExperience  
} from '../models/profile.models';
import { env } from 'process';
import { environment } from '../../environments/environment';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private http = inject(HttpClient);
  private baseUrl: string;
  private apiUrl = environment.useLocalApi ? environment.apiUrl : ''; // Use local API URL from environment

  private readonly levelOrder: Record<string, number> = {
    'Extensive Experience and Knowledge': 3,
    'Solid Experience and Knowledge': 2,
    'Basic Experience and Knowledge': 1
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    const base = this.document.querySelector('base');
    this.baseUrl = base?.getAttribute('href') || '/';
  }

  getTechStacks(): Observable<TechSkill[]> {
    if(this.apiUrl !== '') {
      return this.http.get<TechSkill[]>(`${this.apiUrl}/tech-stacks`);      
    }

    return this.http.get<TechSkill[]>(`${this.baseUrl}data/tech-stacks.json`).pipe(
      map(data => this.sortSkills(data))
    );
  }

  getApplicationKnowledge(): Observable<ApplicationKonwledge[]> {
    if(this.apiUrl !== '') {
      return this.http.get<ApplicationKonwledge[]>(`${this.apiUrl}/application-knowledge`);      
    }
    
    return this.http.get<ApplicationKonwledge[]>(`${this.baseUrl}data/application-skills.json`).pipe(
      map(data => this.sortSkills(data))
    );
  }

  getTechDomains(): Observable<TechDomain[]> {    
    if(this.apiUrl !== '') {
      return this.http.get<TechDomain[]>(`${this.apiUrl}/tech-domains`);      
    }

    return this.http.get<TechDomain[]>(`${this.baseUrl}data/tech-domains.json`).pipe(
      map(data => this.sortSkills(data))
    );
  }

  getLanguageSkills(): Observable<LanguageSkill[]> {
    if(this.apiUrl !== '') {
      return this.http.get<LanguageSkill[]>(`${this.apiUrl}/language-skills`);      
    }

    return this.http.get<LanguageSkill[]>(`${this.baseUrl}data/language-skills.json`);
  }

  getIndustryExperiences(): Observable<IndustryExperience[]> {
    if(this.apiUrl !== '') {
      return this.http.get<IndustryExperience[]>(`${this.apiUrl}/industry-experiences`);      
    }

    return this.http.get<IndustryExperience[]>(`${this.baseUrl}data/industry-experiences.json`).pipe(
      map(data => this.sortSkills(data))
    );
  }

  getEducation(): Observable<Education[]> {
    if(this.apiUrl !== '') {
      return this.http.get<Education[]>(`${this.apiUrl}/educations`);      
    }

    return this.http.get<Education[]>(`${this.baseUrl}data/educations.json`);
  }

  getCertifications(): Observable<Certification[]> {
    if(this.apiUrl !== '') {
      return this.http.get<Certification[]>(`${this.apiUrl}/certifications`);      
    }

    return this.http.get<Certification[]>(`${this.baseUrl}data/certifications.json`);
  }

  getSkillAreas(): Observable<SkillAreaCharacteristic[]> {
    if(this.apiUrl !== '') {
      return this.http.get<SkillAreaCharacteristic[]>(`${this.apiUrl}/skill-areas-and-characteristics`);      
    }

    return this.http.get<SkillAreaCharacteristic[]>(`${this.baseUrl}data/skill-areas-and-characteristics.json`);
  }

  getExperiences(): Observable<WorkExperience[]> {
    if(this.apiUrl !== '') {
      return this.http.get<WorkExperience[]>(`${this.apiUrl}/work-experiences`);      
    }

    return this.http.get<WorkExperience[]>(`${this.baseUrl}data/work-experiences.json`).pipe(
      map(data => this.sortExperiences(data))
    );
  }

  private sortExperiences(experiences: WorkExperience[]): WorkExperience[] {
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
