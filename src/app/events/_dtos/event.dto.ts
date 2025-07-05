export interface EventDTO {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  image_url: string;
  bg_cover: string;
  category: string;
  created_at: Date;
  events_date: Date;
}
