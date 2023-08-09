import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouteParamsService } from '../shared/route-params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobile = false;
  isMenuExpanded = false;
  showLinks = false;

  constructor(private breakpointObserver: BreakpointObserver, public routeParamsService: RouteParamsService, private router: Router) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((state) => {
        this.isMobile = state.matches;
      });
  }

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  navigateTo(tab: string) {
    console.log(this.routeParamsService.server);
    this.router.navigate([this.routeParamsService.server, this.routeParamsService.agent, this.routeParamsService.contract, tab]);
  }
}
