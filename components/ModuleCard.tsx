"use client";

import { motion } from "framer-motion";

type Props = {
  id: string;
  title: string;
  body: string;
  tags: readonly string[];
};

export function ModuleCard({ id, title, body, tags }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group panel relative flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent-dim md:p-7"
    >
      <div className="corner-ticks pointer-events-none absolute inset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className="label text-accent">{id}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-dim transition-colors duration-300 group-hover:bg-accent" />
      </div>
      <h3 className="mt-7 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
      <ul className="mt-7 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="label rounded-sm border border-hairline px-2 py-1.5 text-muted">
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
