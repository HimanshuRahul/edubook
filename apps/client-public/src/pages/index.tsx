import Landing from "@/components/Landing";

export default function Home() {
  const secret = process.env["NEXT_PUBLIC_ADMIN_SECRET"];
  console.log("inside homepage secret - " + secret);
  return (
    <>
      <Landing />
    </>
  );
}
