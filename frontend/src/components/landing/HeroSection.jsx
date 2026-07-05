import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../common/Container";
import DashboardPreview from "./DashboardPreview";

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div
        className="
            right-40
            absolute
            h-[450px]
            top-20
            rounded-full
            w-[450px]
            blur-3xl
            bg-sky-50
            opacity-25"
      />
      <Container className="grid min-h-[78vh] items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <Badge>🏡 Built for Modern Hostels</Badge>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Modern Hostel
            <br />
            Maintenance,
            <span className="text-blue-600"> Simplified.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Manage complaints, maintenance requests, and hostel operations from
            one modern platform built for students and wardens.
          </p>

          <div className="mt-10 flex gap-4">
            <Button>Get Started</Button>

            <Button variant="outline">Watch Demo</Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <DashboardPreview />
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
