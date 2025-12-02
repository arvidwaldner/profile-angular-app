import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import AOS from 'aos';
import { ProfileDataService } from './services/profile-data.service';
import {
  TechSkill,
  LanguageSkill,
  ApplicationKonwledge,
  ITDisciplines,
  IndustryKnowledge,
  Education,
  Certification,
  SkillAreaCharacteristic,
  Experience
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
    
    this.profileDataService.getTechStacks().subscribe({
      next: (data) => this.techStackSkills = data,
      error: (err) => console.error('Error loading tech stacks:', err)
    });

    this.profileDataService.getApplicationKnowledge().subscribe({
      next: (data) => this.applicationKnowledgeSkills = data,
      error: (err) => console.error('Error loading application knowledge:', err)
    });

    this.profileDataService.getITDisciplines().subscribe({
      next: (data) => this.itDisciplinesSkills = data,
      error: (err) => console.error('Error loading IT disciplines:', err)
    });

    this.profileDataService.getLanguageSkills().subscribe({
      next: (data) => this.languageSkills = data,
      error: (err) => console.error('Error loading language skills:', err)
    });

    this.profileDataService.getIndustryKnowledge().subscribe({
      next: (data) => this.industryKnowledgeSkills = data,
      error: (err) => console.error('Error loading industry knowledge:', err)
    });

    this.profileDataService.getEducation().subscribe({
      next: (data) => this.educationData = data,
      error: (err) => console.error('Error loading education data:', err)
    });

    this.profileDataService.getCertifications().subscribe({    
      next: (data) => this.certificationData = data,
      error: (err) => console.error('Error loading certification data:', err)
    });

    this.profileDataService.getSkillAreas().subscribe({
      next: (data) => this.skillAreasData = data,
      error: (err) => console.error('Error loading skill areas data:', err)
    });

    this.profileDataService.getExperiences().subscribe({
      next: (data) => this.experiencesData = data,
      error: (err) => console.error('Error loading experiences data:', err)
    });
  }
}
