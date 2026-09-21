/**
 * WebBloomBuilds — Asset Resolver Helper
 * Dynamically resolves images whether they are stored in:
 * - src/assets/projects/
 * - src/assets/reviews/
 * - public/
 * - or external URLs
 */

const assetModules = import.meta.glob(
  '/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif,PNG,JPG,JPEG,WEBP,SVG,GIF}',
  {
    eager: true,
    import: 'default',
  }
);

export function resolveAsset(path) {
  if (!path) return '';
  if (typeof path !== 'string') return path;

  // External URL or Data URI
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Direct glob match (e.g. '/src/assets/projects/xyz.png')
  if (assetModules[path]) {
    return assetModules[path];
  }

  // Normalized path: '/assets/projects/xyz.png' -> '/src/assets/projects/xyz.png'
  const withSrc = path.startsWith('/assets/')
    ? `/src${path}`
    : path.startsWith('assets/')
    ? `/src/${path}`
    : null;

  if (withSrc && assetModules[withSrc]) {
    return assetModules[withSrc];
  }

  // Check without leading slash
  const cleanPath = `/${path.replace(/^\/+/, '')}`;
  if (assetModules[cleanPath]) {
    return assetModules[cleanPath];
  }

  // Match by filename across src/assets
  const filename = path.split('/').pop();
  if (filename) {
    for (const [key, value] of Object.entries(assetModules)) {
      if (key.endsWith(`/${filename}`)) {
        return value;
      }
    }
  }

  // Fallback to standard public root path (e.g. '/projects/xyz.png')
  return path;
}
