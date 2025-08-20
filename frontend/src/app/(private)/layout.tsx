import Header from "@/components/hoc/LayoutComponent/Header";
import Footer from "@/components/hoc/LayoutComponent/Footer";
import { cookies } from 'next/headers'  
import { redirect, RedirectType } from 'next/navigation';

interface PrivateLayoutProps {
  readonly children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = async ({ children }) => {
  const cookieStore = await cookies();

  const isLoggedin = cookieStore.get("token")?.value;
  if(!isLoggedin) redirect('/login', RedirectType.push)

  return (
    <div id="wrapper">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PrivateLayout;