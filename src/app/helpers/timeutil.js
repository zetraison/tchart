const timestampToDate = timestamp => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(timestamp);

    return `${months[date.getMonth()]} ${date.getDate()}`;
};

export { timestampToDate }