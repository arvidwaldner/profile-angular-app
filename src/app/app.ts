import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import AOS from 'aos';

interface TechSkill {
  Skill: string;
  Years: number;
  Level: string;
}

interface TechStacksData {
  TechnicalSkills: TechSkill[];
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 120,
        mirror: true,
        easing: 'ease-out-cubic'
      });
    }

    // Load tech skills from JSON
    this.http.get<TechStacksData>('data/tech-stacks.json').subscribe({
      next: (data) => {
        this.skills = this.sortSkills(data.TechnicalSkills);
      },
      error: (err) => console.error('Error loading tech stacks:', err)
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
