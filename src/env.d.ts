// src/env.d.ts

/// <reference types="astro/client" />

// ↓ この3行を追記
interface Window {
  worksData: any[];
}