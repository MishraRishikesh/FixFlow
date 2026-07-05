import Container from "../common/Container";
import Button from "../ui/Button";

function CTASection() {
  return (
    <section className="bg-blue-600 py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white lg:text-5xl">
            Ready to Transform Hostel Management?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Empower students, wardens, and workers with one unified platform for
            maintenance management.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Button variant="light" size="lg">
              Get Started
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
