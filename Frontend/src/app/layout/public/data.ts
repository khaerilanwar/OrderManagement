export const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Bot App',
      icon: 'pi pi-star',
      items: [
        {
          label: 'Facebook',
          icon: 'pi pi-bolt',
          routerLink: '/bot-app/facebook'
        },
        {
          label: 'Instagram',
          icon: 'pi pi-bolt',
          routerLink: '/bot-app/instagram'
        },
      ]
    },
    {
      label: 'Web App',
      icon: 'pi pi-star',
      items: [
        {
          label: 'MVC',
          icon: 'pi pi-bolt',
          routerLink: '/web-app/mvc'
        },
        {
          label: 'Fullstack',
          icon: 'pi pi-bolt',
          routerLink: '/web-app/fullstack'
        },
      ]
    },
  ]