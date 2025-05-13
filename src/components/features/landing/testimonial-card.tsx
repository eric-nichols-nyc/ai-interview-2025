import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4 text-4xl text-primary">&quot;</div>
        <p className="text-muted-foreground">{quote}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">
          {role}, {company}
        </div>
      </CardFooter>
    </Card>
  );
}
