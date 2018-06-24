import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Job } from '../../model/job';
import { Payment } from '../../model/payment';
import { Logic } from '../../service/logic/logic.service';
import { JobhistoryPage } from '../jobhistory/jobhistory';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public job : Job;
  public payment: Payment;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public logic:Logic,
    private loading: LoadingController,
    private afa: AngularFireAuth
  ) {
      this.job = navParams.get("job");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  addPayment(p: Payment)
  {
    p.user_id = this.afa.auth.currentUser.uid;
    p.job_id = this.job.key;

    let l = this.loading.create({
      content: "Please wait..."
    });
    l.present();
    
    this.logic.addPayment(p);
    this.logic.addJob(this.job);
    this.navCtrl.setRoot(JobhistoryPage);
    l.dismiss();
  }  
}
