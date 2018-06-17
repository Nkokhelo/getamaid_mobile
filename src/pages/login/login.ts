import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetupPage } from '../setup/setup';
import { regexValidators } from '../validators/validator';
import { Logic } from '../../service/logic/logic.service';
import { Parent } from '../../model/parent';
import { AllmaidsPage } from '../allmaids/allmaids';
import { RequestsPage } from '../requests/requests';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user ={} as User;
  userForm:FormGroup;
  isNotFound: boolean = false;

  constructor(
    private logic: Logic, 
    private toast: ToastController, 
    private formBuilder : FormBuilder, 
    private afa: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loading: LoadingController
  ) 
  {
    this.userForm = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required, Validators.minLength(5),Validators.email,Validators.pattern(regexValidators.email)])],
      password: ['',Validators.compose([Validators.required,Validators.pattern(regexValidators.password)])]
    },{updateOn: 'blur'});

  }

  userExist()
  {
    this.isNotFound = false;
    console.log(this.isNotFound);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 async login(user: User)
 { 
   if(this.userForm.valid)
   {
    let loading = this.loading.create({
      content:"Please wait..."
    });
    loading.present();
   try
   {
     const result = await this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
     if(result)
     {
       if(result.additionalUserInfo.isNewUser==true)
       {
        this.navCtrl.setRoot(SetupPage);
       }
       else
       {
          this.logic.getParentByUserId(this.afa.auth.currentUser.uid).subscribe(e =>{
            e.forEach(p =>{
              if(p)
              {
                this.navCtrl.setRoot(AllmaidsPage);
              }
              else
              {
                this.logic.getMaidByUserId(this.afa.auth.currentUser.uid).subscribe(e =>{
                  e.forEach(m =>{
                    if(m)
                    {
                      this.navCtrl.setRoot(RequestsPage);
                    }
                    else
                    {
                      this.showToast("Database error!!!, pleaser try agail")
                    }
                  })
                })
              }
            })});
       }
       loading.dismiss();
     }
   }
   catch(e)
   {
     if(e.code =='auth/network-request-failed')
     {
      this.showToast("Network error, please make sure you're connected and try again.");
       loading.dismiss();
       return;
     }
     else if(e.code ="auth/user-not-found")
     {
        this.isNotFound = true;
        loading.dismiss();
        return;
     }
     console.error(e)
   }
   }
 }
 register()
 {
   this.navCtrl.push('RegisterPage');
 }
 showToast(m : string)
 {
  this.toast.create({
    message: m,
    duration :3000,
    position:'bottom'         
  }).present();
 }
}
 