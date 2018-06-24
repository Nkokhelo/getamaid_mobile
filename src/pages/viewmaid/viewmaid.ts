import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Logic } from '../../service/logic/logic.service';
import { Maid } from '../../model/maid';
import { AngularFireAuth } from 'angularfire2/auth';
import { Job } from '../../model/job';

/**
 * Generated class for the ViewmaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmaid',
  templateUrl: 'viewmaid.html',
})
export class ViewmaidPage {

  key:string;
  maid : Maid;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private logic : Logic,
    private afa: AngularFireAuth) 
  {
    this.maid = navParams.get("maid");
    console.log(this.maid);   
  }

  

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ViewmaidPage');
  }

  hire(m:Maid)
  {
    this.navCtrl.push("JobPage",{maid_id : this.maid.user_id});
  }
      
  viewJobHistrory(m: Maid)
  {
    //TODO : generate JobhistoryPage 
    this.navCtrl.push("JobhistoryPage", {maid:this.maid})
  }
}
