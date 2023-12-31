import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EventDataService } from '../services/event-data.service';
import { Event } from '../models/Event';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AddPlanComponent } from '../add-plan/add-plan.component';
import { Plan } from '../models/Plan';
import { Participant } from '../models/Participant';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule,
            RouterLink,
            RouterLinkActive,
            RouterOutlet,
            FormsModule,
            ReactiveFormsModule,
            AddPlanComponent
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})

export class AddEventComponent implements OnInit {
  public eventPlan: Plan[] = [];
  public participants: Participant[] = [];
  public eventForm: FormGroup;
  public dbSize!: number;

  constructor(
    private router: Router,
    private eventDataService: EventDataService,) {

    this.eventForm = new FormGroup({
      nazwa: new FormControl('', [Validators.required,
                                  Validators.maxLength(30)]),

      rodzaj: new FormControl('', [Validators.required,
                                   Validators.maxLength(30)]),

      organizator: new FormControl('', [Validators.required,
                                        Validators.maxLength(30)]),

      miejsce: new FormControl('', [Validators.required,
                                    Validators.maxLength(30)]),

      max_ilosc_osob: new FormControl('', [Validators.required,
                                           Validators.max(10000)]),

      data_wydarzenia: new FormControl('', [Validators.required,
                                            this.validEventDate]),

      cena_biletu: new FormControl('', [Validators.required,
                                        Validators.min(0),
                                        Validators.max(1000)])
    });
  }

  ngOnInit() {
    this.eventDataService.getData().subscribe((events: Event[]) => {
      this.dbSize = events.length;
    });
  }

  back(): void { this.router.navigate(['/']); }

  addEventToEventList(): void {
    let newEvent = new Event(this.dbSize + 1,
                            this.eventForm.value.nazwa,
                            this.eventForm.value.rodzaj,
                            this.eventForm.value.organizator,
                            this.eventForm.value.miejsce,
                            this.eventForm.value.max_ilosc_osob,
                            new Date(this.eventForm.value.data_wydarzenia),
                            this.eventForm.value.cena_biletu,
                            this.eventPlan,
                            this.participants);

    this.eventDataService.postData(newEvent).subscribe();
    this.router.navigate(['']);
  }

  validEventDate(control: AbstractControl): ValidationErrors | null {
    return (new Date(control.value) < new Date()) ? { 'validEventDate': true } : null;
  }
}
