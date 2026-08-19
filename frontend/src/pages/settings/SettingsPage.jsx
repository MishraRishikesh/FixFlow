import { Settings } from "lucide-react";

import Card from "../../components/ui/Card";

function SettingsPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Settings size={30} />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Settings are coming soon
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          We are preparing exciting customization options to make your FixFlow
          experience even better.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          More control. More customization. Coming soon.
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
