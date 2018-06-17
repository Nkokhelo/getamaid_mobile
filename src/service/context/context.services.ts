// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Injectable } from "@angular/core";
// import { Parent } from '../../model/parent';
// import { Maid } from '../../model/maid';
// import { Job } from '../../model/job';
// import { Case } from '../../model/case';
// import { Overtime } from '../../model/overtime';
// import { Observable } from 'rxjs';


// @Injectable()
// export class Context
// {
//     parentCollection: AngularFirestoreCollection<Parent>;
//     parents: Observable<Parent[]>

//     constructor(private afs: AngularFirestore) 
//     {
//       this.parentCollection = this.afs.collection<Parent>('parent');
//       this.parents = this.parentCollection.valueChanges();
//     }

//     allParents()
//     {
//         return this.parents;
//     }
// }