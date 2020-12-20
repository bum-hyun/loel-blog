interface IPost {
  email?: string;
  category?: string | null;
  html?: string;
  markdown?: string;
  title?: string;
}

interface IReadPost extends IPost {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface IResponsePosts {
  items: IReadPost[];
  totalCount: number;
}