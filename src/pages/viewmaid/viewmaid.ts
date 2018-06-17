import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Logic } from '../../service/logic/logic.service';
import { Maid } from '../../model/maid';

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
    private logic : Logic
  ) {
    this.maid = navParams.get("maid");
    console.log(this.maid);   
  }

  ionVi

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmaidPage');
  }

}
