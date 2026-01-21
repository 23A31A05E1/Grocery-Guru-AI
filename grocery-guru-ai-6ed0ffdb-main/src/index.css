@tailwind base;
@tailwind components;
@tailwind utilities;

/* GroceryGuru Design System - Soft Pink Theme with Apple-level polish */

@layer base {
  :root {
    /* Soft pink background */
    --background: 340 50% 98%;
    --foreground: 0 0% 20%;

    /* White cards with subtle warmth */
    --card: 0 0% 100%;
    --card-foreground: 0 0% 20%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 20%;

    /* Vibrant pink primary */
    --primary: 330 85% 55%;
    --primary-foreground: 0 0% 100%;

    /* Soft pink secondary */
    --secondary: 340 45% 95%;
    --secondary-foreground: 330 85% 45%;

    /* Muted pink tones */
    --muted: 340 30% 94%;
    --muted-foreground: 0 0% 45%;

    /* Accent - warm coral */
    --accent: 15 90% 60%;
    --accent-foreground: 0 0% 100%;

    /* Success green */
    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;

    /* Warning amber */
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 10%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 340 20% 90%;
    --input: 340 20% 90%;
    --ring: 330 85% 55%;

    --radius: 1rem;

    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(330 85% 55%), hsl(350 85% 60%));
    --gradient-success: linear-gradient(135deg, hsl(142 76% 36%), hsl(160 76% 40%));
    --gradient-warm: linear-gradient(135deg, hsl(340 50% 98%), hsl(20 50% 98%));

    /* Shadows */
    --shadow-soft: 0 4px 20px -4px hsl(330 85% 55% / 0.15);
    --shadow-card: 0 2px 12px -2px hsl(0 0% 0% / 0.08);
    --shadow-elevated: 0 12px 40px -8px hsl(0 0% 0% / 0.15);

    --sidebar-background: 340 50% 98%;
    --sidebar-foreground: 0 0% 20%;
    --sidebar-primary: 330 85% 55%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 340 45% 95%;
    --sidebar-accent-foreground: 330 85% 45%;
    --sidebar-border: 340 20% 90%;
    --sidebar-ring: 330 85% 55%;
  }

  .dark {
    --background: 0 0% 8%;
    --foreground: 0 0% 95%;

    --card: 0 0% 12%;
    --card-foreground: 0 0% 95%;

    --popover: 0 0% 12%;
    --popover-foreground: 0 0% 95%;

    --primary: 330 85% 60%;
    --primary-foreground: 0 0% 100%;

    --secondary: 330 30% 20%;
    --secondary-foreground: 330 85% 70%;

    --muted: 0 0% 18%;
    --muted-foreground: 0 0% 60%;

    --accent: 15 90% 55%;
    --accent-foreground: 0 0% 100%;

    --success: 142 76% 45%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 55%;
    --warning-foreground: 0 0% 10%;

    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 330 85% 60%;

    --sidebar-background: 0 0% 10%;
    --sidebar-foreground: 0 0% 95%;
    --sidebar-primary: 330 85% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 330 30% 20%;
    --sidebar-accent-foreground: 330 85% 70%;
    --sidebar-border: 0 0% 20%;
    --sidebar-ring: 330 85% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.3);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.5);
  }
}

@layer utilities {
  /* Glass effect */
  .glass {
    background: hsl(var(--card) / 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Gradient text */
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Primary gradient button */
  .btn-gradient {
    background: var(--gradient-primary);
    box-shadow: var(--shadow-soft);
    transition: all 0.3s ease;
  }

  .btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-elevated);
  }

  .btn-gradient:active {
    transform: translateY(0);
  }

  /* Card shadow */
  .card-shadow {
    box-shadow: var(--shadow-card);
  }

  .card-shadow-hover {
    transition: all 0.3s ease;
  }

  .card-shadow-hover:hover {
    box-shadow: var(--shadow-elevated);
    transform: translateY(-4px);
  }

  /* Confetti animation keyframes */
  @keyframes confetti-fall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100px) rotate(720deg);
      opacity: 0;
    }
  }

  .animate-confetti {
    animation: confetti-fall 1s ease-out forwards;
  }

  /* Bounce animation */
  @keyframes bounce-gentle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce-gentle {
    animation: bounce-gentle 2s ease-in-out infinite;
  }

  /* Pulse glow */
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 hsl(330 85% 55% / 0.4);
    }
    50% {
      box-shadow: 0 0 20px 10px hsl(330 85% 55% / 0);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  /* Slide up fade */
  @keyframes slide-up-fade {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up-fade 0.5s ease-out;
  }

  /* Shimmer effect for loading */
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .animate-shimmer {
    background: linear-gradient(
      90deg,
      hsl(var(--muted)) 25%,
      hsl(var(--card)) 50%,
      hsl(var(--muted)) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Strikethrough animation */
  @keyframes strikethrough {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .animate-strikethrough::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 2px;
    background: hsl(var(--success));
    animation: strikethrough 0.3s ease-out forwards;
  }

  /* Success check animation */
  @keyframes check-pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-check {
    animation: check-pop 0.3s ease-out;
  }

  /* Floating animation for badges */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(-2deg);
    }
    50% {
      transform: translateY(-8px) rotate(2deg);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  /* Celebration burst */
  @keyframes burst {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .animate-burst {
    animation: burst 0.5s ease-out forwards;
  }
}

/* Swipe gesture hints */
.swipe-hint {
  position: relative;
  overflow: hidden;
}

.swipe-hint::after {
  content: '';
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    hsl(var(--success) / 0.1),
    transparent
  );
  animation: swipe-hint 2s ease-in-out 1s;
}

@keyframes swipe-hint {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
}