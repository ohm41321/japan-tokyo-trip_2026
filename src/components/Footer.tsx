"use client";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-black text-zinc-400 text-center py-6 sm:py-10 text-xs sm:text-sm">
      <p>
        Made by{' '}
        <a
          href="https://github.com/ohm41321"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-200 underline underline-offset-2 transition-colors"
        >
          ohm41321
        </a>
      </p>
      <p className="mt-1">
        <a
          href="https://tipme.in.th/athitfkm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-200 underline underline-offset-2 transition-colors"
        >
          Donate ☕
        </a>
      </p>
    </footer>
  );
}
