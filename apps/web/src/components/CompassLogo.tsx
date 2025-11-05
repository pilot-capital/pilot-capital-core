import React from "react";

interface CompassLogoProps {
    size?: number | string;
    className?: string;
    style?: React.CSSProperties;
    variant?: "default" | "light";
}

export const CompassLogo: React.FC<CompassLogoProps> = ({
    size = 32,
    className = "",
    style = {},
    variant = "default",
}) => {
    const colors =
        variant === "light"
            ? {
                  primary: "#c77dff",
                  secondary: "#e0aaff",
                  accent: "#ffffff",
              }
            : {
                  primary: "#374151",
                  secondary: "#6b7280",
                  accent: "#ef4444",
              };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            {/* Outer circle */}
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={colors.primary}
                strokeWidth="1.5"
                fill="none"
            />

            {/* Inner circle */}
            <circle
                cx="12"
                cy="12"
                r="6"
                stroke={colors.secondary}
                strokeWidth="1"
                fill="none"
            />

            {/* North arrow (red) */}
            <path
                d="M12 2L14 8H10L12 2Z"
                fill={colors.accent}
                stroke={colors.accent}
                strokeWidth="0.5"
            />

            {/* South arrow */}
            <path
                d="M12 22L10 16H14L12 22Z"
                fill={colors.primary}
                stroke={colors.primary}
                strokeWidth="0.5"
            />

            {/* East arrow */}
            <path
                d="M22 12L16 10V14L22 12Z"
                fill={colors.primary}
                stroke={colors.primary}
                strokeWidth="0.5"
            />

            {/* West arrow */}
            <path
                d="M2 12L8 14V10L2 12Z"
                fill={colors.primary}
                stroke={colors.primary}
                strokeWidth="0.5"
            />

            {/* Center dot */}
            <circle cx="12" cy="12" r="1.5" fill={colors.primary} />
        </svg>
    );
};

export default CompassLogo;
