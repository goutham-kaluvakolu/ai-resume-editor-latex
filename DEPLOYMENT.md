# 🚀 AI Resume Editor - Deployment Guide

## Free Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel) - FREE
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy frontend:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - `VITE_API_URL=https://your-railway-backend-url.com`

#### Backend (Railway) - FREE Tier
1. **Go to [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Select the backend folder**
4. **Set environment variables:**
   - `OPENAI_API_KEY=your_openai_api_key`
   - `PORT=5000`
5. **Deploy**

---

### Option 2: Netlify + Render

#### Frontend (Netlify) - FREE
1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Set environment variables in dashboard

#### Backend (Render) - FREE Tier
1. **Go to [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Set environment variables**
5. **Deploy**

---

### Option 3: GitHub Pages + Cyclic

#### Frontend (GitHub Pages) - FREE
1. **Push code to GitHub**
2. **Enable GitHub Pages in repository settings**
3. **The GitHub Action will auto-deploy**

#### Backend (Cyclic) - FREE
1. **Go to [cyclic.sh](https://cyclic.sh)**
2. **Connect GitHub repository**
3. **Set environment variables**
4. **Deploy**

---

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
NODE_ENV=production
```

---

## Required Changes for Deployment

### 1. Update API URLs
Update `frontend/src/config.ts` with your backend URL:
```typescript
export const API_BASE_URL = 'https://your-backend-url.com';
```

### 2. CORS Configuration
Ensure your backend allows requests from your frontend domain.

### 3. Environment Variables
Set all required environment variables in your deployment platform.

---

## Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend API URL updated
- [ ] Environment variables set
- [ ] CORS configured
- [ ] OpenAI API key valid
- [ ] Domain/URL working
- [ ] All features tested

---

## Troubleshooting

### Common Issues:
1. **CORS errors** - Update backend CORS settings
2. **API key issues** - Check environment variables
3. **Build failures** - Check Node.js version compatibility
4. **404 errors** - Verify file paths and routing

### Support:
- Check platform-specific documentation
- Verify environment variables are set correctly
- Test API endpoints independently 