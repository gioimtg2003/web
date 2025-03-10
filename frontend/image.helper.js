
export const PALETTE_COLORS = [
    '#6CACE4',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
    '#034F84',
    '#F7786B',
    '#5B9BD5',
    '#98DBC6',
    '#EFC050',
    '#45B8AC',
    '#B565A7',
    '#FFB347',
    '#DD4124',
    '#BC5A45',
    '#4169E1',
    '#577590',
    '#9C89B8',
    '#6A4C93',
    '#89C2D9'
];

export function hashNameToColorHex(name) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % PALETTE_COLORS.length;
    return PALETTE_COLORS[index];
}