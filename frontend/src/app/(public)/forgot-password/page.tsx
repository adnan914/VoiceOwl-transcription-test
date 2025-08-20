"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [, forceUpdate] = useState(0);
    const validator = useRef(new SimpleReactValidator({ autoForceUpdate: { forceUpdate: () => forceUpdate(n => n + 1) } }));
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (validator.current.allValid()) {
            setLoading(true);
            // Simulate async
            setTimeout(() => setLoading(false), 1500);
        } else {
            validator.current.showMessages();
            forceUpdate(n => n + 1);
        }
    };

    return (
        <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 bg-secondary/90 text-background">
            {/* Left hero section with background image and copy */}
            <div className="relative hidden lg:block">
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
                            Welcome to the VoiceOwl
                        </h1>
                        <p className="text-foreground/80 mt-6 text-base md:text-lg text-background max-w-2xl font-extralight font-[200]">
                            Spinal Scope is where your journey begins — a place to discover, learn, and grow. Join us as we explore new horizons and unlock your full potential.
                        </p>
                    </div>
                </div>
            </div>
            {/* Right forgot password card */}
            <div className="relative flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-background to-background/95 text-foreground">
                <div className="w-full max-w-xl">
                    <div className="bg-background/95 border border-foreground/10 shadow-xl rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center justify-center gap-3">
                            <Image src="/globe.svg" alt="SpinalScope Logo" width={40} height={40} />
                            <div className="text-center">
                                <div className="text-3xl font-heading tracking-wide text-foreground">VoiceOwl</div>
                            </div>
                        </div>
                        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="block text-sm font-medium text-foreground/80">Email</label>
                                <div className="mt-2 relative">
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="w-full rounded-md border border-foreground/20 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="text-red-500 text-xs mt-1 min-h-[18px]">
                                    {validator.current.message('email', email, 'required|email')}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center rounded-md bg-primary text-background px-4 py-3 font-medium hover:bg-primary/90"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Loading...</span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
