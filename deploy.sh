#!/bin/bash

# Safe deployment script for GitHub Pages
# This script ensures you're deploying from the master branch

echo "🚀 Starting safe deployment process..."

# Check if we're on master branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
    echo "⚠️  Warning: You're not on the master branch!"
    echo "Current branch: $current_branch"
    echo "Do you want to switch to master branch? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Switching to master branch..."
        git checkout master
        git pull origin master
    else
        echo "❌ Deployment cancelled. Please switch to master branch first."
        exit 1
    fi
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes!"
    echo "Please commit or stash your changes before deploying."
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin master

# Run tests and linting
echo "🔍 Running linter..."
npm run lint

echo "🔍 Running type check..."
npm run type-check

# Build and deploy
echo "🏗️  Building project..."
npm run build

echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed successfully!"
echo "Your site will be available at: https://YOUR_USERNAME.github.io/portfolio_3d/"