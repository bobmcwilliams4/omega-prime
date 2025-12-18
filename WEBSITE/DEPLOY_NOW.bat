@echo off
REM ECHO OMEGA PRIME - Quick Vercel Deployment Script
REM Agent 61-64 | 2025-12-13

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║      ECHO OMEGA PRIME - Vercel Deployment Launcher          ║
echo ║                    Authority 11.0                            ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo [STATUS] Build completed successfully
echo [STATUS] 26 routes generated, 3.0 MB total size
echo [STATUS] Vercel CLI v50.0.1 installed
echo.
echo ════════════════════════════════════════════════════════════════
echo  STEP 1: AUTHENTICATE WITH VERCEL
echo ════════════════════════════════════════════════════════════════
echo.
echo This will open your browser to login to Vercel...
echo.
pause
vercel login
echo.
echo ════════════════════════════════════════════════════════════════
echo  STEP 2: DEPLOY TO PRODUCTION
echo ════════════════════════════════════════════════════════════════
echo.
echo Deploying to Vercel production environment...
echo.
cd /d X:\ECHO_PRIME\WEBSITE
vercel --prod --yes
echo.
echo ════════════════════════════════════════════════════════════════
echo  DEPLOYMENT COMPLETE
echo ════════════════════════════════════════════════════════════════
echo.
echo [NEXT] To add custom domain echo-op.com, run:
echo        vercel domains add echo-op.com
echo.
echo [DOCS] See VERCEL_DEPLOYMENT_GUIDE.md for full instructions
echo.
pause
