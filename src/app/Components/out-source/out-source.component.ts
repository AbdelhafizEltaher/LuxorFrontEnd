import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Prizenor } from 'src/app/Models/Prisoner';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-out-source',
  templateUrl: './out-source.component.html',
  providers: [DatePipe], // add DatePipe to the providers array
  styleUrls: ['./out-source.component.scss']
})
export class OutSourceComponent {

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
    this.api.GetAllOutSourcePrizoners().subscribe({
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

}
