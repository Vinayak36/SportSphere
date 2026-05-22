// Features.js
import React from 'react';

const features = [
  { img: 'https://sc0.blr1.cdn.digitaloceanspaces.com/article/143885-jhputszawv-1593855464.jpg', text: 'Profile Creation' },
  { img: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w2440/f_auto/v1541663160/primary/tega2rxy19hr5mwukpvs', text: 'Open Challenges' },
  { img: 'https://bwfbadminton.com/wp-content/uploads/2020/03/Taufik-Hidayat_WC-2011-scaled-e1585608557281-980x550.jpg', text: 'Real-Time Messaging' },
  { img: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w2440/f_auto/primary/pppoxdjqmwvt16ismt1b', text: 'Map Integration' },
];

const Features = () => {
  return (
    <section className="py-16 bg-primaryBlack">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="relative">
            <img
              src={feature.img}
              alt={feature.text}
              className="w-full h-96 object-cover rounded-lg" // Increased height
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-primaryWhite text-center p-4">
              <p className="text-lg font-semibold">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
