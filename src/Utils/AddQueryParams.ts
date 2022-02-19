export const encodeQueryData = (data: any) => {
    const ret: Array<any> = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
};