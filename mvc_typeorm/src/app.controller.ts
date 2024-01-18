import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private readonly employees = [
    {
      sn: 1,
      name: 'Prakash Banjade',
      address: 'NYC',
      role: 'CEO',
      contact: 'prakash@gmail.com'
    },
    {
      sn: 2,
      name: 'Salman Khan',
      address: 'Mumbai',
      role: 'Brand Ambassador',
      contact: 'singleForever@gmail.com',
    },
    {
      sn: 3,
      name: 'Chris Evans',
      address: 'LA',
      role: 'Marketing Agent',
      contact: 'mrPerfect@gmail.com'
    }
  ]
  private readonly headings = Object.keys(this.employees[0])

  @Get()
  @Render('index')
  root() {
    return { title: 'Employees', employees: this.employees, headings: this.headings }
  }
}
