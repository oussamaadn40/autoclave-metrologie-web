# Deploying to Netlify

This guide will help you deploy the Autoclave Metrologie Web application to Netlify.

## Prerequisites

- A [Netlify](https://netlify.com) account (free tier works fine)
- Node.js 20+ installed locally (for testing builds)
- Git repository (optional, but recommended)

## Quick Deploy

### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. Follow the prompts to link or create a new site.

### Option 2: Deploy via Netlify Dashboard

1. **Prepare your repository:**
   - Push your code to GitHub, GitLab, or Bitbucket

2. **Create new site in Netlify:**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider and select your repository

3. **Configure build settings:**
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist/public`
   - **Node version:** 20 (set in Environment variables)

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your application

### Option 3: Drag & Drop Deploy

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the dist folder:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `dist/public` folder
   - Your site will be deployed instantly!

## Configuration

The project includes:
- ✅ `netlify.toml` - Build configuration and redirects
- ✅ `client/public/_redirects` - SPA routing fallback
- ✅ Security headers configured

## Environment Variables

This application doesn't require environment variables for basic functionality. The app works with mock data for demonstration purposes.

If you need to add environment variables later:
1. Go to Site settings → Environment variables
2. Add your variables
3. Redeploy the site

## Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build the project
npm run build

# Serve the build folder
npx serve dist/public
```

Visit `http://localhost:3000` to verify everything works.

## Post-Deployment

After deployment:
- ✅ Your site will be available at `https://your-site-name.netlify.app`
- ✅ You can set up a custom domain in Site settings
- ✅ SSL certificate is automatically provisioned
- ✅ Continuous deployment is enabled (if using Git)

## Troubleshooting

### Build Fails
- Ensure Node.js version is 20+ in Environment variables
- Check build logs in Netlify dashboard for specific errors
- Verify `package.json` dependencies are correct

### 404 Errors on Routes
- Verify `_redirects` file exists in `client/public`
- Check that `netlify.toml` redirects are configured
- Ensure build output is in `dist/public`

### Blank Page After Deploy
- Check browser console for errors
- Verify all assets are being loaded correctly
- Test the production build locally first

## Support

For issues:
- Check [Netlify Documentation](https://docs.netlify.com)
- Review build logs in Netlify dashboard
- Verify local build works before deploying

---

**Note:** This is a demonstration/mockup application with hardcoded data. For production use with real data, you'll need to integrate a backend API and database.
