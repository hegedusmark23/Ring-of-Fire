import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, DialogAddPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  public game: Game = new Game();
  dialogRef: any;
  @Input() isMale: boolean | undefined;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (this.game && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      console.log('New card:', this.currentCard);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
    }); 
  }


}
