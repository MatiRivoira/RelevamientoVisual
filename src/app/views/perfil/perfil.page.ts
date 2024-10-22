import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isLoading: boolean = false;
  photos: any[] = [];

  auth = inject(AuthService);
  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.photos = [];

    // Load photos from 'lindas' collection
    this.firestoreService.getDocumentsWhere('lindas', 'user', this.auth.getUser().user.email).subscribe(
      (data: any[]) => {
        this.photos = this.photos.concat(data);
      },
      error => {
        console.error('Error al cargar fotos de lindas:', error);
      }
    );

    // Load photos from 'feas' collection
    this.firestoreService.getDocumentsWhere('feas', 'user', this.auth.getUser().user.email).subscribe(
      (data: any[]) => {
        this.photos = this.photos.concat(data);
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar fotos de feas:', error);
      }
    );
  }
}
