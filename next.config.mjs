/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `
      @use '@/styles/colors.scss' as *;
      @use '@/styles/variables.scss' as *;    
      @use '@/styles/mixins.scss' as *;
    `,
  },
};

export default nextConfig;
