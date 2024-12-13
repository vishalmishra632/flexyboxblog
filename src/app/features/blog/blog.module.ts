import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogFormComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BlogListComponent },
      { path: 'create', component: BlogFormComponent },
      { path: 'edit/:id', component: BlogFormComponent },
      { path: ':id', component: BlogDetailComponent }
    ])
  ]
})
export class BlogModule { }
