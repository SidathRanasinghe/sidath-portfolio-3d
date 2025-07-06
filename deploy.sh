#!/bin/bash

# Safe deployment script for GitHub Pages
# This script ensures you're deploying from the correct branch

echo "🚀 Starting safe deployment process..."

# Check if we're on main or master branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    echo "⚠️  Warning: You're not on the main/master branch!"
    echo "Current branch: $current_branch"
    echo "Do you want to switch to main branch? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Switching to main branch..."
        # Check if main branch exists, otherwise use master
        if git show-ref --verify --quiet refs/heads/main; then
            git checkout main
            git pull origin main
        else
            git checkout master
            git pull origin master
        fi
    else
        echo "❌ Proceeding with deployment from current branch: $current_branch"
        echo "⚠️  Note: This may deploy unstable code. Are you sure? (y/n)"
        read -r confirm_response
        if [[ "$confirm_response" =~ ^[Yy]$ ]]; then
            echo "✅ Continuing deployment from branch: $current_branch"
        else
            echo "❌ Deployment cancelled."
            exit 1
        fi
    fi
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes!"
    echo "Please commit or stash your changes before deploying."
    echo "Do you want to continue anyway? (y/n)"
    read -r continue_response
    if [[ ! "$continue_response" =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 1
    fi
fi

# Pull latest changes (from current branch)
echo "📥 Pulling latest changes from current branch..."
current_branch=$(git rev-parse --abbrev-ref HEAD)
git pull origin $current_branch

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies (in case of updates)
echo "📦 Installing dependencies..."
npm ci

# Run tests and linting (but don't fail on linting errors)
echo "🔍 Running linter..."
npm run lint || echo "⚠️  Linting issues found, but continuing..."

echo "🔍 Running type check..."
npm run type-check

# Build the project
echo "🏗️  Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not found."
    exit 1
fi

# Check if index.html exists in dist
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed! index.html not found in dist folder."
    exit 1
fi

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages from branch: $current_branch"
npm run deploy

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "Your site will be available at: https://sidathranasinghe.github.io/sidath-portfolio-3d/"
    echo "📝 Note: It may take a few minutes for the changes to be visible."
    echo "🔗 You can also check the deployment status at: https://github.com/SidathRanasinghe/sidath-portfolio-3d/actions"
else
    echo "❌ Deployment failed!"
    echo "Please check the error messages above and try again."
    exit 1
fi