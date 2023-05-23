import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { SpotifyUserResponse, TokenResponse, User } from '../interfaces/auth.interface';


const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const CLIENT_ID: string = 'd90683a6a40f4c9b85d6b25d073a4c3c';
const CLIENT_SECRET: string = '6289ee2e48364667bb8a164958a3a08a';
const REDIRECT_URI: string = 'http://localhost:4200/dashboard';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public spotifyUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('Hola')
    this.activatedRoute.queryParams
      .pipe(
        switchMap(queryParams => {
          if (!queryParams['code']) return of(null);
          return this._getToken(queryParams['code']);
        })
      ).subscribe(res => {
        if (!res) return;
        this.getUserInfo(res.access_token);
        this.router.navigate(['dashboard']);
        console.log('Terminé token')
      });

      this.loadLocalStorage();
  }

  get user(): User | undefined {
    return structuredClone(this.spotifyUser);
  }


  public authSpotify(): void {

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'user-read-private user-read-email user-library-read'
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params}`
  }


  private _getToken(code: string): Observable<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    return this.http.post<TokenResponse>('https://accounts.spotify.com/api/token', body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }


  private getUserInfo(token: string): void {
    this.http.get<SpotifyUserResponse>(`${SPOTIFY_API_URL}/me`, {
      headers: { Authorization: 'Bearer ' + token }
    }).subscribe(user => {
      this.spotifyUser = {
        name: user.display_name,
        profile_photo: user.images[0].url,
        profile_link: user.external_urls.spotify,
        id: user.id,
        access_token: token
      };
      this.saveInLocalStorage();
    });
  }


  private saveInLocalStorage(): void {
    localStorage.setItem('user', JSON.stringify(this.spotifyUser));
  }


  private loadLocalStorage(): void {
    if (!localStorage.getItem('user')) return;
    this.spotifyUser = JSON.parse(localStorage.getItem('user')!);
  }


  public logout(): void {
    this.router.navigate(['/auth']);
  }

}
