import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePageComponent implements OnInit {
  isScrolled = false;
  contactData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
 constructor(private router: Router) {}
  // Make sure services data is properly defined
  services = [
    {
      icon: 'fas fa-home',
      title: 'Full Home Renovations',
      description: 'Complete transformation of your living space with modern design and premium materials.'
    },
    {
      icon: 'fa-solid fa-cube',
      title: '3D Design',
      description: 'Our 3D design service lets you visualize your renovation before work begins, with detailed, realistic models tailored to your space.'
    },
    {
      icon: 'fas fa-bath',
      title: 'Bathroom Upgrades',
      description: 'Luxurious bathroom renovations with premium fixtures and contemporary design.'
    }
  ];

  stats = [
    { value: '18+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  contactInfo = [
    { icon: 'fas fa-map-marker-alt', title: 'Location', value: 'El. Venizelou 15, Alexandroupoli' },
    { icon: 'fas fa-phone', title: 'Phone', value: '+30 210 123 4567' },
    { icon: 'fas fa-envelope', title: 'Email', value: 'info@alexandrinos.gr' }
  ];

  ngOnInit() {
    this.animateOnScroll();
    this.checkScroll();
     // Hide loading animation after page loads
    window.addEventListener('load', () => {
      this.hideLoading();
    });
    // Fallback in case load event doesn't fire
    setTimeout(() => {
      this.hideLoading();
    }, 3000);
    // Debug: Log to check if component is loading
    console.log('HomePageComponent initialized');
    console.log('Services data:', this.services);
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowScroll() {
    this.checkScroll();
    
    // Parallax effect for hero image - only on desktop
    if (window.innerWidth > 768) {
      const scrollPosition = window.scrollY;
      const heroImage = document.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    } else {
      // Reset transform on mobile to ensure visibility
      const heroImage = document.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = 'none';
      }
    }
  }

  private checkScroll() {
    this.isScrolled = window.scrollY > 10;
  }

   hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('loaded');
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 500);
    }
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  navigateToOurWork() {
    this.router.navigate(['/our-work']);
  }

  animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Use setTimeout to ensure DOM is fully loaded
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        observer.observe(element);
      });
    }, 100);
  }

  onSubmit() {
    console.log('Form submitted:', this.contactData);
    alert('Thank you for your message! We will contact you soon.');
    this.contactData = { name: '', email: '', phone: '', message: '' };
  }
  getGoogleMapsLink(address: string): string {
  return 'https://maps.app.goo.gl/nFMSr4h95yfv5HPK8' + encodeURIComponent(address);
}

}