import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import gridOptions from '../gridOptions'
import { jwtInterceptor } from './jwt.Interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),provideHttpClient(withInterceptors([jwtInterceptor])) , importProvidersFrom(TranslateModule.forRoot({
       loader:{
         provide:TranslateLoader,
         useFactory:HttpLoaderFactory,
         deps:[HttpClient]
       },
       defaultLanguage:'en'
     })) 
    ]
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,`${gridOptions.Translation.TranslationPath}`,'.json');
}