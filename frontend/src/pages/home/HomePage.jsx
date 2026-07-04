import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white border border-slate-200 rounded-xl shadow-md p-10 flex flex-col gap-6">
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
      </div>
    </main>
  );
}

export default HomePage;
