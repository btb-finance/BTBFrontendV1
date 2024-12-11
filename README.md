# BTB Frontend

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Follow on X](https://img.shields.io/twitter/follow/btbfinance?style=social)](https://twitter.com/btbfinance)
[![Telegram](https://img.shields.io/badge/Telegram-@btbfinance-blue)](https://t.me/btbfinance)
[![Instagram](https://img.shields.io/badge/Instagram-@btb__finance-purple)](https://instagram.com/btb_finance)

<p align="center">
  <img src="https://raw.githubusercontent.com/btb-finance/BTBFrontend/refs/heads/master/public/btb.png" alt="BTB Finance Logo" width="200"/>
</p>

</div>

## Description

BTB (Better Than Before) is a cutting-edge DeFi platform built on Solana, revolutionizing how you interact with decentralized financial markets. Our platform combines advanced blockchain technology with an intuitive user interface to provide a seamless DeFi experience.

## Features

- **Solana Integration** - Built on Solana's high-performance blockchain
- **Web3 Wallet Support** - Compatible with Phantom, Solflare, and other Solana wallets
- **Modern UI/UX** - Built with Next.js 14 and Radix UI components
- **Responsive Design** - Optimized for all devices with Tailwind CSS
- **Dark/Light Mode** - Theme support with next-themes
- **Interactive Charts** - Financial data visualization with Recharts
- **Type Safety** - Full TypeScript support
- **Testing** - Comprehensive Jest and React Testing Library setup

## Tech Stack

### Core
- ![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Styling
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

### Blockchain
- ![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
- Anchor Framework
- Web3.js

### Testing
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
- React Testing Library

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- A Solana wallet (Phantom or Solflare recommended)

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/btb-finance/BTBFrontend.git
cd BTBFrontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Run tests**
```bash
npm test
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Project Structure

```
BTBFrontend/
├── app/              # Next.js 14 app directory
├── components/       # React components
│   ├── background/  # Background components
│   └── ui/          # UI components
├── public/          # Static files
├── styles/          # Global styles
├── lib/             # Utility functions
├── hooks/           # Custom React hooks
└── __tests__/       # Test files
```

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
   - Create your own fork of the code

2. **Create a Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Changes**
   - Write your code
   - Add or update tests
   - Update documentation

4. **Follow Coding Standards**
   - Use TypeScript for type safety
   - Follow the existing code style
   - Run tests before submitting

5. **Commit Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/AmazingFeature
   ```
   Then create a Pull Request on GitHub

## Development Guidelines

- Use TypeScript for all new code
- Write tests for new features
- Follow the component structure in place
- Use Tailwind CSS for styling
- Ensure responsive design
- Keep accessibility in mind

## Connect With Us

<div align="center">

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/btbfinance)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/btbfinance)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/btb_finance)

</div>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

---

Made with ❤️ by the BTB Finance Team

</div>
