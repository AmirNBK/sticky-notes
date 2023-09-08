export const bgColors = ['#d070af', '#2fb4ab', '#d9a75f'];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
};

export function getRandomRotation(): number {
    return Math.floor(Math.random() * 9) - 4;
}
