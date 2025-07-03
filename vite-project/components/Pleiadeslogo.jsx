// components/PleiadesLogo.jsx
import React from "react";

const PleiadesLogo = ({ darkMode = false, size = "md", className = ""  }) => {
  // Configuración de tamaños
  const sizeClasses = {
    sm: { container: "w-16 h-16", text: "text-xs" },
    md: { container: "w-24 h-24", text: "text-sm" },
    lg: { container: "w-32 h-32", text: "text-lg" }
  };

  // Colores dinámicos
  const colors = {
    text: darkMode ? "text-white" : "text-gray-900",
    stars: "#FFFFFF",  // Amarillo para oscuro, Azul para claro
    lines: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
  };

  // Posiciones de las estrellas principales (Alcyone, Atlas, etc.)
  const stars = [
    { cx: 50, cy: 30, r: 3 },  // Alcyone
    { cx: 30, cy: 40, r: 2 },  // Atlas
    { cx: 70, cy: 40, r: 2 },  // Electra
    { cx: 40, cy: 60, r: 2 },  // Maia
    { cx: 60, cy: 60, r: 2 },  // Merope
    { cx: 20, cy: 50, r: 1.5 },// Taygeta
    { cx: 80, cy: 50, r: 1.5 } // Pleione
  ];

  return (
    <div className={`inline-flex flex-col items-center ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        {/* Líneas de conexión sutiles */}
        <line x1="50" y1="30" x2="30" y2="40" stroke={colors.lines} strokeWidth="0.5" />
        <line x1="50" y1="30" x2="70" y2="40" stroke={colors.lines} strokeWidth="0.5" />
        <line x1="30" y1="40" x2="40" y2="60" stroke={colors.lines} strokeWidth="0.5" />
        <line x1="70" y1="40" x2="60" y2="60" stroke={colors.lines} strokeWidth="0.5" />
        
        {/* Estrellas */}
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={colors.stars}
            className="animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
              filter: `drop-shadow(0 0 ${star.r}px ${colors.stars})`
            }}
          />
        ))}
        
        {/* Nebulosa sutil */}
        <circle cx="50" cy="45" r="25" fill={darkMode ? "rgba(251, 191, 36, 0.05)" : "rgba(30, 64, 175, 0.05)"} />
      </svg>
      
      {/* Texto "Pléyades" con estilo */}
      <span className={`mt-1 font-serif font-semibold ${colors.text} ${sizeClasses[size].text} tracking-wider`}>
        Pléyades
      </span>
    </div>
  );
};

export default PleiadesLogo;