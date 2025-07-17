export interface NavItem {
  name: string;
  path: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
  current?: boolean;
}
