export interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}
