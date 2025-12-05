import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import AOS from 'aos';
import { ProfileDataService } from './services/profile-data.service';
import {
  TechSkill,
  LanguageSkill,
  ApplicationKonwledge,
  TechDomain,
  IndustryExperience,
  Education,
  Certification,
  SkillAreaCharacteristic,
  WorkExperience  
} from './models/profile.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Profile - Arvid Waldner');
  private platformId = inject(PLATFORM_ID);
  private profileDataService = inject(ProfileDataService);
  
  techStackSkills = signal<TechSkill[]>([]);
  languageSkills = signal<LanguageSkill[]>([]);
  applicationKnowledgeSkills = signal<ApplicationKonwledge[]>([]);
  techDomainSkills = signal<TechDomain[]>([]);
  industryExperienceSkills = signal<IndustryExperience[]>([]);
  educationsData = signal<Education[]>([]);
  certificationData = signal<Certification[]>([]);
  skillAreasData = signal<SkillAreaCharacteristic[]>([]);
  experiencesData = signal<WorkExperience[]>([]);

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
    
    this.profileDataService.getTechStacks().subscribe({
      next: (data) => this.techStackSkills.set(data),
      error: (err) => console.error('Error loading tech stacks:', err)
    });

    this.profileDataService.getApplicationKnowledge().subscribe({
      next: (data) => this.applicationKnowledgeSkills.set(data),
      error: (err) => console.error('Error loading application knowledge:', err)
    });

    this.profileDataService.getTechDomains().subscribe({
      next: (data) => this.techDomainSkills.set(data),
      error: (err) => console.error('Error loading tech domains:', err)
    });

    this.profileDataService.getLanguageSkills().subscribe({
      next: (data) => this.languageSkills.set(data),
      error: (err) => console.error('Error loading language skills:', err)
    });

    this.profileDataService.getIndustryExperiences().subscribe({
      next: (data) => this.industryExperienceSkills.set(data),
      error: (err) => console.error('Error loading industry experience:', err)
    });

    this.profileDataService.getEducation().subscribe({
      next: (data) => this.educationsData.set(data),
      error: (err) => console.error('Error loading education data:', err)
    });

    this.profileDataService.getCertifications().subscribe({    
      next: (data) => this.certificationData.set(data),
      error: (err) => console.error('Error loading certification data:', err)
    });

    this.profileDataService.getSkillAreas().subscribe({
      next: (data) => this.skillAreasData.set(data),
      error: (err) => console.error('Error loading skill areas data:', err)
    });

    this.profileDataService.getExperiences().subscribe({
      next: (data) => this.experiencesData.set(data),
      error: (err) => console.error('Error loading experiences data:', err)
    });
  }
}
