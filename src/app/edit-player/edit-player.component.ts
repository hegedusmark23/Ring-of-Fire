import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){

  }
  allProfilePictures = ['female-player1.jpg','female-player2.jpg','male-player1.jpg','male-player2.jpg']

}
