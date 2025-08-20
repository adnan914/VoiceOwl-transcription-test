"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [, forceUpdate] = useState(0);
    const validator = useRef(new SimpleReactValidator({ autoForceUpdate: { forceUpdate: () => forceUpdate(n => n + 1) } }));
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (validator.current.allValid()) {
            // Handle signup logic here
        } else {
            validator.current.showMessages();
            forceUpdate(n => n + 1);
        }
    };

    return (
        <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 bg-secondary/90 text-background">
            {/* Left hero section with background image and copy */}
            <div className="relative hidden lg:block">
                {/* Background image overlay */}
                <Image
                    src="/window.svg"
                    alt="Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-screen-md mx-auto px-8">
                        <h1 className="text-foreground/80 font-heading text-3xl md:text-4xl leading-tight text-background font-[300]">
                            Create your VoiceOwl Account
                        </h1>
                        <p className="text-foreground/80 mt-6 text-base md:text-lg text-background max-w-2xl font-extralight font-[200]">
                            Join us to discover, learn, and grow. Unlock your full potential with VoiceOwl.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right signup card */}
            <div className="relative flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-background to-background/95 text-foreground">
                <div className="w-full max-w-xl">
                    <div className="bg-background/95 border border-foreground/10 shadow-xl rounded-2xl p-6 sm:p-8">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3">
                            <Image src="/globe.svg" alt="SpinalScope Logo" width={40} height={40} />
                            <div className="text-center">
                                <div className="text-3xl font-heading tracking-wide text-foreground">VoiceOwl</div>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80">First Name</label>
                                <div className="mt-2 relative">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter First Name"
                                        className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={form.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                    {validator.current.message('firstname', form.firstname, 'required|alpha_space')}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80">Last Name</label>
                                <div className="mt-2 relative">
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={form.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                    {validator.current.message('lastname', form.lastname, 'required|alpha_space')}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80">Email</label>
                                <div className="mt-2 relative">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40">@</span>
                                </div>
                                <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                    {validator.current.message('email', form.email, 'required|email')}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80">Password</label>
                                <div className="mt-2 relative">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40">
                                        ●
                                    </button>
                                </div>
                                <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                    {validator.current.message('password', form.password, 'required|min:6')}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center rounded-md bg-secondary text-background px-4 py-3 font-medium hover:bg-secondary/90"
                            >
                                Create Account
                            </button>
                            <div className="text-center mt-4">
                                <span className="text-sm text-foreground/60">Already have an account? </span>
                                <a href="/login" className="text-primary hover:underline">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
