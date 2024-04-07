import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is a GET request
    if (request.method !== 'GET') {
      return next.handle(request); // Skip caching for non-GET requests
    }

    // Check if the response is cached
    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(new HttpResponse({ status: 200, body: cachedResponse })); // Return cached response
    }

    // If response is not cached, proceed with the request
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event.body); // Cache the response
        }
      })
    );
  }
}
