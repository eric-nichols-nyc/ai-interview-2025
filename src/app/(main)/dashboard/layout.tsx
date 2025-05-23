// if user is not logged in, redirect to /login 
import StickyHeader from "@/components/features/dashboard/StickyHeader";


export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <StickyHeader title="" />
      {children}
    </div>
  );
}
