# Sankalpana Event Website

Welcome to the **Sankalpana** event website! This is a modern, interactive single-page application built to showcase the event details, schedule, dignitaries, and venue for the Rotaract District event featuring the SHOR Awards and the Installation Ceremony of DRR Rtn. Rtr. Amey Mangesh Varerkar.

## 🌟 Features

- **Dynamic Hero Section**: Engaging landing view with animated components.
- **Interactive Timeline**: A beautifully animated timeline showcasing the event schedule (Registrations, SHOR Awards, District Announcements, etc.).
- **Dignitaries Profile**: Dedicated section highlighting key leaders and guests.
- **Venue & Registration Info**: Clear, responsive layouts for location details and participant registration.
- **Modern Animations**: Powered by `framer-motion` for smooth, performant scroll animations and micro-interactions.
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

This project is built using the following modern web technologies:

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Utilities**: `clsx`, `tailwind-merge`

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have Node.js (v16 or higher) and npm (or yarn/pnpm) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/siddarthsk23/sankalpana.git
   cd sankalpana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build for Production

To build the application for production deployment:

```bash
npm run build
```

The optimized static files will be generated in the `dist` directory. You can preview the production build locally using:

```bash
npm run preview
```

## 📂 Project Structure

```
sankalpana/
├── public/                 # Static assets (images, logos, etc.)
├── src/
│   ├── components/         # Reusable React components (Hero, Timeline, About, etc.)
│   ├── pages/              # Route level components/pages
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Root application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles and Tailwind directives
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## 🎨 Contributing

If you'd like to contribute or make modifications to the website:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed for the Rotaract District Event. Please contact the repository owner for licensing details.
