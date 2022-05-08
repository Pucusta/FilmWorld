import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Params, Router } from '@angular/router';

/* The HeaderComponent class is a component that contains the header of the application */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();
  
  searchTerm: string = "";

  constructor(private router: Router) { }

  /**
   * When the user navigates to the same URL, the router will reload the component instead of reusing
   * it.
   */
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
  
  /* A function that is called when the user clicks on the hamburger menu. It emits an event that is
  caught by the `app.component.ts` file. */
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  /**
   * We're creating a new object called params, which has a property called search_term, and we're
   * setting that property to the value of this.searchTerm. Then we're navigating to the search route,
   * and passing in the params object as the queryParams
   */
  search(){
    let params: Params = {search_term: this.searchTerm};
    this.router.navigate(['/search'], {queryParams: params});
  }
}