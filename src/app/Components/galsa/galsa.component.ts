import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-galsa',
  templateUrl: './galsa.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./galsa.component.scss']
})
export class GalsaComponent {

  listOfPrizoners: Prizenor[] = []
  display: boolean = false
  display2: boolean = false
  selectedPrizenoer: Prizenor = {} as Prizenor
  currentDate: string;
  constructor(private datePipe: DatePipe , private api: ApiService) { 
    this.currentDate =this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'Africa/Cairo') ?? ''
  }
  
  ngOnInit(): void {
    this.GetAllData()
  }
  

  GetAllData() {
    this.api.GetAllPrizoners().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listOfPrizoners = data
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
        })
      }
    })
  }

  formatedFun(date: string) {
    return new Date(date).toLocaleDateString('ar', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  SetRule(i: number) {
  if (i == 2) {
      this.display = false
      this.display2 = true
    }
    else if (i == 3) {
      this.display = false

    }
  }
  updateDate(date: string) {
    // this.selectedPrizenoer.galsaDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss')??''
    // this.api.UpdatePrizoner(this.selectedPrizenoer).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.display2 = false
    //     this.display = false
    //     this.ngOnInit()
    //     Swal.fire({
    //       icon: 'success',
    //       text: 'تمت نقل النزيل بنجاح الي قائمة الجهات الخارجية',
    //     })

    //   },
    //   error: (err) => {
    //     console.log(err);
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'لقد حدث خطا ما برجاء المحاولة مرة اخرى',
    //     })
    //   }
    // })
  }
}
