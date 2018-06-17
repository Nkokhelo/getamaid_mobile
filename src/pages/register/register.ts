import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  userForm : FormGroup;
  exist : boolean = false;
  constructor(private toast: ToastController, private loading: LoadingController, private afa: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required, Validators.minLength(15),Validators.email,Validators.pattern(regexValidators.email)])],
      password: ['',Validators.compose([Validators.required,Validators.pattern(regexValidators.password), Validators.minLength(7)])]
    },{updateOn: 'blur'});

  }

  remove()
  {
    this.exist = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  async register(user: User)
  {
    
    if(this.userForm.valid)
    {
      let loading = this.loading.create({
        content:"Please wait..."
      });
      loading.present();
      try
      {
        const result = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
        if(result)
        {
          this.navCtrl.setRoot(LoginPage);
          console.log(result);
          loading.dismiss();
        }
      }
      catch(e)
      {
        if(e.code =='auth/network-request-failed')
        {
          this.toast.create({
            message: "Network error, please make sure you're connectes and try again.",
            duration :3000,
            position:'bottom'         
          }).present();
          loading.dismiss();
          return;
        }
        else if(e.code == "auth/email-already-in-use")
        {
          this.exist = true;
          loading.dismiss();
          return;
        }
        console.error(e);
      }
    }
  }
}

