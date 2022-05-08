import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();
  
  searchTerm: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  search(){
    let params: Params = {search_term: this.searchTerm};
    this.router.navigate(['/search'], {queryParams: params});
  }
}
