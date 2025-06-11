# Vercel Deployment Guide

## Prerequisites

- Node.js 20.x or later
- Vercel CLI (optional but recommended)
- HeyGen API Key

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
HEYGEN_API_KEY=your_heygen_api_key_here
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Configure environment variables in the Vercel dashboard:
   - `HEYGEN_API_KEY`: Your HeyGen API key
5. Deploy!

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add HEYGEN_API_KEY
```

## Performance Optimizations Included

✅ **Vercel Analytics** - Track page views and user interactions
✅ **Vercel Speed Insights** - Monitor Core Web Vitals
✅ **Image Optimization** - WebP/AVIF format support
✅ **Package Import Optimization** - Faster builds with optimized imports
✅ **Security Headers** - XSS protection, content type sniffing prevention
✅ **Caching Headers** - Optimized cache control for static assets
✅ **API Route Optimization** - Timeout handling and proper error responses

## Vercel Configuration

The project includes optimized configurations:

- `vercel.json` - Deployment and routing configuration
- `next.config.js` - Next.js optimizations for Vercel
- Security headers and caching policies
- Node.js 20.x runtime for API routes

## Monitoring

After deployment, you can monitor your application:

1. **Analytics**: View in Vercel dashboard under "Analytics" tab
2. **Speed Insights**: Monitor Core Web Vitals in "Speed Insights" tab
3. **Functions**: Monitor API route performance in "Functions" tab

## Troubleshooting

### Build Errors
- Ensure all environment variables are set in Vercel dashboard
- Check that Node.js version is 20.x
- Verify all dependencies are listed in `package.json`

### Runtime Errors
- Check Vercel function logs in the dashboard
- Ensure API keys are properly configured
- Verify API route timeout settings (currently 30s max)

### Performance Issues
- Use Vercel Speed Insights to identify bottlenecks
- Check image optimization settings
- Review caching headers configuration

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [HeyGen API Documentation](https://docs.heygen.com/)