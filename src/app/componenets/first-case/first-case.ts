import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-case',
  imports: [CommonModule],
  templateUrl: './first-case.html',
  styleUrl: './first-case.scss'
})
export class FirstCase implements OnInit, AfterViewInit {
  private heroImage!: HTMLElement;
  private isMobile = false;
  constructor(private router: Router) {}
  ngOnInit() {
    console.log('Project detail page loaded');
    this.checkMobile();
  }

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
    if (this.heroImage) {
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
  
navigateToContact() {
  this.router.navigate(['/']).then((navigationSuccessful) => {
    if (navigationSuccessful) {
      // Wait for page to fully render
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          // Fallback: scroll to bottom
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 300); // Increased timeout to ensure page is fully loaded
    }
  }).catch((error) => {
    console.error('Navigation error:', error);
    // Fallback scroll
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  });
}

  navigateToOurWork() {
    this.router.navigate(['/our-work']);
  }

  // Add these properties to your class
showModal = false;
currentImageIndex = 0;

galleryImages = [
  {
    thumbnail: 'living_room.png',
    full: 'living_room.png',
    title: 'Living Room',
    description: 'Open-plan living area with period features and contemporary design'
  },
  {
    thumbnail: 'https://placehold.co/800x600/1f2937/ffffff?text=Kitchen',
    full: 'https://placehold.co/1920x1080/1f2937/ffffff?text=Kitchen+Full',
    title: 'Kitchen',
    description: 'Custom-designed kitchen with period-appropriate details'
  },
  {
    thumbnail: 'https://placehold.co/800x600/1f2937/ffffff?text=Master+Bedroom',
    full: 'https://placehold.co/1920x1080/1f2937/ffffff?text=Master+Bedroom+Full',
    title: 'Master Bedroom',
    description: 'Spacious bedroom with custom built-in storage solutions'
  },
  {
    thumbnail: 'https://placehold.co/800x600/1f2937/ffffff?text=Bathroom',
    full: 'https://placehold.co/1920x1080/1f2937/ffffff?text=Bathroom+Full',
    title: 'Bathroom',
    description: 'Luxurious bathroom suite with contemporary fixtures'
  },
  {
    thumbnail: 'https://placehold.co/800x600/1f2937/ffffff?text=Dining+Area',
    full: 'https://placehold.co/1920x1080/1f2937/ffffff?text=Dining+Area+Full',
    title: 'Dining Area',
    description: 'Elegant dining space with original architectural details'
  },
  {
    thumbnail: 'https://placehold.co/800x600/1f2937/ffffff?text=Study',
    full: 'https://placehold.co/1920x1080/1f2937/ffffff?text=Study+Full',
    title: 'Study',
    description: 'Quiet workspace with bespoke joinery and natural light'
  }
];

get currentImage() {
  return this.galleryImages[this.currentImageIndex];
}

// Add these methods to your class
openImageModal(index: number) {
  this.currentImageIndex = index;
  this.showModal = true;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

closeImageModal() {
  this.showModal = false;
  document.body.style.overflow = ''; // Restore scrolling
}

nextImage() {
  if (this.currentImageIndex < this.galleryImages.length - 1) {
    this.currentImageIndex++;
  }
}

previousImage() {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
  }
}

// Keyboard navigation
@HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  if (this.showModal) {
    if (event.key === 'Escape') {
      this.closeImageModal();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
  }
}

}