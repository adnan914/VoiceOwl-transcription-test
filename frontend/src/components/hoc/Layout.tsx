'use client';
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        {children}
      </Provider>
    </>
  )
}

export default Layout;
