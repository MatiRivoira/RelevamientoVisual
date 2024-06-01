import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stats-feas',
  templateUrl: './stats-feas.page.html',
  styleUrls: ['./stats-feas.page.scss'],
})
export class StatsFeasPage implements OnInit, OnDestroy {
  barChar: any;
  photosData: any = [];
  likesData: any = [];
  photoNames: any = [];
  isLoading: boolean = false;

  constructor(private router: Router, private firestore: FirestoreService) { }
  
  redirectTo(url: string){
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.isLoading = true;
    this.firestore.getDocuments('lindas').subscribe((data)=>{
      this.photosData = data;
      this.likesData = this.photosData.map((photo:any) => {
          return photo.votes;
      });
      this.photoNames = this.photosData.map((photo:any) => photo.user);
      this.createBarChart(this.photosData);  
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.barChar) {
      this.barChar.destroy();
    }
  }

  createBarChart(fotos:any) {
    if (this.barChar) {
      this.barChar.destroy();
    }
    this.barChar = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.photosData.map((p:any) => ''),
        datasets: [{
            label: '',
            data: this.likesData,
            backgroundColor: [
              '#21A6E5', '#063752', '#3C6C83','#282728', '#202B2C',
              '#00A1FD','#fcb7af','#fdf9c4','#ffe4e1','#b2e2f2','#ff6961'
            ],
            borderColor: [
              '#21A6E5', '#063752', '#3C6C83','#282728', '#202B2C',
              '#00A1FD','#fcb7af','#fdf9c4','#ffe4e1','#b2e2f2','#ff6961'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: {
            display: false,
          },
          x: {
            grid: {
              color: '#555555',
            },
            ticks: {
              color: 'rgb(0,0,0)',
              font: {
                weight: 'bold',
              }
            },
          },
        },
        layout: {
          padding: 20,
        },
        plugins: {
          tooltip: {
            usePointStyle: true,
            borderColor: '#C5DB8F',
            borderWidth: 3,
            boxHeight: 130,
            boxWidth: 130,
            cornerRadius: 8,
            displayColors: true,
            bodyAlign: 'center',
            callbacks: {
              //@ts-ignore
              labelPointStyle(context) 
              {
                const value = context.formattedValue;
                const nombre = fotos[context.dataIndex].user;
                context.label = `${value} dislikes - ${nombre}`;
                let image = new Image(120, 120);
                image.src = fotos[context.dataIndex].url;
                return{
                  pointStyle: image
                }
              },
            },
            legend: {
              display: false,
            },
          },
        },
      },
    });
  }

}
