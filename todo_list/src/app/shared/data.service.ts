import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { List } from '../model/list'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //Add List
  addItem(List: List) {
    List.id = this.afs.createId();
    return this.afs.collection('/List').add(List);
  }

  //Get List Data
  getLsitData(){
    return this.afs.collection('/List').snapshotChanges();
  }

  //Delete Data
  deleteListData(List : List) {
    return this.afs.doc('/List'+List.id).delete();
  }

  //Update Data
  updateItem(List : List){
    this.deleteListData(List);
    this.addItem(List);
  }
}
