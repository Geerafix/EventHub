import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/Event';

@Pipe({
  name: 'searchByDate',
  standalone: true,
})
export class SearchByDatePipe implements PipeTransform {
  transform(value: Event[], startDate?: string, endDate?: string): Event[] {
    if (!startDate || !endDate) {
      return value;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return value.filter(event => {
      const eventStart = new Date(event._data_rozpoczecia);
      const eventEnd = new Date(event._data_zakonczenia);

      return eventStart >= start && eventEnd <= end;
    });
  }
}