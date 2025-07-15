# QuizVerse

A modern quiz application built with Next.js 15, NextAuth v5, and Tailwind CSS.

## Features

- 🔐 Authentication with Azure AD and Google OAuth
- 🎮 Create and join quiz games
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🌙 Dark/Light theme support
- 📱 Responsive design

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Setup:**
   - Copy `.env.example` to `.env.local`
   - Fill in your OAuth provider credentials

3. **OAuth Setup:**

   **Azure AD:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Register a new app in Azure AD
   - Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
   - Copy Client ID, Client Secret, and Tenant ID

   **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

## Environment Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
AUTH_SECRET=your-secret-key

# Azure AD
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Tech Stack

- **Framework:** Next.js 15
- **Authentication:** NextAuth v5
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
├── public/             # Static assets
└── styles/             # Global styles
```