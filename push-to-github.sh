#!/bin/bash

# Smart Campus Automation System - GitHub Push Script
# This script helps you push your project to GitHub

echo "🎓 Smart Campus Automation System - GitHub Push Helper"
echo "======================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Git repository not initialized"
    exit 1
fi

echo "✅ Git repository is ready"
echo "📊 Commit status:"
git log --oneline -1
echo ""

# Ask for GitHub repository URL
echo "📝 Please enter your GitHub repository URL"
echo "   Example: https://github.com/yourusername/SMART-CAMPUS-AUTOMATION-SYSTEM.git"
echo ""
read -p "Repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repository URL cannot be empty"
    exit 1
fi

# Add remote origin
echo ""
echo "🔗 Adding remote origin..."
git remote add origin "$REPO_URL" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Remote 'origin' already exists. Updating URL..."
    git remote set-url origin "$REPO_URL"
fi

# Verify remote
echo ""
echo "✅ Remote repository configured:"
git remote -v

# Ask for confirmation
echo ""
read -p "🚀 Ready to push to GitHub? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Push cancelled"
    exit 0
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🎉 Your project is now live at: ${REPO_URL%.git}"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Visit your repository on GitHub"
    echo "   2. Add repository topics: react, vite, express, campus-management"
    echo "   3. Star your own repository ⭐"
    echo "   4. Share with others!"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   1. Check your GitHub credentials"
    echo "   2. Verify repository URL is correct"
    echo "   3. Ensure you have write access to the repository"
    echo ""
    echo "💡 Try using a Personal Access Token for authentication"
    echo "   GitHub Settings → Developer settings → Personal access tokens"
fi
