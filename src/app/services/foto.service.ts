// src/app/services/photo.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { finalize, map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotoService  {

  user:any;

  setUser(user:any) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}



  async takePhoto(section:string) {

    
    const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      
      if (capturedPhoto.webPath) {
        // Si webPath no es undefined, procede con la carga
        fetch(capturedPhoto.webPath)
          .then(res => res.blob())
          .then(blob => {
            const imageBlob = new Blob([blob], { type: 'image/jpeg' }); // Asegura el tipo MIME correcto
            this.uploadImage(imageBlob, `${section}/${new Date().getTime()}_${this.user.user.id}.jpg`, section);
          });
      } else {
        console.error('No se pudo obtener el path de la imagen capturada.');
      }
  }
  
  uploadImage(blob: Blob, fileName: string, section: string) {
    const fileRef = this.storage.ref(fileName);
    const task = this.storage.upload(fileName, blob);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.firestore.collection(section).add({
            url,
            user: this.user.user.email,
            date: new Date(),
            votes: 0
          }).then(() => {
            console.log('Photo successfully saved!');
          }).catch(error => {
            alert(error);
          });
        });
      })
    ).subscribe();
  }

  hasUserVoted(photoId: string) {
    return this.firestore.collection('votes').doc(`${photoId}_${this.user.user.uid}`).get()
      .pipe(map(doc => doc.exists));
  }

  voteForPhoto(photoId: string, section: string) {
    this.hasUserVoted(photoId).subscribe(hasVoted => {
      if (!hasVoted) {
        const photoRef = this.firestore.collection(section).doc(photoId);
        photoRef.update({ votes: firebase.firestore.FieldValue.increment(1) });
        this.firestore.collection('votes').doc(`${photoId}_${this.user.user.uid}`).set({ voted: true });
      } else {
        console.log('El usuario ya ha votado por esta foto.');
      }
    });
  }

  async loadUserVotes(): Promise<any> {
    const votesSnapshot: any = await this.firestore.collection('votes').get().toPromise();
    const userId = this.user.user.uid;
    const userVotes: any = {};
    await Promise.all(votesSnapshot.docs.map(async (vote: any) => {
      const voteId = vote.id;
      userVotes[voteId] = voteId.includes(`_${userId}`);
    }));
    return userVotes;
  }
  
}
