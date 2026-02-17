# Fix "Access blocked" for Sign in with Google

If the **Continue with Google** button shows **Access blocked**, fix it in Google Cloud Console:

## 1. Authorized redirect URI (must match exactly)

1. Open [Google Cloud Console](https://console.cloud.google.com/) → your project.
2. Go to **APIs & Services** → **Credentials**.
3. Open your **OAuth 2.0 Client ID** (Web application).
4. Under **Authorized redirect URIs**, add the **exact** URL your app uses for the callback:
   - Local: `http://localhost:3000/auth/google` (use the port you actually run the app on, e.g. 3000 or 3003).
   - Production: `https://yourdomain.com/auth/google`.
5. No trailing slash. Protocol and port must match how users open the app.
6. Save.

**Tip:** Leave `NUXT_OAUTH_GOOGLE_REDIRECT_URL` **unset** in `.env` so the app uses the current request URL. Then add that same URL in Google Console (e.g. if you open the app at `http://localhost:3000`, add `http://localhost:3000/auth/google`).

## 2. OAuth consent screen – add yourself as Test user (if in Testing)

1. Go to **APIs & Services** → **OAuth consent screen**.
2. If **User type** is **External** and status is **Testing**, only listed test users can sign in.
3. Click **+ ADD USERS** under **Test users** and add the Google account(s) you want to use to sign in.
4. Save.

After this, **Continue with Google** should work. If it still fails, double-check the redirect URI and that you added your email as a test user.
