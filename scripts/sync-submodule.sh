#!/bin/bash

# Spec-Kit Submodule Synchronization Script
# Automatically updates the spec-kit submodule and triggers content sync

set -e

echo "🔄 Syncing spec-kit submodule..."

# Update submodule to latest
git submodule update --remote external/spec-kit

# Check if there are changes
if git diff --quiet HEAD -- external/spec-kit; then
    echo "✅ Submodule is already up to date"
    exit 0
fi

# Get the new commit hash
NEW_COMMIT=$(cd external/spec-kit && git rev-parse HEAD)
OLD_COMMIT=$(git rev-parse HEAD:external/spec-kit)

echo "📝 Submodule updated:"
echo "  From: $OLD_COMMIT"
echo "  To:   $NEW_COMMIT"

# Stage the submodule update
git add external/spec-kit

# Create commit message with details
COMMIT_MSG="chore: update spec-kit submodule to $NEW_COMMIT

- Updated external/spec-kit from $OLD_COMMIT to $NEW_COMMIT
- Automated sync via sync-submodule.sh script"

# Commit the update
git commit -m "$COMMIT_MSG"

echo "✅ Submodule sync complete!"
echo "🚀 Changes committed and ready for push"

# Optional: Push if on main branch and CI environment
if [[ "$CI" == "true" && "$(git branch --show-current)" == "main" ]]; then
    echo "🚀 Auto-pushing in CI environment..."
    git push origin main
fi
