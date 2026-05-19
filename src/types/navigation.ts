export type NavItem = {
  label: string
  href: string
  external?: boolean
  badge?: string
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}
