import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Page404Component } from './page/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    Page404Component,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
