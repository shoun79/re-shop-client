export const useCalculateTimeElapsed = (postCreatedAt) => {
    const currentTime = new Date();
    const postTime = new Date(postCreatedAt);

    const timeDifference = currentTime - postTime;
    const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // converting milliseconds to days
    const hoursElapsed = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // converting remaining milliseconds to hours
    const minutesElapsed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // converting remaining milliseconds to minutes


    if (daysElapsed > 0) {
        return `${daysElapsed}d ${hoursElapsed}h ${minutesElapsed}m`;
    } else if (hoursElapsed > 0) {
        return `${hoursElapsed}h ${minutesElapsed}m`;
    } else {
        return `${minutesElapsed}m`;
    }
}