const { createApp } = Vue

// Paste the script part of your App.vue here, wrapped in a component
const app = createApp({
  data() {
    return {
      // Your data from App.vue
      currentYear: 1999,
      isUnblurred: false,
      loadingComplete: false,
      yearInterval: null,
      
      // Slider text
      sliderText: "WELCOME!",
      textOptions: [
        "COMPUTER\nENTHUSIAST",
        "GRAPHICS DESIGNER\nVFX",
        "A.i TECH\nEXPLORER 010",
        "WEB DESIGN +\nDEVELOPER",
        "PRIVACY FOCUSED\nMODE",
        "DIGITAL MUSIC\nCREATOR",
        "CASUAL GAMER\nGG + OG",
        "FREELANCE\nVIDEO EDITOR"
      ],
      currentTextIndex: 0,
      textInterval: null,
      
      // Overlays
      activeOverlay: null,
      notificationPanelVisible: false,
      
      // Drawing
      isDrawing: false,
      
      // Services data
      services: [
        { name: "Graphic Design", description: "A.i Photo editing, Logo/Banner/Thumbnails/Product label/Social media promotional Post Designs", price: "149 - 849" },
        { name: "Video Editing", description: "Youtube video editing and intro/outro design or cover song mix", price: "449 - 2499" },
        { name: "Web Development", description: "Building Static Portfolio Sites with Html5,CSS,JS. Converting sites to Android App . Provides Hosting Advice and Site Optimisation", price: "749 - 4999" },
        { name: "Resume Making", description: "ATS compatible or modern design resume", price: "175 - 240" },
        { name: "Computer Troubleshoot", description: "Diagnose computer related problem and try to find solution, pc build advice", price: "FREE" }
      ]
    };
  },
  mounted() {
    // Your mounted code from App.vue
    this.startYearTimer();
    document.addEventListener('mousedown', this.startDrawing);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.stopDrawing);
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('contextmenu', this.disableRightClick);
    
    // Add heart animation on donate button hover
    const donateButton = document.querySelector('.widget-image');
    if (donateButton) {
      donateButton.addEventListener('mouseenter', this.createHearts);
    }
    
    // Initial blur effect for the image grid
    setTimeout(() => {
      const imageGrid = document.querySelector('.slider');
      if (imageGrid) {
        imageGrid.style.filter = 'blur(5px)';
        imageGrid.style.opacity = '0.5';
        
        setTimeout(() => {
          imageGrid.style.transition = 'filter 1s ease-out, opacity 1s ease-out';
          imageGrid.style.filter = 'blur(0px)';
          imageGrid.style.opacity = '1';
        }, 500);
      }
    }, 100);
  },
  beforeUnmount() {
    // Your beforeUnmount code from App.vue
    clearInterval(this.yearInterval);
    clearInterval(this.textInterval);
    document.removeEventListener('mousedown', this.startDrawing);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.stopDrawing);
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('contextmenu', this.disableRightClick);
    
    // Remove heart animation event listener
    const donateButton = document.querySelector('.widget-image');
    if (donateButton) {
      donateButton.removeEventListener('mouseenter', this.createHearts);
    }
  },
  methods: {
    // All your methods from App.vue
    // ...
  },
  template: `
    <!-- Paste the template part of your App.vue here -->
  `
})

app.mount('#app')
