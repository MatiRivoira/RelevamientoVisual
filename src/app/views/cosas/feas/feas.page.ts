import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { PhotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-feas',
  templateUrl: './feas.page.html',
  styleUrls: ['./feas.page.scss'],
})
export class FeasPage implements OnInit, OnDestroy {
  isLoading: boolean = false;
  photos: any[] = [];
  datosfoto:any;
  userVotes: any;
  constructor(private firestore: AngularFirestore,private photoService: PhotoService, private authService:AuthService) {}

  async ngOnInit() {
    this.photoService.setUser(this.authService.getUser());

    this.isLoading = true;
    
    // Carga los votos del usuario
    this.userVotes = await this.photoService.loadUserVotes();
  
    // Obtiene los datos de Firestore
    this.firestore.collection('feas', ref => ref.orderBy('date', 'desc')).snapshotChanges().subscribe(data => {
      this.photos = data.map(e => ({
        id: e.payload.doc.id,
        ...e.payload.doc.data() as any
      }));
      this.photos.sort((a, b) => b.date - a.date);

      // Una vez que se han cargado los datos, desactiva isLoading
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.photoService.clearUser();
  }

  async takePhoto() {
    this.isLoading = true; // Activa isLoading mientras se toma y carga la foto
    
    try {
      this.datosfoto = await this.photoService.takePhoto("lindas");
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    } finally {
      this.isLoading = false; // Desactiva isLoading después de que se toma y carga la foto
    }
  }
  

  async likeFoto(idFoto:string){
    this.photoService.voteForPhoto(idFoto, "feas");
    this.userVotes = await this.photoService.loadUserVotes();
  }

  voto(idphoto:string): boolean {
    if (this.userVotes) {
      return this.userVotes[`${idphoto}_${this.photoService.user.user.uid}`];
    } else {
      return false; // El usuario no ha votado por esta imagen
    }
  }
}
