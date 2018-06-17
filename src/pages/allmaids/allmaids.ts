import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Logic } from '../../service/logic/logic.service';
import { Maid } from '../../model/maid';

/**
 * Generated class for the AllmaidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allmaids',
  templateUrl: 'allmaids.html',
})
export class AllmaidsPage {

  allmaids: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private logic : Logic,
    private toast: ToastController) {
    this.allmaids = logic.allMaids();
  } 

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AllmaidsPage');
  }

  open(m:Maid)
  {
    // this.navCtrl.setRoot("ViewmaidPage",{maid_id : mkey});    
    this.navCtrl.push("ViewmaidPage",{maid: m})
  }
  
}
