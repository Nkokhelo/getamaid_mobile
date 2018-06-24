import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Job } from '../../model/job';
import { Logic } from '../../service/logic/logic.service';
import { Maid } from '../../model/maid';
import { AngularFireAuth } from 'angularfire2/auth';
import { AllmaidsPage } from '../allmaids/allmaids';

/**
 * Generated class for the JobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {

  public job : Job;
  public maid : Maid;
  public mid : string;
  public yes :boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public logic: Logic,
    private afa: AngularFireAuth,
    private loading: LoadingController
  ) {

    this.mid = navParams.get("maid_id")
    this.job.job_cost = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobPage');
  }
  
  calcCost(duration: string)
  {
    if(!this.yes)
    {
      if(duration == "h")
      {
        this.job.job_cost = 24*this.job.duration;
      }
      else if( duration == "d")
      {
        this.job.job_cost = (20*24)*this.job.duration;
      }
      else if( duration =="w")
      {
        this.job.job_cost = ((10*24)*7)*this.job.duration;
      }
      else
      {
        this.job.job_cost = 2500 *this.job.duration;
      }
    }
    
  }

  disableThem()
  {
    if(this.yes)
    {
      this.yes = false;
    }
    else
    {
      this.yes = true;
    }
  }
  
  addJob(j:Job)
  {
    j.maid_id = this.mid;
    j.parent_id =  this.afa.auth.currentUser.uid;

    let loading = this.loading.create({content:"Sending Request.."});
    loading.present();
    this.navCtrl.push("PaymentPage",{job : j})
    loading.dismiss()
  }

  canselJob()
  {
    let loading = this.loading.create({content:"Cancelling, please wait..."});
    loading.present();
    this.navCtrl.setRoot(AllmaidsPage);
    loading.dismiss();
  }
  
}
