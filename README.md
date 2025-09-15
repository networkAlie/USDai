# USDai — UML Preview Platform

Advanced interactive UML diagram visualization platform built for **USDai** by [Alie Network](https://www.alie.network).

![USDai UML Preview](https://img.shields.io/badge/USDai-UML%20Preview-blue?style=for-the-badge)
![Built by Alie Network](https://img.shields.io/badge/Built%20by-Alie%20Network-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🌟 About USDai UML Preview

Professional-grade UML diagram visualization platform designed specifically for **USDai** ecosystem documentation and system architecture presentations. This platform provides interactive, high-quality diagram rendering with advanced zoom capabilities, ensuring perfect clarity for technical documentation and client presentations.

## 🎯 Key Features

- **Interactive Zoom & Pan**: High-quality zoom without image degradation
- **Dark/Light Theme**: Professional theming with system preference detection
- **Real-time Rendering**: Mermaid diagrams render instantly
- **Export Options**: Download as SVG, copy Mermaid code
- **Search & Filter**: Find diagrams by name, description, or tags
- **Mobile Responsive**: Works perfectly on all devices
- **Customer-Friendly**: Professional presentation interface

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Diagrams**: Mermaid.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Zoom**: React Zoom Pan Pinch

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd USDai

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

```bash
# Or deploy via CLI
npx vercel --prod
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎨 Features Overview

### Interactive Diagram Viewer
- **Zoom Controls**: Zoom in/out, reset view, fullscreen mode
- **Pan Support**: Drag to navigate large diagrams
- **Quality Preservation**: SVG-based rendering maintains quality at all zoom levels

### Professional UI
- **Dark Theme**: Eye-friendly dark mode with proper contrast
- **Glass Morphism**: Modern translucent effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach

### Export & Sharing
- **SVG Export**: Download diagrams as scalable vector graphics
- **Code Copy**: Copy Mermaid source code to clipboard
- **URL Sharing**: Direct links to specific diagrams

### Content Management
- **Categorization**: Diagrams organized by system type
- **Tagging**: Filter by technology, process type, etc.
- **Search**: Full-text search across titles and descriptions
- **Source View**: Toggle between diagram and source code

## 🎯 Diagram Categories

### Marketing System
- Growth funnel workflows
- KOL collaboration sequences
- Launch planning timelines
- Measurement architectures

### Technical Architecture
- AI agent system design
- Privacy-first data flows
- Integration patterns

### Data Pipeline
- Real-time analytics
- ETL processes
- Streaming architectures

## 🔧 Configuration

### Environment Variables
Create `.env.local` for any configuration:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Customization

#### Adding New Diagrams
Edit `src/lib/diagrams.ts`:

```typescript
{
  id: "unique-id",
  group: "Category Name",
  title: "Diagram Title",
  description: "Brief description",
  tags: ["tag1", "tag2"],
  code: `mermaid diagram code here`
}
```

#### Styling
Customize colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    // ... other shades
  }
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎬 Demo

Visit the live demo: [USD AI UML Preview](https://your-vercel-url.vercel.app)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Alie Network

USD AI UML Preview is built by [Alie Network](https://alie.network) for professional diagram visualization and customer presentations.

---

**Built with ❤️ for better UML visualization**