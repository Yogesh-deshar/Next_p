import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fixes "Next.js inferred your workspace root" warnings when multiple lockfiles exist
  // (and ensures output file tracing works correctly in production).
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
