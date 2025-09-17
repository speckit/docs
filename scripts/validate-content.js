#!/usr/bin/env node

/**
 * Content Validation System for Spec-Kit Documentation
 * Validates content against JSON Schema contracts
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class ContentValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    
    this.loadSchemas();
  }

  loadSchemas() {
    try {
      // Load content API schema
      const contentApiPath = path.join(__dirname, '../specs/001-spec-kit-documentation-website/contracts/content-api.json');
      const contentApiSchema = JSON.parse(fs.readFileSync(contentApiPath, 'utf8'));
      
      // Load navigation schema
      const navigationPath = path.join(__dirname, '../specs/001-spec-kit-documentation-website/contracts/navigation.json');
      const navigationSchema = JSON.parse(fs.readFileSync(navigationPath, 'utf8'));
      
      // Load i18n schema
      const i18nPath = path.join(__dirname, '../specs/001-spec-kit-documentation-website/contracts/i18n.json');
      const i18nSchema = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
      
      // Compile schemas
      this.contentValidator = this.ajv.compile(contentApiSchema.DocumentationPage);
      this.navigationValidator = this.ajv.compile(navigationSchema.NavigationStructure);
      this.i18nValidator = this.ajv.compile(i18nSchema.TranslationStructure);
      
      console.log('✅ Schemas loaded successfully');
    } catch (error) {
      console.error('❌ Error loading schemas:', error.message);
      process.exit(1);
    }
  }

  validateContentFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const frontmatter = parsed.data;
      
      this.validatedFiles++;
      console.log(`📄 Validating: ${filePath}`);

      // Prepare content object for validation
      const contentObject = {
        metadata: {
          ...frontmatter,
          lastModified: frontmatter.lastModified || new Date().toISOString().split('T')[0]
        },
        content: parsed.content
      };

      // Validate against content schema
      const isValid = this.contentValidator(contentObject);
      
      if (!isValid) {
        this.contentValidator.errors.forEach(error => {
          this.errors.push(`❌ ${filePath}: ${error.instancePath} ${error.message}`);
        });
      }

      // Additional custom validations
      this.validateCustomRules(filePath, frontmatter, parsed.content);
      
    } catch (error) {
      this.errors.push(`❌ Error validating ${filePath}: ${error.message}`);
    }
  }

  validateCustomRules(filePath, frontmatter, content) {
    // Check for required keyword variations
    const fullText = (frontmatter.title + ' ' + frontmatter.description + ' ' + content).toLowerCase();
    
    if (!fullText.includes('speckit') && !fullText.includes('spec-kit')) {
      this.errors.push(`❌ ${filePath}: Content must include 'speckit' or 'spec-kit' keywords`);
    }

    // Validate tags include keyword variations
    const tags = frontmatter.tags || [];
    const hasKeywordTag = tags.some(tag => 
      tag.toLowerCase().includes('speckit') || tag.toLowerCase().includes('spec-kit')
    );
    
    if (!hasKeywordTag) {
      this.warnings.push(`⚠️  ${filePath}: Tags should include 'speckit' or 'spec-kit'`);
    }

    // Check content length
    if (content.length < 100) {
      this.warnings.push(`⚠️  ${filePath}: Content is very short (${content.length} characters)`);
    }

    // Validate links (basic check)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkUrl = match[2];
      if (linkUrl.startsWith('./') || linkUrl.startsWith('../')) {
        // Check if relative link exists (simplified)
        const linkPath = path.resolve(path.dirname(filePath), linkUrl.replace('.mdx', '').replace('.md', ''));
        if (!fs.existsSync(linkPath + '.mdx') && !fs.existsSync(linkPath + '.md')) {
          this.warnings.push(`⚠️  ${filePath}: Potential broken link: ${linkUrl}`);
        }
      }
    }
  }

  validateNavigationFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const navigationData = JSON.parse(content);
      
      console.log(`🧭 Validating navigation: ${filePath}`);
      
      const isValid = this.navigationValidator(navigationData);
      
      if (!isValid) {
        this.navigationValidator.errors.forEach(error => {
          this.errors.push(`❌ ${filePath}: ${error.instancePath} ${error.message}`);
        });
      }
      
    } catch (error) {
      this.errors.push(`❌ Error validating navigation ${filePath}: ${error.message}`);
    }
  }

  validateI18nFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const i18nData = JSON.parse(content);
      
      console.log(`🌍 Validating i18n: ${filePath}`);
      
      const isValid = this.i18nValidator(i18nData);
      
      if (!isValid) {
        this.i18nValidator.errors.forEach(error => {
          this.errors.push(`❌ ${filePath}: ${error.instancePath} ${error.message}`);
        });
      }
      
    } catch (error) {
      this.errors.push(`❌ Error validating i18n ${filePath}: ${error.message}`);
    }
  }

  scanDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      this.warnings.push(`⚠️  Directory not found: ${dirPath}`);
      return;
    }

    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
        this.validateContentFile(fullPath);
      } else if (file.name === 'navigation.json') {
        this.validateNavigationFile(fullPath);
      } else if (fullPath.includes('i18n') && file.name.endsWith('.json')) {
        this.validateI18nFile(fullPath);
      }
    });
  }

  generateReport() {
    console.log('\n📋 Content Validation Report');
    console.log('============================');
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
      console.log('\n✅ All content validations passed!');
    }
    
    return this.errors.length === 0;
  }
}

// Main execution
if (require.main === module) {
  const validator = new ContentValidator();
  const rootDir = process.argv[2] || '.';
  
  console.log('🚀 Starting content validation...');
  validator.scanDirectory(rootDir);
  
  const success = validator.generateReport();
  process.exit(success ? 0 : 1);
}

module.exports = ContentValidator;
