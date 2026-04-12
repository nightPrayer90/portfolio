import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationSkipped } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { MainHeader } from './layout/main-header/main-header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainHeader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private router: Router, private scroller: ViewportScroller,) {
    this.fragmentScrollingWithOffset();
  }

  /**
 * Enables smooth scrolling to anchor elements with a fixed offset
 * to account for the sticky header (92px).
 *
 * Problem: Angular's built-in anchorScrolling scrolls to the wrong
 * position or doesn't work reliably with sticky headers.
 *
 * Solution: Manually listen to router events and scroll with offset.
 *
 * Two events are needed:
 * - NavigationEnd: fires when the user navigates from a different route
 *   or reloads the page (e.g. entering the URL directly).
 * - NavigationSkipped: fires when the user clicks an anchor link on the
 *   same page (e.g. from #about to #contact), because Angular treats
 *   this as "same URL" and skips the full navigation.
 *
 * The setTimeout ensures the DOM is fully rendered before scrolling.
 *
 * @see https://quandh19.medium.com/how-to-enable-anchor-scrolling-of-angular-router-in-the-right-way-42e9b19657b5
 * @see https://angular.dev/api/common/ViewportScroller
 */
  private fragmentScrollingWithOffset(): void {
    this.scroller.setOffset([0, 92]);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd || e instanceof NavigationSkipped))
      .subscribe(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          setTimeout(() => this.scroller.scrollToAnchor(fragment), 0);
        }
      });
  }
}
