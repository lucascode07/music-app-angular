import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Track } from '../../interfaces/music.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public recommendationsList: Track[] = [];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

    // if (!JSON.parse(localStorage.getItem('user')!)) window.location.href = '/';
    this.dashboardService.getRecommendationsTracks()
      .subscribe(res => this.recommendationsList = res.tracks);
  }



}
