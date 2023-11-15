interface Furniture {
    id: number;
    image: string;
  }
  
  const furniture: Furniture[][] = [];
  
  for (let i = 1; i <= 25; i++) {
    const row: Furniture[] = [];
    for (let j = 1; j <= 4; j++) {
      const imageName = `Furniture[${i}]-[${j}]`;
      const imagePath = `../../assets/${imageName}.svg`;
      row.push({ id: i * 4 + (j - 1), image: imagePath });
    }
    furniture.push(row);
  }
  
  export default furniture;
  