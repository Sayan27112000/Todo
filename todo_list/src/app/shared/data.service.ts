import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { List } from '../model/list'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //Add List
  addItem(list: any) {
    list.id = this.afs.createId();
    return this.afs.collection('/List').add(list);
  }

  //Get List Data
  getListData(){
    return this.afs.collection('/List').snapshotChanges();
  }

  //Get List Data By ID
  getListDataByID(id:any){
    return this.afs.collection('List').doc(id).snapshotChanges();
  }

  //Update List Data By ID
  updateListDataByID(id:any, obj: any){
    return this.afs.doc('/List/'+ id).update(obj);
  }

  //Delete Data
  deleteListData(id: any) {
    return this.afs.collection('List').doc(id).delete();
  }


}
