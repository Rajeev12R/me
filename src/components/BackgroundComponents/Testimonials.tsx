'use client'
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Jiya",
    username: "@jiya",
    body: "Rajeev built my portfolio, and I couldn’t be happier — it perfectly captures my style and skills!",
    img: "https://avatar.vercel.sh/jiya",
  },
  {
    name: "Arun",
    username: "@arun",
    body: "I am pleased to have Rajeev as a web developer, loved my website",
    img: "https://avatar.vercel.sh/arun",
  },
  {
    name: "Krishna",
    username: "@krishna",
    body: "Got my college project made by Rajeev Bhaiya. It was great",
    img: "https://avatar.vercel.sh/krishna",
  },
  {
    name: "Priya",
    username: "@priya",
    body: "Excellent work by Rajeev on our e-commerce site. Highly recommend!",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Rahul",
    username: "@rahul",
    body: "Rajeev delivered my project ahead of schedule with perfect quality",
    img: "https://avatar.vercel.sh/rahul",
  },
  {
    name: "Neha",
    username: "@neha",
    body: "Professional approach and creative solutions from Rajeev",
    img: "https://avatar.vercel.sh/neha",
  },
  {
    name: "Vikram",
    username: "@vikram",
    body: "Rajeev transformed my business with an amazing web application",
    img: "https://avatar.vercel.sh/vikram",
  },
  {
    name: "Ananya",
    username: "@ananya",
    body: "Responsive design and clean code - exactly what I requested",
    img: "https://avatar.vercel.sh/ananya",
  },
  {
    name: "Mohit",
    username: "@mohit",
    body: "Rajeev's technical expertise exceeded my expectations",
    img: "https://avatar.vercel.sh/mohit",
  },
  {
    name: "Sneha",
    username: "@sneha",
    body: "Great communication throughout the project development",
    img: "https://avatar.vercel.sh/sneha",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "inline-flex h-full w-64 cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border p-4",
        "border-gray-800 bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex items-center gap-2">
        <img className="rounded-full" width={32} height={32} alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="w-full bg-black text-white py-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-center capitalize mb-6">
        What people say about me
      </h1>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
        <Marquee pauseOnHover className="flex gap-4 [--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="flex gap-4 [--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Optional gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/100 to-black/0"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/100 to-black/0"></div>
      </div>
    </div>
  );
}
