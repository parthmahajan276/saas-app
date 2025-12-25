"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  number, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.action";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1,{ message: 'name is required'}),
  subject: z.string().min(1, { message: 'Subject is required'}),
  topic: z.string().min(1, { message: 'topic is required'}),
  voice: z.string().min( 1, { message: 'voice is required'}),
  style: z.string().min( 1, { message: 'Style is required'}),
  duration: z.coerce.number().min(1, { message: 'duration is required'}),
})

const CompanionForm = () => {
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
    mode:"onBlur",
  });

  
  const onSubmit=async (values: z.infer<typeof formSchema>) => {
      const companion = await createCompanion(values);
       
      if(companion){
         redirect(`/companions/${companion.id}`);
      }
      else{
        console.log('failed to create a companion');
        redirect('/');
      }
    }

return(
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter The Comapnion Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>subject</FormLabel>
              <FormControl>
              <Select 
                 onValueChange={field.onChange}
                 value={field.value}
                 defaultValue={field.value}>

  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="select the subject" />
  </SelectTrigger>
  <SelectContent>
   {subjects.map((subject)=>(
       <SelectItem 
            value={subject}
            key={subject}
            className="capitalize">
        {subject}
       </SelectItem>
   ))}
  </SelectContent>
</Select>
              </FormControl>
              <FormMessage />
            </FormItem>
       )}
        />
         <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>what should the companion help with?</FormLabel>
              <FormControl>
               <Textarea 
                placeholder="ex. Derivatives & Integrals"
                {...field}
                 className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
              <Select 
                 onValueChange={field.onChange}
                 value={field.value}
                 defaultValue={field.value}>

  <SelectTrigger className="input">
    <SelectValue placeholder="select the voice" />
  </SelectTrigger>
  <SelectContent>
       <SelectItem value="male" >
         Male
       </SelectItem>
       <SelectItem value="female" >
         Female
       </SelectItem>
  </SelectContent>
</Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>style</FormLabel>
              <FormControl>
              <Select 
                 onValueChange={field.onChange}
                 value={field.value}
                 defaultValue={field.value}>

  <SelectTrigger className="input">
    <SelectValue placeholder="select the style" />
  </SelectTrigger>
  <SelectContent>
       <SelectItem value="formal" >
         Formal
       </SelectItem>
       <SelectItem value="casual" >
         Casual
       </SelectItem>
  </SelectContent>
</Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer mb-10">Build Your Companion</Button>
      </form>
    </Form>
)

}

export default CompanionForm
