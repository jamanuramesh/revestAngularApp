import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
interface User{
  email:string;
  password:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user_details:User = {email:"",password:""}
  showLoader:boolean = false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  submitLoginForm(){
    this.showLoader = true;
    this.loginService.isValidUser(this.user_details).subscribe((res:any)=>{
       const status = res.status || false;
       if(status){
        if(res.data == 1){
          // if valid user login credentials then only route into home page
        }
        this.showLoader = false;
       }
    },(error:any)=>{
      console.log('Error : ',error);
      this.showLoader = false;
    })
  }

}
