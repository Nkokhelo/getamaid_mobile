import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Logic } from '../../service/logic/logic.service';
import { Job } from '../../model/job';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Maid } from '../../model/maid';

/**
 * Generated class for the JobhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobhistory',
  templateUrl: 'jobhistory.html',
})
export class JobhistoryPage {

  jobs: any;
  maid : Maid;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private logic: Logic,
    private afa : AngularFireAuth
  ) {
    this.jobs = this.logic.findJobByParentId(this.afa.auth.currentUser.uid);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobhistoryPage');
  }
}
