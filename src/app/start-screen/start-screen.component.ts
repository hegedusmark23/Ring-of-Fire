import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from 'firebase/firestore';
import { Game } from '../../models/game';
import { GamesService } from '../firebase-service/games.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  public game: Game = new Game();
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private gameService: GamesService) {

  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  async newGame() {
    this.game = new Game();
    await this.gameService.addGame(this.game);
    this.router.navigateByUrl('/game/' + this.gameService.currentDocId);
  }
    
  }

