import Container from "../common/Container";
import Logo from "../common/Logo";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo */}
          <div>
            <Logo />

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Simplifying hostel maintenance through one modern platform.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white">Product</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Workflow</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white">Resources</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white">Legal</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 FixFlow. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
