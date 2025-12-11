/// <reference types="vite/client" />

// Type declarations for CSS modules
type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module "*.module.scss" {
  const classes: CSSModuleClasses;
  export default classes;
}

// Type declarations for assets
declare module "*.svg" {
  const content: string;
  export default content;
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

declare module "*.ttf" {
  const content: string;
  export default content;
}

// Global type definitions
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly VITE_APP_NAME: string;
    // Add other environment variables here
  }
}

// Extend the Window interface if needed
interface Window {
  // Add any global window properties here
}
