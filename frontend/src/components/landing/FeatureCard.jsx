import Card from "../ui/Card";

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </Card>
  );
}

export default FeatureCard;
