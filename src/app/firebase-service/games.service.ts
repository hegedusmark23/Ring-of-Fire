import { Injectable, inject } from '@angular/core';
import { GameStructure } from '../interfaces/gameStructure';
import { Firestore, collection, onSnapshot, doc, addDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  game!: GameStructure;
  currentDocId!: string;
  firestore: Firestore = inject(Firestore);

  constructor() { 
  }

  setGameObject(object: any): GameStructure {
    return {
      players: object.players,
      stack: object.stack,
      playCard: object.playCard,
      currentPlayer: object.currentPlayer,
      pickCardAnimation: object.pickCardAnimation,
      drawnCard: object.drawnCard
    }
  }

  async updateGame(game: GameStructure, id: string) {
    await updateDoc(this.getSingleDocRef('games', id), this.getCleanJSON(game)).catch(
      (err) => {console.log(err)}
    );
  }

  getCleanJSON(game: GameStructure): {} {
    return {
      players: game.players,
      stack: game.stack,
      playCard: game.playCard,
      currentPlayer: game.currentPlayer,
      pickCardAnimation: game.pickCardAnimation,
      drawnCard: game.drawnCard
    }
  }

  async addGame(game: any) {
    await addDoc(this.getGamesRef(), this.setGameObject(game)).catch(
      (err) => {console.log(err)}
    ).then(
      (docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.currentDocId = docRef!.id;
      }
    );
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async getSingleDocData(colId: string, docId: string) {
    let docData = await getDoc(this.getSingleDocRef(colId, docId));
    return docData.data();
  }

  subSingleDoc(colId: string, docId: string) {
    return onSnapshot(this.getSingleDocRef(colId, docId), (doc) => {
      this.game = this.setGameObject(doc.data());
    });
  }
}