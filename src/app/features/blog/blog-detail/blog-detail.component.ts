import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { BlogPost } from '../../../core/models/blog-post.model';
import { BlogService } from '../../../core/services/blog.service';
import { NotificationService } from '../../../core/services/notification.service'; // Import notification service

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  post$: Observable<BlogPost>;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    public notificationService: NotificationService
  ) {
    this.post$ = this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => this.blogService.getPost(id)),
      catchError(err => {
        const errorMessage = 'Failed to load the blog post. Please try again later.';
        this.error = errorMessage;
        // Use notification service to show error
        this.notificationService.show({
          message: errorMessage,
          type: 'error'
        });
        return of(null as unknown as BlogPost);
      })
    );
  }

  ngOnInit(): void { }

  goBack(): void {
    this.router.navigate(['/']);
  }

  editPost(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deletePost(id: number): void {
    this.blogService.deletePost(id).subscribe({
      next: () => {
        this.notificationService.show({
          message: 'Post deleted successfully',
          type: 'success'
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        const errorMessage = 'Failed to delete the post. Please try again later.';
        this.notificationService.show({
          message: errorMessage,
          type: 'error'
        });
      }
    });
  }
}
