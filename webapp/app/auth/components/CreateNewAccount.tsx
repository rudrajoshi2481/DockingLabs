import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import Image from "next/image";

import { object, string, number, date, InferType } from "yup";
import { CreateNewUserReq } from "../logic/CreateNewUserReq";
import { toast } from "sonner";

export function CreateNewAccount() {
  let validateSchema = object({
    userName: string().min(3).required(),
    password: string().min(8).required(),
    email: string().email().required(),
  });

  return (
    <div className="space-y-5">
      <Formik
        initialValues={{ email: "", password: "", userName: "" }}
        validationSchema={validateSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const res = await CreateNewUserReq(values);

          console.log(res.data);
          if (!res?.data?.id) {
            toast.error("Faced Error", {
              description: JSON.stringify(res.data),
              closeButton: true,
              dismissible: true,
            });
          } else {
            toast.success("Account Created", {
              dismissible: true,
              important: true,
              description: "You have successfully created an account!",
            });
          }

          setSubmitting(false);
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
              <Label>User Name : </Label>
              <Input
                name="userName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                placeholder="User Name"
              />
              <p className="text-red-500">
                {errors.userName && touched.userName && errors.userName}
              </p>
            </div>
            <div className="space-y-0.5">
              <Label>Passsword : </Label>
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
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Create New Account
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
