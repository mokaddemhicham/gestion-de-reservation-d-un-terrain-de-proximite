import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// Import the register function from swiper
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements globally
register();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
