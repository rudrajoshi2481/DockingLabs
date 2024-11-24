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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe2, Lock, Users, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const projectFormSchema = z.object({
  name: z.string().min(3, {
    message: "Repository name must be at least 3 characters.",
  }).refine(value => /^[a-z0-9-]+$/.test(value), {
    message: "Repository name can only contain lowercase letters, numbers, and hyphens.",
  }),
  description: z.string().max(500, {
    message: "Description must not exceed 500 characters.",
  }).optional(),
  visibility: z.enum(["public", "private", "internal"]),
  readme: z.boolean().default(true),
  gitignore: z.boolean().default(true),
  license: z.string().optional(),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

const defaultValues: Partial<ProjectFormValues> = {
  visibility: "private",
  readme: true,
  gitignore: true,
}

export function NewProjectForm() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProjectFormValues) {
    toast.success("Repository created successfully!")
    console.log(data)
  }

  return (
    <div className="container max-w-3xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Create a new repository</h3>
          <p className="text-sm text-muted-foreground">
            A repository contains all your project files, including documentation and data.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Creating a new repository will initialize it with the selected options. You can always change these settings later.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repository name</FormLabel>
                      <FormControl>
                        <Input placeholder="my-research-project" {...field} />
                      </FormControl>
                      <FormDescription>
                        Great repository names are short and memorable. Use lowercase letters, numbers, and hyphens only.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description <span className="text-sm text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description of your research project..."
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your project. Max 500 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Repository visibility</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public" className="flex items-center">
                              <Globe2 className="mr-2 h-4 w-4" />
                              <div>
                                <span className="font-medium">Public</span>
                                <p className="text-sm text-muted-foreground">
                                  Anyone can see this repository. You choose who can commit.
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="internal" id="internal" />
                            <Label htmlFor="internal" className="flex items-center">
                              <Users className="mr-2 h-4 w-4" />
                              <div>
                                <span className="font-medium">Internal</span>
                                <p className="text-sm text-muted-foreground">
                                  Members of your organization can see this repository.
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private" className="flex items-center">
                              <Lock className="mr-2 h-4 w-4" />
                              <div>
                                <span className="font-medium">Private</span>
                                <p className="text-sm text-muted-foreground">
                                  You choose who can see and commit to this repository.
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="readme"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Initialize this repository with a README
                          </FormLabel>
                          <FormDescription>
                            This will create a README.md file to help share information about your project.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gitignore"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Add .gitignore
                          </FormLabel>
                          <FormDescription>
                            Choose which files Git should ignore based on your project type.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="license"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a license" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mit">MIT License</SelectItem>
                            <SelectItem value="apache">Apache License 2.0</SelectItem>
                            <SelectItem value="gpl">GNU GPL v3</SelectItem>
                            <SelectItem value="cc">Creative Commons</SelectItem>
                            <SelectItem value="none">No License (Copyrighted)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          A license tells others what they can and can't do with your code.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Create repository
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

