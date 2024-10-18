import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from 'src/app/services/userdetails.service';
interface User{
  fname:string;
  lname:string;
  password:string;
  email:string;
  phone:string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user_details:User = {fname:"",lname:"",password:"",email:"",phone:""};
  showLoader:boolean = false;
  constructor(private userdetails:UserdetailsService) { }
  ngOnInit(): void {
  }

  submitRegistrationForm(){
    this.showLoader = true;
    this.userdetails.insertUserDetails(this.user_details).subscribe(res=>{
       const status  = res.status || false;
       if(status){
         alert(res.data);
         this.showLoader = false;
       }
    },error=>{
      console.log('Error : ',error);
      this.showLoader = false;
    });
  }

}