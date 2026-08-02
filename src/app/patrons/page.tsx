import { redirect } from "next/navigation";

/**
 * The patron landing page is now the site root.
 * Kept as a server-side redirect so existing links and shared URLs still work.
 */
const PatronPage = () => {
  redirect("/");
};

export default PatronPage;
