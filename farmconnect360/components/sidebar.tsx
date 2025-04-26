"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import {
  BarChart3,
  Calculator,
  CloudRain,
  FileText,
  Globe,
  Home,
  Leaf,
  Settings,
  ShoppingCart,
  Sprout,
  Tractor,
  User,
} from "lucide-react"

export function AppSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const mainNavItems = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/crop-recommendation", label: t("nav.crops"), icon: Leaf },
    { href: "/disease-detection", label: t("nav.disease"), icon: Sprout },
    { href: "/marketplace", label: t("nav.marketplace"), icon: ShoppingCart },
    { href: "/weather", label: t("nav.weather"), icon: CloudRain },
    { href: "/fertilizer", label: t("nav.fertilizer"), icon: Calculator },
  ]

  const toolsNavItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: BarChart3 },
    { href: "/document-locker", label: t("nav.documents"), icon: FileText },
    { href: "/carbon-footprint", label: t("nav.carbon"), icon: Globe },
    { href: "/loans", label: t("nav.loans"), icon: Calculator },
    { href: "/sdg", label: t("nav.sdg"), icon: Leaf },
  ]

  const settingsNavItems = [
    { href: "/profile", label: t("nav.profile"), icon: User },
    { href: "/settings", label: t("nav.settings"), icon: Settings },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Logo className="h-6 w-6" />
          <span className="text-lg font-bold">FarmConnect 360</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <Button variant="outline" className="w-full justify-start">
            <Tractor className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
