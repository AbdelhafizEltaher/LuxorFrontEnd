import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent {

  @ViewChild('content', { static: false }) el!: ElementRef
  arr: any = []
  BtnPrint = false
  date = new Date()
  user:string = localStorage.getItem('username')??""
  selectedPresioner : Prizenor={ } as Prizenor
  imageUrl:any
  constructor( private activeRouter : ActivatedRoute , private api : ApiService , private sentiser : DomSanitizer) { }
  ngOnInit(): void {
    let id = this.activeRouter.snapshot.paramMap.get('data') ?? '0'


     this.api.GetPrizonersById(+id).subscribe({
      next:(data:any)=>{
        this.selectedPresioner = data
        console.log( this.selectedPresioner);
        console.log(data.imgUrl);
        this.imageUrl = this.sentiser.bypassSecurityTrustUrl(data.imgUrl)
        this.imageUrl = 'https://localhost:7168/'+data.imgUrl
        
      },
      error:(err)=>{
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
        })
      }
     })
    }
  async SavePDf() {
    this.BtnPrint = true
    await setTimeout(() => {
      window.print()
      this.BtnPrint = false
    }, 1000);


  }
}


