import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from "../game-description/game-description.component";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, docData } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { doc, setDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, DialogAddPlayerComponent, GameDescriptionComponent, MatCardModule]
})
export class GameComponent implements OnInit {
  
  public game: Game = new Game();
  dialogRef: any;

  firestore: Firestore = inject(Firestore);
  game$!: Observable<any>
  gameId: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const gameDocRef = doc(this.firestore, 'games', this.gameId);
      this.game$ = docData(gameDocRef);
      this.game$.subscribe(game => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCard;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.game.player_images = game.player_images;
      });
    });
  }

getGamesRef(){
  return collection(this.firestore, 'games');
}

   newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (this.game && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
      this.game.players.push(name);
      this.game.player_images.push('male-player1');
      this.saveGame();
      }
    }); 
  }

  saveGame() {
    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    this.game$.subscribe(() => {
      setDoc(gameDocRef, this.game.toJson());
    });
  }

  editPlayer(playerId: number){
    console.log('Edit player:', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId,1)
        } else {
          console.log('Recived Change:', change);
          this.game.player_images[playerId] = change;
          this.saveGame();
        }
        this.saveGame();
      }
    }); 
  }

}
