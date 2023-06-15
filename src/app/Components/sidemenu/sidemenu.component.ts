import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  collapsable = false
  collapsable2 = false
  collapsable3 = false
  collapsable4 = false
  role : string = localStorage.getItem('role')??''
  constructor(private api: ApiService , private router : Router) { }
  LogOut() {
    this.api.LogOut().subscribe({
      next: (res) => {
        localStorage.clear()
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        localStorage.clear()
        this.router.navigate(['/login'])

      }
    })
  }

  
}
