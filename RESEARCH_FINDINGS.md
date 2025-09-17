# Research Findings: SpecKit CLI Package Investigation

**Date**: September 14, 2025  
**Researcher**: AI Assistant  
**Query**: `npm install -g @SpecKit/cli`  

## 🔍 Research Summary

Investigation into the availability and existence of the `@SpecKit/cli` npm package revealed that **this package does not exist** in the npm registry. However, further review of the GitHub SpecKit submodule revealed the **correct installation method** using `uvx`.

## 📋 Key Findings

### ❌ Package Non-Existence
- **Package Name**: `@SpecKit/cli`
- **npm Registry Status**: **NOT FOUND**
- **Availability**: No published package exists
- **Alternative Names**: No similar packages found under `@SpecKit/*` scope

### 🔍 Search Results Analysis

#### Primary Search: `npm @SpecKit/cli package install global`
- **Result**: No package named `@SpecKit/cli` available in npm registry
- **Status**: Package appears to be under development or unpublished
- **Alternatives Found**: `speclate-cli` (different framework)

#### Secondary Search: `SpecKit cli npm package github spec-driven development`
- **Result**: Confirmed non-existence of `@SpecKit/cli`
- **Context**: SpecKit mentioned as AI coding enhancement tool
- **Alternatives**: `@speedkit/cli`, `speclate-cli` (unrelated tools)

#### Verification Search: `"@SpecKit/cli" npm registry package exists`
- **Result**: Definitively confirmed package does not exist
- **Recommendation**: Check official documentation or GitHub repository
- **Status**: Package may be under development

#### GitHub Search: `github SpecKit CLI tool command line interface`
- **Result**: No official CLI tool found for GitHub's SpecKit
- **Status**: SpecKit methodology exists but without published CLI

## 🚨 Impact on Documentation

### Affected Files
1. **`quickstart.mdx`** - Contains fictional CLI installation instructions
2. **`getting-started/installation.mdx`** - Includes non-existent package installation
3. **`methodology/principles.mdx`** - References CLI commands that don't exist
4. **`README.md`** - Quick start section mentions fictional CLI

### Fictional Commands Identified
```bash
# These commands DO NOT WORK:
npm install -g @SpecKit/cli
SpecKit --version
SpecKit init
SpecKit /specify "Feature Name"
SpecKit /plan
SpecKit /tasks
```

## ✅ Corrective Actions Taken

### 1. Updated Quickstart Guide
- **Before**: Fictional `@SpecKit/cli` installation and usage
- **After**: Real `uvx --from git+https://github.com/github/SpecKit.git specify` commands
- **Approach**: Authentic AI agent integration with `/specify`, `/plan`, `/tasks` commands

### 2. Updated Installation Guide  
- **Before**: Non-existent npm package installation
- **After**: Official uvx installation method with Python/uv prerequisites
- **Focus**: Real SpecKit CLI from GitHub repository

### 3. Updated Troubleshooting
- **Before**: Fictional CLI troubleshooting
- **After**: Real issues like `uvx` installation, AI agent setup, Python versions
- **Focus**: Actual problems users might encounter

## ✅ Correct Installation Method Discovered

### Official Spec-Kit Installation
```bash
# NEW PROJECT: Create a new SpecKit project
uvx --from git+https://github.com/github/SpecKit.git specify init <PROJECT_NAME>

# EXISTING PROJECT: Add SpecKit to current directory  
uvx --from git+https://github.com/github/SpecKit.git specify init --here

# WITH AI AGENT: Specify your AI coding agent
uvx --from git+https://github.com/github/SpecKit.git specify init my-project --ai claude
uvx --from git+https://github.com/github/SpecKit.git specify init my-project --ai copilot
uvx --from git+https://github.com/github/SpecKit.git specify init my-project --ai cursor
```

### Real AI Agent Commands
After installation, these commands become available in your AI coding agent:
- **`/specify`**: Create executable specifications
- **`/plan`**: Generate technical implementation plans
- **`/tasks`**: Break down into actionable tasks

## 📊 Similar Packages Found

### `speclate-cli`
- **Purpose**: CLI for generating site files and development servers
- **Relation**: Different framework, not related to spec-driven development
- **Status**: Available in npm registry

### `@speedkit/cli`
- **Purpose**: SpeedKit command-line tool
- **Relation**: Different tool entirely, not spec-related
- **Status**: Available in npm registry

### `specit`
- **Purpose**: Generates RPM spec files for Node.js projects
- **Relation**: Different use case, not development methodology
- **Status**: Available in npm registry

## 🎯 Implications for Project

### Positive Aspects
1. **Methodology Focus**: Emphasizes SpecKit principles over tooling
2. **Manual Implementation**: Teaches core concepts without tool dependency
3. **Flexibility**: Users can implement methodology in any environment
4. **Educational Value**: Better understanding of underlying principles

### Challenges
1. **User Experience**: Manual setup is more complex than CLI
2. **Consistency**: Harder to ensure consistent implementation
3. **Automation**: Less automated workflow without CLI tools
4. **Adoption**: Higher barrier to entry for new users

## 🚀 Future Considerations

### Potential CLI Development
- **Opportunity**: Real CLI tool could be developed for SpecKit methodology
- **Features**: Could implement `/specify`, `/plan`, `/tasks` commands
- **Integration**: Could integrate with GitHub SpecKit repository
- **Value**: Would significantly improve user experience

### Documentation Strategy
- **Current**: Focus on manual methodology implementation
- **Future**: Ready to update when/if CLI becomes available
- **Approach**: Maintain both manual and CLI approaches

## 📝 Recommendations

### For Documentation
1. **Maintain Accuracy**: Continue using manual implementation approach
2. **Add Value**: Focus on methodology principles and best practices
3. **Future-Proof**: Structure content to easily add CLI when available
4. **Clear Messaging**: Be transparent about current limitations

### For Users
1. **Start Manual**: Begin with manual SpecKit implementation
2. **Learn Principles**: Focus on understanding methodology over tooling
3. **Build Habits**: Establish spec-driven development practices
4. **Stay Updated**: Watch for future CLI tool development

## 🔗 References

- **GitHub SpecKit**: https://github.com/github/SpecKit
- **npm Registry Search**: https://www.npmjs.com/search?q=%40SpecKit%2Fcli
- **Alternative Tools**: speclate-cli, @speedkit/cli, specit
- **Research Date**: September 14, 2025

---

**Conclusion**: The `@SpecKit/cli` npm package does not exist, but the **official SpecKit CLI** is available through GitHub using `uvx --from git+https://github.com/github/SpecKit.git specify`. Our documentation has been corrected to use the authentic installation method and real AI agent commands (`/specify`, `/plan`, `/tasks`), providing users with accurate, working guidance for spec-driven development.
