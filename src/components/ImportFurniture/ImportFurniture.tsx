interface Furniture {
    id: number;
    image: string;
}

const furniture: Furniture[][] = [];

    for (let i = 0; i <= 24; i++) {
        const row: Furniture[] = [];
        for (let j = 0; j <= 3; j++) {
            const imageName = `Furniture${i+1}_${j+1}`;
            const imagePath = `../../assets/Furniture/${imageName}.svg`;
            row.push({ id: i*4+j, image: imagePath });
        }
        furniture.push(row);
    }
export default furniture;
