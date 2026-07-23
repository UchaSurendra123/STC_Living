module.exports = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5000',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '919100098038',
  notifyEmail: process.env.NOTIFY_EMAIL || 'namratha@stcliving.in',
  company: {
    name: 'STC Living',
    address:
      'Door No. 2-168, NH-16 Service Road, Opp. Murugan Hotel, Kaza Village, Mangalagiri Mandal, Guntur District, Andhra Pradesh 522503',
    phone: '+91 91000 98038',
    website: 'www.stcliving.in'
  }
};
