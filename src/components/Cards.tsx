import SubscribeBtn from "./SubscribeBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function ServiceCard({
  service,
}: {
  service: {
    title: string;
    description: string;
    icon: React.ElementType;
    features: string[];
  };
}) {
  return (
    <Card
      key={service.title}
      className="flex flex-col hover:scale-[1.02] duration-200">
      <CardHeader>
        <div className="bg-other w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <service.icon className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <CardDescription className="text-base">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <SubscribeBtn className="w-full">Subscribe</SubscribeBtn>
      </CardFooter>
    </Card>
  );
}

export function FeatureCard({
  feature,
}: {
  feature: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
}) {
  return (
    <Card
      key={feature.title}
      className="rounded-3xl sm:flex items-start gap-4 p-7 cursor-pointer group hover:bg-other shadow-lg hover:scale-[1.02] duration-300 select-none">
      <div className="inline-flex rounded-full bg-other group-hover:bg-card p-3 m-2">
        <feature.icon className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-xl">{feature.title}</h3>
        <p className="text-foreground/70">{feature.description}</p>
      </div>
    </Card>
  );
}

export function ContactCard({
  contact,
}: {
  contact: {
    title: string;
    subtitle: string;
    link: string;
    icon: React.ElementType;
  };
}) {
  return (
    <a
      key={contact.title}
      href={contact.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full">
      <Card className="rounded-xl cursor-pointer group hover:bg-other hover:scale-[1.02] duration-300 select-none">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-other group-hover:bg-card p-3">
              <contact.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{contact.title}</h3>
              <p className="text-foreground/70">{contact.subtitle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
