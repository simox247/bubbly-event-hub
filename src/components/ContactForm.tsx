import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  eventDate: z.string().min(1, "Please select at least one event date"),
  venue: z.string().trim().min(2, "Venue/area is required").max(200),
  guestCount: z.string().min(1, "Please select guest count"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  notes: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

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
    
    try {
      // Submit to Web3Forms
      const formData = {
        access_key: "bcc347d5-168e-48bb-a759-800f5b138a44",
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: "New Quote Request from Dr Beverage Website",
        message: `
Event Date: ${data.eventDate}
Venue/Area: ${data.venue}
Guest Count: ${data.guestCount}
Services: ${data.services.join(", ")}
Additional Notes: ${data.notes || "None"}
        `,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        toast({
          title: "Quote request sent!",
          description: "We've received your request and will get back to you within 24 hours.",
        });
        
        // Reset form
        form.reset();
        setSelectedDates([]);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    }
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
                        <Input 
                          placeholder="+20 XXX XXX XXXX" 
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value;
                            // Remove all non-digit characters except +
                            value = value.replace(/[^\d+]/g, '');
                            // If user hasn't typed + or starts typing digits, add +20
                            if (value && !value.startsWith('+')) {
                              value = '+2' + value;
                            }
                            // If empty or just +, allow it
                            field.onChange(value);
                          }}
                        />
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date(s) *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <span className="truncate">{field.value}</span>
                              ) : (
                                <span>Pick date(s) or range</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50 flex-shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            classNames={{
                              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:rounded-md",
                              day_selected: "!bg-accent !text-white hover:!bg-accent hover:!text-white focus:!bg-accent focus:!text-white !font-semibold !rounded-md",
                              day_today: "!bg-transparent !text-foreground !font-normal"
                            }}
                            onSelect={(dates: Date[] | undefined) => {
                              if (dates && dates.length > 0) {
                                setSelectedDates(dates);
                                const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
                                
                                if (sortedDates.length === 1) {
                                  field.onChange(format(sortedDates[0], "MMM dd, yyyy"));
                                } else if (sortedDates.length === 2) {
                                  // Check if it's a continuous range
                                  const daysDiff = Math.round((sortedDates[1].getTime() - sortedDates[0].getTime()) / (1000 * 60 * 60 * 24));
                                  if (daysDiff <= 1) {
                                    // Adjacent days or same day - show as individual dates
                                    field.onChange(
                                      sortedDates.map((d) => format(d, "MMM dd")).join(", ") + `, ${format(sortedDates[1], "yyyy")}`
                                    );
                                  } else {
                                    // Show as range
                                    field.onChange(
                                      `${format(sortedDates[0], "MMM dd")} - ${format(sortedDates[1], "MMM dd, yyyy")}`
                                    );
                                  }
                                } else {
                                  // Multiple dates - show all
                                  field.onChange(
                                    sortedDates.map((d) => format(d, "MMM dd")).join(", ") + `, ${format(sortedDates[sortedDates.length - 1], "yyyy")}`
                                  );
                                }
                              } else {
                                setSelectedDates([]);
                                field.onChange("");
                              }
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            className="rounded-md"
                          />
                          {selectedDates.length > 0 && (
                            <div className="px-3 py-2.5 bg-muted/30 border-t">
                              <p className="text-xs text-center text-muted-foreground">
                                <span className="font-semibold text-accent">{selectedDates.length}</span> {selectedDates.length === 1 ? 'day' : 'days'} selected
                              </p>
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>
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
