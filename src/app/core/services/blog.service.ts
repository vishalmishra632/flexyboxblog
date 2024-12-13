// src/app/core/services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/api/v1/blogposts`;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<BlogPost[]> {
    // We use the map operator to transform the response and extract just the data array
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getPost(id: number): Observable<BlogPost> {
    // For single post, we also extract just the data property
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createPost(post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<any>(this.apiUrl, post).pipe(
      map(response => response.data)
    );
  }

  updatePost(id: number, post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, post).pipe(
      map(response => response.data)
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
