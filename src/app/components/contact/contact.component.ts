import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit  {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.contact.name && this.contact.email && this.contact.subject && this.contact.message) {
      // Handle the form submission here
      console.log('Form Submitted!', this.contact);
      alert('Thank you for contacting us!');
      // Reset form
      this.contact = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
}