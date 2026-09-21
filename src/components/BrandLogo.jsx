import React from 'react';

/**
 * BloomFlower — Exact SVG recreation of the 2nd reference image.
 *
 * Visual anatomy matching image #2:
 * - 4-pointed diamond star sparkle at the top
 * - Two central tulip/lotus petals with vertical center line
 * - Symmetrical left and right outer sweeping petals
 * - Clean vertical base stem
 * - Uniform stroke width with rounded caps and joins
 */
export function BloomFlower({
  size = 36,
  color = '#2D5FA6',
  className = '',
  style = {},
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* 4-point diamond sparkle star at the top */}
      <path
        d="M50 5 C50 12.5, 52.8 15.5, 60.5 15.5 C52.8 15.5, 50 18.5, 50 26 C50 18.5, 47.2 15.5, 39.5 15.5 C47.2 15.5, 50 12.5, 50 5 Z"
        fill={color}
      />

      {/* Center vertical seam between inner petals */}
      <line
        x1="50"
        y1="56"
        x2="50"
        y2="73"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
      />

      {/* Left Inner Petal */}
      <path
        d="M50 56 C50 42, 44 31, 33 28 C28 40, 36 60, 50 73"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right Inner Petal */}
      <path
        d="M50 56 C50 42, 56 31, 67 28 C72 40, 64 60, 50 73"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Outer Left Petal */}
      <path
        d="M31 46 C21 44, 13 45, 14 49 C18 58, 35 69, 50 73"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Outer Right Petal */}
      <path
        d="M69 46 C79 44, 87 45, 86 49 C82 58, 65 69, 50 73"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Base Vertical Stem */}
      <line
        x1="50"
        y1="73"
        x2="50"
        y2="92"
        stroke={color}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * BotanicalIcon — backward compatibility
 */
export function BotanicalIcon({ size = 36, color = '#0F1E36', className = '' }) {
  return <BloomFlower size={size} color={color} className={className} />;
}

/**
 * Complete WebBloomBuilds Wordmark & Tagline
 * Uses BloomFlower with multi-stage entrance + organic breathing + occasional bloom + hover animation.
 */
export default function BrandLogo({ showTagline = true, variant = 'default' }) {
  const isLight     = variant === 'light';
  const textColor   = isLight ? '#FFFFFF' : '#0F1E36';
  const subColor    = isLight ? '#D1E1F3' : '#3D6DA6';
  const flowerColor = isLight ? '#D1E1F3' : '#2D5FA6';

  return (
    <a href="#home" className="brand-logo-container" aria-label="WebBloomBuilds Home">
      <div className="brand-logo-inner brand-logo-hover-group">
        {/* Bloom Flower — exact 2nd image reference logo with multi-stage entrance + breathing animation */}
        <span className="bloom-flower-wrap bloom-flower-anim">
          <BloomFlower
            size={38}
            color={flowerColor}
          />
        </span>

        <div className="brand-text-wrap">
          <span className="brand-name" style={{ color: textColor }}>
            WebBloom<span className="brand-co">Builds</span>
          </span>
          {showTagline && (
            <span className="brand-subline" style={{ color: subColor }}>
              WEBSITES • DESIGN • GROWTH
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
