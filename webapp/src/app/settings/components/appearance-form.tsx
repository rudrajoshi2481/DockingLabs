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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useEffect } from "react"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  animationsEnabled: z.boolean().default(true),
  compactMode: z.boolean().default(false),
  codeBlockTheme: z.enum(["monokai", "github", "dracula"], {
    required_error: "Please select a code block theme.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const defaultValues: Partial<AppearanceFormValues> = {
  theme: "system",
  animationsEnabled: true,
  compactMode: false,
  codeBlockTheme: "github",
}

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()
  
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  // Update form when theme changes
  useEffect(() => {
    if (theme) {
      form.setValue("theme", theme as "light" | "dark" | "system")
    }
  }, [theme, form])

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
    toast.success("Appearance settings updated!")
    console.log(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize how DockingLabs looks and feels.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Select your preferred color theme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-3 gap-8 pt-2"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="light"
                              className="sr-only"
                              aria-label="Light theme"
                            />
                          </FormControl>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">
                              Light
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="dark"
                              className="sr-only"
                              aria-label="Dark theme"
                            />
                          </FormControl>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">
                              Dark
                            </span>
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="system"
                              className="sr-only"
                              aria-label="System theme"
                            />
                          </FormControl>
                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent cursor-pointer">
                              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                </div>
                              </div>
                            </div>
                            <span className="block w-full p-2 text-center font-normal">
                              System
                            </span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Display</CardTitle>
              <CardDescription>
                Customize how code blocks appear.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="codeBlockTheme"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Code Block Theme</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-3 gap-8 pt-2"
                      >
                        {["monokai", "github", "dracula"].map((theme) => (
                          <FormItem key={theme}>
                            <FormControl>
                              <RadioGroupItem
                                value={theme}
                                className="sr-only"
                                aria-label={`${theme} theme`}
                              />
                            </FormControl>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <div className="items-center rounded-md border-2 border-muted p-2 hover:border-accent cursor-pointer">
                                <span className="block w-full text-center font-normal capitalize">
                                  {theme}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interface Options</CardTitle>
              <CardDescription>
                Customize additional interface settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="animationsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Interface Animations
                      </FormLabel>
                      <FormDescription>
                        Enable smooth transitions and animations.
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
                name="compactMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Compact Mode
                      </FormLabel>
                      <FormDescription>
                        Reduce spacing and padding throughout the interface.
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
