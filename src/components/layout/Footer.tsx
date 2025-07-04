// 'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 bg-background mt-auto bottom-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Logo Inc. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/">
            <Button variant="link" className="text-sm px-0">Home</Button>
          </Link>
          <Link href="/blogs">
            <Button variant="link" className="text-sm px-0">Blogs</Button>
          </Link>
          <Link href="/categories">
            <Button variant="link" className="text-sm px-0">Categories</Button>
          </Link>
          {/* <Link href="/contact">
            <Button variant="link" className="text-sm px-0"></Button>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}