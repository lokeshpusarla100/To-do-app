import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
// import { AuthService } from '../auth.service'; // Import your authentication service

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private api:ApiServiceService,
              private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.api.getTasks()
  }

  logout() {
    // Implement logout logic (e.g., call your authentication service to log the user out)
    this.auth.logout();
  }
}
