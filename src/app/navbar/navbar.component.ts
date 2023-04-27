import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouteParamsService } from '../shared/route-params.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMobile = false;
  isMenuExpanded = false;
  showLinks = false;

  constructor(private breakpointObserver: BreakpointObserver, public routeParamsService: RouteParamsService) {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .subscribe((state) => {
        this.isMobile = state.matches;
      });
  }


  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }
}
