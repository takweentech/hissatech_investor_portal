import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../core/base/base.component';
import { SidebarService } from '../../core/services/sidebar.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, RouterOutlet, SidebarComponent, NgbOffcanvasModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent extends BaseComponent implements OnInit {
  private readonly sidebarService = inject(SidebarService);
  private offcanvasService = inject(NgbOffcanvas);
  sidebarDisplay = signal<boolean>(false);


  ngOnInit(): void {
    this.sidebarService.menuDisplay$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.sidebarDisplay.set(val);
      if (val) this.open();
    })
  }


  open() {
    this.offcanvasService.open(SidebarComponent, { ariaLabelledBy: 'offcanvas-basic-title', panelClass: 'width-75' },).result.then(
      (result) => {
      },
      (reason) => {
        this.sidebarService.toggleMenu()
      },
    );
  }

}
