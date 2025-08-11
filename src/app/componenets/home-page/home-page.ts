import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
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
export class HomePageComponent implements OnInit, AfterViewInit {
  
  private heroImage!: HTMLElement;
  private isMobile = false;
  
  // Hero animation properties
  private heroSection!: HTMLElement;
  private animationTargets!: NodeListOf<HTMLElement>;
  private heroAnimationTriggered = false;

  contactData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isScrolled = false;
  
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
      icon: 'fa-solid fa-screwdriver-wrench',
      title: 'Supervision',
      description: 'Expert supervision services to ensure your renovation project runs smoothly and meets the highest standards.'
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateOnScroll();
    this.checkScroll();
    
    // Loading animation logic
    const VISIT_THRESHOLD = 60 * 60 * 1000; // 1 hour in milliseconds
    const lastVisit = localStorage.getItem('lastVisitAlexandrinos');
    const now = new Date().getTime();
    
    if (!lastVisit || (now - parseInt(lastVisit)) > VISIT_THRESHOLD) {
      localStorage.setItem('lastVisitAlexandrinos', now.toString());
      window.addEventListener('load', () => {
        this.hideLoading();
      });
      setTimeout(() => {
        this.hideLoading();
      }, 3000);
    } else {
      this.hideLoadingImmediately();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initElements();
      this.initHeroAnimation(); // Initialize hero animation after view is ready
    }, 100);
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private initElements() {
    this.heroImage = document.querySelector('.hero-image') as HTMLElement;
  }

  // Initialize hero section animation elements
  private initHeroAnimation() {
    this.heroSection = document.getElementById('hero') as HTMLElement;
    if (this.heroSection) {
      this.animationTargets = this.heroSection.querySelectorAll('.animate-scroll-target');
    }
    
    // Trigger animation check once on load
    this.handleHeroScroll();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }
  
  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowScroll() {
    this.checkScroll();
    this.handleHeroScroll(); // Check for hero animation on scroll
    
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

  // Check if hero section is in viewport and trigger animations
  private handleHeroScroll() {
    // If animation already triggered, skip
    if (this.heroAnimationTriggered || !this.heroSection || !this.animationTargets) {
      return;
    }

    // Check if hero section is in viewport
    if (this.isElementInViewport(this.heroSection)) {
      // Add scrolled class for background zoom effect
      this.heroSection.classList.add('scrolled');
      
      // Animate each target element
      this.animationTargets.forEach((target, index) => {
        if (this.isElementInViewport(target)) {
          // Add staggered delays (100ms, 300ms, 500ms)
          const delay = 100 + (index * 200);
          setTimeout(() => {
            target.classList.add('animate-scroll-fadeInUp');
          }, delay);
        }
      });
      
      // Mark animation as triggered
      this.heroAnimationTriggered = true;
    }
  }

  // Check if element is in viewport (75% threshold)
  private isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight * 0.75 || document.documentElement.clientHeight * 0.75)
    );
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
    return 'https://maps.app.goo.gl/nFMSr4h95yfv5HPK8  ' + encodeURIComponent(address);
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
}