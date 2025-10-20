import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import Home from "../pages/Home";

// Enhanced Route configuration - Industry standard approach
interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType> | ComponentType;
  requireAuth?: boolean;
  title?: string;
  preload?: boolean;
  category?: string;
  meta?: {
    description?: string;
    keywords?: string[];
    ogTitle?: string;
  };
}

export const routes: RouteConfig[] = [
  // Public routes
  {
    path: "/login",
    component: lazy(() => import("../pages/Auth/Login")),
    requireAuth: false,
    title: "Login",
    category: "auth",
    meta: {
      description: "Login to your account",
      keywords: ["login", "signin"],
    },
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/Auth/Register")),
    requireAuth: false,
    title: "Register",
    category: "auth",
    meta: {
      description: "Create a new account",
      keywords: ["register", "signup"],
    },
  },

  // Core app routes
  {
    path: "/",
    component: Home, // Eager loaded for instant navigation
    requireAuth: true,
    title: "Home",
    preload: true,
    category: "main",
    meta: { description: "Your social hub dashboard" },
  },
  {
    path: "/gaming/*",
    component: lazy(() => import("../pages/Gaming/Gaming")),
    requireAuth: true,
    title: "Gaming",
    category: "entertainment",
    meta: { description: "Gaming hub and competitions" },
  },
  {
    path: "/university",
    component: lazy(() => import("../pages/University/University")),
    requireAuth: true,
    title: "University",
    category: "education",
    meta: { description: "University resources and academics" },
  },
  // Catch-all for university subpages
  {
    path: "/university/*",
    component: lazy(() => import("../pages/University/University")),
    requireAuth: true,
    title: "University",
    category: "education",
    meta: { description: "University resources and academics (nested)" },
  },
  {
    path: "/classroom/*",
    component: lazy(() => import("../pages/ClassRoom")),
    requireAuth: true,
    title: "ClassRoom",
    category: "education",
    meta: { description: "Attend and manage live online classes" },
  },

  // Utility routes
  {
    path: "/search",
    component: lazy(() => import("../pages/Search")),
    requireAuth: true,
    title: "Search",
    category: "utility",
    meta: { description: "Search across the platform" },
  },
  {
    path: "/files",
    component: lazy(() => import("../pages/FilesAndArchive")),
    requireAuth: true,
    title: "Files & Archive",
    category: "education",
    meta: {
      description: "Manage personal files and explore community study archive",
    },
  },
  {
    path: "/store",
    component: lazy(() => import("../pages/StudentStore")),
    requireAuth: true,
    title: "Store",
    category: "shopping",
    meta: { description: "Student marketplace and store" },
  },
  {
    path: "/tuition",
    component: lazy(() => import("../pages/Tuition")),
    requireAuth: true,
    title: "Tuition",
    category: "education",
    meta: { description: "Find tutors and tuition services" },
  },

  // Social features
  {
    path: "/groups",
    component: lazy(() => import("../pages/Groups")),
    requireAuth: true,
    title: "Groups",
    category: "social",
    meta: { description: "Join and manage groups" },
  },
  {
    path: "/groups/creategroup",
    component: lazy(() => import("../components/Groups/CreateGroupPage")),
    requireAuth: true,
    title: "Create Group",
    category: "social",
    meta: { description: "Create a new group" },
  },
  {
    path: "/groups/:groupId",
    component: lazy(() => import("../components/Groups/GroupDetail")),
    requireAuth: true,
    title: "Group Details",
    category: "social",
    meta: { description: "View group details and information" },
  },
  {
    path: "/notifications",
    component: lazy(() => import("../pages/Notifications")),
    requireAuth: true,
    title: "Notifications",
    category: "social",
    meta: { description: "Your notifications and updates" },
  },
  {
    path: "/messages",
    component: lazy(() => import("../pages/Messages")),
    requireAuth: true,
    title: "Messages",
    category: "social",
    meta: { description: "Chat and messaging" },
  },
  {
    path: "/study-helper",
    component: lazy(() => import("../pages/StudyHelperAI")),
    requireAuth: true,
    title: "Study Helper AI",
    category: "education",
    meta: { description: "AI-powered study assistant" },
  },
  {
    path: "/career-hub",
    component: lazy(() => import("../pages/CareerHub")),
    requireAuth: true,
    title: "Career Hub",
    category: "career",
    meta: { description: "Find jobs and internship opportunities" },
  },
  {
    path: "/saved",
    component: lazy(() => import("../pages/Saved")),
    requireAuth: true,
    title: "Saved",
    category: "utility",
    meta: { description: "Your saved posts and content" },
  },
  {
    path: "/friends",
    component: lazy(() => import("../pages/Friends")),
    requireAuth: true,
    title: "Friends",
    category: "social",
    meta: { description: "Manage your friends and connections" },
  },
  {
    path: "/videos",
    component: lazy(() => import("../pages/Videos")),
    requireAuth: true,
    title: "Videos",
    category: "entertainment",
    meta: { description: "Watch and share videos" },
  },

  // Profile routes
  {
    path: "/profile",
    component: lazy(() => import("../pages/Profile")),
    requireAuth: true,
    title: "Profile",
    category: "profile",
    meta: { description: "Your profile page" },
  },
  {
    path: "/profile/:userId",
    component: lazy(() => import("../pages/Profile")),
    requireAuth: true,
    title: "User Profile",
    category: "profile",
    meta: { description: "View user profile" },
  },
  {
    path: "/profile/edit",
    component: lazy(() => import("../pages/ProfileEdit")),
    requireAuth: true,
    title: "Edit Profile",
    category: "profile",
    meta: { description: "Edit your profile information" },
  },
  {
    path: "/profile/saved",
    component: lazy(() => import("../pages/Saved")),
    requireAuth: true,
    title: "Saved Items",
    category: "profile",
    meta: { description: "View your saved items" },
  },
  {
    path: "/settings",
    component: lazy(() => import("../pages/Settings")),
    requireAuth: true,
    title: "Settings",
    category: "utility",
    meta: { description: "Account and app settings" },
  },

  // More section routes
  {
    path: "/more",
    component: lazy(() => import("../pages/MainMore")),
    requireAuth: true,
    title: "More",
    category: "utility",
    meta: { description: "Additional features and services" },
  },
  {
    path: "/more/blood-donation",
    component: lazy(() => import("../pages/MainMore/BloodDonation")),
    requireAuth: true,
    title: "Blood Donation",
    category: "utility",
    meta: { description: "Find blood donors and save lives" },
  },

  // 404 route
  {
    path: "*",
    component: lazy(() => import("../pages/Fallbacks/NotFound")),
    requireAuth: false,
    title: "Page Not Found",
    category: "error",
    meta: { description: "The page you're looking for doesn't exist" },
  },
];

export const getRouteByPath = (path: string) =>
  routes.find((route) => route.path === path);
