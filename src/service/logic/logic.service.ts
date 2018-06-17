import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Parent } from '../../model/parent';
import { Maid } from '../../model/maid';
import { Job } from '../../model/job';
import { Case } from '../../model/case';
import { Overtime } from '../../model/overtime';
import { query } from "@angular/core/src/render3/instructions";

@Injectable()
export class Logic
{
   public parents : AngularFireList<Parent>;
   public maids : AngularFireList<Maid>;
   public jobs : AngularFireList<Job>;
   public cases : AngularFireList<Case>;
   public overtime : AngularFireList<Overtime>;


   public parent:any;

    constructor(private db:AngularFireDatabase)
    {
        this.parents = this.db.list<Parent>('parent');
        this.maids = this.db.list<Maid>('maid');
        this.jobs = this.db.list<Job>('parent');
        this.cases = this.db.list<Case>('parent');
        this.overtime = this.db.list<Overtime>('parent');
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
         return this.db.list<Parent>('parent',
        ref=>  ref.orderByChild("user_id").equalTo(userId)
        ).valueChanges();
    }
    getMaidByUserId(userId : string)
    {
         return this.db.list<Maid>('maid',
        ref=>  ref.orderByChild("user_id").equalTo(userId)
        ).valueChanges();
    }



    allMaids()
    {
        return this.maids.valueChanges();
    }
 
}