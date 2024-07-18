"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userDetailsFromDB } from "@/logic/userDetailsFromDB";
import { userStateStore } from "@/state/UserMetaData";
import useUserAuthStore from "@/state/userAuthStore";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { object, string } from "yup";
export function SignInComponent() {
  let validateSchema = object({
    password: string().min(8).required(),
    email: string().email().required(),
  });
  const { data, status }: any = useSession();

  const signInState = useUserAuthStore((state: any) => state.signIn);
  useEffect(() => {
    if (data?.user?.giteaUserName) {
      router.push(`${data?.user?.giteaUserName}`);
      signInState(data?.user);
    }
  }, [data]);
  const router = useRouter();

  return (
    <div className="space-y-5">
      <Formik
        initialValues={{ email: "ru@gmail.com", password: "51235123" }}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          
          signIn("credentials", {
            ...values,
          });
          
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-0.5">
              <Label>Email : </Label>
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="your@gmail.com"
              />
              <p className="text-red-500">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between">
                <Label>Passsword : </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                placeholder="******"
              />
              <p className="text-red-500">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting ? true : false} >
              Log in
            </Button>
            <Button
              className="w-full"
              type="submit"
              variant={"outline"}
              disabled={true}
            >
              Login with Google
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
