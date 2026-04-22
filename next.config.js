/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @huggingface/transformers runs client-side only (Whisper WASM).
  // Keep it out of the server bundle so Next doesn't try to resolve
  // its native deps.
  experimental: {
    serverComponentsExternalPackages: [
      "@huggingface/transformers",
      "onnxruntime-node",
      "onnxruntime-web",
      "sharp",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  // Proxy Firebase Auth handler/iframe through our own domain so the
  // Google OAuth consent screen shows "www.finalsprep.com" instead of
  // the default "<project>.firebaseapp.com". The Firebase client will
  // hit /__/auth/handler on our domain; we rewrite to the real handler.
  async rewrites() {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) return [];
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://${projectId}.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: "/__/firebase/:path*",
        destination: `https://${projectId}.firebaseapp.com/__/firebase/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;
