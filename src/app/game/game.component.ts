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
import { Firestore, collection } from '@angular/fire/firestore'

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, DialogAddPlayerComponent, GameDescriptionComponent, MatCardModule]
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  public game: Game = new Game();
  dialogRef: any;

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    this
    .firestore
    .collection(this.firestore, 'games')
    .valueChanges()
    .subscribe((game:String) => {
      console.log('Game update', game)
    });
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (this.game && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
      this.game.players.push(name);
      }
    }); 
  }


}
