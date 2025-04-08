// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { mergeApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';

// Merge the existing app config with our HTTP interceptor config
const mergedConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
});

bootstrapApplication(AppComponent, mergedConfig)
  .catch((err) => console.error(err));