import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Parent } from '../../model/parent';
import { AngularFireAuth } from 'angularfire2/auth';
import { Logic } from '../../service/logic/logic.service';
import { Maid } from '../../model/maid';
import { MaidhomePage } from '../maidhome/maidhome';
import { AllmaidsPage } from '../allmaids/allmaids';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  setUp: any = {
    fullname : "",
    surname : "",
    idnumber:"",
    address:"",
    age:"",
    phone:"",
    role:"",
    imgUrl:"",
    user_id:this.afAuth.auth.currentUser.uid,
    email:this.afAuth.auth.currentUser.email, 
    gender:""
  };
  setUpForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afAuth: AngularFireAuth, 
    private logic: Logic) 
  {
    //TODO Validate this Page
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }

  addParent(p : Parent)
  {
    p.role = 'parent';
    this.logic.addParent(p).then((data)=>{
      console.log(data.values)
      this.navCtrl.setRoot(AllmaidsPage);
    });
  }

  addMaid(m : Maid)
  {
    m.role = 'maid';
    this.logic.addMaid(m).then((data)=>{
      console.log(data.values)
      this.navCtrl.setRoot(MaidhomePage);
    });
  }
}
