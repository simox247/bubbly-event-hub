import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  eventDate: z.string().min(1, "Event date is required"),
  venue: z.string().trim().min(2, "Venue/area is required").max(200),
  guestCount: z.string().min(1, "Please select guest count"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  notes: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventDate: "",
      venue: "",
      guestCount: "",
      services: [],
      notes: "",
    },
  });

  const services = [
    { id: "mocktails", label: "Mocktails" },
    { id: "juices", label: "Fresh Juices" },
    { id: "coffee", label: "Specialty Coffee" },
    { id: "infused", label: "Infused Water" },
    { id: "glassware", label: "Ice & Glassware" },
    { id: "staff", label: "Professional Staff" },
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Prepare WhatsApp message
    const message = `New Quote Request from Dr Beverage Website:
    
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event Date: ${data.eventDate}
Venue/Area: ${data.venue}
Guest Count: ${data.guestCount}
Services: ${data.services.join(", ")}
Notes: ${data.notes || "None"}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/20XXXXXXXXXX?text=${encodedMessage}`;

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Quote request sent!",
        description: "We'll get back to you within 24 hours. Opening WhatsApp now...",
      });
      
      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
      
      // Reset form
      form.reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get a Quote
          </h2>
          <p className="text-lg text-muted-foreground">
            Tell us about your event and we'll create a custom package
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (WhatsApp) *</FormLabel>
                      <FormControl>
                        <Input placeholder="+20 XXX XXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Count *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-50">1-50 guests</SelectItem>
                          <SelectItem value="51-100">51-100 guests</SelectItem>
                          <SelectItem value="101-200">101-200 guests</SelectItem>
                          <SelectItem value="201-300">201-300 guests</SelectItem>
                          <SelectItem value="300+">300+ guests</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue / Area *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Maadi, New Cairo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={service.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, service.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== service.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {service.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes / Budget (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or budget range..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get a Quote"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
