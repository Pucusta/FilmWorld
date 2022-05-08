import { Component, OnInit, Output, EventEmitter } from '@angular/core';
 
/* It's a component that emits an event when the sidenav is closed */
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
 
  constructor() { }
 
  ngOnInit() {
  }
 
  /* It's a method that emits an event when the sidenav is closed. */
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
 
}
