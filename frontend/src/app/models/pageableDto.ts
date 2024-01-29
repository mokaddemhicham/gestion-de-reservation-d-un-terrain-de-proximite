export interface PageableDto<T>{
  pages: number[];
  currentPage: number;
  content: T[];
}
