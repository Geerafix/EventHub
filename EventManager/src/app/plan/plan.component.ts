import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plan } from '../models/Plan';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule,
            FormsModule
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})

export class PlanComponent {
  @Input() eventPlan: Plan[] | undefined;
}
