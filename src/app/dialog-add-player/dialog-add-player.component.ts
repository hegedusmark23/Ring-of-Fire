import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  @Output() isMaleChanged = new EventEmitter<boolean>();

  isMale: boolean = true;  
  name:string = '';
  dialogRef: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Method to toggle isMale
  toggleIsMale(value: boolean) {
    this.isMale = value;
    this.isMaleChanged.emit(this.isMale);
  }

}
