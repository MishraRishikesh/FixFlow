import Logo from "../common/Logo";
import Button from "../ui/Button";
import Container from "../common/Container";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Workflow
          </a>

          <a
            href="/login"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Login
          </a>

          <Button size="sm">Get Started</Button>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
