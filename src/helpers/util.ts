export const bufferToBase64: (buffer: Array<number>) => String = (buf: Array<number>): string => {
    var binstr: string = Array.prototype.map.call(buf, function (ch: number): string {
        return String.fromCharCode(ch);
    }).join("");
    return btoa(binstr);
};

export function getSorting(order: "asc" | "desc", orderBy: string):(a: any, b: any) => number {
    return order === "desc"
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}