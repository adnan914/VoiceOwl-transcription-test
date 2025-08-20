import { ROUTES_PATH } from '@/utils/constant';
import { cookies } from 'next/headers'  
import { redirect, RedirectType } from 'next/navigation';

interface PublicLayoutProps {
  readonly children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = async ({ children }) => {
  const cookieStore = await cookies();

  const isLoggedin = cookieStore.get("token")?.value;
  if(isLoggedin) redirect(ROUTES_PATH.HOME, RedirectType.push);

  return (
    <div>
      {children}
    </div>
  )
}

export default PublicLayout;