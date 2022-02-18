export type IconName =
  | 'default'
  | 'sun'
  | 'moon'
  | 'circle'
  | 'times'
  | 'trash';

type IconPack = { [key in IconName]: string };

export const iconPack: IconPack = {
  default: ``,
  sun: `<svg viewBox="0 0 482.773 482.773"><path d="M241.387 156.053c-47.147 0-85.333 38.187-85.333 85.333s38.187 85.333 85.333 85.333 85.333-38.187 85.333-85.333-38.187-85.333-85.333-85.333z"/><path d="M412.053 170.667V70.72h-99.947L241.387 0l-70.72 70.72H70.72v99.947L0 241.387l70.72 70.72v99.947h99.947l70.72 70.72 70.72-70.72h99.947v-99.947l70.72-70.72-70.721-70.72zm-170.666 198.72c-70.72 0-128-57.28-128-128s57.28-128 128-128 128 57.28 128 128-57.28 128-128 128z"/></svg>`,
  moon: `<svg viewBox="0 0 426.667 426.667"><path d="M160 0C121.067 0 84.693 10.56 53.333 28.8 117.013 65.707 160 134.4 160 213.333S117.013 360.96 53.333 397.867c31.36 18.24 67.733 28.8 106.667 28.8 117.867 0 213.333-95.467 213.333-213.333S277.867 0 160 0z"/></svg>`,
  circle: `<svg viewBox="0 0 426.667 426.667"><circle cx="213.333" cy="213.333" r="213.333"/></svg>`,
  times: `<svg viewBox="0 0 24 24"><path d="M13.41 12l4.3-4.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-4.29-4.3a1.004 1.004 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 00.325 1.639 1 1 0 001.095-.219l4.29-4.3 4.29 4.3a1.002 1.002 0 001.639-.325 1 1 0 00-.219-1.095L13.41 12z" /></svg>`,
  trash: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 100-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4V5zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10v11z" /></svg>`,
};