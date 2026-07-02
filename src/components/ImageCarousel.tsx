import React from 'react';
import { motion } from 'motion/react';

const images = [
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955616/WhatsApp_Image_2026-07-01_at_10.00.07_PM_h1r89w.jpg",
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955618/WhatsApp_Image_2026-07-01_at_10.00.05_PM_1_tf7bog.jpg",
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955617/WhatsApp_Image_2026-07-01_at_10.00.05_PM_ft7h4c.jpg",
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955617/WhatsApp_Image_2026-07-01_at_10.00.04_PM_tutfxd.jpg",
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955617/WhatsApp_Image_2026-07-01_at_10.00.05_PM_2_ffktby.jpg",
  "https://res.cloudinary.com/dky9oxhzt/image/upload/v1782955616/WhatsApp_Image_2026-07-01_at_10.00.03_PM_cszfay.jpg"
];

export const ImageCarousel = () => {
  return (
    <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex gap-4"
        drag="x"
        dragConstraints={{ right: 0, left: -((images.length - 1) * 320) }}
        animate={{ x: [0, -((images.length - 1) * 320)] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {images.map((img, i) => (
          <img 
            key={i} 
            src={img} 
            alt={`Estrutura ${i + 1}`} 
            className="w-80 h-60 object-cover rounded-xl shadow-lg shrink-0" 
          />
        ))}
        {/* Duplicate for seamless loop effect */}
        {images.map((img, i) => (
          <img 
            key={`dup-${i}`} 
            src={img} 
            alt={`Estrutura ${i + 1}`} 
            className="w-80 h-60 object-cover rounded-xl shadow-lg shrink-0" 
          />
        ))}
      </motion.div>
    </div>
  );
};
