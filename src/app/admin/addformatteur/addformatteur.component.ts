import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-addformatteur',
  templateUrl: './addformatteur.component.html',
  styleUrls: ['./addformatteur.component.css']
})
export class AddformatteurComponent implements OnInit {

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  
  constructor(private _auth: AuthService, private fb: FormBuilder) { 
    this.angForm = this.fb.group({
    name: ['', Validators.required ]
 });}

  alert = true;
  alert1 = false;


  user = {

      name: '',
      lastname: '',
      email:'' ,
      login:'' ,
     adress: '',
     phone: '',
     password:'',
     categorie:''

  }


  categories : any;
  angForm: FormGroup;
  ngOnInit(): void {

    this._auth.getAllCategorie().subscribe(
      res=>{
        this.categories = res;
      },
      err=>{
        console.log(err);
        
      }
    );

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
    file.set('categorie' , this.user.categorie);
    this.formValidation(file);

    this._auth.registerFormatteur(file).subscribe(

      res=>{
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
  formValidation(file:FormData){
    if(file.get('name')==null || file.get('name')=='')
      this.alert=true;
      else this.alert = false;
  }

}
