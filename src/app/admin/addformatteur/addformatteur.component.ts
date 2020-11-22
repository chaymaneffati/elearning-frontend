import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-addformatteur',
  templateUrl: './addformatteur.component.html',
  styleUrls: ['./addformatteur.component.css']
})
export class AddformatteurComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(private _auth: AuthService, private fb: FormBuilder) {
    this.angForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  alert = false;
  alert1 = false;


  user = {

    name: '',
    lastname: '',
    email: '',
    login: '',
    adress: '',
    phone: '',
    password: '',
    categorie: ''

  }
  alertValidation = {
    name: false,
    lastname: false,
    email: false,
    login: false,
    adress: false,
    phone: false,
    password: false,
    categorie: false

  }

  categories: any;
  angForm: FormGroup;
  ngOnInit(): void {

    this._auth.getAllCategorie().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        console.log(err);

      }
    );

  }





  register() {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('image', imageBlob);
    file.set('name', this.user.name);
    file.set('lastname', this.user.lastname);

    file.set('email', this.user.email);

    file.set('login', this.user.login);
    file.set('adress', this.user.adress);
    file.set('phone', this.user.phone);
    file.set('password', this.user.password);
    file.set('categorie', this.user.categorie);
    this.formValidation(file);
    if (this.isValid()) {
      this._auth.registerFormatteur(file).subscribe(
        res => {
          if (res == 0) {
            this.alert1 = true;
          } else {
            this.alert = true;
          }
          setTimeout(() => {
            this.alert = false;
            this.alert1 = false;
          }, 3000);
        },
        err => {
          console.log(err);
  
        }
  
      );
    
    }
    
  }
  formValidation(file: FormData) {
    if (file.get('name') == null || file.get('name') == '')
      this.alertValidation.name = true;
    else this.alertValidation.name = false;

    if (file.get('lastname') == null || file.get('lastname') == '')
      this.alertValidation.lastname = true;
    else this.alertValidation.lastname = false;
    if (file.get('phone') == null || file.get('phone') == '')
      this.alertValidation.phone = true;
    else this.alertValidation.phone = false;
    if (file.get('email') == null || file.get('email') == '')
      this.alertValidation.email = true;
    else this.alertValidation.email = false;
    if (file.get('login') == null || file.get('login') == '')
      this.alertValidation.login = true;
    else this.alertValidation.login = false;
    if (file.get('adress') == null || file.get('adress') == '')
      this.alertValidation.adress = true;
    else this.alertValidation.adress = false;
    if (file.get('password') == null || file.get('password') == '')
      this.alertValidation.password = true;
    else this.alertValidation.password = false;
    if (file.get('categorie') == null || file.get('categorie') == '')
      this.alertValidation.categorie = true;
    else this.alertValidation.categorie = false;
  }
  isValid(){
    for (let key in this.alertValidation) {
      if (this.alertValidation[key]) {
        return false;
      }
    }
    return true;
  }
 

}
