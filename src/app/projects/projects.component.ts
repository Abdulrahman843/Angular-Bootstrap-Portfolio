import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Import CommonModule to use *ngFor
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
  projects = [
    { name: "GitHub-Repo-and-Mobile-App", description: "Developed a mobile application linking to HNG internship page and my github account", skills: "React-native, Node.js, Appetize"},
    { name: "Country-Info-App", description: "Developed a mobile application that allows users to explore country details, including population, capital, region, continent, country code, current leadership (if available), and also supports light and dark themes for an improved user experience.", skills: "React-native, Expo, TypeScript, REST country API integration, Responsive UI Design, version control using Git, Stack navigation, Appetize.io"},
    { name: "React-Native-Encryption-Decryption-App", description: "Developed a mobile application that encrypts and decrypts text using XOR logic with a secret key.", skills: "React-native, Buffer, TextEncoder"},
    { name: "Angular-Portfolio-Website", description: "Designed and developed a fully responsive portfolio website.", skills: "Angular, Routing, Responsive Design, Git" },
    { name: "Task-Management-App", description: "Developed a task management application.", skills: "React.js, Node.js, MongoDB, RESTful API" },
    { name: "Numbers-React-App", description: "Developed a Numbers Trivia web application that fetched trivial facts about any user-input number.", skills: "React.js, API integration, Responsive UI Design, error handling, version control using Git" },
    { name: "Remove-Duplicate-Numbers", description: "Created a Node.js application that filters out duplicate numbers from an array using the lodash library.", skills: "Node.js, lodash, array manipulation, npm dependency management, JavaScript (ES6+)." },
    { name: "Instagram-Clone", description: "Developed aan Instagram clone with multiple functional components, including homepage, explore page, reels, and messages.", skills: "React.js, component-based architecture, React Router, CSS, state management, dynamic UI, Git, scalability" },
    { name: "User-Details-and-Shopping-Cart", description: "Developed an app displaying user profile details and a shopping cart.", skills: "React.js, state management, dynamic rendering, JavaScript (ES6+), CSS, Git, responsive design." },
    { name: "Current-Weather-App", description: "Developed a weather application that displays real-time weather data.", skills: "React.js, geolocation, MongoDB, RESTful API, deployment preparation" },
    { name: "Nationality-Predictor", description: "Developed a React application that predicts the nationality.", skills: "React.js, API integration, Responsive UI Design, state management, error handling, version control using Git" },
    { name: "React-Banking-App", description: "Developed an interactive banking application for managing user balances with features like deposits, withdrawals.", skills: "React.js, component-based architecture, state management, CSS styling, JavaScript, Git, deployment preparation" },
    { name: "Palindrome-Checker", description: "Developed a simple tool to check if a word is a palindrome.", skills: "JavaScript (string manipulation, regular expressions), Git." },
    { name: "Water-Bill-Calculator", description: "A web-based tool to calculate water bills based on tiered pricing rates.", skills: "JavaScript (pricing logic), CSS, Git, user interface design." },
    { name: "Weather-App-for-Paris", description: "Designed a simple weather application that fetches and displays real-time weather data for Paris from the OpenWeather API.", skills: "JavaScript, OpenWeather API, dynamic DOM manipulation, CSS, HTML, error handling." },
    { name: "Budget-Tracker-App", description: "Developed a budget tracker application that helps users manage their income and expenses, calculate savings, and store data using sessionStorage.", skills: "JavaScript, session storage, dynamic DOM manipulation, CSS, financial management." },
    { name: "Shopping-List-App", description: "Built an interactive shopping list application with features like adding new items, deleting existing ones, and marking items as bought.", skills: "JavaScript, DOM manipulation, CSS, interactive feature development, list management." },
    { name: "Counter-App", description: "Developed a simple counter app that allows users to start and stop a counter, which increments every second.", skills: "JavaScript (setInterval, clearInterval), event listeners, DOM manipulation, Git."},
    { name: "myFilterFunction", description: "Created a project to filter an array of words, retaining only those with exactly six letters.", skills: "JavaScript (filter, higher-order functions), DOM manipulation, Git." },
    { name: "Number-Swapping-App", description: "Built a web application to swap the second and last digits of a given number. Displays the original and swapped numbers.", skills: "JavaScript (digit manipulation), user interaction, Git."},
    { name: "Current-Time-Display", description: "Developed a dynamic webpage displaying the current time in real-time, formatted as HH:MM:SS. The time updates every second using JavaScript.", skills: "JavaScript (filter, higher-order functions), DOM manipulation, Git." },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGitHubProjects();
  }

  fetchGitHubProjects() {
    const githubUsername = 'Abdulrahman843';
    this.http.get<{ name: string; description: string | null; topics?: string[] }[]>(
      `https://api.github.com/users/${githubUsername}/repos`
    ).subscribe(
      (response) => {
        const githubProjects: { name: string; description: string; skills: string }[] = response.map((repo) => ({
          name: repo.name,
          description: repo.description || "No description available.",
          skills: repo.topics ? repo.topics.join(', ') : "GitHub API Integration"
        }));

        // **Avoid duplicate projects**
        this.projects = [
          ...this.projects,
          ...githubProjects.filter(
            (githubProject: { name: string }) =>
              !this.projects.some((existingProject) => existingProject.name === githubProject.name)
          )
        ];
      },
      (error) => {
        console.error("Error fetching GitHub repositories:", error);
      }
    );
  }



  trackByFn(index: number, project: any): string {
    return project.name; // Track by unique property
  }
}
