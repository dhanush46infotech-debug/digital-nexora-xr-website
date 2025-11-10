# Deployment Guide - Auto Deploy Dev to Production

This guide explains how to automatically deploy your development changes to production using GitHub Actions and Vercel.

## Overview

When you push changes to the `main` branch, the following happens automatically:
1. GitHub Actions workflow triggers
2. Code is checked out and dependencies installed
3. TypeScript type checking runs
4. ESLint code linting runs
5. Production build is created
6. Build is automatically deployed to Vercel

## Setup Instructions

### 1. Connect to Vercel (if not already done)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `dhanush46infotech-debug/digital-nexora-xr-website`
4. Configure project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables in Vercel dashboard:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAIL_JS_ACCESS_TOKEN`

### 2. Get Vercel Credentials for GitHub Actions

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and authenticate
3. Navigate to your project directory
4. Run `vercel link` to link to your Vercel project
5. Get your credentials:
   ```bash
   # Find in .vercel/project.json after running vercel link
   cat .vercel/project.json
   ```
6. Get your Vercel token from: https://vercel.com/account/tokens

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: Settings → Secrets and variables → Actions
3. Click "New repository secret" and add these secrets:

   **Required Secrets:**
   - `VERCEL_TOKEN` - Your Vercel authentication token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID
   - `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
   - `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
   - `VITE_EMAIL_JS_ACCESS_TOKEN` - EmailJS access token

### 4. Enable GitHub Actions

The workflow file is already created at `.github/workflows/deploy.yml`

To enable it:
1. Commit the workflow file to your repository
2. Push to the `main` branch
3. GitHub Actions will automatically start running

## Deployment Workflow

### Automatic Deployment (Recommended)

```bash
# Make your changes in development
npm run dev

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature"

# Push to main branch - this triggers automatic deployment
git push origin main
```

### Manual Deployment via Vercel CLI

```bash
# Build the project
npm run build

# Deploy to production
vercel --prod
```

### Preview Deployments

Every pull request automatically gets a preview deployment:

```bash
# Create a new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create pull request - this creates a preview deployment
```

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Before Committing

```bash
# Type check
npm run ts:check

# Lint code
npm run lint

# Build to verify production build works
npm run build
```

## Environment Variables

Make sure these are set in both:

**Local Development (.env file):**
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAIL_JS_ACCESS_TOKEN=your_access_token
```

**Vercel Dashboard:**
- Add the same variables in Project Settings → Environment Variables
- Set for: Production, Preview, and Development

**GitHub Secrets:**
- Add the same variables plus Vercel credentials

## Vercel Dashboard

Monitor deployments at:
- Production: https://vercel.com/[your-username]/[project-name]
- Deployments: https://vercel.com/[your-username]/[project-name]/deployments

## Alternative: Vercel Git Integration (Simpler)

If you prefer a simpler setup without GitHub Actions:

1. Go to Vercel dashboard
2. Connect your GitHub repository
3. Enable "Automatic Deployments" for the main branch
4. Add environment variables in Vercel
5. Done! Every push to main will auto-deploy

This method doesn't require GitHub secrets or workflow files.

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify `npm run build` works locally
- Check GitHub Actions logs for errors

### Deployment Fails
- Verify Vercel credentials in GitHub secrets
- Check Vercel dashboard for deployment logs
- Ensure vercel.json configuration is correct

### Changes Not Reflecting
- Clear browser cache (Ctrl+Shift+R)
- Check deployment status in Vercel dashboard
- Verify correct branch was pushed

## Production URL

After deployment, your site will be available at:
- Production: `https://[project-name].vercel.app`
- Custom domain (if configured): Your custom domain

## Rollback

To rollback to a previous version:
1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find the previous working deployment
4. Click "Promote to Production"

## Support

For issues:
- GitHub Actions logs: Repository → Actions tab
- Vercel logs: Vercel Dashboard → Deployments
- Build logs: Click on specific deployment
