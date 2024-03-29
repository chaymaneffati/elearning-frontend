import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';

import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef; //nzidouha bechnajmou na9raw continue mta3 fichier


  constructor(private _auth: AuthService) { }


alert = false;
alert1 = false;

  user = {

      name: '',
      lastname: '',
      email:'' ,
      login:'' ,
     adress: '',
     phone: '',
     password:''

  }


  ngOnInit(): void {
  }





  register(){
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('name', this.user.name);
    file.set('lastname', this.user.lastname);

    file.set('email', this.user.email);

    file.set('login' , this.user.login);
    file.set('adress' , this.user.adress);
    file.set('phone' , this.user.phone);
    file.set('password' , this.user.password);

    this._auth.registerEtudiant(file).subscribe(

      res=>{
        console.log(res);
       
        if(res == 0){
          this.alert1 = true;
        }else{
          this.alert = true;
        }
        setTimeout(() => {
            this.alert = false;
            this.alert1 = false;
        }, 3000);
        
      },
      err=>{
        console.log(err);
        
      }

    );

  }
}
