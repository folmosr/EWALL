export const bufferToBase64: (buffer: Array<number>) => String = (buf: Array<number>): String => {
    var binstr: string = Array.prototype.map.call(buf, function (ch: number): string {
        return String.fromCharCode(ch);
    }).join("");
    return btoa(binstr);
};