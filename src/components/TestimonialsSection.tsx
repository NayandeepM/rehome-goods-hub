
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Sample data (in a real app, this would come from an API)
const TESTIMONIALS = [
  {
    id: "1",
    quote: "ReHome has completely changed how I shop for home goods. I've found amazing vintage pieces at great prices, and the selling process is so easy!",
    author: "Sarah J.",
    location: "Portland, OR",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: "2",
    quote: "As someone who cares about sustainability, I love that I can give my unused items a new home. The process was simple and the community is amazing.",
    author: "Michael T.",
    location: "Austin, TX",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: "3",
    quote: "I've made over $1,500 selling items I no longer need. The platform is extremely user-friendly and the customer service is fantastic.",
    author: "Elena R.",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: "4",
    quote: "I furnished my entire apartment with second-hand treasures from ReHome. Not only did I save money, but each piece has a story behind it.",
    author: "David L.",
    location: "San Francisco, CA",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-rehome-green-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-rehome-neutral-900 sm:text-3xl lg:text-4xl">
            What Our Community Says
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-rehome-neutral-600">
            Join thousands of happy buyers and sellers who are part of our sustainable marketplace
          </p>
        </div>
        
        <div className="mt-12">
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-rehome-neutral-900">{testimonial.author}</h3>
                        <p className="text-sm text-rehome-neutral-500">{testimonial.location}</p>
                      </div>
                    </div>
                    <blockquote className="text-rehome-neutral-700">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
