import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navs:any = [
    { routerLink:"/home",LinkName:"Home" },
    { routerLink:"/products",LinkName:"Products" },
    { routerLink:"/about",LinkName:"About" },
    { routerLink:"/contact",LinkName:"Contact" },
    { routerLink:"/register",LinkName:"Register" },
    { routerLink:"/login",LinkName:"Login" }
  ];
  constructor() { }
  ngOnInit(): void {
  }
}