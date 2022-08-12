export default {
  siteName: 'CAPTIVE ADMIN',
  siteIcon: 'ion-flash',
  footerText: `Captive @ ${new Date().getFullYear()}`,
  enableAnimatedRoute: false,
  apiUrl: process.env.API_URL,
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
};
