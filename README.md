
.
├── README.md
├── db.sql
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── logo.png
├── src
│   ├── app
│   │   ├── (admin)
│   │   │   ├── components
│   │   │   │   ├── CTASection.tsx
│   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── SplashScreen.tsx
│   │   │   │   └── TestimonialsSection.tsx
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── data
│   │   │   │   └── landingData.tsx
│   │   │   ├── hooks
│   │   │   │   └── useSplashScreen.tsx
│   │   │   └── types.ts
│   │   ├── (auth)
│   │   │   ├── login
│   │   │   │   ├── components
│   │   │   │   └── page.tsx
│   │   │   └── register
│   │   │       ├── components
│   │   │       └── page.tsx
│   │   ├── components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   └── StoreOwnerProfile.ts
│   │   │   ├── services
│   │   │   │   ├── authServices.ts
│   │   │   │   └── productServices.ts
│   │   │   └── store
│   │   │       └── authStore.tsx
│   │   └── store
│   │       ├── [subdomain]
│   │       │   ├── aboutUs
│   │       │   │   └── page.tsx
│   │       │   ├── checkout
│   │       │   │   ├── layout.tsx
│   │       │   │   └── page.tsx
│   │       │   ├── components
│   │       │   │   ├── Cartdrawer.tsx
│   │       │   │   ├── Checkoutstepper.tsx
│   │       │   │   ├── Customerinfostep.tsx
│   │       │   │   ├── Footer.tsx
│   │       │   │   ├── HeroSection.tsx
│   │       │   │   ├── Minicartbutton.tsx
│   │       │   │   ├── NavBar.tsx
│   │       │   │   ├── Ordersummary.tsx
│   │       │   │   ├── Paymentstep.tsx
│   │       │   │   ├── ProductSection.tsx
│   │       │   │   ├── Shippinginfostep.tsx
│   │       │   │   └── TrustBadgeSection.tsx
│   │       │   ├── contactUs
│   │       │   │   └── page.tsx
│   │       │   ├── context
│   │       │   │   └── Cartcontext .tsx
│   │       │   ├── helper
│   │       │   │   └── storeHelper.tsx
│   │       │   ├── layout
│   │       │   │   └── StoreLayout.tsx
│   │       │   ├── page.tsx
│   │       │   └── success
│   │       │       ├── layout.tsx
│   │       │       └── page.tsx
│   │       ├── dashboard
│   │       │   ├── assets
│   │       │   │   ├── contents
│   │       │   │   │   └── OrdersViewContents.tsx
│   │       │   │   └── image
│   │       │   ├── components
│   │       │   │   ├── AddProductButton.tsx
│   │       │   │   ├── ContentSection.tsx
│   │       │   │   ├── DashboardHeader.tsx
│   │       │   │   ├── OrderCard.tsx
│   │       │   │   ├── OrdersView.tsx
│   │       │   │   ├── ProductCard.tsx
│   │       │   │   ├── ProductsView.tsx
│   │       │   │   ├── SideBar.tsx
│   │       │   │   ├── StatusBadge.tsx
│   │       │   │   ├── StatusCards.tsx
│   │       │   │   ├── Types.ts
│   │       │   │   └── ui
│   │       │   │       └── EditProductModal.tsx
│   │       │   ├── hooks
│   │       │   │   ├── UseProducts.ts
│   │       │   │   └── Useorders.ts
│   │       │   ├── new
│   │       │   │   ├── AnimatedBackground.tsx
│   │       │   │   ├── CTASection.tsx
│   │       │   │   ├── DomainSection.tsx
│   │       │   │   ├── FeaturesSection.tsx
│   │       │   │   ├── HeroSection.tsx
│   │       │   │   ├── HowItWorksSection.tsx
│   │       │   │   ├── LandingFooter.tsx
│   │       │   │   ├── LandingPage.tsx
│   │       │   │   ├── Navbar.tsx
│   │       │   │   ├── PricingSection.tsx
│   │       │   │   └── page.tsx
│   │       │   └── page.tsx
│   │       └── success
│   │           └── page.tsx
│   └── middleware.ts
├── tailwind.config.js
├── test
│   └── __mocks__
│       └── next
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── utils
    └── superbase
        ├── admin.ts
        ├── client.ts
        ├── middleware.ts
        └── server.ts