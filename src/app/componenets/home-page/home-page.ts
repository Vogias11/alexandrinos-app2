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
  
  private heroImage!: HTMLElement;
  private isMobile = false;
  // constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initElements();
    }, 100);
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private initElements() {
    this.heroImage = document.querySelector('.hero-image') as HTMLElement;
  }

// Remove or comment out the duplicate scroll handlers and keep only one:
@HostListener('window:scroll')
@HostListener('window:resize')
onWindowEvents() {
  this.checkMobile();
  if (!this.isMobile) {
    this.handleScroll();
  }
}

private handleScroll() {
  const scrollY = window.scrollY;
  
  // Parallax effect for hero image (only on desktop)
  if (this.heroImage && !this.isMobile) {
    const parallaxSpeed = 0.3;
    const yPos = -(scrollY * parallaxSpeed);
    this.heroImage.style.transform = `translate3d(0, ${yPos}px, 0)`;
  }
  
  // Fade effect for hero overlay
  const heroOverlay = document.querySelector('.hero-overlay') as HTMLElement;
  if (heroOverlay) {
    const windowHeight = window.innerHeight;
    const fadeStart = 0;
    const fadeUntil = windowHeight * 0.5;
    const opacity = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeUntil - fadeStart)));
    heroOverlay.style.opacity = (0.7 + opacity * 0.3).toString();
  }
}

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }
  
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

    const VISIT_THRESHOLD =  60 * 60 * 1000; // 1 hour in milliseconds

    // Check if this is the first visit or if enough time has passed
    const lastVisit = localStorage.getItem('lastVisitAlexandrinos');
    const now = new Date().getTime();
    
    if (!lastVisit || (now - parseInt(lastVisit)) > VISIT_THRESHOLD) {
      // First visit or enough time has passed - show loading animation
      localStorage.setItem('lastVisitAlexandrinos', now.toString());
      
      // Hide loading animation after page loads
      window.addEventListener('load', () => {
        this.hideLoading();
      });
      
      // Fallback in case load event doesn't fire
      setTimeout(() => {
        this.hideLoading();
      }, 3000);
    } else {
      // Recent visit - hide loading immediately
      this.hideLoadingImmediately();
    }

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
  
  hideLoadingImmediately() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
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