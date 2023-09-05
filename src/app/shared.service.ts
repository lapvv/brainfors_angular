import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, updateDoc, Firestore} from "@angular/fire/firestore";
import {User} from "./types";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore) { }

  getUsers(){
    let usersCollection = collection(this.fs, 'users');
    return collectionData(usersCollection,{idField: 'id'})
  }

  addUser(user: User){
    let usersCollection = collection(this.fs, 'users');
    return addDoc(usersCollection, user);
  }

  editUser(id: number, user: User){
    // @ts-ignore
    let docInstance = doc(this.fs, 'users', id)
    // const updateData = {
    //   name: 'updatedName',
    //   age: 'updatedAge',
    //   occupation: 'updatedOccupation'
    // }
    return updateDoc(docInstance, user);
  }

  deleteUser(id: number){
    let docRef = doc(this.fs, 'users/'+id)
    return deleteDoc(docRef);
  }
}
