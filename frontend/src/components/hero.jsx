'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Hero({
  title,
  description,
  imageUrl,
  imageHint,
  children,
  className
}) {
  return (
    <div className={cn('relative w-full h-[60vh] text-white overflow-hidden', className)}>
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={imageUrl} 
        alt={imageHint} 
        className="object-cover w-full h-full" 
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-headline font-bold drop-shadow-md text-primary-foreground"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow text-primary-foreground/90"
        >
          {description}
        </motion.p>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
        >
            {children}
        </motion.div>
      </div>
    </div>
  );
}