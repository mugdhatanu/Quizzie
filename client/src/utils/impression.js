

export const formatImpressionCount = (impressions) => {
    if(impressions >= 1000) {
        const impressionStr = String(impressions);
        const firstChar = impressionStr.charAt(0);
        const secondChar = impressionStr.charAt(1);
        const str = `${firstChar}.${secondChar}K` 
        return str;
    } else {
        return String(impressions);
    }
}