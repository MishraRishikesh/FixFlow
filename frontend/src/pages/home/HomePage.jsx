import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <Card className="flex flex-col gap-6 max-w-2xl w-full">
        <h1 className="text-4xl font-bold">FixFlow UI</h1>

        <div className="flex gap-4 flex-wrap">
          <Button>Primary</Button>

          <Button variant="secondary">Secondary</Button>

          <Button variant="danger">Delete</Button>

          <Button variant="outline">Outline</Button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button size="sm">Small</Button>

          <Button size="md">Medium</Button>

          <Button size="lg">Large</Button>
        </div>

        <Button fullWidth>Full Width</Button>

        <Button loading>Saving...</Button>

        <Button disabled>Disabled</Button>

        <div className="flex flex-col gap-4">
          <Input label="Email" placeholder="Enter your email" />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />

          <Input
            label="Room Number"
            placeholder="Example: B-203"
            error="Room number is required"
          />
        </div>
      </Card>
    </main>
  );
}

export default HomePage;
