import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendationsResponse } from '../interfaces/music.interface';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }


  public getRecommendationsTracks(): Observable<RecommendationsResponse> {

    console.log('DashB. Service dice: getRecommendationsTracks')

    const access_token = JSON.parse(localStorage.getItem('user')!).access_token;

    const queryParams = new URLSearchParams({
      seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
      seed_tracks: '0c6xIDDpzE81m2q797ordA'
    });

    return this.http.get<RecommendationsResponse>(`${SPOTIFY_API_URL}/recommendations?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    });
  }

}
