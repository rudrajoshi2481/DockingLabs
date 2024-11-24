"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const displayFormSchema = z.object({
  density: z.enum(["comfortable", "compact", "cozy"], {
    required_error: "Please select a layout density.",
  }),
  fontSize: z.enum(["small", "medium", "large"], {
    required_error: "Please select a font size.",
  }),
  reduceMotion: z.boolean().default(false),
  sidebarCollapsed: z.boolean().default(false),
  showLineNumbers: z.boolean().default(true),
  wrapText: z.boolean().default(false),
  tabSize: z.enum(["2", "4", "8"], {
    required_error: "Please select a tab size.",
  }),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

const defaultValues: Partial<DisplayFormValues> = {
  density: "comfortable",
  fontSize: "medium",
  reduceMotion: false,
  sidebarCollapsed: false,
  showLineNumbers: true,
  wrapText: false,
  tabSize: "4",
}

export function DisplayForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  })

  function onSubmit(data: DisplayFormValues) {
    toast.success("Display settings updated!")
    console.log(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-sm text-muted-foreground">
          Customize how DockingLabs looks and feels.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Layout Preferences</CardTitle>
              <CardDescription>
                Customize the layout and spacing of the interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Layout Density</FormLabel>
                    <FormDescription>
                      Choose how compact you want the interface to be.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-3 gap-8 pt-2"
                      >
                        {["comfortable", "compact", "cozy"].map((density) => (
                          <FormItem key={density}>
                            <FormControl>
                              <RadioGroupItem
                                value={density}
                                className="sr-only"
                                aria-label={`${density} density`}
                              />
                            </FormControl>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <div className="items-center rounded-md border-2 border-muted p-2 hover:border-accent cursor-pointer">
                                <span className="block w-full text-center font-normal capitalize">
                                  {density}
                                </span>
                              </div>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Size</FormLabel>
                    <FormDescription>
                      Select your preferred font size for text and code.
                    </FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code View Settings</CardTitle>
              <CardDescription>
                Customize how code is displayed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="showLineNumbers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Show Line Numbers
                      </FormLabel>
                      <FormDescription>
                        Display line numbers in code blocks.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wrapText"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Wrap Text
                      </FormLabel>
                      <FormDescription>
                        Wrap long lines of code instead of scrolling horizontally.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tabSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tab Size</FormLabel>
                    <FormDescription>
                      Number of spaces for each tab in code blocks.
                    </FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tab size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2 spaces</SelectItem>
                        <SelectItem value="4">4 spaces</SelectItem>
                        <SelectItem value="8">8 spaces</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Customize accessibility settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="reduceMotion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Reduce Motion
                      </FormLabel>
                      <FormDescription>
                        Minimize animations and transitions.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sidebarCollapsed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Collapsed Sidebar
                      </FormLabel>
                      <FormDescription>
                        Start with the sidebar collapsed by default.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Save preferences</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
