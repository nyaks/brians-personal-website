import fs from 'node:fs'

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Generate a fully static site for Cloudflare Pages
  output: 'export',
  // Ensure folder-style routes ("/about/" -> "/about/index.html") work on static hosts like GitHub Pages
  trailingSlash: true,
  // Automatically set basePath and assetPrefix when building on GitHub Actions for GitHub Pages project sites
  // This avoids hardcoding the repository name
  ...(process.env.GITHUB_ACTIONS === 'true'
    ? (() => {
        // On GitHub Pages, only set basePath for project sites WITHOUT a custom domain
        const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
        if (!repo) return {}
        const isUserSite = /\.github\.io$/i.test(repo)
        // Detect custom domain by presence of CNAME file at repo root
        const hasCustomDomain = fs.existsSync('./CNAME')
        if (isUserSite || hasCustomDomain) {
          // Serve from domain root
          return {}
        }
        const projectBase = `/${repo}`
        return {
          basePath: projectBase,
          assetPrefix: projectBase,
        }
      })()
    : {}),
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
