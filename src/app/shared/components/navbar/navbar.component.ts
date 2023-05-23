import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/auth.interface';

interface NavbarLink {
  name: string;
  url: string;
}

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public spotifyLogo: string = 'assets/images/spotify_icon.svg';
  public links: NavbarLink[] = [
    { name: 'Home', url: './' },
    { name: 'My favorites', url: './my-favorites' }
  ]



  constructor(
    private authService: AuthService
  ) { }

  get user() {
    return this.authService.user;
  }

  public logout() {
    localStorage.removeItem('user');
    this.authService.logout();
  }

}
