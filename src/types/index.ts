// Re-export all types from a central location
export * from './boat';
export * from './contact';
export * from './navigation';
export * from './common';

// Global types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
