import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Types
import { TSignIn, TApiError, TSignInResponse } from "@/types";

// API
import { sign_in } from "@/api";

// Providers
import { setUser, setAccessToken } from "@/providers/redux/slice/auth-slice";

// Constants
import { DASHBOARD_URL } from "@/constants/routes";

// Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SignInForm() {
  // Dispatch
  const dispatch = useDispatch();

  // Router
  const navigate = useNavigate();

  const initialValue: TSignIn = {
    email: "hmhwebdev@gmail.com",
    password: "Hifaaz@17112023",
  };

  const resolver = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const form = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(resolver),
  });

  // Mutation
  const { mutate } = useMutation({
    mutationFn: ({ email, password }: TSignIn) =>
      sign_in({
        email,
        password,
      }),
    onError: (error: TApiError) => {
      console.log("Error :: ", error.message);
    },
    onSuccess: (response: TSignInResponse) => {
      form.reset();
      const { access_token, user } = response;
      localStorage.setItem("stock-portfolio-token", access_token);
      dispatch(setUser(user));
      dispatch(setAccessToken(access_token));
      navigate(DASHBOARD_URL);
    },
  });

  const onSubmit = (data: TSignIn) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex w-full justify-center font-semibold"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
