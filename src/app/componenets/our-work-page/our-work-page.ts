import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-work-page',
  imports: [CommonModule],
  templateUrl: './our-work-page.html',
  styleUrl: './our-work-page.scss'
})
export class OurWorkPage {
// Add this to your existing properties
projects = [
  {
    id: 1,
    title: 'Modern Kitchen Renovation',
    category: 'Kitchen',
    description: 'Complete transformation of a traditional kitchen into a modern culinary masterpiece.',
    image: 'kitchen.png',
 
  },
  {
    id: 2,
    title: 'Luxury Bathroom Suite',
    category: 'Bathroom',
    description: 'Spa-like bathroom renovation with premium materials and smart technology integration.',
    image: 'bathroom.png',
  
  },
  {
    id: 3,
    title: 'Contemporary Living Room',
    category: 'Living Space',
    description: 'Open-concept living area with custom built-ins and smart home automation.',
    image: 'living_room.png',
   
  },
  {
    id: 4,
    title: 'Minimalist Bedroom Design',
    category: 'Bedroom',
    description: 'Serene bedroom retreat with custom storage solutions and ambient lighting.',
    image: 'bedroom.png',

  },
  {
    id: 5,
    title: 'Outdoor Terrace Transformation',
    category: 'Outdoor',
    description: 'Complete outdoor living space with dining area and entertainment zone.',
    image: 'balcony.png',
   
  },
  {
    id: 6,
    title: 'Home Office Renovation',
    category: 'Office',
    description: 'Productive workspace with ergonomic design and acoustic solutions.',
    image: 'office.png',

  }
];

// Add this method for viewing projects
viewProject(project: any) {
  console.log('Viewing project:', project);
  // Implement project detail view logic here
}
}
