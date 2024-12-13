import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit {

  blogForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  error: string | null = null;
  private postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    public notificationService: NotificationService 
  ) {
    this.blogForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.postId = +params['id'];
        this.loadPost(this.postId);
      }
    });
  }

  loadPost(id: number): void {
    this.blogService.getPost(id).subscribe({
      next: (post) => {
        this.blogForm.patchValue({
          title: post.title,
          content: post.content
        });
      },
      error: (error) => {
        this.error = 'Failed to load the post. Please try again later.';
        this.notificationService.show({
          message: 'Failed to load the post. Please try again later.',
          type: 'error'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.isSubmitting = true;
      const postData = this.blogForm.value;

      const request = this.isEditMode && this.postId
        ? this.blogService.updatePost(this.postId, postData)
        : this.blogService.createPost(postData);

      request.subscribe({
        next: () => {
          this.notificationService.show({
            message: this.isEditMode
              ? 'Post updated successfully'
              : 'Post created successfully',
            type: 'success'
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          const errorMessage = 'Failed to save the post. Please try again later.';
          this.error = errorMessage;
          this.notificationService.show({
            message: errorMessage,
            type: 'error'
          });
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
