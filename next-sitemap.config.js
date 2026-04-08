/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sistersaresassystudio.com",
  generateRobotsTxt: true,
  // Exclude token-based booking management pages from sitemap and indexing
  exclude: ["/booking/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/booking/"],
      },
    ],
  },
};
