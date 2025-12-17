# Shopify Theme Development Workflow

This repository manages the Shopify theme code with Dev and Production environments.

## Branch Structure
- **main**: Production environment
- **develop**: Development environment
- **feature/***: New features
- **hotfix/***: Emergency fixes for production

## Workflow
1. Create feature branch from `develop`
2. Commit and push changes
3. Open Pull Request to `develop`
4. After approval → merge to `develop`
5. Deploy Dev environment (auto or manual)
6. When stable → merge `develop` → `main`
7. Production auto deploy

## Deployment
- Dev theme: auto deploy on `develop`
- Production theme: auto deploy on `main`

## Shopify CLI (local development)
shopify theme pull --store mion-vn.myshopify.com --theme 143914434650
