import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Parent } from '../../model/parent';
import { Maid } from '../../model/maid';
import { Job } from '../../model/job';
import { Case } from '../../model/case';
import { Overtime } from '../../model/overtime';
import { Payment } from '../../model/payment';

@Injectable()
export class Logic
{
   public parents : AngularFireList<Parent>;
   public maids : AngularFireList<Maid>;
   public jobs : AngularFireList<Job>;
   public cases : AngularFireList<Case>;
   public overtime : AngularFireList<Overtime>;
   public payments : AngularFireList<Payment>;
    // TODO: Testing this to do list

    constructor(private db:AngularFireDatabase)
    {
        this.parents = this.db.list<Parent>('parent');
        this.maids = this.db.list<Maid>('maid');
        this.jobs = this.db.list<Job>('job');
        this.cases = this.db.list<Case>('case');
        this.overtime = this.db.list<Overtime>('overtime');
        this.payments = this.db.list<Payment>('payment');
    }

   allParents()
   {
       return this.parents.valueChanges();
   }

    addParent(p : Parent)
    {
        return this.parents.push(p)
    }

    addMaid(m : Maid)
    {
        return this.maids.push(m);
    }

    getParent(key : string)
    {
        const p = this.db.object<Parent>(`parent/${key}`)
        return p.valueChanges();
        // return p;
    }

    getParentByUserId(userId : string)
    {
         return this.db.list<Parent>('parent',ref=>  ref.orderByChild("user_id").equalTo(userId)).valueChanges();
    }
    
    getMaidByUserId(userId : string)
    {
         return this.db.list<Maid>('maid',ref=>  ref.orderByChild("user_id").equalTo(userId)).valueChanges();
    }


    allMaids()
    {
        return this.maids.valueChanges();
    }

    allJobs()
    {
        return this.jobs.valueChanges();
    }

    addJob(j:Job)
    {
        return this.jobs.push(j);
    }
 
    findJobByParentId(id: string)
    {
        return this.db.list<Job>('job',ref =>ref.orderByChild("parent_id").equalTo(id)).valueChanges();
    }

    fingJobByMaidId(id: string)
    {
        return this.db.list<Job>('job',ref =>ref.orderByChild("parent_id").equalTo(id)).valueChanges();
    }

    findJobById(id: string)
    {
        return this.db.list<Job>('job', ref=> ref.orderByKey().equalTo(id)).valueChanges();
    }

    addPayment(p: Payment)
    {
        return this.payments.push(p);
    }
}