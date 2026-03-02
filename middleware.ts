import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/meeting(.*)",
  "/previous",
  "/recordings",
  "/personal-room",
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
      return redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};