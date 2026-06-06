// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "brand-orange": "#E07328",
        "brand-orange-hover": "#F07D30",
        "dm-bg": "#080808",
        "dm-bg-1": "#0b0b0d",
        "dm-surface-solid": "#131316",
        "dm-fg-1": "#F0EDE8",
        "dm-success": "#27C93F",
        "dm-info": "#60A5FA",
        "dm-warning": "#FBBF24",
        "dm-danger": "#EF4444",
        "dm-violet": "#A78BFA",
        "dm-teal": "#2DD4BF",
      },
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        "space-mono": ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "drawer-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        "fade-up": "fade-up 0.3s ease-out both",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.22s cubic-bezier(0.16, 1, 0.30, 1)",
        "drawer-in": "drawer-in 0.3s cubic-bezier(0.16, 1, 0.30, 1)",
        "slide-down": "slide-down 0.2s ease-out",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      boxShadow: {
        "glow-orange": "0 0 24px rgba(224, 115, 40, 0.35)",
        "glow-orange-lg": "0 0 36px rgba(224, 115, 40, 0.5)",
        "dm-card": "0 24px 80px rgba(0, 0, 0, 0.55)",
        "dm-drop": "0 8px 28px rgba(0, 0, 0, 0.45)",
        "dm-drawer": "-20px 0 60px rgba(0, 0, 0, 0.5)",
      },
    },
  },
};
