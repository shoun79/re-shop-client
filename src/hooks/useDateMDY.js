export const useDateMDY = timestamp => {
    let date = new Date(timestamp);

    // time format
    let hours = `${date.getHours()}`;
    let minutes = `${date.getMinutes()}`;


    let newFormat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const time = hours + ':' + minutes + ' ' + newFormat;


    /* Date format */
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${time}`;

    return dateMDY;
}