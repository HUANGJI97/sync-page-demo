
export type DataItem = {
    name: string;
    type: number;
}
export const getMockData = (type: number) => new Promise<DataItem[]>((resolve) => {
    const data = Array.from({ length: 15 }, (__, dIndex) => {
        return {
            name: `数据${type}-${dIndex}`,
            type: type,
        };
    });
    setTimeout(() => {
        resolve(data);
    }, Math.random() * 1000);
});
