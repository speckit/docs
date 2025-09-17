#!/usr/bin/env node

/**
 * SEO Validation Script for Spec-Kit Documentation
 * Validates that all content includes proper SEO optimization
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// SEO validation rules
const SEO_RULES = {
  requiredKeywords: ['speckit', 'spec-kit'],
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  descriptionMinLength: 120,
  requiredFrontmatter: ['title', 'description', 'tags', 'seoKeywords']
};

class SEOValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
  }

  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const frontmatter = parsed.data;
      
      this.validatedFiles++;
      console.log(`📄 Validating: ${filePath}`);

      // Check required frontmatter fields
      this.validateRequiredFields(filePath, frontmatter);
      
      // Validate title
      this.validateTitle(filePath, frontmatter.title);
      
      // Validate description
      this.validateDescription(filePath, frontmatter.description);
      
      // Validate keyword presence
      this.validateKeywords(filePath, frontmatter, parsed.content);
      
      // Validate SEO keywords
      this.validateSEOKeywords(filePath, frontmatter.seoKeywords);
      
    } catch (error) {
      this.errors.push(`❌ Error reading ${filePath}: ${error.message}`);
    }
  }

  validateRequiredFields(filePath, frontmatter) {
    SEO_RULES.requiredFrontmatter.forEach(field => {
      if (!frontmatter[field]) {
        this.errors.push(`❌ ${filePath}: Missing required field '${field}'`);
      }
    });
  }

  validateTitle(filePath, title) {
    if (!title) return;
    
    if (title.length > SEO_RULES.titleMaxLength) {
      this.warnings.push(`⚠️  ${filePath}: Title too long (${title.length} > ${SEO_RULES.titleMaxLength})`);
    }
    
    const hasKeyword = SEO_RULES.requiredKeywords.some(keyword => 
      title.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasKeyword) {
      this.warnings.push(`⚠️  ${filePath}: Title should include 'speckit' or 'spec-kit'`);
    }
  }

  validateDescription(filePath, description) {
    if (!description) return;
    
    if (description.length > SEO_RULES.descriptionMaxLength) {
      this.errors.push(`❌ ${filePath}: Description too long (${description.length} > ${SEO_RULES.descriptionMaxLength})`);
    }
    
    if (description.length < SEO_RULES.descriptionMinLength) {
      this.warnings.push(`⚠️  ${filePath}: Description too short (${description.length} < ${SEO_RULES.descriptionMinLength})`);
    }
    
    const hasKeyword = SEO_RULES.requiredKeywords.some(keyword => 
      description.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasKeyword) {
      this.warnings.push(`⚠️  ${filePath}: Description should include 'speckit' or 'spec-kit'`);
    }
  }

  validateKeywords(filePath, frontmatter, content) {
    const tags = frontmatter.tags || [];
    const fullText = (frontmatter.title + ' ' + frontmatter.description + ' ' + content).toLowerCase();
    
    // Check if both keyword variations are present
    const hasSpeckit = fullText.includes('speckit');
    const hasSpecKit = fullText.includes('spec-kit');
    
    if (!hasSpeckit && !hasSpecKit) {
      this.errors.push(`❌ ${filePath}: Content must include 'speckit' or 'spec-kit' keywords`);
    } else if (!hasSpeckit || !hasSpecKit) {
      this.warnings.push(`⚠️  ${filePath}: Consider including both 'speckit' and 'spec-kit' for better SEO`);
    }
    
    // Check tags include required keywords
    const hasKeywordTag = SEO_RULES.requiredKeywords.some(keyword => 
      tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    if (!hasKeywordTag) {
      this.warnings.push(`⚠️  ${filePath}: Tags should include 'speckit' or 'spec-kit'`);
    }
  }

  validateSEOKeywords(filePath, seoKeywords) {
    if (!seoKeywords || !Array.isArray(seoKeywords)) {
      this.errors.push(`❌ ${filePath}: seoKeywords must be an array`);
      return;
    }
    
    const hasSpeckitKeyword = seoKeywords.some(keyword => 
      keyword.toLowerCase().includes('speckit') || keyword.toLowerCase().includes('spec-kit')
    );
    
    if (!hasSpeckitKeyword) {
      this.errors.push(`❌ ${filePath}: seoKeywords must include 'speckit' or 'spec-kit' variations`);
    }
  }

  scanDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dirPath, file.name);
      
      // Skip node_modules, .git, and other non-content directories
      if (file.isDirectory()) {
        if (!['node_modules', '.git', '.github', 'scripts', 'seo'].includes(file.name)) {
          this.scanDirectory(fullPath);
        }
      } else if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
        // Only validate our documentation files, not dependency files
        if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
          this.validateFile(fullPath);
        }
      }
    });
  }

  generateReport() {
    console.log('\n🔍 SEO Validation Report');
    console.log('========================');
    console.log(`📊 Files validated: ${this.validatedFiles}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => console.log(error));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All SEO validations passed!');
    }
    
    return this.errors.length === 0;
  }
}

// Main execution
if (require.main === module) {
  const validator = new SEOValidator();
  const rootDir = process.argv[2] || '.';
  
  console.log('🚀 Starting SEO validation...');
  validator.scanDirectory(rootDir);
  
  const success = validator.generateReport();
  process.exit(success ? 0 : 1);
}

module.exports = SEOValidator;
