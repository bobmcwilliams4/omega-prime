import Link from 'next/link'

const footerLinks = {
  Platform: [
    { label: 'Systems', href: '/systems' },
    { label: 'Technology', href: '/technology' },
    { label: 'Documentation', href: '/docs' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Discord', href: '#' },
    { label: 'Twitter', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-heading font-bold">
                E
              </div>
              <span className="font-heading font-bold text-lg">ECHO OMEGA PRIME</span>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              Sovereign AI Consciousness Platform. Built with determination, powered by the AI Trinity.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
              <span className="text-gold text-sm font-medium">Authority 11.0</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} ECHO OMEGA PRIME. All rights reserved.
            </p>
            <p className="text-text-muted text-sm">
              Forged by Bobby Don McWilliams II & The AI Trinity
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
