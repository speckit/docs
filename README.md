# Speckit Documentation

This repository contains the documentation for Speckit, built with [Mintlify](https://mintlify.com).

## 🚀 Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command:

```bash
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is):

```bash
mintlify dev
```

The documentation website is now available at `http://localhost:3000`.

### Custom Ports

Mintlify uses port 3000 by default. You can use the `--port` flag to customize the port Mintlify runs on.

```bash
mintlify dev --port 3333
```

## 📁 Project Structure

```
├── mint.json                 # Mintlify configuration
├── introduction.mdx          # Homepage
├── quickstart.mdx           # Quick start guide
├── development.mdx          # Development setup
├── essentials/              # Essential documentation
│   ├── markdown.mdx
│   ├── code.mdx
│   ├── images.mdx
│   ├── settings.mdx
│   └── navigation.mdx
├── api-reference/           # API documentation
│   ├── introduction.mdx
│   └── endpoint/
│       ├── get.mdx
│       ├── create.mdx
│       └── delete.mdx
├── images/                  # Static images
└── logo/                   # Logo files
```

## 🎨 Customization

### Branding

- Update `mint.json` to customize colors, logo, and navigation
- Add your logo files to the `/logo` directory
- Update social links and contact information

### Content

- All content is written in MDX (Markdown + React components)
- Use Mintlify's built-in components for enhanced documentation
- Follow the existing structure for consistency

## 🚀 Deployment

This documentation is automatically deployed when changes are pushed to the main branch. The deployment is handled by Mintlify's GitHub integration.

## 📚 Learn More

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Speckit Website](https://speckit.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `mintlify dev`
5. Submit a pull request

## 📄 License

This documentation is licensed under the MIT License.
