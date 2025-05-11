const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY!,
  STRIPE_PUBLISHABLE_KEY: process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
};

export default CONFIG;
