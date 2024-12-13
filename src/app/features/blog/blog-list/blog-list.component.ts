import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';
import { BlogPost } from '../../../core/models/blog-post.model';
import { NotificationService } from '../../../core/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ])
  ]
})
export class BlogListComponent implements OnInit {

  posts$: Observable<BlogPost[]>;
  error: string | null = null;

  showDeleteModal = false;
  postToDelete: number | null = null;

  // Track expanded state for each post
  expandedPosts: { [key: number]: boolean } = {};

  deleteInProgress = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    public notificationService: NotificationService
  ) {
    this.posts$ = this.blogService.getAllPosts().pipe(
      catchError(err => {
        const errorMessage = err.error?.message;
        this.error = errorMessage;
        return of([]);
      })
    );
  }

  ngOnInit(): void { }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.showDeleteModal) {
      this.cancelDelete();
    }
  }

  // Toggle content expansion for a specific post
  togglePostExpansion(postId: number): void {
    this.expandedPosts[postId] = !this.expandedPosts[postId];
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/post', id]);
  }

  openDeleteModal(id: number): void {
    this.postToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.postToDelete) {
      this.deleteInProgress = true;
      this.blogService.deletePost(this.postToDelete).subscribe({
        next: () => {
          this.posts$ = this.blogService.getAllPosts();
          this.showDeleteModal = false;
          this.postToDelete = null;
          this.deleteInProgress = false;
          this.notificationService.show({
            message: 'Post deleted successfully',
            type: 'success'
          });
        },
        error: (err) => {
          this.deleteInProgress = false;
          this.showDeleteModal = false;
          this.postToDelete = null;
          this.notificationService.show({
            message: 'Failed to delete the post. Please try again later.',
            type: 'error'
          });
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.postToDelete = null;
  }
}
