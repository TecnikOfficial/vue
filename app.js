const app = Vue.createApp({
  data() {
    return {
      // Loading screen
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
    // Loading screen methods
    startYearTimer() {
      const updateYear = () => {
        if (this.currentYear < 2025) {
          const delay = this.currentYear === 1999 ? 900 : 4000 / (2025 - 1999 + 1);
          setTimeout(() => {
            this.currentYear++;
            updateYear();
          }, delay);
        } else {
          this.fadeOutLoadingScreen();
        }
      };
      
      updateYear();
    },
    fadeOutLoadingScreen() {
      this.isUnblurred = true;
      setTimeout(() => {
        this.loadingComplete = true;
        this.startTextInterval();
      }, 1500);
    },
    
    // Text slider methods
    startTextInterval() {
      this.textInterval = setInterval(this.changeText, 3000);
    },
    changeText() {
      if (this.currentTextIndex < this.textOptions.length) {
        this.sliderText = this.textOptions[this.currentTextIndex];
        this.currentTextIndex++;
      } else {
        this.currentTextIndex = 0;
        this.sliderText = this.textOptions[0];
      }
    },
    
    // Navigation and overlay methods
    navigateTo(url) {
      window.location.href = url;
    },
    openOverlay(type) {
      this.closeAllOverlays();
      this.activeOverlay = type;
      
      if (type === 'donation') {
        this.createHearts();
      }
    },
    closeOverlay() {
      this.activeOverlay = null;
    },
    closeAllOverlays() {
      this.activeOverlay = null;
      this.notificationPanelVisible = false;
    },
    toggleNotificationPanel() {
      this.notificationPanelVisible = !this.notificationPanelVisible;
    },
    
    // Utility methods
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Discord username copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    },
    handleDonation(url) {
      // Create a temporary message element
      const messageElement = document.createElement('div');
      messageElement.style.position = 'fixed';
      messageElement.style.top = '40%';
      messageElement.style.left = '50%';
      messageElement.style.transform = 'translate(-50%, -50%)';
      messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      messageElement.style.color = 'white';
      messageElement.style.padding = '20px';
      messageElement.style.borderRadius = '10px';
      messageElement.style.zIndex = '200';
      messageElement.style.fontSize = '1.5rem';
      messageElement.style.fontWeight = 'bold';
      messageElement.innerText = "🤗Thanks so much for your support! It means a lot❤️";
      
      // Set width for mobile view
      if (window.innerWidth < 768) {
        messageElement.style.width = '70%';
      } else {
        messageElement.style.width = '450px';
      }
      
      // Append the message to the body
      document.body.appendChild(messageElement);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.open(url, '_blank');
        document.body.removeChild(messageElement);
      }, 2000);
    },
    
    // Drawing methods
    startDrawing(event) {
      this.isDrawing = true;
      this.handleMouseMove(event);
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    handleMouseMove(event) {
      if (this.isDrawing) {
        const drawingDot = document.createElement('div');
        drawingDot.classList.add('drawing');
        drawingDot.style.left = `${event.pageX}px`;
        drawingDot.style.top = `${event.pageY}px`;
        document.body.appendChild(drawingDot);
        
        // Remove the dot after 5 seconds
        setTimeout(() => {
          drawingDot.style.opacity = 0;
          setTimeout(() => {
            drawingDot.remove();
          }, 500);
        }, 5000);
      }
    },
    
    // Heart animation
    createHearts() {
      for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        
        // Set size based on screen width
        if (window.innerWidth < 768) {
          heart.style.fontSize = '20px';
        } else {
          heart.style.fontSize = '30px';
        }
        
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '0';
        document.body.appendChild(heart);
        
        // Remove heart after animation
        heart.addEventListener('animationend', () => {
          heart.remove();
        });
      }
    },
    
    // Event handlers
    handleOutsideClick(event) {
      // Close notification panel when clicking outside
      if (this.notificationPanelVisible) {
        const panel = document.getElementById('notification-panel');
        const bell = document.querySelector('.notification-bell');
        
        if (panel && bell && !panel.contains(event.target) && !bell.contains(event.target)) {
          this.notificationPanelVisible = false;
        }
      }
    },
    disableRightClick(e) {
      e.preventDefault();
    }
  }
template: `
  <div>
    <!-- Loading Screen -->
    <div id="loading-screen" :class="{ unblur: isUnblurred }" v-show="!loadingComplete">
      <div class="loading-content">
        <div id="year-timer">{{ currentYear }}</div>
      </div>
    </div>

    <div class="video-background">
      <video autoplay muted loop>
        <source src="https://tecnik.pages.dev/assets/media/video.webm" type="video/webm">
        Your browser does not support the video tag.
      </video>

      <!-- Main Content -->
      <div class="slider">
        <img 
          src="https://tecnik.pages.dev/assets/media/tecnikmain4.avif" 
          class="hover-image" 
          title="Click To Copy!" 
          alt="Main Image" 
          @click="copyToClipboard('tecnik.gg')"
        >
        <div class="text three-d" @click="changeText">{{ sliderText }}</div>
        <div class="button-container">
          <button class="glow-button" @click="navigateTo('https://tecnik.bio.link/')" title="📧Connect with Us">Contact</button>
          <button class="glow-button" @click="openOverlay('services')" title="💲Freelance">Services</button>
          <button class="glow-button" @click="openOverlay('projects')" title="✔️Completed & Delivered">Projects</button>
        </div>
        
        <!-- Iframe Container -->
        <div class="iframe-container">
          <iframe 
            scrolling="no" 
            id="hearthis_at_user_syncking" 
            width="100%" 
            height="350" 
            src="https://app.hearthis.at/syncking/embed/?hcolor=ba1010&css=&skin=black" 
            title="SyncKing" 
            frameborder="0" 
            allowtransparency
          ></iframe>
        </div>
      </div>

      <!-- Widget Container -->
      <div class="widget-container">
        <img 
          src="https://tecnik.pages.dev/assets/media/donate.webp" 
          class="widget-image" 
          title="TYSM❤️" 
          alt="Donate" 
          @click="openOverlay('donation')"
        >
      </div>

      <!-- Notification Bell -->
      <img 
        src="https://tecnik.pages.dev/assets/media/noti.webp" 
        class="notification-bell" 
        alt="Notification Bell" 
        @click="toggleNotificationPanel"
      >

      <!-- Notification Panel -->
      <div id="notification-panel" v-show="notificationPanelVisible">
        <div class="overlay-content">
          <p>• Are you subscribed to ▶️<a href="https://www.youtube.com/channel/UCXucwi4swKyTmCUB9RrFaQw?sub_confirmation=1" target="_blank">Tecnik Official</a>💻 ?</p><br>
          <p>• Are you subscribed to ▶️<a href="https://www.youtube.com/channel/UC35TPNUnNegZq4mBWvU0o7g?sub_confirmation=1" target="_blank">Syncking</a>🎵 ?</p><br>
          <p>• <a href="https://www.youtube-nocookie.com/embed/videoseries?list=PLzXDhbvRPJ1A33piKX-ss1zjNAVdqu4mM&loop=1&autoplay=1&modestbranding=1" target="_blank">CSGO Montage 😎</a></p><br>
          <p>• <a href="./oldtheme/1.0.html">Old Site 🐈 </a>• <a href="https://tecnikofficial.github.io/404">4🚫4</a></p>
        </div>
      </div>
    </div>

    <!-- Overlays -->
    <!-- Services Overlay -->
    <div id="table-overlay" class="overlay" v-show="activeOverlay === 'services'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2>Freelance Services</h2>
        <div class="table-scroll">
          <table>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price Range in (INR)</th>
            </tr>
            <tr v-for="(service, index) in services" :key="index">
              <td>{{ service.name }}</td>
              <td>{{ service.description }}</td>
              <td>{{ service.price }}</td>
            </tr>
          </table>
        </div>
        <br>
        <h4>Contact using Discord or Email📧: <a href="mailto:TecnikOfficial@Outlook.com">TecnikOfficial@Outlook.com</a></h4>
        <br>
        <p style="font-size: 15px;">Please note that the preferred payment method is UPI. Full refunds are only available for payments made via UPI. Payments made through PayPal or Stripe are not eligible for refunds.</p>
        <br><p style="font-size: 16px; text-align: center;"><strong>GIVE US FEEDBACK <a href="https://tellonym.me/tecnik">HERE😃</a></strong></p>
      </div>
    </div>

    <!-- Projects Overlay -->
    <div id="projects-overlay" class="overlay" v-show="activeOverlay === 'projects'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2 style="color: green; text-decoration: underline;">Worked as Lead:</h2>
        <br>
        <div class="scrolling-text">
          <span>
            Automotive (Social Media Marketing) | Agro Pvt Ltd (Product Label & Logo Design) | Music Distributor (Website Design) | Resume Design (Multiple Clients)
          </span>
          <span>
            Automotive (Social Media Marketing) | Agro Pvt Ltd (Product Label & Logo Design) | Music Distributor (Website Design) | Resume Design (Multiple Clients)
          </span>
        </div>
        <br>
        <h2 style="color: green; text-decoration: underline;">Collaborations:</h2>
        <br>
        <div class="scrolling-text">
          <span>Cover Song Channel (Mix & Mastering), Portfolio Websites (Art Showcase) , Gaming Channel (Montage Edits)</span>
          <span>Cover Song Channel (Mix & Mastering), Portfolio Websites (Art Showcase) , Gaming Channel (Montage Edits)</span>
        </div>
        <br><br>
        <h2 style="color: green; text-decoration: underline;">Currently Working On:</h2>
        <br>
        <span>Building WEB App (working along with doctor)</span>
        <br><br>
        <div class="expertise-text">
          <span style="font-weight: bold;">Expertise in Efficiency | Provides Value for Money Solutions</span>
        </div>
      </div>
    </div>

    <!-- Donation Overlay -->
    <div id="donation-overlay" class="overlay" v-show="activeOverlay === 'donation'" @click.self="closeOverlay">
      <div class="overlay-content">
        <span class="close-overlay" @click="closeOverlay">✖</span>
        <h2 style="color: green; text-align: center; text-decoration: underline; margin-bottom: 20px;">Choose Payment Method to Support</h2>
        <div class="button-container">
          <button class="glow-button" title="Thank" @click="handleDonation('https://upi2qr.in/pay?name=Tecnik+Official&upiId=tecnikpay-1@okaxis&description=Thank+You')">Google PAY</button>
          <button class="glow-button" title="you" @click="handleDonation('https://upi2qr.in/pay?name=Tecnik+Official&upiId=tecnik@upi&description=Thank+You')">₹ UPI</button>
          <button class="glow-button" title="for" @click="handleDonation('https://www.paypal.me/TecnikOfficial')">💲PayPal</button>
        </div>
        <div class="button-container">
          <button class="glow-button" title="your" @click="handleDonation('https://buymeacoffee.com/tecnik')">Buy me a☕</button>
          <button class="glow-button" title="support!" @click="handleDonation('https://ko-fi.com/tecnik')">Ko-Fi</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      Made with<a href="https://youtu.be/71qssscQqH8?feature=shared" target="_blank"><img src="https://tecnik.pages.dev/assets/media/heart.gif" alt="Heart" title="Listen💓" width="20" height="20" style="vertical-align: bottom;"></a>using A.i | Source Code<a href="https://github.com/TecnikOfficial/TecnikOfficial.github.io" target="_blank"><img src="https://tecnik.pages.dev/assets/media/GITHUB-white.svg" alt="GitHub" title="Github" width="20" height="20" style="vertical-align: bottom;"></a>
    </footer>
  </div>
`
})

app.mount("#app")
