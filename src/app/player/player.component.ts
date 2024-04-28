import { Component, Input } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [DialogAddPlayerComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})

export class PlayerComponent {
  game: any;
  @Input() name: string | undefined;
  @Input() isMale: boolean = true;
  @Input() playerActive: boolean = false;
  imgUrl: string = '';
  
  ngOnInit(){
    this.updateImage();
  }

  ngOnChanges(){
    this.updateImage();
  }

  updateImage() {
    if(this.isMale){
       this.imgUrl = 'male-player1.jpg';
    } else {
       this.imgUrl = 'female-player1.jpg';
    }
  }
}
