import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

   constructor(private router: Router) {}
   isScrolled = false;

  navigateToContact() {
    const scrollToContact = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    if (this.router.url === '/') {
      scrollToContact();
    } else {
      this.router.navigate(['/']).then((navigationSuccessful) => {
        if (navigationSuccessful) {
          setTimeout(scrollToContact, 300);
        }
      }).catch(() => scrollToContact());
    }
  }

  navigateToHome(){
    const scrollToHero = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    };

    if (this.router.url === '/') {
      scrollToHero();
    } else {
      this.router.navigate(['/']).then((navigationSuccessful) => {
        if (navigationSuccessful) {
          setTimeout(scrollToHero, 300);
        }
      }).catch(() => scrollToHero());
    }
  }
}